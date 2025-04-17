import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Overview from "./components/overview/Overview";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import PricingTable from "./components/pricingTable/PricingTable";

function App() {
  const { authStatus } = useAuth();
  return authStatus !== "logged_in" ? (
    <div className="w-full min-h-screen bg-[#2F1893] px-4">
      <Toaster />
      <div className="max-w-[972px] m-auto">
        <Navbar />

        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-white px-4">
      <div className="max-w-[1130px] m-auto">
        <Routes>
          <Route path="/" element={<PricingTable />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
