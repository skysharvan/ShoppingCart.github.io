let shop = document.getElementById('shop');
// let basket = JSON.parse(localStorage.getItem("data"))||[];

let basket = JSON.parse(localStorage.getItem("data")) ||[];
let generateShop = () =>{
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id , name , price , desc , img} = x;
        let search = basket.find((x) => x.id === id ) || [];
         return `
         <div id = product-id-${id} class="item">
         <img width="150" src=${img} alt="">
           <div class="details">
             <h3>${name}</h3>
             <p>${desc}</p>
             <div class="price-quantity">
                 <h2>$ ${price}</h2>


                 <div class="buttons">
                     <i onclick="decrement(${id})" class="bi bi-dash-circle-fill"></i>
                     <div id=${id} class="quantity">
                     ${search.item === undefined ? 0 : search.item}
                     </div>
                     <i onclick="increment(${id})" class="bi bi-plus-circle-fill"></i>
                 </div>


             </div>
           </div>
     </div>`
    }).join(""));
};

generateShop();

let increment = (id)=>{
    let selectedIntem = id;
    let search = basket.find((x)=>x.id === selectedIntem.id);

    if(search === undefined){
        basket.push({
            id: selectedIntem.id,
            item: 1,
         })
    }else{
        search.item +=1;
    }
    update(selectedIntem.id);
   localStorage.setItem("data" , JSON.stringify(basket));
//  console.log(basket)
 
};
let decrement = (id)=>{
    let selectedIntem = id;
    let search = basket.find((x)=>x.id === selectedIntem.id) ;
    if(search === undefined)
      return ;
    else if(search.item === 0){
       return ;
    }else{
        search.item -=1 ;
    }
    
 
//  console.log(basket)
 update(selectedIntem.id);
  basket = basket.filter((x) => x.item !== 0);
localStorage.setItem("data" , JSON.stringify(basket));

 
};
let update = (id)=>{
    let search = basket.find((x)=> x.id === id );
//  console.log(search.item);
 document.getElementById(id).innerHTML = search.item;
 calculation();
};

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
//  console.log("cal fn is running")
cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x , y) => x+y , 0 );
  console.log(basket.map((x)=>x.item).reduce((x , y) => x+y , 0 ));
};

 calculation();


