import React from 'react'
import Image from 'next/image';

const Loadingpage =({isloading}) => {
  console.log("isloading:",isloading);
  return (
    <section className='text-center w-screen'>
      <div className='text-white font-semibold text-2xl'>Loading . . .</div>
  </section>
  )
}

export default Loadingpage;

