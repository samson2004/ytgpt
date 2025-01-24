import React from 'react'
import Image from 'next/image';

const Resultpage = ({summarydata,youtubeimageurl,response}) => {
    console.log("summary data:",summarydata);
    console.log("response",response);
  return (
    <section>
    <div className='bg-[#212121] w-screen h-screen items-center justify-center flex'>
      <div className=' w-1/3 p-10'>
        <Image src={youtubeimageurl} width={400} height={400} alt='YouTube image' />
        <h1 className='text-white mt-10 font-semibold text-2xl'>{summarydata.title}</h1>
      </div>
      <div>
        {summarydata.sections.map((section, index) => (
          <div key={index} className='mt-4'>
            {/* Subheading */}
            <h2 className='text-gray-300 font-semibold'>{section.subheading}</h2>
            {/* Points */}
            <ul className='text-gray-400 list-disc list-inside ml-4'>
              {section.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Resultpage;