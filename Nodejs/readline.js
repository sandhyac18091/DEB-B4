const readline=require('readline');
const rl=readline.Interface({
    input:process.stdin,
    output:process.stdout
});
rl.question('What is your name:',(name)=>{
    console.log(`your name is ${name}`);
    
})