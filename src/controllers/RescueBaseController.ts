import { RescueBases } from "../models/IRescueBases";

const rescueBaseService = require('../services/RescueBaseService');

exports.getById = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescueBaseController.getById');
    if(req.params.id === undefined) {
        res.status(400).send('ID não informado.');
    }

    const response: RescueBases = await rescueBaseService.getById(req.params.id);

    try {
        if(response === undefined) {
            throw new Error('Nenhuma base de resgate encontrada');
        }

        console.info('FIM - rescueBaseController.getById');
        res.status(201).send(response);
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

exports.getAll = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescueBaseController.getAll');
    const response: RescueBases[] = await rescueBaseService.getAll();

    try {
        if(response === undefined) {
            throw new Error('Nenhum base de resgate encontrada');
        }

        if(response.length == 0) {
            throw new Error('Nenhum base de resgate encontrada');
        }

        console.info('FIM - rescueBaseController.getAll');
        res.status(201).send(response);
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};

exports.create = async (req: any, res: any, next: any) => {
    console.info('INICIO - rescueBaseController.create');
    if(req.body === undefined) {
        res.status(400).send('Corpo da requisição não informado.');
    }

    const response: RescueBases = await rescueBaseService.create(req.body);

    try {
        if(response !== undefined) {
            console.info('FIM - rescueBaseController.create');
            res.status(201).send("Base de busca criada com sucesso.");
        }
    } catch (error: any) {
        console.error(error); 
        res.status(500).send("erro inesperado no servidor, tente novamente mais tarde.");
    }
};