import Image from 'next/image'
import React from 'react'

export default function ProductDiscover() {
    return (
        <div className='relative  max-w-[1920px] h-[1150px]'>
            <div className=' relative w-full max-h-[550px] overflow-hidden'>
                <Image src='/productDiscover1.jpg' width={1920} height={500} alt='product discover' className='w-full  ' />
                <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-row items-center pl-10'>
                    <div className=' flex flex-col'>
                        <h3 className='text-4xl text-dark_jungle_green font-semibold'>Product Discover</h3>
                        <h1 className='text-7xl text-dark_jungle_green font-semibold'>Diabivita</h1>
                        <h4 className='text-2xl text-dark_jungle_green font-normal'>YOUR WELLNES COMANION</h4>
                        <p className='text-xl mt-2 w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
            </div>
            <div className=' absolute  left-0 right-8 bottom-1 flex flex-row'>
                <div className='w-full h-[700px] flex flex-row items-end bg-transparent pl-10'>
                    <div className=' w-[600px] mt-auto '>
                        <h1 className='text-6xl text-dark_jungle_green font-semibold'>Your New Daily Ritual</h1>
                        <p className='text-lg mt-2 w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
                <div className='max-w-[780px] rounded-2xl  h-[700px] overflow-hidden bg-pink-200'>
                    <Image src='/productDiscover1.jpg' width={780} height={700} alt='product discover' className='h-full rounded-2xl  border-8 border-white ' />
                </div>
            </div>
        </div>
    )
}
