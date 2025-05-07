import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { HTMLMotionProps, motion } from "motion/react";

type InputProps = Omit<HTMLMotionProps<"input">, "ref">;

const Input: React.FC<InputProps> = (props) => {
  return (
    <motion.input
      {...props}
      className="text-lg rounded-full border-2 border-gray-200 py-[8px] px-6 w-full placeholder:text-gray-400 focus:outline-none focus:border-blue-700 disabled:opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileFocus={{
        scale: 1.02,
        boxShadow: "0 0 0 4px rgba(72, 43, 231, 0.1)",
      }}
      whileHover={{
        scale: 1.01,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};
// FAKE request to sign up
const fakeSignUpRequest = async (email: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes("blocked.com")) {
        reject(new Error("This email domain is blocked."));
      } else if (email === "error@demo.com") {
        reject(new Error("Server error, try again later."));
      } else {
        resolve("Signed up successfully");
      }
    }, 3000);
  });
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Fill all fields");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!agreed) {
      toast.error("You must agree with terms and conditions.");
      return false;
    }
    return true;
  };

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
  return (
    <motion.div
      className="bg-white text-gray-400 rounded-[10px] py-10 px-10 sm:px-[15%] text-[18px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-[#1E0E62] text-[42px] text-center">
        Sign Up Now
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="space-y-5"
        >
          <Input
            type="email"
            placeholder="Your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="Your passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </motion.div>
        <label className="grid grid-cols-[2em_auto] items-center text-[16px]">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            className="disabled:opacity-50"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
          />
          I agree to the Terms of Service
        </label>
        <motion.button
          type="submit"
          className="bg-[#482BE7] text-white w-full px-6 py-[10px] rounded-full hover:cursor-pointer disabled:opacity-50"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Please wait..." : "Sign In"}
        </motion.button>
        {/* or line */}
        <div className="relative">
          <p className="text-gray-300 text-md bg-white p-1 px-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            or
          </p>
          <hr className="text-gray-300 border-t-2 border-gray-200" />
        </div>
        <motion.button
          type="submit"
          className="bg-[#1DA1F2] text-white w-full px-6 py-[10px] rounded-full hover:cursor-pointer disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login via Twitter
        </motion.button>
        <p className="text-center text-gray-400 font-medium text-md">
          Do you have an Account?{" "}
          <a href="/sign" className="text-[#25dac5] ms-1 text-nowrap">
            Sign In
          </a>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUp;
export { Input };
export { fakeSignUpRequest };
