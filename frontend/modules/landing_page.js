import config from "../conf/index.js";

async function init() {
<<<<<<< HEAD
  let cities = await fetchCities();
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  // console.log("From init()")
  // console.log(config?.backendEndpoint)
=======
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
}

//Implementation of fetch call
async function fetchCities() {
<<<<<<< HEAD
  let res = [];
  try{
    await fetch(`${config?.backendEndpoint}/cities`)
    .then(x => x.text())
    .then(y => res=JSON.parse(y));
  }
  catch(err){
    return null;
  }
  return res;
=======
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
<<<<<<< HEAD
    const ele = document.getElementById("data");
    const anchor = document.createElement("div");
    anchor.className = "col-12 col-sm-6 col-lg-3 mb-4"
    anchor.innerHTML = `
    <a id=${id} href=${'pages/adventures/?city='+id}>
      <div class="tile">
        <img src=${image} alt=${city} />
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
    `
    ele.appendChild(anchor)
=======

>>>>>>> 04a35f749ba52a552d9f517016c4c27857cb4e5f
}

export { init, fetchCities, addCityToDOM };
