import Excel from "exceljs"

export function toXlsxToListOfLists(binary) {
    console.log(binary)
    const XLSX = new Excel.Workbook().xlsx;
    XLSX.read(binary,{
        type:"binary"
    })
}