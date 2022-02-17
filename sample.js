"use strict"

let a=[1,2,3,4];
let ans=a.reduce(function(a,b)
{
   return (a+b); 
},0);
console.log(ans)