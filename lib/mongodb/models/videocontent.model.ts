import { Schema,model,models } from "mongoose";


const VideoContentSchema=new Schema({
    data:{type:Object,required:true,unquie:true},
    youtubeimageurl:{type:String,required:true},
    date:{type:String,default:Date.now()}
});

const VideoContent=models?.User||model('VideoContentSchema',VideoContentSchema);

export default VideoContent;