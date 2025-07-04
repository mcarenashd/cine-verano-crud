// Primero vamos a cargar en la página unas películas iniciales del DB.
//Creamos una variable llamada fakeApiURL para facilidad si llegara existir un cambio solo sería cambiarlo ahí.
const fakeApiURL = "http://localhost:3000/movies";

//Cuando se cargue la página necesitamos que se ejecute la función displayMovies que declararemos más adelante, y es la encargada de mostrar las películas.
document.addEventListener("DOMContentLoaded", () => {
  fetch(fakeApiURL)
    .then((res) => res.json())
    .then((movies) => {
      console.log(movies);
      displayMovies(movies);
    });
});

// La siguiente función tiene como objetivo mostrar las películas 
function displayMovies(movies) {
  const movieSlide = document.getElementById("movie-slide");  //Buscamos el div en el HTML donde vamos a meter las movieCards.
  movies.forEach((movie) => {  //Empezamos a recorrer el array movies (archivo db.json, nuestra base de datos). 
    const movieCard = document.createElement("div"); //Ahora vamos a crear un div dentro de nuestro HTML para cada movieCard. 
    movieCard.className = "movie-card"; //El div movieCard va a tener un className 'movie-card'
    movieCard.innerHTML = `  
            <h1> ${movie.title}</h1><br>
            <p><strong>Director:</strong>${movie.director} <p><br>
            <p><strong>Género:</strong>${movie.genre} <p><br>
            <p><strong>Año:</strong>${movie.year} <p><br>
            <p><strong>País:</strong>${movie.country} <p><br>
            <p><strong>Sinópsis:</strong>${movie.synopsis} <p><br>

        `; // innerHTML nos permite insertar el código HTML que a tener el div movie-slide.
    movieSlide.appendChild(movieCard); //movieCard va a quedar dentro del div ya creado en html movieSlide.
  });
}





// function displayMovies(movies) {
//     const movieSlide = document.getElementById('movie-slide')
//     movieSlide.innerHTML = '' // Limpiamos el contenido anterior

//     movies.forEach(movie => {
//         // Creamos un elemento div para cada película
//         const movieCard = document.createElement('div')
//         movieCard.className = 'movie-card'
//         movieCard.innerHTML = `
//             <h3>${movie.title}</h3>
//             <p><strong>Director:</strong> ${movie.director}</p>
//             <p><strong>Año:</strong> ${movie.year}</p>
//             <p><strong>País:</strong> ${movie.country}</p>
//             <p><strong>Género:</strong> ${movie.genre}</p>
//             <p><strong>Sinopsis:</strong> ${movie.synopsis}</p>
//             <button onclick="deleteMovie(${movie.id})">Eliminar</button>
//         `
//         movieSlide.appendChild(movieCard)
//     })
// }

// function getMovies(){
//     fetch(fakeApiURL, { //Hacemos una petición HTTP a la URL donde está nuestra fake API.
//         method: 'GET'  //El tipo de método que vamos a usar es GET.
//     })

// .then(response => {
//     // Verificamos si la respuesta es exitosa
//     if (!response.ok) {
//         throw new Error('Error al obtener las películas')
//     }
//     return response.json() // Convertimos la respuesta a JSON
// })
// .then(movies => {
//     // Aquí recibimos el array de películas
//     console.log('Películas obtenidas:', movies)
//     displayMovies(movies) // Llamamos a la función para mostrarlas
// })
// .catch(error => {
//     console.error('Error:', error)
//     alert('Error al cargar las películas')
// })
// }
