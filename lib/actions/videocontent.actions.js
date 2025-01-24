'use server';

import  {connecttodatabase}  from '@/lib/mongodb/mongoose';
import { handleError,parsejson } from '@/lib/utils';
import VideoContent from '@/lib/mongodb/models/videocontent.model';

export const createVideocontententry=async(videocontent)=>{
    try {
        await connecttodatabase();
        const newentry=await VideoContent.create(videocontent);
        if(newentry) return parsejson(newentry);
    } catch (error) {
        handleError(error,'Error in creating videocontent entry===Videocontent.actions.js');
    }
}