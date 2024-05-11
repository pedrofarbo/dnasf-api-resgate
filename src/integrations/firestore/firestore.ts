import firebase from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const {private_key} = JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "{}");

const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": private_key,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
}

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount as firebase.ServiceAccount)
});

// Create a new client
const firestore = firebase.firestore();

const getDocument = async (collection: string, id: string) => {
    console.info('INICIO - busca getDocument no firebase - firestore.getDocument');
    let query: any = firestore.collection(collection);
    query = query.where("id", "==", id);

    const documents = await query.get();

    console.info('FIM - busca getDocument no firebase - firestore.getDocument');
    return documents.docs.map((doc: any) => doc.data())[0];
}

const createDocument = async (collection: string, data: any) => {
    console.info('INICIO - cria um novo document no firebase - firestore.createDocument');
    const document = await firestore.collection(collection).add(data);
    console.info('FIM - cria um novo document no firebase - firestore.createDocument');
    return document.id;
}

const updateDocument = async (collection: string, id: string, data: any) => {
    console.info('INICIO - atualiza um document no firebase - firestore.updateDocument');
    const res = await firestore.collection(collection).doc(id).update(data);
    console.info('FIM - atualiza um document no firebase - firestore.updateDocument');
    return res;
}

const deleteDocument = async (collection: string, id: string) => {
    console.info('INICIO - deleta um document no firebase - firestore.deleteDocument');
    const res = await firestore.collection(collection).doc(id).delete();
    console.info('FIM - deleta um document no firebase - firestore.deleteDocument');
    return res;
}

const getAll = async (collection: string, filter?: { field: string, operator: string, value: any }) => {
    console.info('INICIO - recupera todos os documents no firebase - firestore.getAll');
    let query: any = firestore.collection(collection);

    if (filter) {
        query = query.where(filter.field, filter.operator, filter.value);
    }

    const documents = await query.get();

    console.info('FIM - recupera todos os documents no firebase - firestore.getAll');

    return documents.docs.map((doc: any) => doc.data());
}

module.exports = {
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    getAll
};


