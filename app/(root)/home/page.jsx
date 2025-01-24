'use client';
import { permanentRedirect } from 'next/navigation';
import { getUserbyId } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Youtube,Search,Copy,ClipboardPaste } from "lucide-react";
import { Input } from '@/components/ui/input';
import Loadingpage from '@/components/shared/loading';
import {createVideocontententry} from '@/lib/actions/videocontent.actions';
const homePage = () => {
    const [cookieValue, setCookieValue] = useState(null);
    const [userdata, setUserdata] = useState(null); // Start with null to differentiate from empty objects
    const [contentcreated,setcontentcreated]=useState(false);
    const [isloading,setisloading]=useState(false);
    const [summarydata,setsummarydata]=useState();
    const [input,setinput]=useState("");
    const [youtubeimageurl,setyoutubeimageurl]=useState("");


    const extractYouTubeId=(url)=> {
      const regex = url.split("=");
      return regex[1];
    }
    
    
    const search = async () => {
      if (!input || input === "") {
          console.log("data:", input, "enter data");
          return;
      }
      setisloading(true);
      const youtubeid = extractYouTubeId(input);
      const youtubeurl = `https://img.youtube.com/vi/${youtubeid}/0.jpg`;
      console.log("youtubeimage-url:", youtubeurl);
      setyoutubeimageurl(youtubeurl); 
      try {
        console.log('input:',input)
          const response = await fetch("/api/gemini", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                 youtubeUrl: input,  // Use the 'input' variable directly here.
              }),
          });
           if (!response.ok) {
              const errorData = await response.json();
              console.error("Error from /api/gemini:", errorData);
              // Handle the error more explicitly (show error message to the user, etc.)
              return;
          }
        console.log(response);
        const summaryData = await response.json();
        console.log("summary", summaryData);
        const videoentry=await createVideocontententry(
          {
            data:summaryData,
            youtubeimageurl:youtubeurl
          }
        );
        setsummarydata({
             title: summaryData.title,
            sections: summaryData.sections,
            contentready:true
        });
        setcontentcreated(true);
        console.log("videoentry:",videoentry);
        
      } catch (error) {
          console.error("Error fetching from /api/gemini:", error);
      }
  };

  useEffect(()=>{
    if(contentcreated==true){
      setisloading(false);
      permanentRedirect('/result');
    }
  },[contentcreated==true])
        
    useEffect(() => {
            const fetchdata = async () => {
              try {
                // Access cookies on the client side
                const cookies = document.cookie
                  .split('; ')
                  .find((row) => row.startsWith('sessionId-forAuth='));
                if (cookies) {
                  const value = cookies.split('=')[1];
                  setCookieValue(value);
        
                  // Fetch user data
                  const user_data = await getUserbyId(value);          
                  if (user_data && Object.keys(user_data).length > 0) {
                    setUserdata(user_data); // Update state
                  } else {
                    permanentRedirect('/sign'); // Redirect if no valid data
                  }
                } else {
                  permanentRedirect('/sign'); // Redirect if no cookie
                }
              } catch (error) {
                permanentRedirect('/sign'); // Redirect on error
              }
            };
        
            fetchdata();
          }, []);


  return (
    <div>
        <section className={`bg-[#212121] w-screen h-screen items-center justify-center ${isloading ?'hidden':'flex '}`}>
        <div className='text-center'>
          <h1 className={`text-4xl text-gray-50 mb-10 font-semibold`}>VidBrief : Your Video Summary Tool</h1>
          {/* input bar */}
          <div className='bg-[#2F2F2F] rounded-2xl py-2 px-4'>
              <Input
                className='w-full border-none text-gray-300 shadow-none focus:outline-none'
                placeholder='Paste your Youtube link....'
                onChange={(e)=>{
                  setinput(e.target.value);
                }}
              />
              <div className='flex items-center justify-between mt-5'>
                <div className='flex space-x-2'>
                  <Button className='rounded-full p-3'><Youtube /></Button>
                  <Button className='rounded-full p-3'><Copy /></Button>
                  <Button className='rounded-full p-3'><ClipboardPaste /></Button>
                </div>
                <div>
                  <Button className='rounded-full p-3' onClick={search}><Search /></Button>
                </div>
              </div>
            </div>
        </div>
      </section>
      {contentcreated === false && isloading==true && (
        <Loadingpage isloading={isloading} />
)}
    </div>

  )
}

export default homePage