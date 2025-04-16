import React from "react";
import SignUp from "../signUp/SignUp";

const Overview: React.FC = () => {
  return (
    <div className="flex text-white items-center justify-center py-20">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-18 items-center">
        {/* Left side */}
        <div className="flex flex-col justify-around gap-y-12">
          <h1 className="text-center text-6xl font-bold mb-4 leading-[70px] md:text-left">
            Generate Awesome Web Pages
          </h1>
          <h3 className="text-center text-[22px] pe-0 md:pe-18 md:text-left">
            The most important part of the Startup is the samples. The samples
            form a set of 25 usable pages you can use as is or you can add new
            blocks.
          </h3>
          <div className="text-center md:text-left">
            <button className="bg-[#E93A7D] text-white w-full md:w-auto px-6 py-[10px] rounded-full hover:cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Right side - Sign up form */}
        <SignUp />
      </div>
    </div>
  );
};

export default Overview;
