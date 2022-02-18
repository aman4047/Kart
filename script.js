"use strict"

const foodCategories=["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"];
function renderFoodCategories()
{
    foodCategories.map(function(foodCategory)
    {   
        const list=document.createElement("li");
        list.innerHTML=foodCategory;
        document.getElementById("foodList").appendChild(list);
    });
}   
renderFoodCategories();


const foodItems=
[
    {
        foodType:"images/veg.svg.png",
        name:"Punjabi Aloo Samosa",
        price:20,
        foodImage:"images/samosa1.jpeg",
    },
    {
        foodType:"images/nonveg.png",
        name:"Special Aloo Samosa",
        price:55,
        foodImage:"images/samosa2.webp",
    },
    {
        foodType:"images/nonveg.png",
        name:"Chicken Bun Samosa",
        price:50,
        foodImage:"images/samosa2.webp",
    },
    {
        foodType:"images/veg.svg.png",
        name:"Punjabi Aloo Samosa",
        price:20,
        foodImage:"images/samosa1.jpeg",
    }
];
function renderFoodItems()
{
    const foodItemsContainer=document.getElementById("foodItems");
    foodItems.map(function(foodItem,index)
    {
        foodItemsContainer.innerHTML+=`<div class="food">
                                  <div class="foodNamePrice">
                                  <img class="nonvegLogo" src=${foodItem.foodType} width=20px>
                                  <p>${foodItem.name}</p>
                                  <p>₹${foodItem.price}</p>
                                  </div>
                                  <div class="addFood">
                                  <img class="foodImage" src=${foodItem.foodImage} width=90px>
                                  <button onclick="addToCart(${index})" class="addButton">Add</button>
                                  </div>
                                </div>`
    });
}
renderFoodItems();


let cart=[];
function displayCart(cartItems,subTotal)
{
    const cartItemContainer=document.getElementById("cartItems");
    cartItemContainer.innerHTML="";
    /*cartItems.map(function(Items)
    {
        cartItemContainer.innerHTML+=`<div class="cartItem">
                                        <div class="cartItemName">
                                            <p>${Items.name}</p>
                                        </div>
                                        <div class="cartItemPrice">
                                            <p>${Items.qty} x ${Items.price} = ₹${Items.price*Items.qty}</p> 
                                        </div>
                                    </div>`
    });*/
    console.log(cartItems)
    cartItems.map(function(Items)
    {  
    const cartItemDiv=document.createElement("div");
    cartItemDiv.className="cartItem";
    const cartItemNameDiv=document.createElement("div");
    cartItemNameDiv.className="cartItemName";
    const itemNamePara=document.createElement("p");
    itemNamePara.innerText=`${Items.name}`;
    cartItemNameDiv.appendChild(itemNamePara);
    cartItemDiv.appendChild(cartItemNameDiv);

    const cartItemPriceDiv=document.createElement("div");
    cartItemPriceDiv.className="cartItemPrice";
    const itemPricePara=document.createElement("p");
    itemPricePara.innerText=`${Items.qty} x ${Items.price} = ₹${Items.price*Items.qty}`;
    cartItemPriceDiv.appendChild(itemPricePara);
    cartItemDiv.appendChild(cartItemPriceDiv);
    document.getElementById("cartItems").appendChild(cartItemDiv);
    });
    

    const subTotalContainer=document.getElementById("subTotal");
    subTotalContainer.innerText=`₹${subTotal}`;

}
function addToCart(index)
{   
    document.getElementById("cartImage").style.display="none";
    let isAddedToCart=false;
    cart.forEach(function(cartItem)
    {
        if(cartItem.name===foodItems[index].name)
        {
            cartItem.qty+=1;
            isAddedToCart=true;
        }
    
    });
    if(isAddedToCart===false)
    {
        var newCartItem={ name:foodItems[index].name, qty:1,price:foodItems[index].price};
        cart.push(newCartItem);
    }
    let subTotal=cart.reduce(function(currentSubTotal,cartItem)
    {
        return (currentSubTotal+(cartItem.qty*cartItem.price));
    },0);
    displayCart(cart,subTotal);
    
}




    



