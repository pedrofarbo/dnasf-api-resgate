import express from 'express';
const indexRouter = express.Router();

indexRouter.get('/', function (req: any, res: any, next: any) {
    res.status(200).send("UP!");
});

indexRouter.get('/version', function (req: any, res: any, next: any) {
    res.status(200).send({
        title: "DNASF - API BUSCA DE PONTOS DE RESGATE",
        version: "0.0.1"
    });
});

module.exports = indexRouter;

export default indexRouter;