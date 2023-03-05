import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let res = [];
  try{
    await fetch(`${config?.backendEndpoint}/reservations`)
    .then(x => x.text())
    .then(y => res=JSON.parse(y));
  }
  catch(err){
    return null;
  }
  console.log(res)
  return res;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations?.length === 0){
    document.getElementById('no-reservation-banner').style.display = 'block'
    document.getElementById('reservation-table-parent').style.display = 'none'
 }else{
    document.getElementById('no-reservation-banner').style.display = 'none'
    document.getElementById('reservation-table-parent').style.display = 'block'
   const tbody = document.getElementById('reservation-table');
   reservations?.map((res)=> {
       const row = document.createElement("tr")
       //row. setAttribute('id', res?.adventure);
       for(var i = 1;i <=Object.keys(res)?.length; i++) row.appendChild(document.createElement("td"))
       const date = new Date(res?.date)
       const time = new Date(res?.time)
       let children = row?.children
       children[7].setAttribute("id", res?.id);
       // document.getElementById(res?.id)?.children[0]?.href = `detail/?adventure=${res?.adventure}`
       children[0].innerHTML = `<a href='/workspace/shivam-singh-kaleyra-ME_QTRIPDYNAMIC/frontend/pages/adventures/detail/?adventure=${res?.adventure}'><strong>${res?.id}</strong></a>`
       children[1].innerHTML = res?.name
       children[2].innerHTML = res?.adventureName
       children[3].innerHTML = res?.person
       children[4].innerHTML = date.toLocaleDateString("en-IN")
       children[5].innerHTML = res?.price
       children[6].innerHTML = time.toLocaleString("en-IN",{day:"numeric", month: 'long', year: "numeric",  hour: "numeric", minute: "numeric", second: "numeric" }).replace(" at",",")
       children[7].innerHTML = `<a class="reservation-visit-button text-white">Visit Adventure</a>`
       children[7].children[0].href =`detail/?adventure=${res?.adventure}`
       tbody?.appendChild(row);
   })
 }
}

export { fetchReservations, addReservationToTable };
