import React from 'react'

interface CardProps {
    label:string,
    value: number | string,
    color: string
}
const Card:React.FC<CardProps> = ({label,value,color}) => {
  return (
    <>
    <section className="w-3xs h-fit border rounded-2xl px-10 py-5">
        <h2 className="heading text-2xl text-center ">
            {label}
        </h2>
        <p className={`text-2xl text-[${color}] text-center`}>
            {value}
        </p>
    </section>
    </>
  )
}

export default Card