import React, { useState } from "react";
import { fakeSignUpRequest, Input } from "../signUp/SignUp";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Form: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    toast.loading("Loading...", { id: "signup" });

    try {
      await fakeSignUpRequest(email);
      toast.success("Registered successfully!", { id: "signup" });
      login();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Something went wrong", { id: "signup" });
      } else {
        toast.error("Something went wrong", { id: "signup" });
      }
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Fill all fields");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    return true;
  };
  return (
    <div className="bg-[#FFF] w-full py-10 px-3">
      <div className="m-auto text-[42px] text-[#1E0E62] w-full text-center leading-13 p-10 py-12 border-2 border-[#EBEAED] rounded-md">
        <h1 className="font-semibold">Join the Early Access List</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center mt-8 gap-4 m-auto max-w-[500px] w-full"
          noValidate
        >
          <Input
            type="email"
            placeholder="Your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <motion.button
            type="submit"
            className="bg-[#25DAC5] text-white text-[20px] px-5 py-0 max-w-[150px] block w-full whitespace-nowrap rounded-full hover:cursor-pointer disabled:opacity-50"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Please wait..." : "Sign In"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Form;
