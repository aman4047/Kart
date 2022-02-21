"use strict"
//const foodCategories=["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"];
function FoodCategory(foodName)
{
    this.foodName=foodName;
}
const foodCategory1=new FoodCategory("Recommended");
const foodCategory2=new FoodCategory("Samosas");
const foodCategory3=new FoodCategory("Bun Clubs");
const foodCategory4=new FoodCategory("Baked Samosas");
const foodCategory5=new FoodCategory("Bombay Pav Bhaji");
const foodCategory6=new FoodCategory("Health Chole Chats");
const foodCategory7=new FoodCategory("Bombay Vada Pav");
const foodCategory8=new FoodCategory("Chicken Grill Seekhs");
const foodCategory9=new FoodCategory("Desserts");
const foodCategory10=new FoodCategory("Teas");
const foodCategories=[];
foodCategories.push(foodCategory1);
foodCategories.push(foodCategory2);
foodCategories.push(foodCategory3);
foodCategories.push(foodCategory4);
foodCategories.push(foodCategory5);
foodCategories.push(foodCategory6);
foodCategories.push(foodCategory7);
foodCategories.push(foodCategory8);
foodCategories.push(foodCategory9);
foodCategories.push(foodCategory10);

function renderFoodCategories()
{
    foodCategories.map(function(foodCategory)
    {   
        const list=document.createElement("li");
        list.innerHTML=foodCategory.foodName;
        document.getElementById("foodList").appendChild(list);
    });
}   
renderFoodCategories();



/*const foodItems=
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
*/

function Menu(foodType,name,price,foodImage)
{
    this.foodType=foodType;
    this.name=name;
    this.price=price;
    this.foodImage=foodImage;
}
const foodItem1=new Menu("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg");
const foodItem2=new Menu("images/nonveg.png","Special Aloo Samosa",55,"images/samosa2.webp");
const foodItem3=new Menu("images/nonveg.png","Chicken Bun Samosa",50,"images/samosa2.webp");
const foodItem4=new Menu("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg");
const foodItems=[];
foodItems.push(foodItem1);
foodItems.push(foodItem2);
foodItems.push(foodItem3);
foodItems.push(foodItem4);

function renderFoodItems()
{
    
    foodItems.map(function(foodItem,index)
    {   
        const foodDiv=document.createElement("div");
        foodDiv.className="food";
    
            const foodNamePriceDiv=document.createElement("div");
            foodNamePriceDiv.className="foodNamePrice";
            const foodTypeImage=document.createElement("img");
            foodTypeImage.className="foodType";
            foodTypeImage.src=foodItem.foodType;
            foodNamePriceDiv.appendChild(foodTypeImage);
            const foodNamePara=document.createElement("p");
            foodNamePara.innerText=foodItem.name;
            foodNamePriceDiv.appendChild(foodNamePara);
            const foodPricePara=document.createElement("p");
            foodPricePara.innerText=foodItem.price;
            foodNamePriceDiv.appendChild(foodPricePara);
            foodDiv.appendChild(foodNamePriceDiv);

            const addFoodDiv=document.createElement("div");
            addFoodDiv.className="addFood";
            const foodImagecontainer=document.createElement("img");
            foodImagecontainer.className="foodImage";
            foodImagecontainer.src=foodItem.foodImage;
            addFoodDiv.appendChild(foodImagecontainer);
            const addButtoncontainer=document.createElement("button");
            addButtoncontainer.className="addButton";
            addButtoncontainer.innerText="Add";
            addButtoncontainer.onclick=function ()
                {
                    addToCart(index);
                }
            addFoodDiv.appendChild(addButtoncontainer);
            foodDiv.appendChild(addFoodDiv);
        document.getElementById("foodItems").appendChild(foodDiv);
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
function AddNewCartItem(name,qty,price)
{
    this.name=name;
    this.qty=qty;
    this.price=price;
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
       // var newCartItem={ name:foodItems[index].name, qty:1,price:foodItems[index].price};
        let newCartItem=new AddNewCartItem(foodItems[index].name,1,foodItems[index].price);
        cart.push(newCartItem);
    }
    let subTotal=cart.reduce(function(currentSubTotal,cartItem)
    {
        return (currentSubTotal+(cartItem.qty*cartItem.price));
    },0);
    displayCart(cart,subTotal);
    
}




    




