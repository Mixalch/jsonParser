function mathFactorial(namb, rec = true){
    if(namb < 0){
     return false
    }
    else if(namb === 0 && rec){
        return 1;
    }
    if(namb >= 0 ){
        return (namb * mathFactorial(namb - 1 , rec ))
    }
}
console.log(mathFactorial(4))