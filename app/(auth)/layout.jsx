import React from 'react'
import Image from 'next/image'
const layout = ({children}) => {
  return (
    <section className='flex'>
        <div className='min-h-screen w-[50%] '>
          <Image  src={'/asset/images/nicetree-pexel.jpg'} height={900} width={1080} alt='layout-image' className='h-full w-full overflow-hidden'/>
        </div>
        <div className='w-full bg-black'>
        {children}
        </div>
    </section>
  )
}

export default layout


