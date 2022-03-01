function Model()
{   
    this.foodCategories=["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"];
    this.foodItems=[];
    this.cart=[];   
    this.appendFoodItems=function(foodItem)
    {
        this.foodItems.push(foodItem);
    };
    this.appendCartFromLocalStorage=function()
    {  
        this.cart=window.localStorage.getItem("cart")===null? []:JSON.parse(window.localStorage.getItem("cart"));
        const subTotal=window.localStorage.getItem("subTotal")===null?0:Number(window.localStorage.getItem("subTotal"));
        if(this.cart.length>0)
        {
            document.getElementById("cartImage").style.display="none";
        }
        controller.displayCartItems(this.cart,subTotal);
    }
    this.addFoodItemsToCart=function(index)
    {   
        document.getElementById("cartImage").style.display="none";
        let isFoodItemPresentInCart=false;
        model.cart.forEach(function(cartItem)
        {
            if(cartItem.name===model.foodItems[index].name)
            {
                cartItem.qty+=1;
                isFoodItemPresentInCart=true;
            }
        });
        if(isFoodItemPresentInCart===false)
        {    
            function CartItem(name,qty,price,index)
            {
                this.name=name;
                this.qty=qty;
                this.price=price;
                this.index=index;
            }
            const newCartItem=new CartItem(model.foodItems[index].name,1,model.foodItems[index].price,index);
            model.cart.push(newCartItem);
        }
        const subTotal=model.cart.reduce(function(currentSubTotal,cartItem)
        {
            return (currentSubTotal+(cartItem.qty*cartItem.price));
        },0);
        window.localStorage.setItem('cart', JSON.stringify(model.cart));
        window.localStorage.setItem('subTotal', JSON.stringify(subTotal));
        controller.displayCartItems(model.cart,subTotal);
    }
    this.removeFoodItemsFromCart=function(index)
    {   
        model.cart.forEach(function(cartItem)
        {
            if(cartItem.name===model.foodItems[index].name)
            {  
                if(cartItem.qty>0)
                {
                cartItem.qty-=1;
                } 
            }
        });
        model.cart=model.cart.filter(function(cartItem)
        {
            return cartItem.qty>0;
        });
        if(model.cart.length===0)
        {
            document.getElementById("cartImage").style.display="block";
        }
        const subTotal=model.cart.reduce(function(currentSubTotal,cartItem)
        {
            return (currentSubTotal+(cartItem.qty*cartItem.price));
        },0);
        window.localStorage.setItem('cart', JSON.stringify(model.cart));
        window.localStorage.setItem('subTotal', JSON.stringify(subTotal));
        controller.displayCartItems(model.cart,subTotal);
    }
}
const model=new Model();

function MenuItem(foodType,name,price,foodImage)
{
    this.foodType=foodType;
    this.name=name;
    this.price=price;
    this.foodImage=foodImage;
}
model.appendFoodItems(new MenuItem("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg"));   
model.appendFoodItems(new MenuItem("images/nonveg.png","Special Aloo Samosa",55,"images/samosa2.webp"));  
model.appendFoodItems(new MenuItem("images/nonveg.png","Chicken Bun Samosa",50,"images/samosa2.webp"));  
model.appendFoodItems(new MenuItem("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg"));   


function FoodCategoriesView()
{
    this.initialise=function()
    {
        this.renderFoodCategories();
    };
    this.renderFoodCategories=function()
    {
        const foodCategories=controller.getFoodCategories();
        foodCategories.forEach(function(foodCategory)
        {   
            const list=document.createElement("li");
            list.innerHTML=foodCategory;
            document.getElementById("foodList").appendChild(list);
        });
    };
}
const foodCategoriesView=new FoodCategoriesView();


