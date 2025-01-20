const readline=require('readline')

//create a readline interface for input and output
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let tasks=[] //create empty array to store all tasks

function menu(){
  console.log("======TASK MANAGER======");
  console.log("1.Add task");
  console.log("2.View task");
  console.log("4.Exit");
  rl.question("/Choose an option:",handleOption)
}

function handleOption(option){
    switch(option.trim()){
        case'1':
        rl.question('Enter the task:',(task)=>{
          if(tasks!==0){
            tasks.push(task.trim())
            console.log('Task Added');
            
          }else{
            console.log('please specify valid task');
            
          }
         
            menu()
        });
        break;

        case'2':
        if(tasks!==0){
          console.log('Tasks',tasks);
          
        }
        menu();
        break;

        case'4':
        console.log('Exiting task manager');
        rl.close();
        break;
        default:
            console.log('Invalid! Choose valid option');
            menu()
            break;
        
        
    }
}

  
  menu()