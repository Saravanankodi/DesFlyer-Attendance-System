import React from "react";
import { cn } from "../../lib/utils";

interface inputProps {
    label?: string;
    name?:string;
    value?:string;
    type?:string;
    placeholder?:string;
    Icon?:React.ReactNode;
    className?:string;
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
}
const inputStyle = 'w-full h-15  text text-lg rounded-lg bg-[#ECEBEA] border-[#A1A1A1] outline-none'
export const Input:React.FC<inputProps> = ({label,name,value,type,placeholder,className,Icon,onChange}) =>{
    return(
        <>
        <div className="w-full h-fit">
            <label htmlFor={name} className="text text-xl">
                {label}
            </label>
            <div className="relative w-full">
                {Icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {Icon}
                </span>
                )}

                <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(inputStyle,Icon ? "pl-12" : "pl-2",className)}
                />
            </div>
        </div>
        </>
    )
}