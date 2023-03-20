import { auth, app } from "../services/firebase.config.js"
import { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

// FIRESTORE DATABASE
// Corregir tipado

const firestoreDB = getFirestore(app)

export const getData = (database: string, key: any, value: any) => {
	return new Promise((resolve) => {
		database === undefined && resolve("Database parameter missing")

		const condition = key === undefined || value === undefined ? undefined : where(key, "==", value)
		const collectionRef = collection(firestoreDB, database)
		const ref = query(collectionRef, condition)

		getDocs(ref).then((snapshot) => {
			const docsData = snapshot.docs.map((doc) => {
				return { ...doc.data(), uid: doc.id }
			})

			resolve(docsData)
		})
	})
}

export const saveData = async (database: string, dataToSave: object) => {
	const ordersCollection = collection(firestoreDB, database)
	const docRef = await addDoc(ordersCollection, dataToSave)
	return docRef
}

// deleteData(db, uid)
export const deleteData = async (database: string, dataToDelete: string) => {
	const docRef = await deleteDoc(doc(firestoreDB, database, dataToDelete))
	return docRef 
}
