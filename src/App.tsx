import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-[#2F1893]">
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
