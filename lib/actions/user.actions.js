'use server';

import  {connecttodatabase}  from '@/lib/mongodb/mongoose';
import User from '@/lib/mongodb/models/user.model';
import { handleError,parsejson } from '@/lib/utils';


export const createUser=async(user)=>{
    try {
        await connecttodatabase();

        const newuser=await User.create(user);
        if(newuser) return parsejson(newuser);

    } catch (error) {
        handleError(error,'Error in creating user === user.actions.js');
    }
}

export const checkUserbyemail_password=async({email,password})=>{ 
    try {
        await connecttodatabase();


        const checkuser=await User.findOne({email:email});
        console.log("checkuser?",checkuser);
        if(checkuser==null) return parsejson({status:202,message:" User doesn't exist",data:null});
        if(checkuser.email==email){
            if(checkuser.password==password){
                return parsejson({status:400,message:'Success user exists!',data:checkuser});
            }else  return parsejson({status:201,message:'Wrong Password',data:null});
        }
    } catch (error) {
        handleError(error,'Error in checking user === user.actions.js')
    }
}


export const getUserbyId=async(id)=>{
    try {
        await connecttodatabase();

        const data=await User.findOne({_id:id});
       
        if(data) return parsejson(data);
    } catch (error) {
        handleError(error,'Error in finding user === user.actions.js')
    }
}