function FoodMenuView()
{  
    this.initialise=function()
    {
        this.renderFoodMenu();
    };
    this.renderFoodMenu=function()
    {   
        const foodItems=controller.getFoodItems();
        foodItems.forEach(function(foodItem,index)
        {   
            const foodContainer=document.createElement("div");
            foodContainer.className="food";
            
            const foodNamePriceSection=function()
            {
                const foodNamePriceContainer=document.createElement("div");
                foodNamePriceContainer.className="foodNamePrice";
                const foodTypeImage=document.createElement("img");
                foodTypeImage.className="foodType";
                foodTypeImage.src=foodItem.foodType;
                foodNamePriceContainer.appendChild(foodTypeImage);
                const foodNameParagraph=document.createElement("p");
                foodNameParagraph.innerText=foodItem.name;
                foodNamePriceContainer.appendChild(foodNameParagraph);
                const foodPriceParagraph=document.createElement("p");
                foodPriceParagraph.innerText=foodItem.price;
                foodNamePriceContainer.appendChild(foodPriceParagraph);
                foodContainer.appendChild(foodNamePriceContainer);
            }
            foodNamePriceSection();
            
            const addFoodSection=function()
            {
                const addFoodContainer=document.createElement("div");
                addFoodContainer.className="addFood";
                const foodImageContainer=document.createElement("img");
                foodImageContainer.className="foodImage";
                foodImageContainer.src=foodItem.foodImage;
                addFoodContainer.appendChild(foodImageContainer);
                const addButtonContainer=document.createElement("button");
                addButtonContainer.className="addButton";
                addButtonContainer.innerText="Add";
                addButtonContainer.onclick=function ()
                {
                    controller.addToCart(index);
                }
                addFoodContainer.appendChild(addButtonContainer);
                foodContainer.appendChild(addFoodContainer);
            }
            addFoodSection();
            document.getElementById("foodItems").appendChild(foodContainer);
        });
    }
}
const foodMenuView= new FoodMenuView();


function CartView()
{
    this.renderCart=function(cart,subTotal)
    {
        const cartItemsContainer=document.getElementById("cartItems");
        cartItemsContainer.innerHTML="";
        cart.map(function(cartItem)
        {  
            const cartItemContainer=document.createElement("div");
            cartItemContainer.className="cartItem";
            const cartFoodName=function()
            {
                const cartItemNameContainer=document.createElement("div");
                cartItemNameContainer.className="cartItemName";
                const cartItemNameParagraph=document.createElement("p");
                cartItemNameParagraph.innerText=`${cartItem.name}`;
                cartItemNameContainer.appendChild(cartItemNameParagraph);
                cartItemContainer.appendChild(cartItemNameContainer); 
            }
            cartFoodName();
            const cartButtonContainer=document.createElement("div");
            cartButtonContainer.className="cartButton";
            const addFoodButtonInCart=function()
            {    
                const cartAddButtonContainer=document.createElement("button");
                cartAddButtonContainer.className="cartAddButton";
                cartAddButtonContainer.innerText="+";
                cartAddButtonContainer.onclick=function ()
                {
                    controller.addToCart(cartItem.index);
                }
                cartButtonContainer.appendChild(cartAddButtonContainer);
            }
            addFoodButtonInCart();
            const removeFoodButtonInCart=function()
            {
                const cartDeleteButtonContainer=document.createElement("button");
                cartDeleteButtonContainer.className="cartDeleteButton";
                cartDeleteButtonContainer.innerText="-";
                cartDeleteButtonContainer.onclick=function ()
                {
                    controller.removeFromCart(cartItem.index);
                }
                cartButtonContainer.appendChild(cartDeleteButtonContainer);  
            }
            removeFoodButtonInCart();
            cartItemContainer.appendChild(cartButtonContainer);
            const cartFoodPrice=function()
            {
                const cartItemPriceContainer=document.createElement("div");
                cartItemPriceContainer.className="cartItemPrice";
                const cartItemPriceParagraph=document.createElement("p");
                cartItemPriceParagraph.innerText=`${cartItem.qty} x ${cartItem.price} = ₹${cartItem.price*cartItem.qty}`;
                cartItemPriceContainer.appendChild(cartItemPriceParagraph);
                cartItemContainer.appendChild(cartItemPriceContainer);
            }
            cartFoodPrice();
            cartItemsContainer.appendChild(cartItemContainer);
           
        });
        const subTotalContainer=document.getElementById("subTotal");
        subTotalContainer.innerText=`₹${subTotal}`;
    }
}
const cartView=new CartView();


function Controller()
{
    this.initialise=function()
    {   
        foodCategoriesView.initialise();
        foodMenuView.initialise();
        model.appendCartFromLocalStorage();
    }, 
    this.getFoodCategories=function()
    {
        return model.foodCategories;
    },
    this.getFoodItems=function()
    {
        return model.foodItems;
    },
    this.displayCartItems=function(cart,subTotal)
    {
        cartView.renderCart(cart,subTotal);
    }
    this.addToCart=function(index)
    {
        model.addFoodItemsToCart(index);
    }
    this.removeFromCart=function(index)
    {
        model.removeFoodItemsFromCart(index);
    }
   
}
const controller=new Controller();
controller.initialise();





