import { useEffect } from "react";
import { useState } from "react";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const bal = response.data.balance.toFixed(2);
        setBalance(bal);
      });
  });

  return (
    <div className="pl-3 pr-4">
      <Appbar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

const Balance = ({ value }) => {
  return (
    <div className="flex pt-3 ">
      <div className="font-bold text-lg">Your Balance :</div>
      <div className="font-semibold ml-4 text-lg">₹ {value}</div>
    </div>
  );
};

const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between pl-2">
      <div className="flex text-2xl flex-col justify-center h-full ml-4">
        ₹Upay
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
};
