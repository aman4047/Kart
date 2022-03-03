"use strict"
function Model()
{   
    let cart=[];
    function setFetchedLocalStorageDataToCart(localStorageData)
    {    
        cart=localStorageData.cartItem;
        const subTotal=localStorageData.subTotal;
        if(cart.length>0)
        {
            controller.hideDefaulCartImage();
        }
        controller.displayCartItems(cart,subTotal);
    }
    function fetchDatafromLocalStorage()
    {
        return new Promise(function(resolve)
        {
           setTimeout(function()
           {  
                const cartItem=window.localStorage.getItem("cart")===null? []:JSON.parse(window.localStorage.getItem("cart"));
                const subTotal=window.localStorage.getItem("subTotal")===null?0:Number(window.localStorage.getItem("subTotal"));
                const localStorageData={cartItem,subTotal};
                resolve(localStorageData);
            },2000);
        })
    };
    function updateLocalStorage(cart,subTotal)
    {
        window.localStorage.setItem('cart', JSON.stringify(cart));
        window.localStorage.setItem('subTotal', JSON.stringify(subTotal));
        controller.displayCartItems(cart,subTotal);
    };
    function appendCart(CartItem)
    {
        cart.push(CartItem);
    };
    this.initialise=function()
    {   
        fetchDatafromLocalStorage().then(setFetchedLocalStorageDataToCart);
        this.createFoodItems();
    };
    this.foodCategories=["Recommended","Samosas","Bun Clubs","Baked Samosas","Bombay Pav Bhaji","Health Chole Chats","Bombay Vada Pav","Chicken Grill Seekhs","Desserts","Teas"];
    this.foodItems=[];
    this.appendFoodItems=function(foodItem)
    {
        this.foodItems.push(foodItem);
    };
    this.createFoodItems=function()
    {
        this.appendFoodItems(new MenuItem("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg"));
        this.appendFoodItems(new MenuItem("images/nonveg.png","Special Aloo Samosa",55,"images/samosa2.webp"));  
        this.appendFoodItems(new MenuItem("images/nonveg.png","Chicken Bun Samosa",50,"images/samosa2.webp"));  
        this.appendFoodItems(new MenuItem("images/veg.svg.png","Punjabi Aloo Samosa",20,"images/samosa1.jpeg")); 
    };
    this.addFoodItemsToCart=function(index)
    {   
        controller.hideDefaulCartImage();
        let isFoodItemPresentInCart=false;
        function increaseFoodQuantity(cartItem)
        {
            if(cartItem.name===this.foodItems[index].name)
            {
                cartItem.qty+=1;
                isFoodItemPresentInCart=true;
            }
        }
        const increaseFoodQuantityInCartBindedToModel=increaseFoodQuantity.bind(this);
        cart.forEach(increaseFoodQuantityInCartBindedToModel);
        if(isFoodItemPresentInCart===false)
        {    
            appendCart(new CartItem(this.foodItems[index].name,1,this.foodItems[index].price,index));
        }
        const subTotal=cart.reduce(function(currentSubTotal,cartItem)
        {
            return (currentSubTotal+(cartItem.qty*cartItem.price));
        },0);
        updateLocalStorage(cart,subTotal);
        controller.displayCartItems(cart,subTotal);
    }
    this.removeFoodItemsFromCart=function(index)
    {   
        function decreaseFoodQuantity(cartItem)
        { 
            if(cartItem.name===this.foodItems[index].name)
            {  
                if(cartItem.qty>0)
                {
                cartItem.qty-=1;
                } 
            }
        }
        const decreaseFoodQuantityInCartBindedToModel=decreaseFoodQuantity.bind(this);
        cart.forEach(decreaseFoodQuantityInCartBindedToModel);
        cart=cart.filter(function(cartItem)
        {
            return cartItem.qty>0;
        });
        if(cart.length===0)
        {
            controller.displayDefaultCartImage();
        }
        const subTotal=cart.reduce(function(currentSubTotal,cartItem)
        {
            return (currentSubTotal+(cartItem.qty*cartItem.price));
        },0);
        updateLocalStorage(cart,subTotal);
        controller.displayCartItems(cart,subTotal);
    }
}
function MenuItem(foodType,name,price,foodImage)
{
    this.foodType=foodType;
    this.name=name;
    this.price=price;
    this.foodImage=foodImage;
}
function CartItem(name,qty,price,index)
{
    this.name=name;
    this.qty=qty;
    this.price=price;
    this.index=index;
}   
function View()
{
   this.foodCategoriesView=new FoodCategoriesView();
   this.foodMenuView=new FoodMenuView();
   this.cartView=new CartView();

}   
const view =new View();             
function FoodCategoriesView()
{
    this.initialise=function()
    {
        renderFoodCategories();
    };
    function createFoodCategoryContainer(foodCategory)
    {
        const list=document.createElement("li");
        list.innerHTML=foodCategory;
        document.getElementById("foodList").appendChild(list);
    }
    const renderFoodCategories=function()
    {
        const foodCategories=controller.getFoodCategories();
        foodCategories.forEach(createFoodCategoryContainer)
    };
}

