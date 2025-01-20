import { addDoc ,serverTimestamp,collection} from "firebase/firestore"
import { db } from "../config/firebase"
import { getUserInfo } from "./UserInfo";


 export const addTranstion=async({description,transactionAmount,type})=>{
    const {uid}= getUserInfo();
    const transactionsCollection = collection(db, 'transactions');
    const transaction = await addDoc(transactionsCollection, {
        useId:uid,
        description,
        transactionAmount,
        type,
        createdAt:serverTimestamp()
    });
    console.log('Transaction added with ID:', transaction.id);

    return {transaction}
    
}
