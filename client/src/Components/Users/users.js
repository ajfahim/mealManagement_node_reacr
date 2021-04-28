import { React, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

export default function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:5000/api/user", {
      withCredentials: true,
    });
    setUserData(response.data);
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
      name: "phone",
      label: "Phone Number",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email Address",
      options: {
        filter: false,
        sort: false,
      },
    },
    ,
  ];

  return (
    <div>
      {userData.length > 0 ? (
        <MUIDataTable title={"Users"} data={userData} columns={columns} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
