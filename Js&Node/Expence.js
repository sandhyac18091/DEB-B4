const readline=require('readline')
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let expences=[] 

function Menu(){
  console.log("======Welcome to Expence Tracker======");
  console.log("1.Add Expences");
  console.log("2.View Expences");
  console.log("3.Exit");
  rl.question("Choose an option:",handleOption)
}
function handleOption(option){
    switch(option){
        case'1':
        rl.question('Enter the expence:',(expence)=>{
          if(expences!==0){
            expences.push(expence.trim())
            console.log('Expence Added');
            
          }else{
            console.log('please specify valid expences');
            
          }
         
            menu()
        });
    }
}