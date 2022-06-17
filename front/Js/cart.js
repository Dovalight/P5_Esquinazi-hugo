function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()
    })
    .then(function(products){
        return products
    })
    .catch(function(error){
        alert(error)
    })
}

function getPanier(product){
        const image = document.createElement("img")
        image.setAttribute("src", product.imageUrl)
        image.setAttribute("alt", product.altTxt)
    
        document.title = product.name
        document.getElementById("title").textContent = product.name
        document.getElementById("description").textContent = product.description
    
        const parentImage = document.getElementsByClassName("item__img")[0]
        parentImage.appendChild(image)
        document.getElementById("price").textContent = product.price
    
       const parentColor = document.getElementById("colors")
        for (let i = 0; i < product.colors.length; i++){
            const color = document.createElement("option");
            color.setAttribute("value", product.colors[i])
            color.textContent = product.colors[i];
            parentColor.appendChild(color)
            }
            addToCart(product)
    }

function removeBasket(product){
    let basket = getBasket();
    basket = basket.filter(f => f.id != product.id);
    saveBasket(basket);
}

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(f => f.id == product.id);
    if(foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    } 
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}



/*document
.getElementsByClassName("itemQuantity")
.addEventListener("click", function() {
    changeQuantity.Panier();
});

document
.getElementById("deleteItem")
.addEventListener("click", function(){
    remove.Panier();
});

document
.getElementById("totalQuantity")
.addEventListener("click", function(){
    getNumberProduct.Panier();
});

document
.getElementById("totalPrice")
.addEventListener("click", function(){
    getTotalPrice.Panier();
});*/



/**** validation formulaire*******/

/*form.email.addEventListener('change', function() {
    validEmail(this);
})
const validEmail = function(inputEmail){
    let emailRegExp = RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2-10}$', 'g');

    let testEmail = email.RegExp.test(inputEmail.value);
    let errorEmail = inputEmail.nextElementSibling

    if(testEmail == false){
        errorEmail.innerHTML = 'Non';
    }
};*/