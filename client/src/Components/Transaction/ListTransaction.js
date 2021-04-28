import { React, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';

export default function Transactions() {
 const [transactionData, setTransactionData ] = useState([])

 useEffect(async () => {
   const response = await axios.get("http://localhost:5000/api/transaction", {
     withCredentials: true,
   });
   setTransactionData(response.data);
 }, [])

  const columns = [
    {
      name: "name",
      label: "User Name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "transaction_type",
      label: "Transaction Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "transaction_date",
      label: "Transaction Date",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  return (
    <div>
      {transactionData.length > 0 ? (
        <MUIDataTable title={"Transactions"} data={transactionData} columns={columns} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}