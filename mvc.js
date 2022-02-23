function MODEL()
{
    this.foodCategories=[],
    this.foodItems=[],
    this.cart=[]       
}
const model=new MODEL();

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
        this.setFoodCategories();
        this.setFoodItems();
        foodCategoriesView.initialise();
        foodMenuView.initialise();
    },
    setFoodCategories:function()
    {
        model.foodCategories.push("Recommended");
        model.foodCategories.push("Samosas");
        model.foodCategories.push("Bun Clubs");
        model.foodCategories.push("Baked Samosas");
        model.foodCategories.push("Bombay Pav Bhaji");
        model.foodCategories.push("Health Chole Chats");
        model.foodCategories.push("Bombay Vada Pav")
        model.foodCategories.push("Chicken Grill Seekhs")
        model.foodCategories.push("Desserts");
        model.foodCategories.push("Teas");
    },
    setFoodItems:function()
    {   
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
        model.foodItems.push(foodItem1);
        model.foodItems.push(foodItem2);
        model.foodItems.push(foodItem3);
        model.foodItems.push(foodItem4);
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

            function AddNewCartItem(name,qty,price)
            {
                this.name=name;
                this.qty=qty;
                this.price=price;
            }
            let newCartItem=new AddNewCartItem(model.foodItems[index].name,1,model.foodItems[index].price);
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



