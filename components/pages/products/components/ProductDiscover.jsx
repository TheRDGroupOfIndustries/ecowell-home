import Image from 'next/image'
import React from 'react'

export default function ProductDiscover() {
    return (
        <div className='relative aspect-auto  max-w-[1920px] h-[550px] sm:h-[750px] md:h-[800px] lg:h-[1050px]'>
            <div className=' relative w-full max-h-[400px]  lg:max-h-[550px] overflow-hidden'>
                <Image src='/productDiscover1.jpg' width={1920} height={500} alt='product discover' className='w-full  ' />
                <div className='absolute top-0 bottom-0 left-0 right-0 w-full h-full flex flex-row items-center pl-7 lg:pl-10'>
                    <div className=' flex flex-col text-wrap'>
                        <h3 className='  text-lg sm:text-xl md:text-2xl  lg:text-4xl text-dark_jungle_green font-semibold'>Product Discover</h3>
                        <h1 className='text-2xl sm:text-4xl md:text-5xl  lg:text-7xl text-dark_jungle_green font-semibold'>Diabivita</h1>
                        <h4 className=' text-base sm:text-lg md:text-xl  lg:text-2xl text-dark_jungle_green font-normal'>YOUR WELLNES COMANION</h4>
                        <p className='text-sm sm:text-base md:text-lg lg:text-xl mt-2 max-w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
            </div>
            <div className='  absolute  left-0 right-4 md:right-8 bottom-1 flex flex-row'>
                <div className='w-full h-[330px] sm:h-[400px] md:h-[500px]  lg:h-[600px] flex flex-row items-end bg-transparent pl-3 sm:pl-5 ms:pl-8 lg:pl-10'>
                    <div className=' max-w-[600px] mt-auto text-wrap overflow-hidden '>
                        <h1 className=' text-2xl sm:text-4xl md:text-5xl  lg:text-7xl text-wrap text-dark_jungle_green font-semibold'>Your New Daily Ritual</h1>
                        <p className=' line-clamp-5 md:line-clamp-none text-sm sm:text-base md:text-lg text-wrap mt-2 max-w-[500px] text-charcoal_black font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil deserunt id quod ducimus consequatur rem sunt cum, dolorum fugiat sit quasi fuga quo doloribus laboriosam dolores unde, adipisci ullam vero?</p>
                    </div>
                </div>
                <div className='  w-[490px] md:w-[590px] lg:w-[680px] rounded-2xl h-[330px] sm:h-[400px] md:h-[500px]  lg:h-[600px] overflow-hidden bg-pink-200 relative'>
                    <Image src='/productDiscover1.jpg' fill alt='product discover' className='h-full rounded-2xl  border-8 border-white ' />
                </div>
            </div>
        </div>
    )
}
