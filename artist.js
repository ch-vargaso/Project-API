// Aquí muestro las imagenes que necesito...
// Tengo que filtrar las imagenes por artista
// console.log('location :>> ', location);
const search = location.search;
const urlParameter = new URLSearchParams(search);
const artistId = urlParameter.get("id");

// ARTIST DATA  WITH IMAGES//
function fetchArtistData(){
  try {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", CookieId);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let artistUrl = `https://api.napster.com/v2.2/artists/ ${artistId}?lang=en-EN&apikey=${apikey}`
    let imgDataUrl =`https://api.napster.com/v2.2/artists/${artistId}/images?apikey=${apikey}`
    let urlsArray = [artistUrl, imgDataUrl]
    let promisesArray = urlsArray.map(async (singleUrl)=>{
      const singleResponse = await fetch(singleUrl, requestOptions);
      return await singleResponse.json();
    })
    Promise.all(promisesArray).then((result)=>{
      console.log('Artist with images :>> ', result);
      artistCover(result)
      artistBio(result[0].artists[0])
    })

  } catch (error) {
    console.log('error :>> ', error);
  }
};
fetchArtistData()


function topTracks() {
  const myHeaders = new Headers();
  myHeaders.append("apikey", apikey);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    `https://api.napster.com/v2.2/artists/${artistId}/tracks/top?apikey=${apikey}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      topTracksCard(result.tracks);
    })
    .catch((error) => console.log("error :>> ", error));
}
topTracks();


// Artist Header Info
function artistCover(artist){
  const artistHeader = document.getElementById("artist-container")
  // name artist
  const artistName = document.createElement("div")
  artistName.className = "div-artist-name"
  const name = document.createElement("h2")
  name.innerText = artist[0].artists[0].name;
  artistName.appendChild(name)
  // image
  const artistImage = document.createElement("div")
  artistImage.className = "artist-image"
  const img = document.createElement("img")
  img.setAttribute("src", artist[1].images[0].url)
  artistImage.appendChild(img)
  artistHeader.append(artistName, artistImage)

}
// Artist Biography
function artistBio(artist) {
  const artistInfo = document.getElementById("artist-bio");
  const artistBio = document.createElement("div");
  artistBio.className = "artist-text"
  artistBio.innerHTML = artist.bios[0].bio;
  artistInfo.append(artistBio)
}
// Artist Top Tracks
function topTracksCard(tracks) {
  const card = document.getElementById("top-tracks");
//   const trackCountElement = document.getElementById("track-count");
  let trackNumber = 1;
  tracks.forEach((track) => {
    const singleTrackContainer = document.createElement("div");
    singleTrackContainer.className = "single-track-container";
    const trackName = document.createElement("p");
    trackName.innerText = `${trackNumber}. ${track.name}`;
    trackName.className = "track-name";
    // Audio para los track
    const audio = document.createElement("audio");
    audio.className = "audio-track";
    audio.src = track.previewURL;
    audio.type = track.formats[3].name;
    audio.controls = true;
    singleTrackContainer.append(trackName, audio);
    card.appendChild(singleTrackContainer);
    trackNumber++;
  });
}