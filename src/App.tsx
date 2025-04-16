import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overview from "./components/overview/Overview";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-[#2F1893] px-4">
        <div className="max-w-[972px] m-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
