const model=
{
   foodCategories:["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"],
   foodItems:
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
    ],
    cart:[]
};

const foodCategoriesView=
{
    initialise:function()
    {
        this.renderFoodCategories();
    },
    renderFoodCategories:function()
    {   
        const foodCategories=controller.getFoodCategories();
        foodCategories.map(function(foodCategory)
        {   
            const list=document.createElement("li");
            list.innerHTML=foodCategory;
            document.getElementById("foodList").appendChild(list);
        });
    }
};

const foodMenuView=
{
    initialise:function()
    {
        this.renderFoodMenu();
    },
    renderFoodMenu:function()
    {   
        const foodItems=controller.getFoodItems();
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
                controller.addToCart(index);
            }
            addFoodDiv.appendChild(addButtoncontainer);
            foodDiv.appendChild(addFoodDiv);
            document.getElementById("foodItems").appendChild(foodDiv);
        });
    }

};
const cartView=
{
    
    renderCart:function(cart,subTotal)
    {   
        const cartItemContainer=document.getElementById("cartItems");
        cartItemContainer.innerHTML="";
        cart.map(function(Item)
        {  
            const cartItemDiv=document.createElement("div");
            cartItemDiv.className="cartItem";
            const cartItemNameDiv=document.createElement("div");
            cartItemNameDiv.className="cartItemName";
            const itemNamePara=document.createElement("p");
            itemNamePara.innerText=`${Item.name}`;
            cartItemNameDiv.appendChild(itemNamePara);
            cartItemDiv.appendChild(cartItemNameDiv);

            const cartItemPriceDiv=document.createElement("div");
            cartItemPriceDiv.className="cartItemPrice";
            const itemPricePara=document.createElement("p");
            itemPricePara.innerText=`${Item.qty} x ${Item.price} = ₹${Item.price*Item.qty}`;
            cartItemPriceDiv.appendChild(itemPricePara);
            cartItemDiv.appendChild(cartItemPriceDiv);
            document.getElementById("cartItems").appendChild(cartItemDiv);
        });
        const subTotalContainer=document.getElementById("subTotal");
        subTotalContainer.innerText=`₹${subTotal}`;
    }
}

const controller=
{   
    initialise:function()
    {
        foodCategoriesView.initialise();
        foodMenuView.initialise();
    },
    getFoodCategories:function()
    {
        return model.foodCategories;
    },
    getFoodItems:function()
    {
        return model.foodItems;
    },
    addToCart:function(index)
    {   
        document.getElementById("cartImage").style.display="none";
        let isAddedToCart=false;
        model.cart.forEach(function(cartItem)
        {
            if(cartItem.name===model.foodItems[index].name)
            {
            cartItem.qty+=1;
            isAddedToCart=true;
            }
     
        });
        if(isAddedToCart===false)
        {
            var newCartItem={ name:model.foodItems[index].name, qty:1,price:model.foodItems[index].price};
            model.cart.push(newCartItem);
        }
        let subTotal=model.cart.reduce(function(currentSubTotal,cartItem)
        {
            return (currentSubTotal+(cartItem.qty*cartItem.price));
        },0);
        cartView.renderCart(model.cart,subTotal);
    }
};
controller.initialise();



/*let cart=[];
function displayCart(cartItems,subTotal)
{
    const cartItemContainer=document.getElementById("cartItems");
    cartItemContainer.innerHTML="";
    cartItems.map(function(Items)
    {
        cartItemContainer.innerHTML+=`<div class="cartItem">
                                        <div class="cartItemName">
                                            <p>${Items.name}</p>
                                        </div>
                                        <div class="cartItemPrice">
                                            <p>${Items.qty} x ${Items.price} = ₹${Items.price*Items.qty}</p> 
                                        </div>
                                    </div>`
    });
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
    
}*/