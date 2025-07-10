// Primero vamos a cargar en la página unas películas iniciales del DB.
//Creamos una variable llamada URL_API para facilidad si llegara existir un cambio solo sería cambiarlo ahí.
const URL_API = "http://localhost:3000/movies";

//Cuando se cargue la página necesitamos que se ejecute la función displayMovies que declararemos más adelante, y es la encargada de mostrar las películas.
//También necesitamos qu cargue la función para agregar películas.
document.addEventListener("DOMContentLoaded", () => {
  // Tu función para mostrar películas:
  printMovies();
});

//Funcion para Cargar las películas de la base de datos
async function getAllMovies() {
  const response = await fetch(URL_API);
  const movieData = await response.json();
  console.log(movieData);
  return movieData;
}

// METODO PRINT
//Mostrar las películas en el HTML
let moviesContainer = document.querySelector("section");
async function printMovies(params) {
  let movies = await getAllMovies();
  moviesContainer.innerHTML = "";
  const movieList = movies.map((movie) => {
    return (moviesContainer.innerHTML += `<h1>${movie.title}</h1>
        <p>${movie.director}</p>
        <p>${movie.year}</p>
        <p>${movie.country}</p>
        <p>${movie.genre}</p>
        <p>${movie.synopsis}</p>
        <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
        <button onclick="movieEdit('${movie.id}')">Eliminar</button> `);
  });
  return movieList;
}

// DELETE
async function deleteMovie(id) {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await printMovies();
  } else {
    console.log(`Error al cargar el libro`);
  }
}

//POST
async function newMovie(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;
  const year = document.getElementById("year").value;
  const country = document.getElementById("country").value;
  const genre = document.getElementById("genre").value;
  const synopsis = document.getElementById("synopsis").value;

  const newMovie = {
    title,
    director,
    year,
    country,
    genre,
    synopsis,
  };

  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  });

  if (response.ok) {
    await printMovies();
  } else {
    console.log(`Error al cargar el libro`);
  }
}

// Escuchar el envío del formulario
const form = document.getElementById("movieForm");
form.addEventListener("submit", newMovie);

//Método PUT

//Creamos una variable que va a guardar el id de la película a modificar
let idMovieEdit = null;

//Creamos la función editMovie que se encargará de mostrar el formulario para editar la película y que este encuentre ya pre-cargado con la info de la película
async function editMovie(id) {
  idMovieEdit = id; //Se actualiza la variable con el id de la película a actualizar.
  const response = await fetch(`${URL_API}/${id}`); //Obtenemos los datos de la película que se va a editar.
  const movie = await response.json(); //Traducción a formato JS.
//A continuación, vamos a cargar el formulario de edición con los datos de la película que se va a editar.
  document.getElementById("titleEdit").value = movie.title;
  document.getElementById("directorEdit").value = movie.director;
  document.getElementById("yearEdit").value = movie.year;
  document.getElementById("countryEdit").value = movie.country;
  document.getElementById("genreEdit").value = movie.genre;
  document.getElementById("synopsisEdit").value = movie.synopsis;
// Ocultamos el formulario de Añadir Películas y visualizamos el de editar películas.
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("movieEdit").style.display = "block";
}

//Ahora creamos la función para editar las películas directamente. 

async function updateMovie(e) {
  e.preventDefault();
//Vamos a crear un nuevo objeto con los datos actualizados de la película.

  
}
