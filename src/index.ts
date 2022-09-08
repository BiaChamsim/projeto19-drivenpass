import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from './routes/router';

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);



const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
});