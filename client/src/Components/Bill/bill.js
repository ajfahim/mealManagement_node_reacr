import { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";

export default function MonthlyBill() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const tableResponse = await axios.get("http://localhost:5000/api/bill", {
        withCredentials: true,
      });
      setTableData(tableResponse.data);
    };
    getData();
  }, []);
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
      name: "totalmeal",
      label: "Meal",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_amount",
      label: "Deposit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "balance",
      label: "Banance",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  return (
    <div>
      {tableData.length > 0 ? (
        <MUIDataTable title={""} data={tableData} columns={columns} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
