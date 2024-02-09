import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className=" bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />

          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
            placeholder={"Enter your First Name"}
          />

          {/* <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last name"}
            placeholder={"Enter your Last Name"}
          /> */}

          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
            placeholder={"Enter your Username"}
          />

          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Enter your Password"}
          />

          <div className="pt-4">
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:3000/api/v1/user/signup", {
                    firstname: firstName,
                    username: username,
                    password: password,
                  })
                  .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  });
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
