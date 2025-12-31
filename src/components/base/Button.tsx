import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const buttonVarient = cva("inline-flex items-center justify-center gap-2.5 my-2 heading ",
    {
        variants:{
            variant:{
                primary:"px-4 py-2 text text-lg bg-[#0496ff] text-white ",
                secoundary:"border-2 rounded-lg px-4 py-2  "
            }
        },
    }
);
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVarient>{}
export const Button:React.FC<ButtonProps> =({
    className,variant,...props
})=>{
    return(
        <button className={cn(buttonVarient({variant,className}))} {...props}/>
    )
}
export default Button