function customReduse ( calbacFn , calculatar = 0 ){
  //как получить исходный масив данных 
  //console.log(this)
    console.log('----custom reduce----')
    for (i=0;  i<= this.length-1; i++){
         calculatar = calbacFn(calculatar, this[i], i, this)
    }
    return calculatar
};


Array.prototype.reduce = customReduse
// console.log(Array.prototype.reduce)

// let q =[]
let qwer = [1,2,3,4,5,6,'aerrr'].reduce((accum , item)=>{
     accum + item
})
console.log(qwer)


// let q =[]
// let qwer = customReduse((accum , item)=>{
//     if(item % 2 === 0){  
//         accum.push(item ** 2)
//     };
//     return accum;
// }, q)
// console.log(qwer)