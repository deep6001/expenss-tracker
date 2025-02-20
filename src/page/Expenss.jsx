import React, { useEffect, useState } from "react";
import {
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { addTranstion } from "../hooks/AddTransitction";
import { getUserInfo } from "../hooks/UserInfo";
import { DollarSign, PlusCircle, MinusCircle, Trash2 } from "lucide-react";

function Expenss() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const { uid, name, picture } = getUserInfo();

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
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

        unsubscribe = onSnapshot(transactionsSnapshot, (snapshot) => {
          let docs = [];
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

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.transactionAmount, 0);

  const total = transactions.reduce(
    (acc, transaction) =>
      acc +
      (transaction.type === "income"
        ? transaction.transactionAmount
        : -transaction.transactionAmount),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={picture}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <span className="ml-3 font-semibold text-gray-900">{name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <PlusCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Total Income</p>
                <p className="text-2xl font-bold text-green-900">${totalIncome}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <MinusCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-red-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">${totalExpenses}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Net Balance</p>
                <p className="text-2xl font-bold text-blue-900">${total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Transaction
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Transaction
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 p-6 border-b">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {transaction.transactionAmount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Expenss;
