import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split('=')[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    let res = [];
    try{
      await fetch(`${config?.backendEndpoint}/adventures/detail/?adventure=${adventureId}`)
      .then(x => x.text())
      .then(y => res=JSON.parse(y));
    }
    catch(err){
      return null;
    }
    return res;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure)
  const name = document.getElementById('adventure-name')
  const subtitle = document.getElementById('adventure-subtitle')
  const photoGallery = document.getElementById('photo-gallery')
  const adventureContent = document.getElementById('adventure-content')
  name.innerHTML = adventure?.name
  subtitle.innerHTML = adventure?.subtitle
  adventure?.images?.map((src)=>{
    const imgwrapper = document.createElement('div')
    const img = document.createElement('img')
    img.className = "activity-card-image"
    img.src = src
    imgwrapper.appendChild(img)
    photoGallery.appendChild(imgwrapper)
  });
  adventureContent.innerHTML = adventure?.content
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById('photo-gallery')
  photoGallery.innerHTML = ''
  photoGallery.className ="carousel slide"
  photoGallery.dataset.bsRide = "carousel"
  photoGallery.innerHTML = `  
  <div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
`
  const carouselInner = document.createElement('div')
  carouselInner.className ="carousel-inner"
  images?.map((src, i)=>{
    const imgwrapper = document.createElement('div')
    const img = document.createElement('img')
    imgwrapper.className = `carousel-item ${ i == 0 ? "active" :""}`
    img.className ="activity-card-image"
    img.src = src
    imgwrapper.appendChild(img)
    carouselInner.appendChild(imgwrapper)
  });
  photoGallery.appendChild(carouselInner)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const ele1 = document.getElementById("reservation-panel-sold-out")
  const ele2 = document.getElementById("reservation-panel-available")
  const cost = document.getElementById("reservation-person-cost")
  if(adventure?.available){
    ele1.style.display = "none";
    ele2.style.display = "block";
    cost.innerHTML = adventure?.costPerHead
  }else{
    ele2.style.display = "none";
    ele1.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const cost = document.getElementById("reservation-cost")
  cost.innerHTML = (adventure?.costPerHead*parseInt(persons||'0')).toString()
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 const myForm=document.getElementById("myForm");
 myForm.addEventListener("submit",async(e)=>{
   e.preventDefault();
   let  data={
     name:myForm.elements["name"].value,
     date:new Date(myForm.elements["date"].value),
     person:myForm.elements["person"].value,
     adventure:adventure["id"]
   }
   try{
     const url=`${config.backendEndpoint}/reservations/new`;
     const res=await fetch(url,{
       method:"POST",
      headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
     });
    alert("success");
    window.location.reload();
   }
   catch(error){
     console.log(error);
     alert("failed");

   }
 });
     

}   

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const banner= document.getElementById('reserved-banner')
  if(!adventure?.reserved){
    banner.style.display = "none"
  }else{
    banner.style.display = "block"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
