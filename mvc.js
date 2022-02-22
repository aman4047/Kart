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
    cart:[],
    AddNewCartItem(name,qty,price)
    {
    this.name=name;
    this.qty=qty;
    this.price=price;
    }

};

const foodCategoriesView=
{
    initialise()
    {
        this.renderFoodCategories();
    },
    renderFoodCategories()
    {   
        const foodCategories=controller.getfoodCategories();
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
    initialise()
    {
        this.renderFoodMenu();
    },
    renderFoodMenu()
    {   
        const foodItems=controller.getfoodItems();
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

};
const cartView=
{
    initialise()
    {
        this.renderCart();
    },
    renderCart(cartItems,subTotal)
    {
        const cartItemContainer=document.getElementById("cartItems");
        cartItemContainer.innerHTML="";
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
}

const controller=
{
    initialise()
    {
        foodCategoriesView.initialise();
        foodMenuView.initialise();
    },
    getfoodCategories()
    {
        return model.foodCategories;
    },
    getfoodItems()
    {
        return model.foodItems;
    }
};
controller.initialise();