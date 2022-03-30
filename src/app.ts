import express from "express";
import connect from './utils/connect';
import config from 'config';

const port = config.get<number>('port');

const app = express();

app.listen(port, async() => {
  console.log("The app is running for now ");

  await connect();
});
