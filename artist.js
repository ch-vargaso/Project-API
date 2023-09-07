// Aquí muestro las imagenes que necesito...
// Tengo que filtrar las imagenes por artista 
// console.log('location :>> ', location);
const search = location.search
const urlParameter = new URLSearchParams(search)
const artistId = urlParameter.get("id")
// console.log('artistId :>> ', artistId);
// console.log('search :>> ', search);
// DATOS ARTISTA //
function fetchArtist() {
    const myHeaders = new Headers();
    myHeaders.append("apikey", apikey);
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch ("https://api.napster.com/v2.2/artists/"+artistId, requestOptions)
    .then(response => response.json())
    .then ((response) => {
        // console.log("datos: ", response);
        // este es el console Log que me muestra la info de los ArtistImage
        console.log(response.artists[0].name)
        artistBox(response.artists)
    })
    .catch(error => console.log('error', error));
}
fetchArtist() 

// +++++  DATOS IMAGENES +++++   //
function ArtistImage() {
    let url = `https://api.napster.com/v2.2/artists/${artistId}/images?apikey=${apikey}`
    fetch(url).then((response) => {
        return response.json()
    }).then((result) => {
        artistImage(result.images)
        console.log('Images :>> ', result);
    })
}
ArtistImage()

function topTracks(){
    const myHeaders = new Headers();
    myHeaders.append("apikey", apikey);
    const requestOptions ={
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }
    fetch(`https://api.napster.com/v2.2/artists/${artistId}/tracks/top?apikey=${apikey}`, requestOptions)
    .then(response => response.json())
    .then((result) =>{
        console.log("top tracks", result)
        console.log("lista de tracks", result.tracks)
        topTracksCard(result.tracks)
    })
    .catch(error => console.log('error :>> ', error))
}
topTracks()

function artistBox(artist) {
    const nombre = document.getElementById("nombre");
    const nombreArtista = document.createElement("h2")
    nombreArtista.innerHTML = artist[0].name
    nombre.appendChild(nombreArtista)

    const bioDiv = document.getElementById("artistBio")
    const artistBio = document.createElement("p")
    artistBio.innerHTML = artist[0].bios[0].bio
    bioDiv.appendChild(artistBio)
}

function artistImage(img) {
    const photo = document.getElementById("artistcover");
    const imagen = document.createElement("img");
    imagen.setAttribute("src", img[0].url);
    photo.append(imagen);
    }

// voy a intentar hacer el fetch para hacer el preview of the top traksof the artist 
function topTracksCard (tracks){
    const card = document.getElementById("top-tracks")
    // versuch mit det Counter...
    const trackCountElement = document.getElementById("track-count")
    let trackNumber = 1;
    tracks.forEach(track => {
        const singleTrackContainer = document.createElement("div")
        singleTrackContainer.className = "single-track-container"
        // const trackNumberElement = document.createElement("p");
        // trackNumberElement.innerText = `Track number ${trackNumber}`;
        // trackNumberElement.className = "track-number";
        const trackName = document.createElement("p")
        trackName.innerText = (`${trackNumber}. ${track.name}`)
        trackName.className = "track-name"
        // Audio para los track
        const audio = document.createElement("audio")
        audio.className = "audio-track"
        audio.src = track.previewURL
        audio.type = track.formats[3].name
        audio.controls = true
        singleTrackContainer.append(trackName, audio)
        card.appendChild(singleTrackContainer)
        trackNumber++
    });
}
