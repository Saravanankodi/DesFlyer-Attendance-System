import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label?: string;
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  Icon?: React.ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputStyle =
  "w-full h-12 text text-base rounded-lg border border-[#D0D5DD] outline-none";

export const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  className,
  Icon,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full h-fit">
      <label
        htmlFor={name}
        className="text text-base text-[#344054] block mb-3"
      >
        {label}
      </label>

      <div className="relative w-full">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {Icon}
          </span>
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            inputStyle,
            Icon ? "pl-12" : "pl-2",
            type === "password" && "pr-12",
            className
          )}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};