import express from "express";
import upload from "express-fileupload";
import { toXlsxToListOfLists } from "./lib/excel/excelHandler.js";

const PORT = 8000
const app = express()

app.use(express.json())
app.use(upload())

app.listen(PORT, () =>{
    console.log("Server is running")
})

app.post("/findNextLevel", async (req,res)=>{
    // console.log(req.body)
    console.log(req.files.data)
    // toXlsxToListOfLists(req.files.data.data)
    // if(req.files){
    // }
    res.send('ok')
})