import React from 'react'

interface CardProps {
    label:string,
    value: number | string,
    color: string
}
const Card:React.FC<CardProps> = ({label,value,color}) => {
  return (
    <>
    <section className="w-auto h-fit min-h-20 min-w-65 sm:min-h-30 border-[0.5px] [border-image:linear-gradient(88.85deg,rgba(4,150,255,0.05)_0%,#0496FF_50%,rgba(4,150,255,0.015)_100%)_1] border-[#00000005] backdrop-blur-[10px] shadow-[inset_0_2px_4px_0_#00000066,inset_0_-2px_4px_0_#00000066] rounded-2xl px-10 py-5">
        <h2 className="heading text-[32px] text-center text-nowrap ">
            {label}
        </h2>
        <p className={`heading text-[40px] text-center`} style={{color:color}}>
            {value}
        </p>
    </section>
    </>
  )
}

export default Card