let lebel = document.getElementById('lebel');
let shoppingCart = document.getElementById('shopping-cart');

console.log();

let basket = JSON.parse(localStorage.getItem("data"))||[];

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
//  console.log("cal fn is running")
cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x , y) => x+y , 0 );
  console.log(basket.map((x)=>x.item).reduce((x , y) => x+y , 0 ));
};

 calculation();

 let generateCartItems = () =>{
        if(basket.length !== 0){
           return (shoppingCart.innerHTML = basket
            .map((x)=>{
                // console.log(x)
                let {id , item} = x;
                let search = shopItemsData.find((y)=> y.id === id)|| [];
                let {img , name , price} = search;
                return `
                <div class = "cart-item">
                 <img width="100px" src="${img}" alt"">
                   <div class="details">
                      <div class="title-price-x">
                            <h4 class="title-price">
                            <p> ${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                      </div>

                      <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-circle-fill"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-circle-fill"></i>
                      </div>
                         <h3>$ ${item*search.price}</h3>

                  </div>

                   </div>

                </div>
                
                `;
           })
           .join(""));
        }
        else{
            
            shoppingCart.innerHTML = ``;
            lebel.innerHTML = `
            <h2>Cart is empty</h2>
            <a herf="index.html">
                <button class="Homebtn">Back to home</button>
            </a>
            `
        }
 };

 generateCartItems();

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
    generateCartItems();
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
        generateCartItems();
        localStorage.setItem("data" , JSON.stringify(basket));

 
};

let update = (id)=>{
        let search = basket.find((x)=> x.id === id );
    //  console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totallAmount();
};

let removeItem = (id) =>{
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    generateCartItems();
    totallAmount();
    calculation();
    localStorage.setItem("data" , JSON.stringify(basket));
}

let clearCart = ()=>{
     basket = []
  generateCartItems();
  calculation();
  localStorage.setItem("data" , JSON.stringify(basket));

}

let totallAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item , id} = x;
            let search = shopItemsData.find((y)=> y.id === id)|| [];
            return item * search.price;
        }).reduce((x , y) => x+y , 0);
        // console.log(amount);
          lebel.innerHTML = `
          <h2>Totall Bill : $ ${amount} </h2>
           <button class="checkout">Checkout</button>
           <button onclick="clearCart()" class="removeAll">Clear Cart</button>

          `

    }
    else 
    return;
}

totallAmount();