// Primero vamos a cargar en la página unas películas iniciales del DB.
//Creamos una variable llamada URL_API para facilidad si llegara existir un cambio solo sería cambiarlo ahí.
const URL_API = "http://localhost:3000/movies";

//Cuando se cargue la página necesitamos que se ejecute la función printMovies que declararemos más adelante, y es la encargada de mostrar las películas.
document.addEventListener("DOMContentLoaded", () => {
  printMovies();
});

//Funcion para cargar las películas de la base de datos API
async function getAllMovies() {
  const response = await fetch(URL_API); //Hcemos una petición GET obtener la información de las películas del API
  const movieData = await response.json(); // .json() transforma los datos en un objeto con el que podemos trabajar en JavaScript
  return movieData; //Nos devuelve la lista de películas
}

//PRINT
//Creamos una función para mostrar las películas en el HTML
let moviesContainer = document.querySelector("ul"); //Seleccionamos el contenedor donde se mostrará la lista de películas. 
async function printMovies(params) {
  let movies = await getAllMovies(); //Llamamos a la función que creamos antes y obtenemos la lista de películas de al API
  moviesContainer.innerHTML = ""; // Permite que el contenedor esté limpio y no empiece a duplicar la creación de las películas. 
  
  movies.forEach(movie => {
    const movieItem = document.createElement('li'); //Se va a crear un li para cada movie nueva creada (necesario para el estilo que le estoy haciendo al carrusel)
    movieItem.innerHTML = `<h1>${movie.title}</h1>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/></svg>
        <p><strong>Título: </strong>${movie.director}</p>
        <p><strong>Año: </strong>${movie.year}</p>
        <p><strong>País: </strong>${movie.country}</p>
        <p><strong>Género: </strong>${movie.genre}</p>
        <p><strong>Sinópsis: </strong>${movie.synopsis}</p>
        <button onclick="deleteMovie('${movie.id}')">Eliminar</button><br> 
        <button onclick="editMovie('${movie.id}')">Editar</button> `; //Los botones de Eliminar y Editar los agregamos cuando estamos creando las funciones correspondientes
      moviesContainer.appendChild(movieItem);

  });

  }
  
// METODO DELETE
//Creamos una función para eliminar
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

  const newMovie = {
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    year: document.getElementById("year").value,
    country: document.getElementById("country").value,
    genre: document.getElementById("genre").value,
    synopsis: document.getElementById("synopsis").value,
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

//Creamos la función editMovie que se encargará de mostrar el formulario de edición y que este encuentre ya pre-cargado con la info de la película
async function editMovie(id) {
  idMovieEdit = id; // Se actualiza la variable con el id de la película a editar.
  const response = await fetch(`${URL_API}/${id}`); //Obtenemos los datos de la película que se va a editar a través de una petición que hacemos a la API.
  const movie = await response.json(); //Guardamos la información en una constante llamada movie. y .json() transforma los datos en un objeto que podemos manipular en JavaScript.

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
  const updateMovie = {
    title: document.getElementById("titleEdit").value,
    director: document.getElementById("directorEdit").value,
    year: document.getElementById("yearEdit").value,
    country: document.getElementById("countryEdit").value,
    genre: document.getElementById("genreEdit").value,
    synopsis: document.getElementById("synopsisEdit").value,
  };
  //Continuamos con la petición PUT para hacer el UPDATE de las películas.
  const response = await fetch(`${URL_API}/${idMovieEdit}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateMovie),
  });
  if (response.ok) {
    //Si la respuesta está bien, muestra la lista de libros actualizada, oculta el formulario de edición y regresa el formulario de edición-
    await printMovies();
    document.getElementById("movieForm").style.display = "block";
    document.getElementById("movieEdit").style.display = "none";
  } else {
    console.log("error al editar las películas.");
  }
}

//Escuchar el envío del formulario.
const movieEdit = document.getElementById("movieEdit");
movieEdit.addEventListener("submit", updateMovie);