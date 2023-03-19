import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore'

// FIRESTORE DATABASE
// Corregir tipado

const firestoreDB = getFirestore(app)

export const getData = (database:any, key:any, value:any) => {
    return new Promise((resolve) => {
        database === undefined && resolve('Database parameter missing')
        
        const condition = ((key === undefined) || (value === undefined)) ? undefined : where(key, '==', value)
        const collectionRef = collection(firestoreDB, database);
        const ref = query(collectionRef, condition)

        getDocs(ref).then(snapshot => {
            const docsData = snapshot.docs.map(doc => {
                return { ...doc.data(), uid: doc.id }
            });

            resolve(docsData);
        })
    })
}

export const saveData = async (database:any, dataToSave:any) => {
    const ordersCollection = collection(firestoreDB, database);
    const docRef = await addDoc(ordersCollection, dataToSave);
    return docRef
}
