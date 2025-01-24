'use client';
import { getUserbyId } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Youtube,Search,Copy,ClipboardPaste } from "lucide-react";
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Resultpage from '@/components/shared/resultpage';
const homePage = () => {
    const [cookieValue, setCookieValue] = useState(null);
    const [userdata, setUserdata] = useState(null); // Start with null to differentiate from empty objects
    const [contentcreated,setcontentcreated]=useState(false);
    const [apiresult,setapiresult]=useState({
        "id": "cmpl-xxxxxxxxxxxx",
        "object": "chat.completion",
        "created": 1677888100,
        "model": "gpt-4",
        "choices": [
          {
            "message": {
              "role": "assistant",
              "content": "### Key Points from 'The Basics of Quantum Mechanics'\n\n#### 1. Introduction to Quantum Mechanics\n- Quantum mechanics is the study of particles at the atomic and subatomic levels.\n- It explains phenomena that classical physics cannot, such as wave-particle duality.\n\n#### 2. Key Principles\n- **Wave-Particle Duality**: Particles, like electrons, exhibit properties of both waves and particles.\n- **Uncertainty Principle**: It is impossible to precisely measure both the position and momentum of a particle simultaneously.\n- **Quantum Superposition**: Particles can exist in multiple states at once until measured.\n\n#### 3. Applications of Quantum Mechanics\n- Modern electronics, such as semiconductors, rely on quantum principles.\n- Quantum computing is an emerging field utilizing quantum bits for processing.\n\n#### 4. Conclusion\n- Quantum mechanics provides a foundation for understanding the universe at microscopic scales.\n- While complex, its principles have paved the way for groundbreaking technologies."
            },
            "finish_reason": "stop",
            "index": 0
          }
        ],
        "usage": {
          "prompt_tokens": 120,
          "completion_tokens": 200,
          "total_tokens": 320
        }
      }      
    );
    const [summarydata,setsummarydata]=useState({
      title: '',
      sections: [],
    });
    const [input,setinput]=useState("");
    const [youtubeimageurl,setyoutubeimageurl]=useState("https://img.youtube.com/vi/Tg9yLrJTmTc/0.jpg");

    const processApiResponse = (content) => {
      const lines = content.split("\n");
      // Extract the title (assumes the first line starts with "### Title:")
      const titleLine = lines.find(line => line.startsWith("### Title:"));
      const title = titleLine ? titleLine.replace("### Title:", "").trim() : "";
      const sections = [];
      let currentSubheading = null;

      for (const line of lines) {
        if (line.startsWith("####")) {
          // It's a subheading
          if (currentSubheading) {
            sections.push(currentSubheading); // Save the previous subheading
          }
          currentSubheading = { subheading: line.replace("####", "").trim(), points: [] };
        } else if (line.startsWith("-")) {
          // It's a point, add it to the current subheading's points
          if (currentSubheading) {
            currentSubheading.points.push(line.replace("-", "").trim());
          }
        }
      }

      if (currentSubheading) {
        sections.push(currentSubheading);
      }

  return { title, sections };
    };
    const extractYouTubeId=(url)=> {
      const regex = url.split("=");
      return regex[1];
    }
    
    const search=async()=>{
        if(!input || input==""){
          console.log("data:",input,"enter data");
          return ;
        }
        const youtubeid=extractYouTubeId(input);
        const youtubeurl=`https://img.youtube.com/vi/${youtubeid}/0.jpg`
        console.log("youtubeimage-url:",youtubeurl);
        setyoutubeimageurl(youtubeurl);
        const response=await axios.post('/api/openaiapi/summarize',{summarizecontentinput:input});
        setapiresult(response);
        const message=response.data.choices[0];
        const content=message.message.content;

        const summary=processApiResponse(content);
        console.log("summary",summary);
        setsummarydata({
          title: summary.title,
          sections:summary.sections,
        });
        setcontentcreated(true);
      }

        
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
      {contentcreated==false &&
        <section className={`bg-[#212121] w-screen h-screen items-center justify-center ${contentcreated?'hidden':'flex '}`}>
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
      }
      {contentcreated === true && summarydata && (
      <Resultpage summarydata={summarydata} youtubeimageurl={youtubeimageurl} response={apiresult} />
)}
    </div>

  )
}

export default homePage