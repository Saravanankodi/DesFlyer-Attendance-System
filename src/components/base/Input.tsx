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
const inputStyle = 'w-full h-10 text text-lg rounded-lg border outline-none pl-2 bg-[#F3F3F5]'
export const Input:React.FC<inputProps> = ({label,name,value,type,placeholder,className,onChange}) =>{
    return(
        <>
        <div className="w-full h-fit">
            <label htmlFor={name} className="text">
                {label}
            </label>
            <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={cn(className,inputStyle)} />
        </div>
        </>
    )
}