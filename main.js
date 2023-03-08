
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
    // I had problems with the version 2.2. reason why I'm using this alternative. 

    //   "https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200", request)
      "https://api.napster.com/v2.0/genres/g.5,g.115/artists/top?apikey=ODFkZWJiOTAtMzAwOS00MzQ1LTg0YTctY2ZiMDdjN2MyNWIy")
    .then((response) => response.json())
    .then((response) => {
        console.log("estos son los datos: ", response);
        // Desde aquí "controllerFunction" llamo los console.log de mis funciones para 
        // interactuar con el fetch
        controllerFunction(response.artists)
    })
    .catch((error) => console.log("error", error));
}
fetchData1();
// ******* Aquí hago los llamados para después solo hacer un llamado al fetch *******
//             ********** desde aquí controlo las funciones *********
const controllerFunction = (artists) => {
    tabla(artists);
//Llamamos la funcion addEvents para que , una vez generada la tabla, se añada el evento al elemento
    addEvents(artists);
    genereFilter(artists)
    searchEvents(artists);
}

// ******************     Esta es la tabla       *****************

const tabla = (artistas) => {
    const table = document.getElementById("table1");
    table.textContent = " ";
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
        row.append(artistName, genre, artistBlurbs);
    });
};

//  DECIR TODA LA FORMULA EN VOZ ALTA PARA ENTENDER LA LÓGICA!!! 


// REVIEW
// la idea de esta función es asignar un evento al select, para que ocurra algo cada vez que se selecciona un género

function addEvents(artists) {
  const selectOption = document.getElementById("genreSelection");
    selectOption.addEventListener("change", (event) => {
        if (event.value === "all") {
            tabla(artists)
        } else {
            // Aqußi estoy inseguro de si esto funciona... 
            console.log("selectOption", selectOption.value);
            genereFilter(artists);
        } 
  });
  const checkBoxes = document.querySelectorAll("input[type='checkbox']");
  console.log("Check Box", checkBoxes);
  checkBoxes.forEach((checkbox)=>{
    checkbox.addEventListener("click", () =>{
        console.log("checkbox is working");
        filterByCheckBox(artists)
    })
  })
}
      
//REVIEW
// la idea de esta función es filtrar el total de resultados para mostrar :
//1. si la opcion seleccionada es "POP", o "ROCK": mostrar los artistas que contienen uno de los dos, o los dos.
//2.Si la opcion seleccionada es "Rock && Pop": mostrar SOLO los que contengan LOS DOS.
// function genereFilter(artists) {
//     // console.log("artists", artists);
//     const selectOptionValue = document.getElementById("genreSelection").value;

//     const filteredArtists = artists.filter((artist) => {
//         const artistGenereArray = artist.links.genres.ids;
//         if (selectOptionValue === "all") {
//             return (
//                 artistGenereArray.includes("g.5") && artistGenereArray.includes("g.115")
//             );
//         } else {
//             return artistGenereArray.includes(selectOptionValue);
//         }
//     })
//     tabla(filteredArtists);
//     // console.log("filteredArtists", filteredArtists);
// }


// ++++++ Experimento para Filtrar por Nombre +++++++

// ++++++++ Este es mi experimento para terminar de filtrar ++++++++

function genereFilter(artists) {
    const selectOptionValue = document.getElementById("genreSelection").value;
    console.log(selectOptionValue);
    let filteredArtists; 
    if (selectOptionValue != "all"){
         filteredArtists = artists.filter((artist) => {
            const artistGenereArray = artist.links.genres.ids;
            if (artistGenereArray.includes("g.5") && artistGenereArray.includes("g.115")){
                return selectOptionValue === "pop&rock";
            } else if (artistGenereArray.includes("g.115")){
                return selectOptionValue === "pop";
            } else if (artistGenereArray.includes("g.5")){
                return selectOptionValue === "rock";
            } else { 
                console.log("algo salio mal");
            }
        })
    }else {
        filteredArtists = artists
    }
    tabla(filteredArtists);
}
    
//  Esto pertenece a AddEvents pero lo estoy llamando así por experimentar 
const searchEvents = (artistas) => { 
    // se pone vacio para que el search lo rellene...
    let artistName = ""
    // Hago del target del id al cual quiero influenciar
    const searchInput = document.getElementById("searchArtist2")
    searchInput.addEventListener("input", (event) => {
        // console.log(event.target.value);
        // console.log("input event ", event);
        artistName = event.target.value
        // console.log("artistName ", artistName); 
    });
    // Esto se hace para que el computador sepa que tecla estamos presionando con el evento "keydown"
    searchInput.addEventListener("keydown", (event) => {
        // console.log("keyboard event", event);
        if (event.key === "Enter") {
            // console.log("do something");
            let nameInArray = uppercase(artistName)
            // console.log("busqueda", nameInArray);
            let result = artistas.filter( 
                artista  => artista.name === nameInArray
            )  
            tabla (result);     
        }
    })
}
//  Ahora llamo la función arriba en (controllerFunction)

function uppercase(name) {
    let array1 = name.split(' ');
    var newarray1 = [];
    for (let x = 0; x < array1.length; x++){
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
}

const filterByCheckBox = (artists) =>{
    const checkBoxes = document.querySelectorAll("input[type='checkbox']:checked");
    console.log("checkboxes inside Filter Function", checkBoxes);
    const checkBoxesValues = Array.from(checkBoxes).map((checkbox)=>{
        return checkbox.value
    })
    console.log("check boxes values",checkBoxesValues);
    let result = optionAlphabetical(artists) 
    tabla(result)
}

// #### function to organize alphafetically the artists names #####
function optionAlphabetical (artistas){
    let namesArray = [];
    let sortedArtistsObjects=[];
    artistas.forEach((artista) => {
        const artistName = artista.name;
        namesArray.push(artistName);
    });
    namesArray.sort()
    for (let i = 0; i < namesArray.length; i ++){
        let artistName = namesArray[i]
        // console.log(namesArray[i]);
        let result = artistas.filter( 
            artista  => artista.name === artistName
        )
        sortedArtistsObjects.push(result[0]);
    }
    // console.log(sortedArtistsObjects);
    return sortedArtistsObjects
}

