const args=process.argv.slice(2)
console.log('Commandline Arguements',args);

const num1=parseInt(args[0])
const num2=parseInt(args[1])
let sum=num1+num2
console.log(sum);
