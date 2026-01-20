import React from 'react'

interface CardProps {
    label:string,
    value: number | string,
    color: string
}
const Card:React.FC<CardProps> = ({label,value,color}) => {
  return (
    <>
    <section className="w-auto h-fit min-h-20 min-w-65 sm:min-h-30  shadow-[0px_4px_4px_0px] shadow-[#0496FF80] border rounded-2xl px-10 py-5">
        <h2 className="heading text-[32px] text-center text-nowrap ">
            {label}
        </h2>
        <p className={`sub-text text-[32px] text-[${color}] text-center`}>
            {value}
        </p>
    </section>
    </>
  )
}

export default Card