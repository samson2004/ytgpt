import { Schema,model,models } from "mongoose";


const UserSchema=new Schema({
    email:{type:String,required:true,unquie:true},
    password:{type:String,required:false},
    date:{type:String,default:Date.now()}
});

const User=models?.User||model('User',UserSchema);

export default User;