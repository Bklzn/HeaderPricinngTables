import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Overview from "./components/overview/Overview";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import PricingTable from "./components/pricingTable/PricingTable";
import { AnimatePresence, motion } from "motion/react";
import PageWrapper from "./motion/PageWrapper";
import Form from "./components/form/Form";

function App() {
  const { authStatus } = useAuth();
  const location = useLocation();

  const bgColor = authStatus !== "logged_in" ? "#2F1893" : "#fff";
  return (
    <>
      <Toaster />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={authStatus}
          initial={{ opacity: 0, backgroundColor: bgColor }}
          animate={{ opacity: 1, backgroundColor: bgColor }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-screen px-4"
        >
          <div
            className={`${
              authStatus !== "logged_in" ? "max-w-[972px]" : "max-w-[1130px]"
            } m-auto`}
          >
            {authStatus !== "logged_in" && <Navbar />}

            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                {authStatus !== "logged_in" ? (
                  <>
                    <Route
                      path="/"
                      element={
                        <PageWrapper>
                          <Overview />
                        </PageWrapper>
                      }
                    />
                    <Route path="/form" element={<Form />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="/"
                      element={
                        <PageWrapper>
                          <PricingTable />
                        </PageWrapper>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                )}
              </Routes>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
