import config from "../conf/index.js";

async function init() {


  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {

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
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

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

}

export { init, fetchCities, addCityToDOM };
