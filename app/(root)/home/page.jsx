'use client';
import { getUserbyId } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
const homePage = () => {
    const [cookieValue, setCookieValue] = useState(null);
    const [userdata, setUserdata] = useState(null); // Start with null to differentiate from empty objects
        

        
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
    <section className='bg-[#2F2F2F]'>
          <div className=''>
        </div>
    </section>
  )
}

export default homePage