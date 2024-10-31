const arrNaturalNumbers = [1, 2, 3, 4, 5, 6, 11, 123, 4, 18, 43, 2, 11, 8, 5, 4, 51, 7, 55, 42];  
// const arrNaturalNumbers = [1,1,3,4,5,6,7,8,8,7,9];

function sumArr(namberArr){
    return namberArr.reduce((sum, item)=>{
        return sum + item; 
    }, 0);
}

function main(inputArr, startElementInArr1 = 0){
    const lenghtInputArr =  inputArr.length
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    if (lenghtInputArr >= 2){
        for(i=0;i<=startElementInArr1; i++){
            arr1.push(inputArr[i]);
        }
        arr3.push(inputArr[lenghtInputArr - 1]);
        while ( arr1.length !== (lenghtInputArr - (arr3.length))){
            if(sumArr(arr1) === sumArr(arr3)){
                //добавить вссе остатки в 2й масив
                for(q=arr1.length; q <= (lenghtInputArr - (arr3.length + 1)); q++){
                    arr2.push(inputArr[q]);
                }
                
                break;
            }else if(sumArr(arr1) > sumArr(arr3)){
                arr3.push(inputArr[lenghtInputArr - (arr3.length + 1)])
            }else if(sumArr(arr1) < sumArr(arr3)){
                arr1.push(inputArr[arr1.length])
            }
        }
        if(sumArr(arr1) !== sumArr(arr3)){
            console.log('не прошло')
            console.log(arr1 +' '+arr2+' '+arr3)
            return ('end')
        }else if(sumArr(arr1) === sumArr(arr3)){
            console.log(arr1 +' | '+arr2+' | '+arr3)
            console.log(sumArr(arr1))
            return arr1;
        }
    }else{
        console.log('мало элементов в масиве');
    }
}

function findMaxForArr1(startElementInArr1 = 0){
    let arr1Length = main(arrNaturalNumbers, startElementInArr1)
    if ( 'end' !== arr1Length){
        findMaxForArr1(arr1Length.length)
    }
}

findMaxForArr1()