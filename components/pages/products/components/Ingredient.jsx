import { staggerContainer } from '@/lib/utils';
import { motion } from "framer-motion";
import Image from 'next/image';
import React from 'react';

export default function Ingredient() {
    return (
        <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className='w-full py-10'>
            <div className='w-full relative pr-4'>
                <div className='h-[60px] md:h-[100px]  w-full border-1 '></div>
                <div className='h-[60px] md:h-[100px] w-full border border-dashed border-black border-l-0'></div>
                <div className='flex flex-row w-[95%] items-center justify-between absolute bottom-[80px] left-0 ml-5 '>
                    <div className='w-fit  bg-white  '>
                        <div className='flex flex-col w-full h-full text-dark_jungle_green  '>
                            <h1 className='text-3xl  md:text-6xl font-medium'>Why it Works:</h1>
                            <h1 className='text-xl  md:text-5xl font-medium'>The <span className='italic' >Secret</span> inside </h1>
                        </div>
                    </div>
                    <div className='w-[40%] md:w-[50%] mb-2 text-dark_jungle_green'>
                        <p className=' text-base   md:text-2xl  '>What makes [Product Name] stand out? </p>
                        <p className='text-base md:text-2xl '>Let’s unveil the magic:</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-[240px] md:h-[340px] grid grid-cols-3'>

                {/* Ingredient 1 */}
                <div className='w-full h-full relative flex flex-col'>
                    <div className='self-center w-[1px]  h-[40px] border border-dashed border-black '>

                    </div>
                    <div className='  h-[150px]  md:h-[250px] w-full mt-auto ' >
                        <Image src='/ingredient1.jpg' width={250} height={250} alt='product discover' className='w-full h-full object-cover' />
                    </div>
                    <div className='absolute top-[40px] self-center w-[80%] h-[100px] border bg-[#F9F6F0] leading-3 p-2 text-dark_jungle_green overflow-hidden '>
                        <h1 className='text-sm md:text-xl font-semibold mt-1'>[Ingredient 1]: </h1>
                        <p className='text-xs md:text-base '>
                            Nature’s powerhouse, giving your body the tools it needs to recover and grow stronger.</p>
                    </div>

                </div>

                {/* Ingredient 2 */}
                <div className='w-full h-full relative flex flex-col'>
                    <div className='self-center w-[1px]  h-[40px] border border-dashed border-black '>

                    </div>
                    <div className=' h-[150px]  md:h-[250px] w-full mt-auto ' >
                        <Image src='/ingredient2.jpg' width={250} height={250} alt='product discover' className='w-full h-full object-cover' />
                    </div>
                    <div className='absolute top-[40px] self-center w-[80%] h-[100px] border bg-[#F9F6F0] leading-3 p-2 text-dark_jungle_green overflow-hidden '>
                        <h1 className='text-sm md:text-xl font-semibold mt-1'>[Ingredient 2]: </h1>
                        <p className='text-xs md:text-base '>
                            A centuries-old remedy reimagined for modern wellness.</p>
                    </div>

                </div>


                {/* Ingredient 3 */}
                <div className='w-full h-full relative flex flex-col'>
                    <div className='self-center w-[1px]  h-[40px] border border-dashed border-black '>

                    </div>
                    <div className='  h-[150px]  md:h-[250px] w-full mt-auto ' >
                        <Image src='/ingredient3.jpg' width={250} height={250} alt='product discover' className='w-full h-full object-cover' />
                    </div>
                    <div className='absolute top-[40px] self-center w-[80%] h-[100px] border bg-[#F9F6F0] leading-3 p-2 text-dark_jungle_green overflow-hidden '>
                        <h1 className='text-sm md:text-xl font-semibold mt-1'>[Ingredient 3]: </h1>
                        <p className='text-xs md:text-base '>
                            Science-backed, delivering antioxidants and vital nutrients for total rejuvenation.</p>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}
