const lodash=require('lodash')
const sum=require('./add.js')

console.log("hello world");
let a="Node js"
console.log("Hello",a);
if(a=='Node js'){
    console.log('its equal');
    
}else{
    console.log('its not equal');
    
}

for(i=1;i<6;i++){
    console.log(i);
    
}

let b=['blue','green','purple','yello']
console.log(lodash.reverse(b));
console.log(lodash.capitalize(b));
console.log(sum.addition(2,3));


