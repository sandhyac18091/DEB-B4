const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let movies = [];

function Menu() {
    console.log("======Welcome to Movie Playlist Manager======");
    console.log("1. Add movie");
    console.log("2. View movies");
    console.log("3. Edit movie");
    console.log("4. Delete movie");
    console.log("5. Exit");
    rl.question("Choose an Option: ", handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            rl.question("Enter the movie name: ", (movie) => {
                if (movies !== 0) {
                    movies.push(movie.trim());
                    console.log('Movie added successfully');
                } else {
                    console.log('Please enter a valid movie name.');
                }
                Menu();
            });
            break;
        case '2':
            if (movies.length > 0) {
                console.log('Movies:', movies);
            } else {
                console.log('No movies in the playlist.');
            }
            Menu();
            break;
        case '3': 
            if (movies.length > 0) {
                rl.question("Enter the name of the movie to edit: ", (oldName) => {
                    const index = movies.findIndex((movie) => movie.toLowerCase() === oldName.trim().toLowerCase());

                    if (index !== -1) {
                        rl.question("Enter the new name for the movie: ", (newName) => {
                            if (newName.trim()) {
                                movies[index] = newName.trim();
                                console.log('Movie updated successfully!');
                            } else {
                                console.log('Invalid input. Movie name cannot be empty.');
                            }
                            Menu(); 
                        });
                    } else {
                        console.log('Movie not found.');
                        Menu(); 
                    }
                });
            } else {
                console.log('No movies to edit.');
                Menu(); 
            }
            break;
        case '4':
            if(movies.length>0){
                rl.question("Enter the name of the movie to delete:",(movieName)=>{
                    const index=movies.findIndex((movie)=>movie.toLowerCase()==movieName.trim().toLowerCase())
                    if(index!==-1){
                        movies.splice(index,1);
                        console.log('Movie deleted successfully');
                        
                    }else{
                        console.log('Movie not found');
                        
                    }
                    Menu();
                });

            }else{
                console.log('No movies to delete');
                Menu();
            }
            break;

        case '5':
            console.log('Exiting movie playlist manager');
            rl.close();
            break;
        default:
            console.log('Invalid option! Please enter a valid option.');
            Menu();
            break;
    }
}

Menu();
