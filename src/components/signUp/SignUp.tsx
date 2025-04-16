import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="text-lg rounded-full border-2 border-gray-200 py-[8px] px-6 w-full placeholder:text-gray-400 focus:outline-none focus:border-blue-700"
    />
  );
};

const SignUp = () => {
  return (
    <div className="bg-white text-gray-400 rounded-[10px] py-10 px-10 sm:px-[15%] text-[18px] ">
      <h2 className="text-2xl font-bold mb-8 text-[#1E0E62] text-[42px] text-center">
        Sign Up Now
      </h2>
      <form className="space-y-8">
        <div className="space-y-5">
          <Input type="email" placeholder="Your email" />
          <Input type="password" placeholder="Your passsword" />
        </div>
        <label className="grid grid-cols-[2em_auto] items-center text-[16px]">
          <input type="checkbox" id="agree" name="agree" value="yes" />I agree
          to the Terms of Service
        </label>
        <button
          type="submit"
          className="bg-[#482BE7] text-white w-full px-6 py-[10px] rounded-full hover:cursor-pointer"
        >
          Sign In
        </button>
        {/* or line */}
        <div className="relative">
          <p className="text-gray-300 text-md bg-white p-1 px-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            or
          </p>
          <hr className="text-gray-300 border-t-2 border-gray-200" />
        </div>
        <button
          type="submit"
          className="bg-[#1DA1F2] text-white w-full px-6 py-[10px] rounded-full hover:cursor-pointer"
        >
          Login via Twitter
        </button>
        <p className="text-center text-gray-400 font-medium text-md">
          Do you have an Account?{" "}
          <a href="/sign" className="text-[#25dac5] ms-1 text-nowrap">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
