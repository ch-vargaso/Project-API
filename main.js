// This ist the link for the pop and rock artists //

// console.log(TopPopAndRockArtists);

// Esto es para trabajar con el link

function fetchData1() {
  const myHeaders = new Headers();
  //   myHeaders.append("apikey", apikey);
  myHeaders.append(
    "apikey",
    "MGIwMmYzMmYtYzg1Ni00ZmZmLWI5YzktMWVhNjJkNGU2NjMw"
  );

  const request = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    "https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200",
    request
  )
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
      genreId = "Pop";
    }
    genre.textContent = genreId;
    // solo muestro el primer genero
    const artistBlurbs = document.createElement("td");
    artistBlurbs.textContent = artist.blurbs[0];
    row.append(artistName, genre, artistBlurbs);
  });
};

//  DECIR TODA LA FORMULA EN VOZ ALTA PARA ENTENDER LA LÓGICA!!!
// esta es la opción 2 del loop para escoger genero

const genreOptions = (generos) => {
<<<<<<< HEAD
  const genreOptions = document.getElementById("genreSelection");
  const result = [];
  for (let i = 0; i < generos.lenght; i++) {
    if (generos[i].links.genres.ids.includes("g.5" && "g.115")) {
      result.push(generos[i]);
    }
  }
  console.log(result);
=======
    const genreOptions = document.getElementById("genreSelection");
    const nameSelection = generos.map((genre) => {
        return genre.links.genres.ids;
        // separe solo el array de los ids de genero
    });
    console.log("genre Selection", nameSelection);
    const rock = nameSelection;
    let Rock; 
    let Pop;
    let all;
    if (nameSelection.includes("g.5") && nameSelection.includes("g.115")) {
        all = document.createElement("option")

    } else if (nameSelection.includes("g.5")) {
        Rock = document.createElement("option")
    } else {
        Pop = document.createElement("option")
    }
    
>>>>>>> 5617253 (tratando de tener el pull de Raul)

  // const genreSelection = generos.map((genre) => {
  //     return genre.links.genres.ids;
  //     // separe solo el array de los ids de genero
  // });
  // console.log("genre Selection", genreSelection);
  // //  Aquí puede ser que lo filtre solo por los dos géneros que necesito...
  // const set = new Set(genreSelection);
  // console.log(set);
  //     const uniqueGenres = [...set];
  //     // Aquí cree un duplicado del array genreSelection
  //     console.log("uniqueGenres", uniqueGenres);
  //     // Aquí hice un loop forEach
  //     uniqueGenres.forEach((genre) => {
  //         // creo una option para cada género...
  //         const option = document.createElement("option")
  //         option.setAttribute("value", genre);
  //         option.textContent = genre;
  //         genreOptions.append(option);
  //     })
};

<<<<<<< HEAD
//REVIEW
//la idea de esta función es asignar un evento al select, para que ocurra algo cada vez que se selecciona un género

function addEvents(artists) {
  const selectOption = document.getElementById("genreSelection");
  selectOption.addEventListener("change", () => {
    // console.log("selectOption", selectOption.value);
    genereFilter(artists);
  });
=======
    //  Aquí puede ser que lo filtre solo por los dos géneros que necesito...
    // const set = new Set(nameSelection);
    // console.log(set);
    // const uniqueNames = [...set];
    // // Aquí cree un duplicado del array genreSelection
    // console.log("uniqueGenres", uniqueNames);
    // // Aquí hice un loop forEach 
    // uniqueNames.forEach((genre) => {
    //     // creo una option para cada género... 
    //     const option = document.createElement("option")
    //     option.setAttribute("value", genre);
    //     option.textContent = genre;
    //     genreOptions.append(option);
    // })
>>>>>>> 5617253 (tratando de tener el pull de Raul)
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
  });
  tabla(filteredArtists);
  //   console.log("filteredArtists", filteredArtists);
}

//  Me falta el value

// function filterByGenre() {
//     let search = document.getElementById("user-selection");
//     if (search.value === "All") {
//         const myHeaders = new Headers();
//         myHeaders.append("apikey", apikey);
//         const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };
//         fetch("https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200", requestOptions)
//             .then(response => response.json())
//             .then ((response) => {
//                 console.log("estos son los datos: ",response);
//                 tabla(response.artists)
//             })
//             .catch(error => console.log('error', error));

//     } else if (search.value === "Rock") {
//         const myHeaders = new Headers();
//         myHeaders.append("apikey", apikey);
//         const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };
//         fetch("https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200", requestOptions)
//             .then(response => response.json())
//             .then ((response) => {
//                 console.log("estos son los datos: ",response);
//                 rockTop(response.artists)
//             })
//             .catch(error => console.log('error', error));

//         // console.log("Rockeros");

//     } else if (search.value === "Pop") {
//         const myHeaders = new Headers();
//         myHeaders.append("apikey", apikey);
//         const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//         };
//         fetch("https://api.napster.com/v2.2/genres/g.5,g.115/artists/top?&limit=200", requestOptions)
//             .then(response => response.json())
//             .then ((response) => {
//                 console.log("estos son los datos: ",response);
//                 rockTop(response.artists)
//             })
//             .catch(error => console.log('error', error));
//         // console.log("Poperos");
//     }
// }

// Esto es para agregar un link hacia otra página, es decir otro HTML
//       const a = document.createElement("a")
//       a.setAttribute("href", "artistDetails.html")

// Esto es en caso que nosotros encontremos un error en el código, podemos hacer esto para omitir resultados vacios.

//     //safeguards
//       if (TopPopAndRockArtists[i].bios) {
//         console.log("if");
//       BioA.innerHTML = TopPopAndRockArtists[i].bios[0].bio;
//       } else {
//         console.log("else");
//       BioA.innerHTML = "N/A";
//       }

//  En este caso no encontraba las biografías de algunos, entonces se quebró el código. Para eso se utilizó este if después del loop.
