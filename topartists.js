// Aquí muestro las imagenes que necesito...
// Tengo que filtrar las imagenes por artista 
// console.log('location :>> ', location);
const search = location.search
const urlParameter = new URLSearchParams(search)
const artistId = urlParameter.get("id")

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
    // ("https://api.napster.com/v2.2/artists/"+artistId, requestOptions)
    .then(response => response.json())
    .then ((response) => {
        console.log("datos un artista: ", response);
    })
    .catch(error => console.log('error', error));
}
fetchArtist() 

// +++++  Fetch for images +++++   //

function ArtistImage() {
    let url = `https://api.napster.com/v2.2/artists/art.69088/images?apikey=${apikey}`
    fetch(url).then((response) => {
        return response.json()
    }).then((result) => {
        console.log("Imagenes", result.images)
        artistImage(result.images)
    })
}
ArtistImage()

function artistImage(img) {
    const photo = document.getElementById("artists-box");
    const imagen = document.createElement("img");
    imagen.setAttribute("src", img[3].url);
    console.log ("hola")
    // photo.append(photo);
    }

// ++++++++  function to obtain each id  +++++++++

function idArtist (artists){
    let listaID = []
    artists.forEach((artist)=>{
        const artistId = artist.id;
        listaID.push(artistId);
        // console.log("lo logre???",artistId);
    })
    console.log(listaID);
}

// +++++++++ fetch Top 5 Rock +++++++

function rockArtists(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "_pxhd=90ad0508f600bfb84cb526a52401c13a7c1a02090ff77ed275698ffd087ce516:67f3c125-be13-11ed-ae77-6d6a70485758");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://api.napster.com/v2.2/genres/g.5/artists/top?apikey=${apikey}&limit=5&lang=en-US`, requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log("top 5 rock",result)
          artistCard(result.artists)
          idArtist(result.artists)
        })
    .catch(error => console.log('error', error));
}
rockArtists()

// ++++++ fetch for the Pop Artists ++++++++++

function popArtists(){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "_pxhd=90ad0508f600bfb84cb526a52401c13a7c1a02090ff77ed275698ffd087ce516:67f3c125-be13-11ed-ae77-6d6a70485758");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`https://api.napster.com/v2.2/genres/g.115/artists/top?apikey=${apikey}&limit=5&lang=en-US`, requestOptions)
      .then(response => response.json())
      .then((result) => {
          console.log("top 5 pop",result)
          artistCardPop(result.artists)
        })
    .catch(error => console.log('error', error));
}
popArtists()

// +++++++ this is the Rock artist card container +++++++

function artistCard (artists){
    const card = document.getElementById("artistbox");
    artists.forEach((artist) => {
        const rockDiv = document.createElement("div");
        rockDiv.className = "artists-box";
        card.appendChild(rockDiv);
        const name = document.createElement("h2");
        name.className = "artist-title";
        const artistLink = document.createElement("a");
        const artistId = artist.id;
        const artisUrl = `./artist.html?id=${artistId}`;
        artistLink.textContent = artist.name;
        artistLink.setAttribute("href", artisUrl);
        name.appendChild(artistLink);
        const textContainer = document.createElement("div");
        textContainer.className = "text-content";
        const hrText = document.createElement("hr");
        hrText.className = "hr-artist-box";
        const biography = document.createElement("p");
        biography.className = "bio-text";
        biography.textContent = artist.bios[0].bio;
        textContainer.append(hrText, biography)
        const showMore = document.createElement("a");
        showMore.className = "more";
        rockDiv.append(name, textContainer, showMore);
    });
}
// ++++++ This is the Pop Artist Container +++++

function artistCardPop (artists){
    const card = document.getElementById("popcontainer");
    artists.forEach((artist) => {
        const rockDiv = document.createElement("div");
        rockDiv.className = "artists-box";
        card.appendChild(rockDiv);
        const name = document.createElement("h2");
        name.className = "artist-title";
        const artistLink = document.createElement("a");
        const artistId = artist.id;
        const artisUrl = `./artist.html?id=${artistId}`;
        artistLink.textContent = artist.name;
        artistLink.setAttribute("href", artisUrl);
        name.appendChild(artistLink);


        const textContainer = document.createElement("div");
        textContainer.className = "text-content";
        const hrText = document.createElement("hr");
        hrText.className = "hr-artist-box";
        const biography = document.createElement("p");
        biography.className = "bio-text";
        biography.textContent = artist.bios[0].bio;
        textContainer.append(hrText, biography)
        const showMore = document.createElement("a");
        showMore.className = "more";
        rockDiv.append(name, textContainer, showMore);
    });
}

// ### function for the show more / show less ### 

let more = document.querySelectorAll('.more');
for (let i = 0; i < more.length; i++){
    more[i].addEventListener("click", function(){
        more[i].parentNode.classList.toggle("active")
    })
}

// necesito hacer un loop para incluir cada llamada del Fetch y asignar ese id a mi url, 
// después necesito entrar en ese "path" y buscar la imagen que quiero... que sería algo así como 
// artista.url...
