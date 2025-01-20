const readline=require('readline')
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

let expenses=[] 

function Menu(){
  console.log("======Welcome to Expense Tracker======");
  console.log("1.Add Expenses");
  console.log("2.View Expenses");
  console.log("3.Exit");
  rl.question("Choose an option:",handleOption)
}
function handleOption(option){
    switch(option){
        case '1':
            rl.question('Enter the expense amt: ', (expense) => {
                rl.question('Enter the type of expense: ', (type) => {
                    rl.question('Enter the date: ', (date) => {
                        if (expense.trim() !== "" && type.trim() !=="" && !isNaN(Date.parse(date))) {
                            expenses.push({expense: expense.trim(), type: type.trim(), date: date });
                            console.log('Expense Added');
                        } else {
                            console.log('Invalid input.Please try again.');
                        }
                        Menu();
                    });
                });
            });
            break;
        case'2':
        if(expenses!==0){
          console.log('Expenses',expenses);
          
        }
        Menu();
        break;

        case'3':
        console.log('Exiting expense tracker');
        rl.close();
        break;
        default:
            console.log('Invalid! Choose valid option');
            Menu()
            break;
    }
}
Menu()