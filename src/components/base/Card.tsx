import React from 'react'

interface CardProps {
    lable:string,
    value: number,
    color: string
}
const Card:React.FC<CardProps> = ({lable,value,color}) => {
  return (
    <>
    <section className="w-3xs h-fit border rounded-2xl px-10 py-5">
        <h2 className="heading text-2xl text-center ">
            {lable}
        </h2>
        <p className={`text-2xl text-[${color}] text-center`}>
            {value}
        </p>
    </section>
    </>
  )
}

export default Card