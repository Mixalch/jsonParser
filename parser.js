const fs = require ( "node:fs" )
let strJson = fs.readFileSync(`json.txt`).toString() || "{}"

function spliseJsonToElements(strDef1, masIndexToSlice=[], a=0, exception = false, exceptionCounter = 0){
    let exceptionSimbols = ['"', "[", "]", "{", "}"]
    if (strDef1.at(a) == "," && exception == false){ masIndexToSlice.push(a)}
    if ( exceptionSimbols.includes(strDef1.at(a)) ){
        if (strDef1.at(a) == "[" || strDef1.at(a) == "{" ) {exceptionCounter++; exception = true}
        else if(strDef1.at(a) == "]" || strDef1.at(a) == "}" ) { exceptionCounter--; if(exceptionCounter == 0 ) {exception = false} }
        else if(exceptionCounter == 0 ) {exception != exception}
    }
    if (a < strDef1.length){ spliseJsonToElements(strDef1, masIndexToSlice, ++a, exception, exceptionCounter)}
    return masIndexToSlice
}

function stripLineBreaks(masivToClear){
    cliarMasiv = []
    masivToClear.forEach(element => {
        cliarMasiv.push( element.replace(/\r?\n|\r|\n|\s+/g, " ").trim() )
    });
    return cliarMasiv
}



function splitStringsIntoObjects ( masivStringToSplit , isItArray = false ){
    let listObjectsProperties = []
    let mapConnditions = new Map ([
        ['str', (a)=>{return a == '"'}],
        ['logic', (a)=>{return (a == ("t") || a == ("f"))}],
        ['null', (a)=>{return a =='n'}],
        ['object', (a)=>{return a =='{'}],
        ['massiv', (a)=>{return a =='['}]
    ])

    masivStringToSplit.forEach(fullString => {
        let objectPropertis ={
            name : "",
            type: "",
            simpleType : true,
            value : null 
        }
        if ( isItArray == false){
            objectPropertis.name = fullString.slice((fullString.indexOf('"') + 1), fullString.indexOf(":")).replace(/"\B.*\:?$/gm , "")
            valueOfString = fullString.slice((fullString.indexOf(":") + 1))
        }else{
            valueOfString = fullString
        }

        for(let condition of mapConnditions.keys()) {
            if (mapConnditions.get(condition)(valueOfString[1]) || mapConnditions.get(condition)(valueOfString[0])) { objectPropertis.type = condition}
        }
        if (objectPropertis.type == ''){ objectPropertis.type = 'numb'}

        if (objectPropertis.type == 'str'){  objectPropertis.value = valueOfString.slice((fullString.indexOf('"') + 1), fullString.lastIndexOf('"') ).replace(/"/gm , "")  }
        if (objectPropertis.type == 'logic'){  ((valueOfString.slice(1) == "true") || (valueOfString.slice(0) == "true"))  ?  objectPropertis.value = true : objectPropertis.value = false }
        if (objectPropertis.type == 'null'){  if ((valueOfString.slice(1) == "null") || (valueOfString.slice(0) == "null")) { objectPropertis.value = null  }}
        if (objectPropertis.type == 'numb'){  objectPropertis.value = Number(valueOfString)}
        if ( objectPropertis.type == 'massiv') {  objectPropertis.simpleType = false; objectPropertis.value = valueOfString}
        if (objectPropertis.type == 'object') {  objectPropertis.simpleType = false; objectPropertis.value = valueOfString.slice(valueOfString.indexOf("{") + 1, valueOfString.lastIndexOf("}"))} 
        listObjectsProperties.push(objectPropertis)
    })
    return listObjectsProperties
}

function layoutInJSON(listObjectsProperties){
    let finalJson={}
    listObjectsProperties.map((item)=>{
        if(item.simpleType === true){finalJson[item.name] = item.value}
        if(item.simpleType === false){
            if (item.type == 'massiv'){finalJson[item.name] = parceMassiv(item.value)}
            if (item.type == "object"){finalJson[item.name] = parseJson(item.value)}
        }
    })
    return finalJson
}

function parceMassiv ( stringMasiv, recurtionFlag = false){
    stringMasiv = stringMasiv.slice((stringMasiv.indexOf("[") + 1) , (stringMasiv.lastIndexOf("]")) )
    let masToSplitMasiv = spliseJsonToElements(stringMasiv )
    let stringElementSplitting1 = []
    let retArray = []
    for(q=0; q<=masToSplitMasiv.length; q++){
        stringElementSplitting1.push( stringMasiv.slice((masToSplitMasiv[q - 1] + 1) || 0,masToSplitMasiv[q]))
    }
    
    let masivStrToProcessing = stripLineBreaks(stringElementSplitting1)
    let masivNotObject = []
    masivStrToProcessing.map((item1)=>{
        if(item1.replace(/ /gm)[0] == "{"){ 
            
            let ffff = parseJson(item1, true)
            retArray.push(ffff)
        }else{masivNotObject.push(item1)}
    })  
    // выполнять если объект масив
    let masivSplitObj = splitStringsIntoObjects(masivNotObject, recurtionFlag)
    // разделяем на масиввы с простыми данными и с объектами
    masivSplitObj.forEach((arrayVariable)=>{
        if(arrayVariable.simpleType == true ){
            if (arrayVariable.type == 'str'){ retArray.push(arrayVariable.value)}
            if (arrayVariable.type == 'logic'){(arrayVariable.value == true) ?  retArray.push( true ) : retArray.push(false)}
            if (arrayVariable.type == 'null'){ if((arrayVariable.value == null) ) { retArray.push( null) }}
            if (arrayVariable.type == 'numb'){ retArray.push(Number(arrayVariable.value))}
        }else if (arrayVariable.simpleType == false){
            if(arrayVariable.type == "massiv"){ retArray.push(parceMassiv(arrayVariable.value, true))}
            // else if(arrayVariable.type == "object"){ retArray.push(parseJson(arrayVariable.value))}
        }

    })
    return retArray
}

function parseJson (stringJSON1, wer=false){

    stringJSON = stringJSON1.trim()
    let newstring = stringJSON.slice(stringJSON.indexOf("{") + 1, stringJSON.lastIndexOf("}"))
    let masivToCut = spliseJsonToElements(newstring)
    let stringElementSplitting = []
    for(q=0; q<=masivToCut.length; q++){
        stringElementSplitting.push( newstring.slice(masivToCut[q - 1] + 1 || 0,masivToCut[q]))
    }
    let asdf = layoutInJSON(splitStringsIntoObjects(stripLineBreaks(stringElementSplitting)))
    if(wer == true){
    stringJSON1
    }
    return asdf
}
// console.log(JSON.parse(strJson))
console.log(
    parseJson(strJson)
)
