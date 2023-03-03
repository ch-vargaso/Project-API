// Aquí muestro las imagenes que necesito...
// Tengo que filtrar las imagenes por artista 
console.log('location :>> ', location);
const search = location.search

const urlParameter = new URLSearchParams(search)

const artistId = urlParameter.get("id")
console.log('artistId :>> ', artistId);
console.log('search :>> ', search);
// DATOS ARTISTA //
function fetchArtist() {
    const myHeaders = new Headers();
    myHeaders.append("apikey", apikey);
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
   fetch("https://api.napster.com/v2.2/artists/"+artistId, requestOptions)
    .then(response => response.json())
    .then ((response) => {
        console.log("datos: ", response);
        // este es el console Log que me muestra la info de los ArtistImage
        console.log(response.artists[0].name)
        artistBox(response.artists)
    })
    .catch(error => console.log('error', error));
}
fetchArtist() 

// +++++  DATOS IMAGENES +++++   //
function ArtistImage() {
    let url = `https://api.napster.com/v2.2/artists/${artistId}/images?apikey=MGIwMmYzMmYtYzg1Ni00ZmZmLWI5YzktMWVhNjJkNGU2NjMw`
    fetch(url).then((response) => {
        return response.json()
    }).then((result) => {
        console.log("Imagenes", result.images)
        artistImage(result.images)
    })
}
ArtistImage()


function artistBox(artist) {
    const nombre = document.getElementById("nombre");
    const nombreArtista = document.createElement("h2")
    nombreArtista.innerHTML = artist[0].name
    nombre.appendChild(nombreArtista)

    const bioDiv = document.getElementById("artistBio")
    const artistBio = document.createElement("p")
    artistBio.innerText = artist[0].bios[0].bio
    bioDiv.appendChild(artistBio)
}

function artistImage(img) {
    const photo = document.getElementById("artistcover");
    const imagen = document.createElement("img");
    imagen.setAttribute("src", img[3].url);
    photo.append(imagen);
    }
// // Este es el ejemplo de como sobreescribir un contenido // 

// const newcontent = document.getElementById("nombre")
// newcontent.textContent = "Hola";
// console.log(newcontent);

// +++++++++++++++++++++++++++++++++++++++++++++

//  así se adhieren imagenes a los textos (buscar el ejemplo 1 de Emily con las banderas)
// function artistImage() {
//     const image = document.createElement("img");
//     image.setAttribute("src", "http://static.rhap.com/img/150x100/6/8/7/2/7572786_150x100.jpg")
//     document.body.appendChild(image)
// }
// artistImage() 


// const fetchImage = (url) => {
    
//     return fetch(url)
// }

// const img = document.createElement("img")
// img.setAttribute("src", fetchImage(al))