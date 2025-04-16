import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Overview from "./components/overview/Overview";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authStatus } = useAuth();
  return (
    <div className="w-full min-h-screen bg-[#2F1893] px-4">
      <Toaster />
      <div className="max-w-[972px] m-auto">
        <Navbar />
        {authStatus !== "logged_in" ? (
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={null} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
