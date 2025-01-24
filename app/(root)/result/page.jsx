'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getallcontent } from '@/lib/actions/videocontent.actions';

const Resultpage = () => {
  const [summarydata, setsummarydata] = useState(null); // Initialize as `null`
  const [youtubeimageurl, setyoutubeimageurl] = useState('');

  useEffect(() => {
    const fetchvideodata = async () => {
      try {
        const content = await getallcontent();
        console.log('Fetched content:', content);

        if (content && content.length > 0) {
          // Access the last item in the content array
          const lastContent = content[content.length - 1];

          let rawData = lastContent.data;

          // Remove backticks and extra formatting if the data is a string
          if (typeof rawData === 'string') {
            rawData = rawData.replace(/```(JSON)?/g, '').trim();
          }

          // Parse the sanitized data
          const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

          // Update the state with parsed data and the YouTube image URL
          console.log('Parsed data:', parsedData);
          setsummarydata(parsedData);
          setyoutubeimageurl(lastContent.youtubeimageurl);
        } else {
          console.error('Content is empty or invalid');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchvideodata();
  }, []);

  return (
    <section>
      <div className="bg-[#212121] w-screen h-screen items-center justify-center flex">
        <div className="w-1/3 p-10">
          {youtubeimageurl && (
            <Image src={youtubeimageurl} width={400} height={400} alt="YouTube image" />
          )}
          {summarydata && (
            <h1 className="text-white mt-10 font-semibold text-2xl">
              {summarydata.title}
            </h1>
          )}
        </div>
        <div>
          {summarydata?.sections?.map((section, index) => (
            <div key={index} className="mt-4">
              {/* Subheading */}
              <h2 className="text-gray-300 font-semibold">{section.subheading}</h2>
              {/* Points */}
              <ul className="text-gray-400 list-disc list-inside ml-4">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resultpage;
