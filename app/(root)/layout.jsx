'use client';
import { getUserbyId } from '@/lib/actions/user.actions';
import { permanentRedirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {Appsidebar} from '@/components/shared/appsidebar.jsx';

const layout = ({children}) => {


    const [cookieValue, setCookieValue] = useState(null);
    const [Userdata, setUserdata] = useState({_id:'',email:'',passwd:''}); // Start with null to differentiate from empty objects
    
    const logout = () => {
        document.cookie = 'sessionId-forAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        permanentRedirect('/sign');
      };
    
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

    <SidebarProvider className='dark'>
        <section className='flex'>
          <Appsidebar useremail={Userdata?.email} userid={Userdata?._id} />
              <main className='bg-[#2F2F2F] w-screen'>
              <SidebarTrigger className='text-white' />
                  {children}
            </main>
        </section>
    </SidebarProvider>
  )
}

export default layout