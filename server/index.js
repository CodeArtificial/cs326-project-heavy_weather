import express from 'express';
import logger from 'morgan';
// import { Database } from './database';

class Server {
    constructor() {
        // this.dburl = dburl;
        this.app = express();
        this.app.use('/', express.static('client'));
    }

    async initRoutes() {
        const self = this;

        this.app.post('/createEvent', async (request, response) => {
            try {
                // const { name, date } = request.query;
                // const event = await self.db.createEvent(name, event);
                response.status(200).json({ status: "success" });
            } catch (err) {
                response.status(404).json({ status: "failed" });
            }
        });

        this.app.get('/getAllEvent', async (request, response) => {
            try {
                // const events = await self.db.readAllEvent();
                // response.status(200).json(events);
            } catch (err) {
                response.status(404).json({ status: "failed" });
            }
        });
    }

    // async initDB() {
    //     this.db = new Database(this.dburl);
    //     await this.db.connect();
    // }

    async start() {
        await this.initRoutes();
        // await this.initDB();
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

// const server = new Server();
// server.start();

const app = express();
const port = process.env.PORT || 3000;

// TODO #3: Add middleware to the Express app.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

// TODO #4: Implement the /wordScore endpoint
app.post('/createEvent', async (request, response) => {
//   const { name, word, score } = request.body;
//   await database.saveWordScore(name, word, score);
  response.status(200).json({ status: 'success' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});