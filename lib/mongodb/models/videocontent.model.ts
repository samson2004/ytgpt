import { Schema,model,models } from "mongoose";


const VideoContentSchema=new Schema({
    data:{type:Object,required:true},
    youtubeimageurl:{type:String,required:true},
    date:{type:String,default:Date.now()}
});

const VideoContent=models?.VideoContent||model('VideoContent',VideoContentSchema);

export default VideoContent;