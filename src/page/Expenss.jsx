import React, { useEffect, useState } from "react";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { addTranstion } from "../hooks/AddTransitction";
import { getUserInfo } from "../hooks/UserInfo";

function Expenss() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const { uid ,name ,picture} = getUserInfo();

  const handleSubmit = () => {
    addTranstion({
      description: description,
      transactionAmount: Number(amount),
      type: type,
    });

    setDescription("");
    setAmount("");
    setType("expense");
  };

  useEffect(() => {
    let unsubscribe;
    const fetchTransactions = async () => {
      try {
        const transactionsCollection = collection(db, "transactions");

        const transactionsSnapshot = query(
          transactionsCollection,
          where("useId", "==", uid),
          orderBy("createdAt")
        );

        unsubscribe= onSnapshot(transactionsSnapshot, (snapshot) => {
          let docs=[]
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            docs.push({
              id,
              ...data,
            });
          });

          setTransactions(docs);
        });
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
    
  }, [transactions]);

  return (
    <div className="w-full h-full ">
      <nav className="w-full flex items-center border p-2">
        <img
          src={picture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="font-bold text-2xl">{name}</span>
      </nav>
      <div className="w-full p-2 flex flex-col">
      <h1 className="text-xl font-bold mb-4 mt-2">Expense Tracker</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
          Add Transaction
        </button>
      </div>

      <h1 className="w-full h-[80px] text-center font-bold text-2xl">
        Transiction{" "}
      </h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border p-2">{transaction.description}</td>
              <td className="border p-2">
                {transaction.type === "expense" ? "-" : "+"}$
                {transaction.transactionAmount}
              </td>
              <td className="border p-2">{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="w-full p-2 flex flex-col">
        <h1 className="w-full h-[80px] text-center font-bold text-2xl">
          Total
        </h1>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-bold">Income:</span>
            <span className="font-bold">
              $
              {transactions
                .filter((transaction) => transaction.type === "income")
                .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Expenses:</span>
            <span className="font-bold">
              $
              {transactions
                .filter((transaction) => transaction.type === "expense")
                .reduce((acc, transaction) => acc + transaction.transactionAmount, 0)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              $
              {transactions.reduce(
                (acc, transaction) =>
                  acc +
                  (transaction.type === "income"
                    ? transaction.transactionAmount
                    : -transaction.transactionAmount),
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenss;
