import { randomUUID } from 'crypto';
import { RescueBases } from '../models/IRescueBases';

import firestore from '../integrations/firestore/firestore';

// Return the list of rescue bases
export const getAll = async () => {
    console.info('INICIO - busca de todos as bases de resgate - getAll');

    const rescueBases: RescueBases[] = await firestore.getAll('rescueBases');
    
    let dataRescueBases: any = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        ]
    } 

    rescueBases.forEach((rescueBase: RescueBases) => {
        let features: any = {
            "type": "Feature",
            "properties": { "id": rescueBase.id, "time": rescueBase.creationDate.getMilliseconds, "lat": rescueBase.latitude, "lgt": rescueBase.longitude, "title": rescueBase.title },
            "geometry": { "type": "Point", "coordinates": [rescueBase.longitude, rescueBase.latitude, 0.0]}
        }

        dataRescueBases.features.push(features);
    });
    
    console.info('FIM - busca de todos as bases de resgate - getAll');
    return dataRescueBases;
}

// Return the rescue point with the given ID
export const getById = async (id: string) => {
    console.info('INICIO - busca de um unica base de resgate - geById');
    const res = await firestore.getDocument("rescueBases", id);
    console.info('FIM - busca de um unica base de resgate - geById');
    return res;
}

export const create = async (rescueBase: RescueBases) => {
    console.info('INICIO - criação de uma base de resgate - create');
    rescueBase.id = randomUUID();
    rescueBase.creationDate = new Date();

    await firestore.createDocument("rescueBases", rescueBase);
    console.info('FIM - criação base de resgate - create');
    return await getById(rescueBase.id);
}