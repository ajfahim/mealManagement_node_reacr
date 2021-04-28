import { React, useEffect, useState } from "react";

import MUIDataTable from "mui-datatables";
const axios = require("axios");

// const columns = [
//   { field: "id", headerName: "SL", width: 70 },
//   { field: "bazarCarrierName", headerName: "Bazar carrier name", width: 200 },
//   { field: "date", headerName: "Date", width: 130 },
//   {
//     field: "amount",
//     headerName: "Amount",
//     type: "number",
//     width: 130,
//   },
//   {
//     field: "description",
//     headerName: "Description",

//     width: 200,
//   },
// ];

export default function BazarList() {
  const [bazarData, setBazarData] = useState([]);
  useEffect(async () => {
    const response = await axios.get("http://localhost:5000/api/bazar", {
      withCredentials: true,
    });
    setBazarData(response.data);
    console.log(response.data);
  }, []);

  const columns = [
    {
      name: "name",
      label: "Bazar Carrier Name",
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
      name: "bazar_date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "created_on",
      label: "Created At",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  const data = bazarData;
  //   const data = [
  //     { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  //     { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  //     { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  //     {
  //       name: "James Houston",
  //       company: "Test Corp",
  //       city: "Dallas",
  //       state: "TX",
  //     },
  //   ];

  // Name Amount Date Description Created ON

  return (
    <div>
      {data.length > 0 ? (
        <MUIDataTable title={"Bazar List"} data={data} columns={columns} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
