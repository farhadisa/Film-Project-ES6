const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.getElementById("clear-films");

eventlisteners();

function eventlisteners(){

    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", loadFilmsToUI);
    secondCardBody.addEventListener("click", deleteFilm);
    clearButton.addEventListener("click", clearAllFilms);

}

function loadFilmsToUI(){
    let films = Storage.getFilmFromStorage()

    UI.loadAllFilms(films);

}

function addFilm(e){

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //Error
        UI.showDisplays("danger", "Fill in all the inputs")
    }
    else{

        const newFilm = new Film(title,director,url);
        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.showDisplays("success", "Film added successfully")
                
    }

    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film"){
       UI.deleteFilmFromUI(e.target);
       Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
       UI.showDisplays("success", "Film deleted successfully")
    }
}

function clearAllFilms(){

    if(confirm("Are you sure you want to delete all films?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
        UI.showDisplays("primary", "All films are deleted successfully")
    }

}