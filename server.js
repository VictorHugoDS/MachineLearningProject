import express from "express";
import upload from "express-fileupload";
import { treeCreator } from "./lib/decision_tree/treeHandler.js";
import { toXlsxToListOfLists } from "./lib/excel/excelHandler.js";

const PORT = 8000
const app = express()

app.use(express.json())
app.use(upload())

app.listen(PORT, () =>{
    console.log("Server is running")
})

app.post("/createTree", async (req,res)=>{
    console.log(req.body)
    const response = treeCreator(req.body)
    res.json(response)
    
})