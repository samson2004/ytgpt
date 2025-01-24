'use client';
import { getUserbyId } from '@/lib/actions/user.actions';
import { permanentRedirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppSidebar } from "@/components/shared/appsidebar";


export default function Home() {
  const [cookieValue, setCookieValue] = useState(null);
  const [userdata, setUserdata] = useState(null); // Start with null to differentiate from empty objects

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
            permanentRedirect('/home')
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
    <section className=''>
        <div className='flex '>
          {/* <AppSidebar userdata={userdata || null} /> */}
          <div className='w-screen'>
          /homepage: {cookieValue ? cookieValue : 'No cookie found'}
          <br />
          userdata: {userdata ? JSON.stringify(userdata, null, 2) : 'No user data'}
          <Button onClick={logout}>Logout</Button>
        </div>
        </div>
    </section>
  );
}
