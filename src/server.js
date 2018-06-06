import  express from 'express';
import compose from './configuration';
import debug from 'debug';
import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import cluster from 'express-cluster';
import os from 'os';
import path from 'path';

dotenv.load();
cluster((worker) => {
    const app = express();
    compose(app);
    http.createServer(app).listen(process.env.PORT || 3000);
},
{
    count: os.cpus().length,
    verbose: true,
    workerListener: () => console.log(`${process.pid}: running`)
})