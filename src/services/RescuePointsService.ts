import { randomUUID } from 'crypto';
import { RescuePoints } from '../models/IRescuePoints';
import firestore from '../integrations/firestore/firestore';

// Return the list of rescue points
export const getAll = async () => {
    console.info('INICIO - busca de todos os pontos de solicitação de resgate - getAll');

    const rescuePoints: RescuePoints[] = await firestore.getAll('rescuePoints', { field: 'alreadyRescued', operator: '==', value: false });
    
    let dataRescuePoints: any = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        ]
    } 

    rescuePoints.forEach((rescuePoint: RescuePoints) => {
        let features: any = {
            "type": "Feature",
            "properties": { "id": rescuePoint.id, "time": rescuePoint.creationDate.getMilliseconds, "lat": rescuePoint.latitude, "lgt": rescuePoint.longitude, "alreadyRescued": rescuePoint.alreadyRescued },
            "geometry": { "type": "Point", "coordinates": [rescuePoint.longitude, rescuePoint.latitude, 0.0]}
        }

        dataRescuePoints.features.push(features);
    });

    console.info('FIM - busca de todos os pontos de solicitação de resgate - getAll');
    
    return dataRescuePoints;
}

// Return the rescue point with the given ID
export const getById = async (id: string) => {    
    console.info('INICIO - busca de um unico ponto de solicitação de resgate - geById');
    const res: any = await firestore.getDocument("rescuePoints", id);
    console.info('FIM - busca de um unico ponto de solicitação de resgate - geById');
    return res;
}

export const create = async (rescuePoint: RescuePoints) => {
    console.info('INICIO - criação de um unico ponto de solicitação de resgate - create');

    rescuePoint.alreadyRescued = false;
    rescuePoint.id = randomUUID();
    rescuePoint.creationDate = new Date();

    await firestore.createDocument("rescuePoints", rescuePoint);

    console.info('FIM - criação de um unico ponto de solicitação de resgate - create');
    return await getById(rescuePoint.id);
}

export const putRescued = async (rescuePointId: string) => {
    console.info('INICIO - alteração para resgatado para o ponto ' + rescuePointId +  ' de solicitação de resgate - putRescued');
    let rescuePoint: any = await getById(rescuePointId);
    console.log(rescuePoint);

    rescuePoint.alreadyRescued = true;
    
    const response = await firestore.updateDocument("rescuePoints", rescuePoint.id, rescuePoint); 

    console.info('FIM - alteração para resgatado para o ponto ' + rescuePointId +  ' de solicitação de resgate - putRescued');
    return response;
}