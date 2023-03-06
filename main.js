console.log("funcionaaaaaaa");

// Esto es para trabajar con el link

function fetchData1() {
    const myHeaders = new Headers();
    myHeaders.append("apikey", apikey);

  const request = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    "https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200", request)
    .then((response) => response.json())
    .then((response) => {
      console.log("estos son los datos: ", response);
      tabla(response.artists);
      genreOptions(response.artists);
      //Llamamos la funcon addEvents para que , una vez generada la tabla, se añada el evento al elemento
      addEvents(response.artists);
      // rockTop(response.artists)
    })
    .catch((error) => console.log("error", error));
}
fetchData1();

// ******************     Esta es la tabla       *****************

const tabla = (artistas) => {
    const table = document.getElementById("table1");
    table.textContent = "";
    artistas.forEach((artist) => {
        const row = document.createElement("tr");
        table.appendChild(row);
        const artistName = document.createElement("td");
        const artistLink = document.createElement("a");
        const aritstId = artist.id;
        const artisUrl = `./artist.html?id=${aritstId}`;
        artistLink.textContent = artist.name;
        artistLink.setAttribute("href", artisUrl);
        artistName.appendChild(artistLink);
        const genre = document.createElement("td");
        let genreList = artist.links.genres.ids;
        let genreId;
        if (genreList.includes("g.5") && genreList.includes("g.115")) {
            genreId = "Rock/Pop";
        } else if (genreList.includes("g.5")) {
            genreId = "Rock";
        } else {
            genreId = "Pop"
        }
        genre.textContent = genreId;
        const artistBlurbs = document.createElement("td");
        artistBlurbs.textContent = artist.blurbs[0];
    })
}

//  DECIR TODA LA FORMULA EN VOZ ALTA PARA ENTENDER LA LÓGICA!!! 

//REVIEW
//la idea de esta función es asignar un evento al select, para que ocurra algo cada vez que se selecciona un género

function addEvents(artists) {
  const selectOption = document.getElementById("genreSelection");
  selectOption.addEventListener("change", () => {
    // console.log("selectOption", selectOption.value);
    genereFilter(artists);
  });
}
      
//REVIEW
// la idea de esta función es filtrar el total de resultados para mostrar :
//1. si la opcion seleccionada es "POP", o "ROCK": mostrar los artistas que contienen uno de los dos, o los dos.
//2.Si la opcion seleccionada es "Rock && Pop": mostrar SOLO los que contengan LOS DOS.
function genereFilter(artists) {
    console.log("artists", artists);
    const selectOptionValue = document.getElementById("genreSelection").value;

    const filteredArtists = artists.filter((artist) => {
        const artistGenereArray = artist.links.genres.ids;
        if (selectOptionValue === "all") {
            return (
                artistGenereArray.includes("g.5") && artistGenereArray.includes("g.115")
            );
        } else {
            return artistGenereArray.includes(selectOptionValue);
        }
    })
    tabla(filteredArtists);
        console.log("filteredArtists", filteredArtists);
}
    