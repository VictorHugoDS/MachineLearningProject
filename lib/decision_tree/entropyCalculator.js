/**
 * @param {Number} n casos favoráveis
 * @param {Number} N casos totais
 */
function logCalculator(n,N) {
    return -(n/N)*(Math.log2(n/N))
}


/**
 * @param {Array<string>} array lista de elementos 
 */
function calculateEntropyOfColumn(array) {
    //console.log(array)
    const types = []
    array.forEach(
        (x,)=>{
            types.includes(x) || types.push(x)
        }
    )

    let sum = 0
    const total = array.length

    types.forEach(
        (x,)=>{
            const separateTypes = array.filter((value=>x==value))
            sum += logCalculator(separateTypes.length,total)
            // console.log('separateTypes:', separateTypes)
        }
    )
    // console.log(sum) 
    return sum
}

/**
 * @param {Array<string>} valuesArray lista de elementos de uma coluna
 * @param {Array<string>} valuesArray lista de elementos de uma coluna
 */
export function calculateEntropy(valuesArray,TagArray){
    //console.log(valuesArray,TagArray)
    const dadEntropy = calculateEntropyOfColumn(TagArray)
    const totalCases = valuesArray.length

    const occorenceSave = {}
    const tagsOfColumn = {}
    valuesArray.forEach(
        (element,i)=>{

            // Salva a quantidade de vezes que ele aparece dentro do vetor
            occorenceSave[element] = occorenceSave[element] ? occorenceSave[element] + 1 : 1

            // faz a separação das tags baseado no elemento
            if(!tagsOfColumn[element]){
                tagsOfColumn[element] = [TagArray[i]]
            } else {
                tagsOfColumn[element].push(TagArray[i])
            }
        }
    )
    let sum = dadEntropy

    for (let key in occorenceSave){
        //console.log(key,occorenceSave[key],tagsOfColumn[key])
        sum -= (occorenceSave[key]/totalCases)*calculateEntropyOfColumn(tagsOfColumn[key])
    }
    return sum 
}

// const a = ['x','x','b','a','b','x','a','b','a','b','b','a','a','a','x','a']
// const b = ['1','2','1','1','1','1','2','2','2','2','2','2','1','1','1','1']

// console.log(calculateEntropy(a,b))