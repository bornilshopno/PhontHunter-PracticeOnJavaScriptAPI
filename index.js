const loadAllPhones=async(status,brandName)=>{
       document.getElementById('spinner').style.display='none';

 
    let response  = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`);
    let data= await response.json();

    /*
    displayAllPhone(data.data);

    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    .then(res=>res.json())
    .then(data=> {if (data.data) {
        newData.push(data.data);
      }})

  */  

    if(status===true){
        displayAllPhone(data.data)
    }
    else{
        displayAllPhone(data.data.slice(0,5))
    }

}
const displayAllPhone=(phones)=>{
    const phoneContainer=document.getElementById('phones-container');
    phones.forEach(phone => {
        const{brand, image, slug}=phone;
        console.log(phone);
const div=document.createElement("div");
div.style.paddingTop="20px";
div.innerHTML=`
<div class="card bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick=phoneDetail('${slug}') class="btn btn-primary">Show Details</button>
    </div>


  </div>
</div>
`    
phoneContainer.appendChild(div);    
    });
console.log(phones)  
}

const handleShowAll=()=>{
loadAllPhones(true, 'iphone')

}

const handleSearch=()=>{
    const searchText = document.getElementById("search-box").value;
document.getElementById('spinner').style.display='block';
    setTimeout(function(){
       loadAllPhones(false,searchText)
    },3000)
}
const phoneDetail=async(slugs)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data=await res.json();
    console.log(data.data);

    const{brand,mainFeatures,slug}=data.data;

    const modalContainer=document.getElementById('modal-container');
    modalContainer.innerHTML=`
    <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="pt-4">${mainFeatures.chipSet}</p>
       <p class="pb-4">${slug}</p>
      <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
    `



    my_modal_2.showModal()
 
}

loadAllPhones(false, 'iphone')
