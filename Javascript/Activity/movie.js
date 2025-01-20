let movies = []
let priorities = []

function addMovie() {
    const movieInput = document.getElementById('movie')
    const priorityInput = document.getElementById('priority')
    const movielist = document.getElementById('movielist')

    let movie = movieInput.value.trim()
    let priority = Number(priorityInput.value.trim())

    if (movie != '' && !isNaN(priority) && priority >= 1 && priority <= 3) {
        movies.push(movie)
        priorities.push(priority)
        let li = document.createElement('li')
        li.textContent = movie
        switch (priority) {
            case 1:
                li.classList.add('priority-high')
                break;
            case 2:
                li.classList.add('priority-medium')
                break;
            case 3:
                li.classList.add('priority-low')
                break;
        }

        const watchbutton = document.createElement('button');
        watchbutton.textContent = 'Watched';
        watchbutton.onclick = function(){
            li.classList.toggle('Watched');
        };
        li.appendChild(watchbutton);


        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.onclick = function () {
            const edit = prompt('Edit the movie ', movie)
            if (edit != null && edit.trim() !== '') {
                 li.firstChild.textContent = edit
                movie = edit
            }
        }

        li.appendChild(editButton)
        saveData()

        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.onclick = function () {
            movielist.removeChild(li)
            const movieIndex = movies.indexOf(movie)
            movies.splice(movieIndex, 1)
            priorities.splice(movieIndex, 1)
        }

        li.appendChild(removeButton)
        saveData()
        movielist.appendChild(li)
        saveData()
        movieInput.value = ''
        priorityInput.value = ''



    }

    else {
        alert('Enter a valid input')
    }
}

function saveData() {
    localStorage.setItem("movielist", movielist.innerHTML)
}

function getData() {
    movielist.innerHTML = localStorage.getItem("movielist")
}

// getData()

