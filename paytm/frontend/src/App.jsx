import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// import { Dashboard } from "./pages/Dashboard";

import { SendMoney } from "./pages/SendMoney";
import { Signin } from "./pages/signin";

import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./components/Users";

function App() {
  return (
    <div>
      {/* <div>Hello</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// import React from "react";

// const App = () => {
//   return <div className="font-sans text-lg text-sky-400/75 ">Hello</div>;
// };

export default App;
