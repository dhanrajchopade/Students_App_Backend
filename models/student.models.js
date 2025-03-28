import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},

gender:{
    type:[String],
    required:true,
    enum:["Male", "Female", "Other"],
},
profilepicUrl:{
    type:String,
    required:true,
    },
    previousYearMarks:{
        type:Number,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    dressCode:{
        type:String,
        required:true
    },
    skills:[String],
    location:{
        type:String,
        required:true
    },
    feesPending:{
        type:String,
        required:true
    },
    location: { type: String },
    parentsDetails:[
        {
            name:{type:String, required:true},
            relationwithStudent:{type:String, required:true},
            designation:{type:String, required:true},
            imgUrl:{type:String, required:true}
        }
    ],


}, {timestamps:true})

const Student = mongoose.model("Student", studentSchema)
export default Student