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
<<<<<<< HEAD
const inputStyle = 'w-full h-10  text text-xs rounded-lg bg-[#ECEBEA] border-[#A1A1A1] outline-none'
export const Input:React.FC<inputProps> = ({label,name,value,type,placeholder,className,Icon,onChange}) =>{
    return(
        <>
        <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor={name} className="text text-sm">
=======
const inputStyle = 'w-full h-12 text text-base rounded-lg border border-[#D0D5DD] outline-none'
export const Input:React.FC<inputProps> = ({label,name,value,type,placeholder,className,Icon,onChange}) =>{
    return(
        <>
        <div className="w-full h-fit">
            <label htmlFor={name} className="text text-base text-[#344054] block mb-3 ">
>>>>>>> f91a933af171a7108dd7245724911bfa4fd8f379
                {label}
            </label>
            <div className="relative w-full ">
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