const { title } = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let library = [];
let bookid=1;
function Menu() {
    console.log('=====WELCOME TO LIBRARY=====');
    console.log('1.Add book');
    console.log('2.View book');
    console.log('3.Borrow book');
    console.log('4.Return book')
    console.log('5.Delete book');
    console.log('6 Exit');
    rl.question('Choose an option:', handleoption)
}
function handleoption(option){
    switch (option.trim()) {
        case '1':
            rl.question('Enter a book title:',(bookname)=>{
                rl.question('Enter author of the book:',(author)=>{
                     library.push({Id:bookid++,title:bookname,author:author,status:'Available'})
                        console.log('Book added successfully');
                        Menu()
                    
                });
                
            });
           
            break;
        case '2':
            if (library.length == 0) {
                console.log('No books in the library.');
            } else {
                console.log('\nBooks in the library:');
                library.forEach((book) => {
                    console.log(
                        `ID:${book.Id}\tTitle:${book.title}\tAuthor:${book.author}\tStatus:${book.status}`
                    );
                });
            }
            Menu();
            break;

        case '3':
            rl.question('Enter the Bookid to borrow:',(Id)=>{
                const book=library.find((b)=>b.Id==parseInt(Id));
                if(book){
                    if(book=='Available'){
                        book.status='Borrowed';
                        console.log(`you borrowed "${book.title}".`);
                        
                    }else{
                        console.log(`"${book.title}" is already borrowed.`);
                        
                    }
                }else{
                    console.log('Invalid book id');
                    
                }
                Menu()
            });
            break;
        case '4':
            rl.question('Enter bookid to return:',(Id)=>{
                const book=library.find((b)=>b.id==parseInt(Id));
                if(book){
                    if(book.status=='Borrowed'){
                        book.status='Available';
                        console.log(`You returned "${book.title}"`);
                        
                    }else{
                        console.log(`"${book.title}" is already available`);
                        
                    }
                }else{
                    console.log('Invalid book id');
                    
                }
                Menu()
            });
            break;
        case '5':
            rl.question('Enter the ID of the book to delete: ', (Id) => {
                const index = library.findIndex((b) => b.Id === parseInt(Id));
                if (index !== -1) {
                    const removedBook = library.splice(index, 1);
                    console.log(`Deleted book: "${removedBook[0].title}".`);
                } else {
                    console.log('Invalid book ID.');
                }
                Menu();
            });
            break;
            
        case '6':console.log('Exiting from library');
                rl.close()
                break;
        default:
            console.log('Invalid option');
            Menu()
            break;
    }
}

Menu();