function FoodMenuView()
{  
    this.initialise=function()
    {
        renderFoodMenu();
    };
    function createFoodTypeContainer(foodNamePriceContainer,foodItem)
    {
        const foodTypeImage=document.createElement("img");
        foodTypeImage.className="foodType";
        foodTypeImage.src=foodItem.foodType;
        foodNamePriceContainer.appendChild(foodTypeImage);
    };
    function createFoodNameContainer(foodNamePriceContainer,foodItem)
    {
        const foodNameParagraph=document.createElement("p");
        foodNameParagraph.innerText=foodItem.name;
        foodNamePriceContainer.appendChild(foodNameParagraph);
    };
    function createFoodPriceContainer(foodNamePriceContainer,foodItem)
    {
        const foodPriceParagraph=document.createElement("p");
        foodPriceParagraph.innerText=foodItem.price;
        foodNamePriceContainer.appendChild(foodPriceParagraph);
    }
    function createFoodImagecontainer(addFoodContainer,foodItem)
    {
        const foodImageContainer=document.createElement("img");
        foodImageContainer.className="foodImage";
        foodImageContainer.src=foodItem.foodImage;
        addFoodContainer.appendChild(foodImageContainer);
    }
    function createAddButtonContainer(addFoodContainer,foodItem,index)
    {
        const addButtonContainer=document.createElement("button");
        addButtonContainer.className="addButton";
        addButtonContainer.innerText="Add";
        addButtonContainer.onclick=function ()
        {
            controller.addToCart(index);
        }
        addFoodContainer.appendChild(addButtonContainer);
    }
    function renderFoodMenu()
    {   
        const foodItems=controller.getFoodItems();
        foodItems.forEach(function(foodItem,index)
        {   
            const foodContainer=document.createElement("div");
            foodContainer.className="food";
            const foodNamePriceContainer=document.createElement("div");
            foodNamePriceContainer.className="foodNamePrice";
            createFoodTypeContainer(foodNamePriceContainer,foodItem);
            createFoodNameContainer(foodNamePriceContainer,foodItem);
            createFoodPriceContainer(foodNamePriceContainer,foodItem);
            foodContainer.appendChild(foodNamePriceContainer);   
               
            const addFoodContainer=document.createElement("div");
            addFoodContainer.className="addFood";
            createFoodImagecontainer(addFoodContainer,foodItem);
            createAddButtonContainer(addFoodContainer,foodItem,index);
            foodContainer.appendChild(addFoodContainer);
            document.getElementById("foodItems").appendChild(foodContainer);
        });
    }
}



function CartView()
{   
    const createCartFoodNameContainer=function(cartItemContainer,cartItem)
    {
        const cartItemNameContainer=document.createElement("div");
        cartItemNameContainer.className="cartItemName";
        const cartItemNameParagraph=document.createElement("p");
        cartItemNameParagraph.innerText=`${cartItem.name}`;
        cartItemNameContainer.appendChild(cartItemNameParagraph);
        cartItemContainer.appendChild(cartItemNameContainer); 
    }
    const createAddFoodButtonInCart=function(cartButtonContainer,cartItem)
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
    const createRemoveFoodButtonInCart=function(cartButtonContainer,cartItem)
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
    const createCartFoodPriceContainer=function(cartItemContainer,cartItem)
    {
        const cartItemPriceContainer=document.createElement("div");
        cartItemPriceContainer.className="cartItemPrice";
        const cartItemPriceParagraph=document.createElement("p");
        cartItemPriceParagraph.innerText=`${cartItem.qty} x ${cartItem.price} = ₹${cartItem.price*cartItem.qty}`;
        cartItemPriceContainer.appendChild(cartItemPriceParagraph);
        cartItemContainer.appendChild(cartItemPriceContainer);
    }  
    this.displayCartImage=function()
    {
        document.getElementById("cartImage").style.display="block";
    } 
    this.hideCartImage=function()
    {
        document.getElementById("cartImage").style.display="none";
    }     
    this.renderCart=function(cart,subTotal)
    {
        const cartItemsContainer=document.getElementById("cartItems");
        cartItemsContainer.innerHTML="";
        cart.map(function(cartItem)
        {  
            const cartItemContainer=document.createElement("div");
            cartItemContainer.className="cartItem";
            createCartFoodNameContainer(cartItemContainer,cartItem);
            const cartButtonContainer=document.createElement("div");
            cartButtonContainer.className="cartButton";
            createAddFoodButtonInCart(cartButtonContainer,cartItem);
            createRemoveFoodButtonInCart(cartButtonContainer,cartItem);
            cartItemContainer.appendChild(cartButtonContainer);
            createCartFoodPriceContainer(cartItemContainer,cartItem)
            cartItemsContainer.appendChild(cartItemContainer);
           
        });
        const subTotalContainer=document.getElementById("subTotal");
        subTotalContainer.innerText=`₹${subTotal}`;
    }
}



function Controller(model,view)
{   
    this.initialise=function()
    {   
        model.initialise();
        view.foodCategoriesView.initialise();
        view.foodMenuView.initialise();
    };
    this.getFoodCategories=function()
    {   
        return model.foodCategories;
    };
    this.getFoodItems=function()
    {   
        return model.foodItems;
    };
    this.displayCartItems=function(cart,subTotal)
    {
        view.cartView.renderCart(cart,subTotal);
    };
    this.displayDefaultCartImage=function()
    {
        view.cartView.displayCartImage();
    };
    this.hideDefaulCartImage=function()
    {
        view.cartView.hideCartImage();
    };
    this.addToCart=function(index)
    {
        model.addFoodItemsToCart(index);
    };
    this.removeFromCart=function(index)
    {
        model.removeFoodItemsFromCart(index);
    };
}
const controller=new Controller(new Model(),new View());
controller.initialise();





