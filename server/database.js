import { query } from 'express';
import pg from 'pg';

const { Pool } = pg;

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.pool = new Pool({
            connectionString: this.dburl,
            ssl: { rejectUnauthorized: false },
        });
    
        this.client = await this.pool.connect();
        await this.init();
    }

    async init() {
        const queryText = `
        create table if not exists event_record (
            event varchar(30),
            date varchar(30)
        );`;

        const res = await this.client.query(queryText);
    }

    async close() {
        this.client.release();
        await this.client.end();
    }

    async createEvent(event, date) {
        console.log(event);
        console.log(date);
        const queryText = 'INSERT INTO event_record (event, date) VALUES ($1, $2) RETURNING *';
        const response = await this.client.query(queryText, [event, date]);
        console.log("hello");
        return response.rows;
    }

    async updateEventDate(event, date) {
        const queryText = 'UPDATE event_record SET date = $2 WHERE event = $1 RETURNING *';
        const respond = await this.client.query(queryText, [event, date]);
        return respond.rows;
    }

    async updateEventName(event, date) {
        const queryText = 'UPDATE event_record SET event = $1 WHERE date = $2 RETURNING *';
        const respond = await this.client.query(queryText, [event, date]);
        return respond.rows;
    }

    async deleteEvent(event, date) {
        const queryText = 'DELETE FROM event_record WHERE event = $1 AND date = $2 RETURNING *';
        const respond = await this.client.query(queryText, [event, date]);
        return respond.rows;
    }

    async readEvent(event) {
        const queryText = 'SELECT * FROM event_record WHERE event = $1';
        const respond = await this.client.query(queryText, [event]);
        return respond.rows;
    }

    async readAllEvent() {
        const queryText = 'SELECT * FROM event_record';
        const respond = await this.client.query(queryText);
        return respond.rows;
    }

    async deleteAllEvent() {
        const queryText = 'DELETE FROM event_record';
        const respond = await this.client.query(queryText);
        return respond.rows; 
    }
}