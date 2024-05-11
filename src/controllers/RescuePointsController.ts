import { RescuePoints } from "../models/IRescuePoints";

import {getById, getAll, create, putRescued} from '../services/RescuePointsService';

const RescuePointsController: any = {};

RescuePointsController.getById = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescuePointsController.geById');
    if(req.params.id === undefined) {
        res.status(400).send('ID não informado.');
    }

    const response: RescuePoints = await getById(req.params.id);

    try {
        if(response === undefined) {
            throw new Error('Nenhum ponto de resgate encontrado');
        }

        console.info('FIM - rescuePointsController.geById');
        res.status(201).send(response);
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

RescuePointsController.getAll = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescuePointsController.getAll');
    const response: RescuePoints[] = await getAll();

    try {
        if(response === undefined) {
            throw new Error('Nenhum ponto de resgate encontrado');
        }

        if(response.length == 0) {
            throw new Error('Nenhum ponto de resgate encontrado');
        }

        console.info('FIM - rescuePointsController.getAll');
        res.status(201).send(response);
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

RescuePointsController.create = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescuePointsController.create');
    if(req.body === undefined) {
        res.status(400).send('Corpo da requisição não informado.');
    }

    const response: RescuePoints = await create(req.body);

    try {
        if(response !== undefined) {
            console.info('FIM - rescuePointsController.create');
            res.status(201).send("Ponto de busca criado com sucesso.");
        }
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

RescuePointsController.putToRescued = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescuePointsController.putToRescued');
    if(req.params.id === undefined) {
        res.status(400).send('ID não informado.');
    }

    const response: RescuePoints = await putRescued(req.params.id);

    try {
        if(response !== undefined) {
            console.info('FIM - rescuePointsController.putToRescued');
            res.status(201).send("Ponto de busca atualizado com sucesso para RESGATADO.");
        }
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

export default RescuePointsController;