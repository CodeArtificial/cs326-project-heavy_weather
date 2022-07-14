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
            date varchar(30),
        );`;

        const res = await this.client.query(queryText);
    }

    async close() {
        this.client.release();
        await this.client.end();
    }

    async createEvent(name, date) {
        const queryText = 'INSERT INTO event_record (name, date) VALUES ($1, $2) RETURNING *';
        const response = await this.client.query(queryText, [name, date]);
        return response.rows;
    }

    async updateEventDate(name, date) {
        const queryText = 'UPDATE event_record SET date = $2 WHERE name = $1 RETURNING *';
        const respond = await this.client.query(queryText, [name, date]);
        return respond.rows;
    }

    async updateEventName(name, date) {
        const queryText = 'UPDATE event_record SET name = $1 WHERE date = $2 RETURNING *';
        const respond = await this.client.query(queryText, [name, date]);
        return respond.rows;
    }

    async deleteEvent(name) {
        const queryText = 'DELETE FROM event_record WHERE name = $1 RETURNING *';
        const respond = await this.client.query(queryText, [name]);
        return respond.rows;
    }

    async readEvent(name) {
        const queryText = 'SELECT * FROM event_record WHERE name = $1';
        const respond = await this.client.query(queryText, [name]);
        return respond.rows;
    }

    async readAllEvent() {
        const queryText = 'SELECT * FROM event_record';
        const respond = await this.client.query(queryText);
        return respond.rows;
    }
}