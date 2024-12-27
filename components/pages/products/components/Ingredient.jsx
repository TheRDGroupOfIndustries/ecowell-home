import Image from 'next/image'
import React from 'react'

export default function Ingredient() {
    return (
        <div className='w-full py-10'>
            <div className='w-full relative pr-4'>
                <div className='h-[100px]  w-full border-1 '></div>
                <div className='h-[100px] w-full border border-dashed border-black border-l-0'></div>
                <div className='flex flex-row w-full items-center justify-between absolute bottom-[80px] left-0 ml-5 '>
                    <div className='w-fit  bg-white  '>
                        <div className='flex flex-col w-full h-full text-dark_jungle_green  '>
                            <h1 className='text-6xl font-medium'>Why it Works:</h1>
                            <h1 className='text-5xl font-medium'>The <span className='italic' >Secret</span> inside </h1>
                        </div>
                    </div>
                    <div className='w-[50%] mb-2 text-dark_jungle_green'>
                        <p className='text-2xl  '>What makes [Product Name] stand out? </p>
                        <p className='text-2xl '>Let’s unveil the magic:</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-[340px] grid grid-cols-3'>
                <div className='w-full h-full relative flex flex-col'>
                    <div className='self-center w-[1px]  h-[40px] border border-dashed border-black '>

                    </div>
                    <div className='  h-[250px] w-full mt-auto ' >
                        <Image src='/ingredient1.jpg' width={250} height={250} alt='product discover' className='w-full h-full object-cover' />
                    </div>
                    <div className='absolute top-[40px] self-center w-[80%] h-[100px] border bg-[#F9F6F0] leading-3 p-2 text-dark_jungle_green overflow-hidden '>
                        <h1 className='text-xl font-semibold mt-1'>[Ingredient 1]: </h1>
                        <p className='text-base '>
                            Nature’s powerhouse, giving your body the tools it needs to recover and grow stronger.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
