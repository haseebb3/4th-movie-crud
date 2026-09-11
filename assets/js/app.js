const showModelBtn = document.getElementById("showModelBtn");
const movieModel = document.getElementById("movieModel");
const backDrop = document.getElementById("backDrop");
const modelCloseBtn = document.querySelectorAll(".modelCloseBtn");
const movieForm = document.getElementById("movieForm");
const allCardsContainer = document.getElementById("allCardsContainer");
const updateMovieBtn = document.getElementById("updateMovieBtn");

const defaultMovies = [
  {
    id: "1",
    movieName: "Sairat",
    movieImage:
      "https://upload.wikimedia.org/wikipedia/en/a/a1/Sairat_Marathi_Film_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    movieDescription: `A young couple from different social backgrounds falls deeply in love, but their relationship faces strong opposition from their families and society.Elite Indian Air Force pilots come together to face a major national threat while dealing with their personal struggles.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, veritatis dolore, quam quaerat aliquam odio ex eveniet voluptatibus voluptates similique dolor earum accusantium? Voluptatibus tempora rerum expedita atque maxime perspiciatis.
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis corporis quos consequatur culpa neque nostrum pariatur alias eveniet recusandae esse cumque, officiis eos aut perspiciatis ipsa, quo minus atque. Doloremque`,
    movieRating: 5,
  },
  {
    id: "2",
    movieName: "Natsamrat",
    movieImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-ED-zUi5XRJQGlqkxtMYDsyuN6goc8FIoBEg3Ry20bl_sx4OduamoEErDT-ofT4glx6zPQ&s=10",
    movieDescription:
      "A legendary Marathi stage actor retires from his career and struggles to find meaning and dignity as he faces difficult relationships and the realities of old age.",
    movieRating: 5,
  },
  {
    id: "3",
    movieName: "Ved",
    movieImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2LW5Pnvnp0hALFbT1neuOzDZqKv1pXKL00_xOMMPPFYdIQuivOCjuS5FefpahjxPM9eBR&s=10",
    movieDescription:
      "A broken man trapped in alcoholism and heartbreak gets a chance to rebuild his life when the people around him help him rediscover love and hope.Elite Indian Air Force pilots come together to face a major national threat while dealing with their personal struggles.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, veritatis dolore, quam quaerat aliquam odio ex eveniet voluptatibus voluptates similique dolor earum accusantium? Voluptatibus tempora rerum expedita atque maxime perspiciatis Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis corporis quos consequatur culpa neque nostrum pariatur alias eveniet recusandae esse cumque, officiis eos aut perspiciatis ipsa, quo minus atque.",
    movieRating: 4,
  },
  {
    id: "4",
    movieName: "Duniyadari",
    movieImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbT584Wx8kvZJIv7RCzdtswF5DCr-IcNGjSzCPlic-oN9bG9agIK90q3KP_AeFILZYnsql&s=10",
    movieDescription:
      "Set against the backdrop of college life, friendship, love, and heartbreak, the story follows a group of friends as they navigate the unforgettable experiences of youth.",
    movieRating: 4,
  },
  {
    id: "5",
    movieName: "Mumbai Pune Mumbai",
    movieImage:
      "https://m.media-amazon.com/images/M/MV5BNjljOGQ2M2UtNGEwMy00MmUxLWI3NjItZDBjMWUxYmU2ZTM0XkEyXkFqcGc@._V1_.jpg",
    movieDescription:
      "A woman from Mumbai and a man from Pune meet unexpectedly and spend a day exploring the city while slowly discovering their feelings for each other.",
    movieRating: 4,
  },
];

const defaultMovieImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCbqzXvci_FPRpXN7pt_FHvLh4IQ48CSYgVY0tA3Wt6Emn2tt8fNi5YQd&s=10";

let localsData = localStorage.getItem("marathiMoviesArray");
let marathiMovieArr;
if (localsData) {
  marathiMovieArr = JSON.parse(localsData);
} else {
  marathiMovieArr = defaultMovies;
  localStorage.setItem("marathiMoviesArray", JSON.stringify(marathiMovieArr));
}

function setLocalStorage() {
  localStorage.setItem("marathiMoviesArray", JSON.stringify(marathiMovieArr));
}

function setRating(rating) {
  if (rating > 4) {
    return "badge-success";
  } else if (rating > 3 && rating <= 4) {
    return "badge-warning";
  } else {
    return "badge-danger";
  }
}

function snackBar(msg) {
  Swal.fire({
    text: msg,
    icon: "success",
    timer: 3000,
  });
}

function renderMovies(arr) {
  let res = ``;
  arr.forEach((movie) => {
    res += `
        <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" id="${movie.id}">
          <div class="card cardContainer">
            <div class="card-header p-2 d-flex justify-content-between">
              <h4 class="movieTitle">${movie.movieName}</h4>
              <h5><span class="badge ${setRating(movie.movieRating)}">${movie.movieRating}</span></h5>
            </div>
            <div class="card-body p-2">
              <figure>
                <img src="${movie.movieImage || defaultMovieImage}" alt="${movie.movieName}">
                <figcaption>
                  <h4>${movie.movieName}</h4>
                  <p>${movie.movieDescription}</p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer p-2 d-flex justify-content-between">
              <button onclick="onMovieEditHandler(this)" class="btn btn-sm secondary-btn" id="editBtn">Edit</button>
              <button onclick="onMovieDeleteHandler(this)" class="btn btn-sm primary-btn" id="deleteBtn">Delete</button>
            </div>
          </div>
        </div>
      `;
  });
  allCardsContainer.innerHTML = res;
}

renderMovies(marathiMovieArr);

//create
function onMovieSubmitHandler(event) {
  event.preventDefault();
  const movieNameControl = document.getElementById("movieName");
  const movieImageControl = document.getElementById("movieImage");
  const movieDescriptionControl = document.getElementById("movieDescription");
  const movieRatingControl = document.getElementById("movieRating");

  const movieObj = {
    id: Date.now().toString(),
    movieName: movieNameControl.value,
    movieImage: movieImageControl.value,
    movieDescription: movieDescriptionControl.value,
    movieRating: movieRatingControl.value,
  };
  marathiMovieArr.unshift(movieObj);
  setLocalStorage();
  let newMovie = document.createElement("div");
  newMovie.className = "col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4";
  newMovie.id = movieObj.id;
  newMovie.innerHTML = `
    <div class="card cardContainer">
            <div class="card-header p-2 d-flex justify-content-between">
              <h4 class="movieTitle">${movieObj.movieName}</h4>
              <h5><span class="badge ${setRating(movieObj.movieRating)}">${movieObj.movieRating}</span></h5>
            </div>
            <div class="card-body p-2">
              <figure>
                <img src="${movieObj.movieImage || defaultMovieImage}" alt="${movieObj.movieName}">
                <figcaption>
                  <h4>${movieObj.movieName}</h4>
                  <p>${movieObj.movieDescription}</p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer p-2 d-flex justify-content-between">
              <button onclick="onMovieEditHandler(this)" class="btn btn-sm secondary-btn" id="editBtn">Edit</button>
              <button onclick="onMovieDeleteHandler(this)" class="btn btn-sm primary-btn" id="deleteBtn">Delete</button>
            </div>
          </div>
  `;

  allCardsContainer.prepend(newMovie);
  onModelToggler();
  snackBar(`Movie ${movieObj.movieName} added successfully`);
}

//edit
function onMovieEditHandler(ele) {
  onModelToggler();
  const addMovieBtn = document.getElementById("addMovieBtn");
  const editId = ele.closest(".cardContainer").parentElement.id;
  localStorage.setItem("updateId", editId);
  const editObj = marathiMovieArr.find((movie) => movie.id === editId);
  //patch value
  const movieNameControl = document.getElementById("movieName");
  const movieImageControl = document.getElementById("movieImage");
  const movieDescriptionControl = document.getElementById("movieDescription");
  const movieRatingControl = document.getElementById("movieRating");

  movieNameControl.value = editObj.movieName;
  movieImageControl.value = editObj.movieImage;
  movieDescriptionControl.value = editObj.movieDescription;
  movieRatingControl.value = editObj.movieRating;

  addMovieBtn.classList.add("d-none");
  updateMovieBtn.classList.remove("d-none");
}

//update
function onMovieUpdateHandler() {
  const updateId = localStorage.getItem("updateId");
  localStorage.removeItem("updateId");
  const movieNameControl = document.getElementById("movieName");
  const movieImageControl = document.getElementById("movieImage");
  const movieDescriptionControl = document.getElementById("movieDescription");
  const movieRatingControl = document.getElementById("movieRating");
  const updatedObj = {
    id: updateId,
    movieName: movieNameControl.value,
    movieImage: movieImageControl.value,
    movieDescription: movieDescriptionControl.value,
    movieRating: movieRatingControl.value,
  };
  const updateIndex = marathiMovieArr.findIndex(
    (movie) => movie.id === updateId,
  );
  marathiMovieArr[updateIndex] = updatedObj;
  setLocalStorage();

  let updateMovie = document.getElementById(updateId);
  updateMovie.innerHTML = `
    <div class="card cardContainer">
            <div class="card-header p-2 d-flex justify-content-between">
              <h4 class="movieTitle">${updatedObj.movieName}</h4>
              <h5><span class="badge ${setRating(updatedObj.movieRating)}">${updatedObj.movieRating}</span></h5>
            </div>
            <div class="card-body p-2">
              <figure>
                <img src="${updatedObj.movieImage || defaultMovieImage}" alt="${updatedObj.movieName}">
                <figcaption>
                  <h4>${updatedObj.movieName}</h4>
                  <p>${updatedObj.movieDescription}</p>
                </figcaption>
              </figure>
            </div>
            <div class="card-footer p-2 d-flex justify-content-between">
              <button onclick="onMovieEditHandler(this)" class="btn btn-sm secondary-btn" id="editBtn">Edit</button>
              <button onclick="onMovieDeleteHandler(this)" class="btn btn-sm primary-btn" id="deleteBtn">Delete</button>
            </div>
          </div>
  `;
  addMovieBtn.classList.remove("d-none");
  updateMovieBtn.classList.add("d-none");
  onModelToggler();
  snackBar(`Movie ${updatedObj.movieName} is added successfully`);
}

//delete
function onMovieDeleteHandler(ele) {
  const deleteId = ele.closest(".cardContainer").parentElement.id;
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this movie?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const deleteIndex = marathiMovieArr.findIndex(
        (movie) => movie.id === deleteId,
      );
      marathiMovieArr.splice(deleteIndex, 1);
      setLocalStorage();
      let delelteMovie = document.getElementById(deleteId);
      delelteMovie.remove();
      console.log(deleteIndex);
      Swal.fire({
        title: "Deleted!",
        text: "Your movie has been deleted.",
        icon: "success",
      });
    }
  });
}

function onModelToggler() {
  movieModel.classList.toggle("active");
  movieRating;
  backDrop.classList.toggle("active");
  movieForm.reset();
  addMovieBtn.classList.remove("d-none");
  updateMovieBtn.classList.add("d-none");
}

showModelBtn.addEventListener("click", onModelToggler);
modelCloseBtn.forEach((btn) => {
  btn.addEventListener("click", onModelToggler);
});
movieForm.addEventListener("submit", onMovieSubmitHandler);
updateMovieBtn.addEventListener("click", onMovieUpdateHandler);


document.addEventListener('error', function (event) {
    // Check if the element that failed to load is an <img> tag
    if (event.target.tagName.toLowerCase() === 'img') {
        event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCbqzXvci_FPRpXN7pt_FHvLh4IQ48CSYgVY0tA3Wt6Emn2tt8fNi5YQd&s=10';
    }
}, true); // The 'true' flag ensures the error event is captured during the capturing phase
