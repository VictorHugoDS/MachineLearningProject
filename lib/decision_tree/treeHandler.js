import { reciveData } from "../../test/entry.js"
import { calculateEntropy } from "./entropyCalculator.js"


 /**
  * @param {Array<Array<String>>} listOfList Array com os dados
  */
function separateDate(listOfList) {
    const returnOList = []
    listOfList.forEach(
        (
            (list,i)=>{
                list.forEach(
                    (element,j)=>{
                        if(returnOList[j]){
                            returnOList[j].push(element)
                        } else {
                            returnOList[j] = [element]
                        }
                    }
                )
            }
        )
    )
    return returnOList
}


 /**
  * @param {Array<String>} columnsNames Nome das colunas
  * @param {Array<Array<String>>} dadosPorColuna Array com os dados
  * @param {Array<String>} tagList Array com as tags dos dados
  */
function defineColumnToProgess(dadosPorColuna,tagList) {
    const values = []
    dadosPorColuna.forEach(
        (list,)=>{
            const value = calculateEntropy(list,tagList)
            values.push(value)
        }
    )
    let max = 0
    let index = null
    values.forEach((value,i)=>{
        if(value > max){
            max = value
            index = i
        }
    })
    return [values,index]
}


/**
 * @param {Array<String>} columnsNames Nome das colunas
 * @param {Array<Array<String>>} data Array com os dados das linhas
 */
function moreGainDecider(columnsNames,data) {
    const listByColumns = separateDate(data)
    const tagValues = listByColumns[listByColumns.length-1]
    const columnsNamesFiltered = columnsNames.slice(0,columnsNames.length-1)
    listByColumns.pop()
    const [valuesOfGains,moreGain] = defineColumnToProgess(listByColumns,tagValues)
    const winnerName = columnsNamesFiltered.splice(moreGain,1)[0]
    const winnerValue = valuesOfGains.splice(moreGain,1)[0]

    const resp = {
        'winner':
            {
                'name': winnerName,
                'value': winnerValue
            },
        'others': {
            'names': columnsNamesFiltered,
            'values': valuesOfGains
        }

    }
    //console.log(resp)
    return(resp)
}

/**
 * @param {Array<String>} columnsNames Nome das colunas
 * @param {String} columnOfReference Nome da coluna que será utilizado para a separação       
 * @param {String} valueOfReference Valor que será utilizado para a separação
 * @param {Array<Array<String>>} data Array com os dados das linhas
 */
function treeBreaker(columnsNames,columnOfReference,valueOfReference,data) {
    const columnNumberOfSeparation = columnsNames.indexOf(columnOfReference)
    const listToProgress = data.filter((list)=> list[columnNumberOfSeparation] == valueOfReference)
    const listOfOthers = data.filter((list)=> list[columnNumberOfSeparation] != valueOfReference)
    console.log(listToProgress,listOfOthers)
    return [listToProgress,listOfOthers]
}

/**
 * @param {Object} obj lista de lista de objetos
 */// to do
export function treeCreator(obj=null,objectOfReference) {
    let data = obj
    if(obj===null){
        data = reciveData()
    }
    let estruturedData = data.data
    const response = {tree:{}}
    let i = 1
    while(estruturedData.length !== 1){
        const localResponse = moreGainDecider(data.names,estruturedData)
        //console.log('estruturedData',estruturedData)
        //console.log('localResponse',localResponse)
        const [progess,others] = treeBreaker(data.names,localResponse.winner.name,,estruturedData)
        //console.log(progess,others)
        
        const piceOfWood = {
            level: i,
            separator: localResponse.winner.name, 
            mainBranch: progess,
            notUtilizedBranch: others
        }
        response.tree['depth'+i]=piceOfWood
        // //console.log('progess',progess)
        estruturedData=progess
        
        if(i==2){
            throw Error()
        }
        i+=1
    }
    //console.log(estruturedData)
    return estruturedData
}

treeCreator()