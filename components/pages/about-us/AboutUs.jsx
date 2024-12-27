import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='w-full bg-[#f4ede3] mt-10'>
      <section className='py-16 flex flex-col gap-3 w-[90%] mx-auto'>
        {/* <image width={800} height={880} src="/aboutUsBG.jpeg" alt="" className='' /> */}
          <Image src={"/aboutUsBG.jpeg"} alt="Banner" width={1080} height={1000} className='w-[1380px] h-[500px]' />
        <h4 className='text-xl font-semibold'>Empowering Wellness Through Natural, Science-Driven Nutrition</h4>
        <p className='text-xl text-[#777]'>
          <p>At EcoWell, we are dedicated to transforming health through innovative, sustainable nutritional supplements.</p>

          Our mission goes beyond simply creating supplements. We are committed to providing holistic wellness solutions that address the complex nutritional needs of modern life. By combining cutting-edge nutritional science with sustainable, natural ingredients, we create supplements that support your body's optimal functioning. We understand that true wellness is a journey, not a destination. That's why our approach is comprehensive – focusing not just on individual supplements, but on supporting your overall health, energy, and vitality. Each product is carefully formulated to meet the highest standards of quality, efficacy, and environmental responsibility.</p>
      </section>
    </div>
  )
}
