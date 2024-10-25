let q = [];
let a = [1,2,3,4,5,6,7,8,9,10].reduce((accum , item)=>{
    if(item % 2 === 0){  
        accum.push(item ** 2)
    };
    return accum;
}, q)
console.log(a)

let strValid = true
let str = '[[[{(())}]]]'
let b = str.split('')
.reduce((valid, item, index, arr)=>{
    if(index <= arr.length / 2 && valid){
        switch (item){
            case '[':
                return ']' === arr[arr.length - index-1] ? true : false; 
                break;
            case '{':
                return '}' === arr[arr.length - index-1] ? true : false; 
                break;
            case'(':
                return ')' === arr[arr.length - index-1] ? true : false; 
                break;
        }
    } return valid
}, strValid)

console.log(b)