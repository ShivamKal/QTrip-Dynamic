
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  let res = [];
  try{
    await fetch(`${config?.backendEndpoint}/adventures?city=${city}`)
    .then(x => x.text())
    .then(y => res=JSON.parse(y));
  }
  catch(err){
    return null;
  }
  return res;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const ele = document.getElementById("data");
  adventures?.map((adv)=>{
    const anchor = document.createElement("div");
    anchor.className = "col-12 col-md-3 mb-3"
    anchor.innerHTML = `
    <a id=${adv?.id} class="activity-card" href=${"detail/?adventure="+adv?.id}>
      <div class="category-banner m-0 mt-3">${adv?.category}</div>
      <div class="card w-100 h-100">
        <img src=${adv?.image} alt="" class="card-img-top">
        <div class="card-body text-center">
          <div class="row flex-wrap">
            <div class="col-6">
              ${adv?.name}
            </div>
            <div class="col-6">
             ${"₹"+adv?.costPerHead}
            </div>
          </div>
          <div class="row">
          <div class="col-6">
            Duration
          </div>
          <div class="col-6">
           ${adv?.duration}
          </div>
        </div>
        </div>
      </div>
    </a> 
    `
    ele.appendChild(anchor)
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter((places) => (places?.duration>= low && places?.duration<=high))
  return list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if(categoryList?.length === 0) return list 
  return list.filter((places) => categoryList.includes(places?.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters?.duration?.length > 0) list = filterByDuration(list, parseInt(filters?.duration.split('-')[0]), parseInt(filters?.duration.split('-')[1]))
  if(filters?.category?.length > 0) list  = filterByCategory(list, filters?.category)
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  var obj = {...getFiltersFromLocalStorage()}
  if(typeof(filters) === "string"){
    obj={
      ...obj,
      duration : filters
    }
  }else{
    obj={
      ...obj,
      duration: filters?.duration,
      category : filters?.category
    }
  }
  console.log(obj)
  filters = obj;
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem("filters"))
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const ele = document.getElementById("category-list")
  if(filters?.category?.length>0){
    filters?.category?.map((cat) => {
      const anchor = document.createElement("div")
      anchor.className = "category-filter"
      anchor.innerHTML = `<span>${cat}</span>`
      ele.appendChild(anchor)
    })
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
