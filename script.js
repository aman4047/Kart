"use strict"

const foodCategories=["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"];
const foodCategoriesContainer=document.getElementById("foodList");
foodCategories.map(function(foodCategory)
{
    foodCategoriesContainer.innerHTML+= `<li>${foodCategory}</li>`;
});

const foodItems=
[
    {
        foodType:"images/veg.svg.png",
        name:"Punjabi Aloo Samosa (1Pcs)",
        price:20,
        foodImage:"images/samosa1.jpeg",
    },
    {
        foodType:"images/nonveg.png",
        name:"Special Aloo Samosa (1Pcs)",
        price:55,
        foodImage:"images/samosa2.webp",
    },
    {
        foodType:"images/nonveg.png",
        name:"Chicken Bun Samosa (1Pcs)",
        price:50,
        foodImage:"images/samosa2.webp",
    },
    {
        foodType:"images/veg.svg.png",
        name:"Punjabi Aloo Samosa (1Pcs)",
        price:20,
        foodImage:"images/samosa1.jpeg",
    }
];

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
let cart=[];
function addToCart(index)
{   
    let isAddedToCart=false;
    cart.forEach(function(cartItem)
    {
        if(cartItem.name===foodItems[index].name)
        {
            cartItem.qty+=1;
            cartItem.price=cartItem.price+foodItems[index].price;
            isAddedToCart=true;
        }
    
    });
    if(isAddedToCart===false)
    {
        var newCartItem={ name:foodItems[index].name, qty:1,price:foodItems[index].price};
        cart.push(newCartItem);
    }
    //console.log(cart);

    let subTotal=cart.reduce(function(x,y)
    {
        return (x+y.price);
    },0);
    //console.log(subTotal);
    const cartItemsContainer=document.getElementById("cartItems");
    cart.map(function(cartItem)
    {
        cartItemsContainer.innerHTML+= `<li>${cartItem.name}</li>`;
    });


}



    




