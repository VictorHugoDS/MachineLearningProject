import express from "express";
import upload from "express-fileupload";
import { treeCreator } from "./lib/decision_tree/treeHandler.js";

const PORT = 8111
const app = express()

app.use(express.json())
app.use(upload())

app.listen(PORT, () =>{
    console.log("Server is running")
})

app.get("/", (req, res) => {
    res.send("Hello World")
});

// convert the csv to dataSet 
const convertCsvToDataSet = (csv) => {
    // parse csv to list of lists
    // remove \r\n
    let parsedData = csv.split("\r\n")
    parsedData = parsedData.map((line) => {
        return line.split(",")
    })

    // resultados
    let results = parsedData.map((line) => {
        let lineResults =  line[line.length - 1]
        return lineResults
    })
    results = results.slice(1, results.length - 1)

    let dataset = parsedData.map((line) => {
        return line
    })
    dataset = dataset.slice(1, dataset.length - 1)


    let data = {
        names: parsedData[0],
        teste: results,
        data: dataset
    }
    return data
}

app.post("/createTree", async (req,res)=>{
    console.log(req.body)
    console.log(`recebido`) 

    // convert req.body csv to list of lists
    const listOfLists = ``
    console.log(req.body.data)
    const csvData = req.body.data

    if(!csvData) {
        return res.json({
            error: "No data received"
        })
    }   
    
    //console.log(parsedData)
    console.log(`parsedData`)
    const finalData = (convertCsvToDataSet(csvData))
    console.log(finalData)
    const response= treeCreator(finalData)
    console.log(`response`, response)
})