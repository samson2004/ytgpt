'use client';
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Loader2 } from "lucide-react"
import { handleError } from '@/lib/utils';
import {checkUserbyemail_password, createUser} from '@/lib/actions/user.actions'
import axios from 'axios';




const SignPage = () => {
  
  const [buttonvariant,setbuttonvariant]=useState(false)
  const [signupbuttonloader,setsignupbuttonloader]=useState(false); 
  const [signinbuttonloader,setsigninbuttonloader]=useState(false); 
  
  const [email,setemail]=useState(null);
  const [passwd,setpasswd]=useState(null);

    const handleSignin = async(e) => {
        e.preventDefault();
        console.log('Sign-In Details:', { email, passwd });
        
        setbuttonvariant(true);
        setsigninbuttonloader(true);

        try {
          
          const success=await checkUserbyemail_password({email:email,password:passwd});
          if(success.data!=null){
              const response=await axios.post('/api/cookiesetter',{userId:success.data._id});
              console.log("response from sign -in",response);
          }
          
          if(success.status==400) {
            setbuttonvariant(true);
            setsignupbuttonloader(false);
            window.location.href='/';
            return ;

          }else if(success.status==201){
            setbuttonvariant(false);
            setsigninbuttonloader(false);
            alert(success.message);
            
            
          }else if(success.status==202){
            setbuttonvariant(false);
            setsigninbuttonloader(false);
            alert(success.message);
          }
        } catch (error) {
          handleError(error,'Error in handleSingin === page.jsx/sign');
        }
      };

      const handleSignup = async(e) => {
        e.preventDefault();
        console.log('Sign-up Details:', { email, passwd });
        setbuttonvariant(true);
        setsignupbuttonloader(true);

        try {
          const checkuser=await checkUserbyemail_password({email:email});
         
          if(checkuser.status==400) {
            alert('User exists. click sign-in!');
            setbuttonvariant(true);
            setsignupbuttonloader(false);
            return ;
          }
          const success=await createUser({email:email,password:passwd});
          const response=await axios.post('/api/cookiesetter',{userId:success._id});
          console.log("response from sign -up",response);
          if(success){
            setbuttonvariant(true);
            setsignupbuttonloader(false);
            window.location.href='/'
          }
        } catch (error) {
          alert('please.Trying again later...');
          handleError(error,'Error in handleSingup === page.jsx/sign');
            setbuttonvariant(false);
            setsignupbuttonloader(false);
        }
      };


  return (
    <div className="min-h-screen flex items-center justify-center p-2">
    <div className="min-h-full w-[400px] bg-white p-10 pt-10 pb-10 rounded-3xl  ">
    <Image src={'/asset/images/abstract-pexel.jpg'} width={400} height={100} alt='just a random image' className='h-22 w-[400px] overflow-auto rounded-3xl'/>
      <div className="py-4 ">
        <h1 className="text-sm text-black pl-2 font-semibold">Email</h1>
        <Input id="email" type="email" placeholder="email" className='' onChange={(e)=>{
          setemail(e.target.value);
        }} />
      </div>
      <div className="pb-4">
        <h1 className="text-sm font-semibold pl-2 ">Password</h1>
        <Input id="password" type="password" placeholder="password" className='' onChange={(e)=>{
          setpasswd(e.target.value);
        }}/>
      </div>
     <div className='flex gap-20 items-center justify-center pt-8 '>
        <Button disabled={buttonvariant} onClick={handleSignup}>
        { signupbuttonloader && <Loader2 className="animate-spin" />}
        Sign Up</Button>
        <Button disabled={buttonvariant} onClick={handleSignin}>
        { signinbuttonloader && <Loader2 className="animate-spin" />}
        Sign In</Button>
     </div>
     {/* <div className={`border border-red-300 bg-red-100 rounded-md mt-2  ${errorstate?"":"hidden"}`}>
        <p className='text-red-500 p-2'>{errormessage} </p>
     </div> */}
    </div>
  </div>
  
  )
}

export default SignPage