import React from "react";

interface BannerProps {
  employeeName: string;
  role: string | undefined;
}

const Banner: React.FC<BannerProps> = ({ employeeName, role }) => {
  // Safe fallback if role is missing or undefined
  const formattedRole = role 
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Employee";

  return (
    <section className="w-full max-w-4xl h-fit max-h-28 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm mx-auto mt-6">
      <h2 className="text-[32px] max-sm:text-[20px] heading font-bold text-center ">
        Welcome {" "}
        <span className="text-[#0496ff]">
          {employeeName || "User"}
        </span>
      </h2>
      <p className="text-xl sub-text max-sm:text-sm font-medium text-center  mt-2">
        --{formattedRole}
      </p>
    </section>
  );
};

export default Banner;