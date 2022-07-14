import express from 'express';
import logger from 'morgan';
import { Database } from './database';

const DATABASE_URL = "postgres://jegbssbvkhyjdl:0e2c7ce25fa24f96cb65d0b3dc74604f9e0914e975b8bcfa0d6b040a10312ab8@ec2-54-87-179-4.compute-1.amazonaws.com:5432/datvauq86hv760";

class Server {
    constructor() {
        this.dburl = dburl;
        this.app = express();
        this.app.use('/', express.static('client'));
    }

    async initRoutes() {
        const self = this;

        this.app.post('/createEvent', async (request, response) => {
            try {
                const { name, date } = request.body;
                await self.db.createEvent(name, date);
                response.status(200).json({ status: "success" });
            } catch (err) {
                response.status(404).json({ status: "failed" });
            }
        });

        this.app.get('/getAllEvent', async (request, response) => {
            try {
                const events = await self.db.readAllEvent();
                response.status(200).json(events);
            } catch (err) {
                response.status(404).json({ status: "failed" });
            }
        });
    }

    async initDB() {
        this.db = new Database(this.dburl);
        await this.db.connect();
    }

    async start() {
        await this.initRoutes();
        await this.initDB();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(logger('dev'));
        app.use('/', express.static('client'));
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

const server = new Server(DATABASE_URL);
server.start();