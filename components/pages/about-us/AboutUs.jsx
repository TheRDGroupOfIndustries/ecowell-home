import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='w-full bg-[#f4ede3] mt-10'>
      <section className='py-16 flex flex-col gap-3 w-[85%] mx-auto'>
        {/* <image width={800} height={880} src="/aboutUsBG.jpeg" alt="" className='' /> */}
        <Image src={"/aboutUsBG.jpeg"} alt="Banner" width={1080} height={1000} className='w-[1380px] h-[500px]' />
        <h4 className='text-xl font-semibold'>Empowering Wellness Through Natural, Science-Driven Nutrition</h4>
        <p className='text-xl text-[#777]'>
          <p>At EcoWell, we are dedicated to transforming health through innovative, sustainable nutritional supplements.</p>

          Our mission goes beyond simply creating supplements. We are committed to providing holistic wellness solutions that address the complex nutritional needs of modern life. By combining cutting-edge nutritional science with sustainable, natural ingredients, we create supplements that support your body's optimal functioning. We understand that true wellness is a journey, not a destination. That's why our approach is comprehensive – focusing not just on individual supplements, but on supporting your overall health, energy, and vitality. Each product is carefully formulated to meet the highest standards of quality, efficacy, and environmental responsibility.</p>
      </section>
      <section className='py-16 flex flex-col bg-[#f7f7f7] gap-3 w-[100%] mx-auto'>
        <div className='w-[85%] mx-auto h-[200px] grid grid-cols-1 md:grid-cols-2'>

          {/* Founder */}
          <div className='md:border-r-2 flex flex-row items-center gap-6 '>
            <div className='w-fit flex flex-col items-center justify-center'>
              <div className='w-[128px] h-[128px] mb-2 rounded-full border outline-1 flex items-center justify-center'>
                <Image src="/Founder.jpg" alt="Banner" width={120} height={120} className='w-[120px] h-[120px] border rounded-full' />
              </div>
              <p className='text-[#d4a017] font-semibold'>Dr. Emily Chen</p>
              <p className='text-[#777]'>Founder</p>
            </div>
            <p className='text-[#777] w-[65%]'>
              With over 15 years of experience in nutrition and holistic wellness, I founded EcoWell to provide scientifically-backed, natural supplements that support optimal health and well-being.
            </p>
          </div>

          <div className=' flex flex-row items-center gap-6 px-8'>
            <div className='w-fit flex flex-col  items-center justify-center'>
              <div className='w-[128px] h-[128px] mb-2 rounded-full border outline-1 flex items-center justify-center'>
                <Image src="/Director.jpg" alt="Banner" width={120} height={120} className='w-[120px] h-[120px] border rounded-full' />
              </div>
              <p className='text-[#d4a017] font-semibold'>Michael Rodriguez</p>
              <p className='text-[#777]'>Research Director</p>
            </div>
            <p className='text-[#777] w-[65%]'>
              Our rigorous research process ensures that every EcoWell supplement is developed using the highest quality, sustainably sourced ingredients and cutting-edge nutritional science.
            </p>
          </div>


        </div>
      </section>
      <section className='py-16 flex flex-col gap-3 w-[85%] mx-auto'>
        <div className='flex flex-row mb-4'>
          <h1 className='text-3xl font-semibold'>OUR TEAM</h1>
        </div>
        <div className='w-full flex flex-row items-center justify-start overflow-x-auto gap-1'>
          <OurTeamCard src="" name="Michael Rodriguez" title="Head of Research & Development"/>
          <OurTeamCard src="" name="Sarah Thompson" title="Wallness Strategy Director" />
          <OurTeamCard src="" name="David Kim" title="Quality Assurance lead" />
          <OurTeamCard src="" name="Lisa Chen" title="Nutrition Science Specialist" />
        </div>
      </section>
    </div>
  )
}

function OurTeamCard({src, name, title}){
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-[240px] '>
      <div className='h-[350px] w-full mb-2   bg-slate-400'>
        <Image height={350} width={240} src={src} alt={name} />
      </div>
      <p className='text-[#d4a017] font-semibold'>{name}</p>
      <p className='text-[#777] line-clamp-1'>{title}</p>

    </div>
  )
}
