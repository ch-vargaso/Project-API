// +++++++++ fetch Top 5 Rock +++++++
function rockArtists() {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", CookieId);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    `https://api.napster.com/v2.2/genres/g.5/artists/top?apikey=${apikey}&limit=5&lang=en-US`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("top 5 rock", result);
      artistCard(result.artists);
    })
    .catch((error) => console.log("error", error));
}
rockArtists();

// ++++++ fetch for the Pop Artists ++++++++++

function popArtists() {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", CookieId);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    `https://api.napster.com/v2.2/genres/g.115/artists/top?apikey=${apikey}&limit=5&lang=en-US`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log("top 5 pop", result);
      //  Aquí voy a escribri cosas.... 21-08-23
      const artistIds = result.artists.map((artist) => artist.id);
      fetchArtistDetails(artistIds);
      // Aqußi se resume todos los promise alls.....
      // en estas funciones que son mencionadas anteriormente...
      artistCardPop(result.artists);
    })
    .catch((error) => console.log("error", error));
}
// +++++ cree este promise all para mirar los artistas y hacer fetch de cada uno para mirar los resultados.
function fetchArtistDetails(artistIds) {
  Promise.all(
    artistIds.map((artistId) => {
      return fetch(
        `https://api.napster.com/v2.2/artists/${artistId}?apikey=${apikey}&lang=en-US`
      ).then((response) => response.json());
    })
  )
    .then((artistDetails) => {
      // Aqußi voy más profundo con otro fetch...
      console.log("Pop artist Details :>> ", artistDetails);
      artistDetails.forEach((artist) => {
        const imageEndpoint = artist.artists[0].links.images.href;
        console.log("imageEndpoint :>> ", imageEndpoint);

        fetch(imageEndpoint, `?apikey=${apikey}`)
          .then((response) => response.json())
          .then((imageData) => {
            console.log("imageData :>> ", imageData);
            // const artistImage = imageData.images[0].url;
            // console.log("artistImage :>> ", artistImage);
          });
      });
    })
    .catch((error) => console.log("error :>> ", error));
}
popArtists();
// ++++++ Aquí se hace el loop cambiando el id cada vez, pero es una función con el id ficticio en este momento +++++

function generateImg(url) {
  const rockDiv = document.querySelector("artists-box");
  // Aquí se genera la URL de la imagen
  // console.log('url :>> ', url);
  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.setAttribute("style", "width:200px");
  // con esto se ve el resultado de la imagen como HTML
  // console.log('img :>> ', img);
}

// +++++++++ En esta función se hace el loop haciendo el fetch de cada vez que se cambió el artista ++++++++++++

function getArtistImage(artistId) {
  // console.log("artistId :>> ", artistId);
  const artistUrl = `https://api.napster.com/v2.2/artists/${artistId}/images?apikey=${apikey}`;
  return fetch(artistUrl)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // ++++++++ en este console log se puede ver cada una de las imagenes que quiero utilizar ++++++++
      generateImg(result.images[0].url);
      return result.images[0].url;
    });
}
// ++++++++ Esta funcion puede que no funcione ++++++++ mirarla!!!!!
function artistImage(img) {
  const photo = document.getElementById("pepsi");
  const imagen = document.createElement("img");
  imagen.setAttribute("src", img[3].url);
  console.log("extraccion imagen Artista");
  photo.append(photo);
}

// +++++++ this is the Rock artist Card container +++++++

function artistCard(artists) {
  const card = document.getElementById("artistbox");
  artists.forEach((artist) => {
    getArtistImage(artist.id).then((image) => {
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
      const imagen = document.createElement("img");
      imagen.className = "artist-img";
      imagen.setAttribute("src", image);
      imagen.setAttribute("id", "pepsi");
      const textContainer = document.createElement("div");
      textContainer.className = "text-content";
      const hrText = document.createElement("hr");
      hrText.className = "hr-artist-box";
      const biography = document.createElement("p");
      biography.className = "bio-text";
      biography.textContent = artist.bios[0].bio;
      textContainer.append(hrText, biography);
      const showMore = document.createElement("a");
      showMore.className = "more";
      rockDiv.append(name, imagen, textContainer, showMore);
    });
  });
}

// ++++++ This is the Pop Artist Container +++++
// HAY QUE ASEGURAR ESTA FUNCTION!!!!!!!!!!

function artistCardPop(artists) {
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
    textContainer.append(hrText, biography);

    const showMore = document.createElement("a");
    showMore.className = "more";

    rockDiv.append(name, textContainer, showMore);
  });
}

// ### function for the show more / show less ###

let more = document.querySelectorAll(".more");
for (let i = 0; i < more.length; i++) {
  more[i].addEventListener("click", function () {
    more[i].parentNode.classList.toggle("active");
  });
}
