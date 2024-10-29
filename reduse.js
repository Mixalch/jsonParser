let q = [];
let a = [1,2,3,4,5,6,7,8,9,10].reduce((accum , item)=>{
    if(item % 2 === 0){  
        accum.push(item ** 2)
    };
    return accum;
}, q)
console.log(a)

let strValid = true
let str = '[[[{(({)(}))}]]]'
let stack = []
let b = str.split('')
.reduce((valid, item, index, arr)=>{
    if(index === arr.length - 1 && (item === '{' || item === '[' || item === '(')){
        return false;
    }else if(index <= arr.length / 2 && valid){
        switch (item){
            case '[':
                stack.push('[')
                return  true ; 
            case '{':
                stack.push('{')
                return  true ;  
            case'(':
                stack.push('(')
                return  true ; 
            case ']':
                if(stack[stack.length-1] === '['){
                    stack.pop()
                    return true
                }else{
                    return false;
                }
            case '}':
                if(stack[stack.length-1] === '{'){
                    stack.pop()
                    return true
                }else{
                    return false;
                } 
            case')':
                if(stack[stack.length-1] === '('){
                    stack.pop()
                    return true
                }else{
                    return false;
                }
        }
    } return valid
}, strValid)

console.log(b)