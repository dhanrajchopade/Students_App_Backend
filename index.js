import express from "express"

import { initializeDatabase } from "./db/db.connect.js"
import Student from './models/student.models.js'
import cors from "cors"
import dotenv from "dotenv"
// import fs from "fs"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

initializeDatabase()

// const jsonData = fs.readFileSync("studentData.json","utf-8")
// const StudentData = JSON.parse(jsonData)

// async function seedData() {
//     try{
//         for(const studentData of StudentData){
//             const newStudent = new Student({
// name:studentData.name,
// gender: studentData.gender,
// profilepicUrl: studentData.profilepicUrl,
// previousYearMarks: studentData.previousYearMarks,
// details: studentData.details,
// dressCode: studentData.dressCode,
// skills: studentData.skills,
// feesPending: studentData.feesPending,
// parentsDetails: studentData.parentsDetails,
//              })
//             await newStudent.save()
//             console.log("Data Seeding completed successfully.")
//         }
//     }catch(error){
//         console.log("An error occured while seeding the data.", error)
//     }
    
// }
// seedData()


const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

  
//   Get all Students Data
async function readAllStudent() {
    try{
        const allreadStudents = await Student.find()
        return allreadStudents
            }catch(error){
                console.log(error)
            }
}

app.get("/students", async(req,res)=>{
    try{
        const student = await readAllStudent()
        if(student.length!=0){
            res.json(student)
        }else{
            res.status(404).json({error:"No Student Found"})
        }

    }catch(error){
        res.status(500).json({error:"Failed to fetch students"})
       
    }
})

// Get Student by Id

app.get("/student/:id", async(req,res)=>{
    try{
const student = await Student.findById(req.params.id)
if(!student){
    return res.status(400).json({error:"Student not found."})
}
res.json(student)
    }catch(error){
        res.status(500).json({error:"Failed to fetch students"})

    }
})

app.listen(PORT,()=>{
    console.log(`--> Server is running on ${PORT}`)
  })