import Image from 'next/image'
import React from 'react'

export default function ProductDiscover() {
    return (
        <div className='relative aspect-auto  max-w-[1920px] h-[900px] lg:h-[1050px]'>
            <div className=' relative w-full max-h-[400px]  lg:max-h-[550px] overflow-hidden'>
                <Image src='/productDiscover1.jpg' width={1920} height={500} alt='product discover' className='w-full  ' />
                <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-row items-center pl-7 lg:pl-10'>
                    <div className=' flex flex-col text-wrap'>
                        <h3 className='  text-lg  lg:text-4xl text-dark_jungle_green font-semibold'>Product Discover</h3>
                        <h1 className='text-2xl  lg:text-7xl text-dark_jungle_green font-semibold'>Diabivita</h1>
                        <h4 className=' text-base  lg:text-2xl text-dark_jungle_green font-normal'>YOUR WELLNES COMANION</h4>
                        <p className='text-sm lg:text-xl mt-2 max-w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
            </div>
            <div className='hidden  absolute  left-0 right-8 bottom-1 lg:flex flex-row'>
                <div className='w-full h-[600px] flex flex-row items-end bg-transparent pl-10'>
                    <div className=' max-w-[600px] mt-auto text-wrap overflow-hidden '>
                        <h1 className='text-6xl text-wrap text-dark_jungle_green font-semibold'>Your New Daily Ritual</h1>
                        <p className='text-lg text-wrap mt-2 max-w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
                <div className='max-w-[780px] min-w-[480px] w-[480px] rounded-2xl  h-[600px] overflow-hidden bg-pink-200'>
                    <Image src='/productDiscover1.jpg' width={780} height={600} alt='product discover' className='h-full rounded-2xl  border-8 border-white ' />
                </div>
            </div>
        </div>
    )
}
