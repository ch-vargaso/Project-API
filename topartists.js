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
      RockArtistCard(result.artists);
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
      console.log("top 5 pop", result);
      //  Aquí voy a escribri cosas.... 21-08-23
      const artistIds = result.artists.map((artist) => artist.id);
      // fetchArtistDetails(artistIds);
      // Aqußi se resume todos los promise alls.....
      // en estas funciones que son mencionadas anteriormente...
      PopArtistCard(result.artists);
    })
    .catch((error) => console.log("error", error));
}
popArtists();

// ++++++ Aquí se hace el loop cambiando el id cada vez, pero es una función con el id ficticio en este momento +++++
function generateImg(url) {
  const img = document.createElement("img");
  img.setAttribute("src", url);
}
// +++++++++ En esta función se hace el loop haciendo el fetch de cada vez que se cambia el artista ++++++++++++

async function getArtistImage(artistId) {
  // console.log("artistId :>> ", artistId);
  const artistUrl = `https://api.napster.com/v2.2/artists/${artistId}/images?apikey=${apikey}`;
  return fetch(artistUrl)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.images && result.images.length >= 0) {
        // console.log("result.images[0].url :>> ", result.images[0].url);
        generateImg(result.images[0].url);
        console.log('generateImg :>> ', result);
        return result.images[0].url;
      } else {
        error;
      }
    });
}

// +++++++ Rock artist Card container +++++++

function RockArtistCard(artists) {
  const card = document.getElementById("artistbox");
  artists.forEach((artist) => {
    getArtistImage(artist.id).then((image) => {
      const rockDiv = document.createElement("div");
      rockDiv.className = "artists-box";
      card.appendChild(rockDiv);
      // create name and artist link
      const name = document.createElement("h2");
      name.className = "artist-title";
      const artistLink = document.createElement("a");
      const artistId = artist.id;
      const artisUrl = `./artist.html?id=${artistId}`;
      artistLink.textContent = artist.name;
      artistLink.setAttribute("href", artisUrl);
      name.appendChild(artistLink);
      // create the image
      const imagen = document.createElement("img");
      imagen.className = "artist-img";
      imagen.setAttribute("src", image);
      imagen.setAttribute("id", "pepsi");

      // create text container
      const textContainer = document.createElement("div");
      textContainer.className = "text-content";

      const hrText = document.createElement("hr");
      hrText.className = "hr-artist-box";

      const scrollingText = document.createElement("div")
      scrollingText.className = "scrolling-container"

      // create the biography with HTML content
      const biography = document.createElement("p");
      biography.className = "bio-text";
      biography.innerHTML = artist.bios[0].bio;

      // create a container for the function Show more
      const moreContainer = document.createElement("div")
      moreContainer.className = "more-container"
      const divforShowMore = document.createElement("div");
      divforShowMore.className = "div-gradient" 
      const showMore = document.createElement("a");
      showMore.className = "more";
      moreContainer.append(divforShowMore ,showMore);
      scrollingText.append(biography, moreContainer)
      textContainer.append( scrollingText);
      rockDiv.append(name, imagen,hrText, textContainer);
      showMore.addEventListener("click", function(){
        rockDiv.classList.toggle("active");
      })
    });
  });
}


// ++++++ Pop Artist Container +++++

function PopArtistCard(artists) {
  const card = document.getElementById("popcontainer");
  artists.forEach((artist) => {
    getArtistImage(artist.id).then((image) => {
      const rockDiv = document.createElement("div");
      rockDiv.className = "artists-box";
      card.appendChild(rockDiv);

      // create name and artist link
      const name = document.createElement("h2");
      name.className = "artist-title";
      const artistLink = document.createElement("a");
      const artistId = artist.id;
      const artisUrl = `./artist.html?id=${artistId}`;
      artistLink.textContent = artist.name;
      artistLink.setAttribute("href", artisUrl);
      name.appendChild(artistLink);
      // create the image
      const imagen = document.createElement("img");
      imagen.className = "artist-img";
      imagen.setAttribute("src", image);
      imagen.setAttribute("id", "pepsi");

      // create text container
      const textContainer = document.createElement("div");
      textContainer.className = "text-content";

      const hrText = document.createElement("hr");
      hrText.className = "hr-artist-box";

      const scrollingText = document.createElement("div")
      scrollingText.className = "scrolling-container"

      // create the biography with HTML content
      const biography = document.createElement("p");
      biography.className = "bio-text";
      biography.innerHTML = artist.bios[0].bio;

    // create a container for the function Show more
      const moreContainer = document.createElement("div")
      moreContainer.className = "more-container"
      const divforShowMore = document.createElement("div");
      divforShowMore.className = "div-gradient" 
      const showMore = document.createElement("a");
      showMore.className = "more";
      moreContainer.append(divforShowMore ,showMore);
      scrollingText.append(biography, moreContainer)
      textContainer.append( scrollingText);
      rockDiv.append(name, imagen,hrText, textContainer);
      showMore.addEventListener("click", function(){
        rockDiv.classList.toggle("active");
      })
    });
  });
};

// ### function for the show more / show less ###
document.addEventListener("DOMContentLoaded", function(){
  const moreLinks = document.querySelectorAll(".more");
  moreLinks.forEach(function(moreLink){
    moreLink.addEventListener("click", function(){
      const artistBox = moreLink.closest(".artists-box");
      artistBox.classList.toggle("active")
    });
  });
});