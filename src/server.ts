import express from 'express'
import index from './routes/index';
import rescuePointsRoutes from './routes/rescuePointsRoutes';
import rescueBaseRoutes from './routes/rescueBasesRoutes';
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors());

app.use('/', index);
app.use('/api/v1/rescue-points', rescuePointsRoutes);
app.use('/api/v1/rescue-bases', rescueBaseRoutes);

const port: any = process.env.PORT ?? 8080;

app.listen(port, () => {
    console.info('server running on port ' + port);
})