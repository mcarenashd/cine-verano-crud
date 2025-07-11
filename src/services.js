// Primero vamos a cargar en la página unas películas iniciales del DB.
//Creamos una variable llamada URL_API para facilidad si llegara existir un cambio solo sería cambiarlo ahí.
const URL_API = "http://localhost:3000/movies";

//Cuando se cargue la página necesitamos que se ejecute la función printMovies que declararemos más adelante, y es la encargada de mostrar las películas.
document.addEventListener("DOMContentLoaded", () => {
  printMovies();
});

//Funcion para cargar las películas de la base de datos API
async function getAllMovies() {
  const response = await fetch(URL_API); //Hcemos una petición GET a la API para obtener la información de las todas las películas guardadas en la db. 
  const movieData = await response.json(); // .json() transforma los datos en un objeto con el que podemos trabajar en JavaScript
  return movieData; //Nos devuelve la lista de películas
}

//PRINT
//Creamos una función para mostrar las películas en el HTML
let moviesContainer = document.querySelector("ul"); //Seleccionamos el contenedor donde se mostrará la lista de películas. 
async function printMovies(params) {
  let movies = await getAllMovies(); //Llamamos a la función que creamos antes y obtenemos la lista de películas de al API
  moviesContainer.innerHTML = ""; // Permite que el contenedor esté limpio y no empiece a duplicar la creación de las películas. 
//Creo constantes de las imágenes que van a ir en las tarjeticas de películas
  const htmlImhg1 =`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><i class="fa-solid fa-clapperboard"></i>` //Link a imagen de claqueta
  const htmlImhg2 =`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><i class="fa-solid fa-user"></i>` //Link a imagen de claqueta
  const htmlImhg3 =`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><i class="fa-solid fa-calendar-days"></i>` //Link a imagen de claqueta
  const htmlImhg4 =`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><i class="fa-solid fa-earth-americas"></i>` //Link a imagen de claqueta
  const htmlImhg5 =`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /><i class="fa-solid fa-masks-theater"></i>` //Link a imagen de claqueta

//Recorremos el array de movies, creamos una li para cada película y así poderlo desplegar el en carrusel. 
  movies.forEach(movie => {
    const movieItem = document.createElement('li'); //Se va a crear un li para cada movie nueva creada (necesario para el estilo que le estoy haciendo al carrusel)
    movieItem.innerHTML = `<h1> ${htmlImhg1} ${movie.title}</h1>
        <p><strong>${htmlImhg2}   Director: </strong>${movie.director}</p>
        <p><strong>${htmlImhg3}   Año: </strong>${movie.year}</p>
        <p><strong>${htmlImhg4}   País: </strong>${movie.country}</p>
        <p><strong>${htmlImhg5} Género: </strong>${movie.genre}</p>
        <p><strong>Sinópsis: </strong>${movie.synopsis}</p>
        <button onclick="deleteMovie('${movie.id}')">Eliminar</button><br> 
        <button onclick="editMovie('${movie.id}')">Editar</button> `; //Los botones de Eliminar y Editar los agregamos cuando estamos creando las funciones correspondientes
      moviesContainer.appendChild(movieItem); //Añadimos cada película al contenedor
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