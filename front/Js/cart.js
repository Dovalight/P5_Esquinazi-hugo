const product = JSON.parse(localStorage.getItem("panier"));
const cart_items = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");


//***********affichage du panier
const inCart = (product, contenue) => {
  const article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", product._id);
  article.setAttribute("data-color", contenue.color);
  
  const cart__item__div = document.createElement("div");
  cart__item__div.setAttribute("class", "cart__item__img");
  const cart__item__img = document.createElement("img");
  cart__item__img.setAttribute("src",product.imageUrl);
  cart__item__img.setAttribute("alt",product.altTxt);
  cart__item__div.appendChild(cart__item__img);
  article.appendChild(cart__item__div);

  const cart__item__content = document.createElement("div");
  cart__item__content.setAttribute("class", "cart__item__content");
  const cart__item__content__description = document.createElement("div");
  cart__item__content__description.setAttribute("class", "cart__item__content__description");
  const titre = document.createElement("h2");
  titre.textContent = product.name ;
  cart__item__content__description.appendChild(titre);
  const couleur = document.createElement("p");
  couleur.textContent = contenue.color ; 
  cart__item__content__description.appendChild(couleur);
  const prix = document.createElement("p");
  prix.textContent = product.price + "€" ;
  cart__item__content__description.appendChild(prix);
  cart__item__content.appendChild(cart__item__content__description);

const cart__item__content__settings = document.createElement("div");
cart__item__content__settings.setAttribute("class", "cart__item__content__settings");
const cart__item__content__settings__quantity = document.createElement("div");
cart__item__content__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");

const label_quantite = document.createElement("p");
label_quantite.textContent = "Qté :" ;
cart__item__content__settings__quantity.appendChild(label_quantite);

const quantité = document.createElement("input");
quantité.setAttribute("type","number");
quantité.setAttribute("class","itemQuantity");
quantité.setAttribute("name","itemQuantity");
quantité.setAttribute("min","1");
quantité.setAttribute("max","100");
quantité.setAttribute("value",contenue.qty);
quantité.addEventListener("change", function(event){
  changeQuantityItem(event.target.value, article, product, contenue);
});

cart__item__content__settings__quantity.appendChild(quantité);
cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

const cart__item__content__settings__delete = document.createElement("div");
cart__item__content__settings__delete.setAttribute("class","cart__item__content__settings__delete");

const deleteItem = document.createElement("p");
deleteItem.setAttribute("class", "deleteItem");
deleteItem.addEventListener("click", function(event){
  onClickDeleteItem(article, product, contenue);
});

deleteItem.textContent = "Supprimer";
cart__item__content__settings__delete.appendChild(deleteItem);
cart__item__content__settings.appendChild(cart__item__content__settings__delete);

cart__item__content.appendChild(cart__item__content__settings);

  article.appendChild(cart__item__content);

  cart_items.appendChild(article);
};

//***********appel d'api + affichage des totaux des produits et prix
const inCartBis = () => {
    if (product){
      let sumQuantity = 0;
      let sumPrice = 0;
      product.forEach(function(k) {
        fetch (`http://localhost:3000/api/products/${k.id}`).then( function (response) {
           return response.json() 
        }).then( function(result){
          inCart(result, k)
          sumQuantity = Number(sumQuantity) + Number(k.qty);
          sumPrice = Number(sumPrice) + (Number(k.qty)) * Number(result.price);
          totalQuantity.textContent = sumQuantity;
          totalPrice.textContent = sumPrice;
        }).catch (function(error){
          console.log(error)
        }) 
    });
  }  
}
inCartBis();


//************change la quantité d'article par produit
function changeQuantityItem(value, article, produit, contenue){
   if (value < 1) {
    onClickDeleteItem(article, produit, contenue);
    return
   } if(value > 100){
    alert("indiquez une valeur entre 1 et 100.");
    return
   }
  const index = product.findIndex((x) => x.color === contenue.color && x.id === contenue.id);
  if (index > -1){
    let findItem = product[index];
    const oldQuantity = Number(findItem.qty);
    const newQuantity = Number(value);
    findItem.qty = newQuantity;

    let sumQuantity = Number(totalQuantity.textContent) + Number(newQuantity) - Number(oldQuantity);
    let sumPrice = Number(totalPrice.textContent) + (Number(newQuantity) * Number(produit.price)) - (Number(oldQuantity) * Number(produit.price));
    totalQuantity.textContent = sumQuantity;
    totalPrice.textContent = sumPrice;

    localStorage.setItem("panier", JSON.stringify(product))  
  };
}


//***********supprime les articles du panier dans le localStorage
function onClickDeleteItem(article, produit, contenue){
  const index = product.findIndex((x) => x.color === contenue.color && x.id === contenue.id);
  if (index > -1){
    product.splice(index, 1);
    cart_items.removeChild(article);
    let sumQuantity = Number(totalQuantity.textContent) - Number(contenue.qty);
    let sumPrice = Number(totalPrice.textContent) - (Number(contenue.qty) * Number(produit.price));
    totalQuantity.textContent = sumQuantity;
    totalPrice.textContent = sumPrice;

    localStorage.setItem("panier", JSON.stringify(product))
  }
}


//************* validation formulaire


const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")

let valueFirstName , valueLastName , valueAddress , valueCity , valueEmail;

firstName.addEventListener("input", function(e){
  valueFirstName;
  if(e.target.value.length == 0){
      firstNameErrorMsg.innerHTML = "";
      valueFirstName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
      firstNameErrorMsg.innerHTML = "Le prénom doit contenir entre 3 et 25 lettres";
      valueFirstName = null ;
  } if(e.target.value.match(/^[a-z A-Z]{3,25}$/)){
      firstNameErrorMsg.innerHTML = "";
      valueFirstName = e.target.value;
  } if(
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
    e.target.value.length > 3 && 
    e.target.value.length < 25){
      firstNameErrorMsg.innerHTML = "Le prénom ne contient pas de caractères spéciaux";
      valueFirstName = null;
      
  }
});


lastName.addEventListener("input", function(e){
  valueLastName;
  if(e.target.value.length == 0){
      lastNameErrorMsg.innerHTML = "";
      valueLastName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
      lastNameErrorMsg.innerHTML = "Le nom doit contenir entre 3 et 25 lettres";
      valueLastName = null;
  } if(e.target.value.match(/^[a-z A-Z]{3,25}$/)){
      lastNameErrorMsg.innerHTML = "";
      valueLastName = e.target.value;
  } if(
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
    e.target.value.length > 3 && 
    e.target.value.length < 25){
      lastNameErrorMsg.innerHTML = "Le nom ne contient pas de caractères spéciaux";
      valuelastName = null;
  }
});

address.addEventListener("input", function(e){
  valueAddress;
  if(e.target.value.length == 0){
      addressErrorMsg.innerHTML = "";
      valueAddress = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35 ){
      addressErrorMsg.innerHTML = "L'addresse' doit contenir entre 3 et 35 caractères";
      valueAddress = null
  } if(e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{5,50}$/)){
      addressErrorMsg.innerHTML = "";
      valueAddress = e.target.value;
  } if(
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,50}$/) && 
    e.target.value.length > 3 && 
    e.target.value.length < 35){
      addressErrorMsg.innerHTML = "L'adresse commence par des chiffres";
      valueAddress = null;
  }
});

city.addEventListener("input", function(e){
  valueCity;
  if(e.target.value.length == 0){
      cityErrorMsg.innerHTML = "";
      valueCity = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25 ){
      cityErrorMsg.innerHTML = "Le nom de la ville doit contenir entre 3 et 25 lettres";
      valueLas = null
  } if(e.target.value.match(/^[a-z A-Z]{3,25}$/)){
      cityErrorMsg.innerHTML = "";
      valueCity = e.target.value;
  } if(
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
    e.target.value.length > 3 && 
    e.target.value.length < 25){
      cityErrorMsg.innerHTML = "Le nom de la ne contient pas de caractères spéciaux";
      valueCity = null;
  }
});

email.addEventListener("input", (e) => {
  if(e.target.value.length == 0){
      emailErrorMsg.innerHTML = "";
      valueEmail = null;
  } else if (e.target.value.match(/^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/)){
      emailErrorMsg.innerHTML = "";
      valueEmail = e.target.value;
  } if (!e.target.value.match(/^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/) && !e.target.value.length == 0){
        emailErrorMsg.innerHTML = "email incorrect ex: michel@gmail.com";
        valueEmail = null;
    }
});


//*************envoie sur la page de confirmation
function onCommande(contenue){
  document
  .getElementById("order")
  
  .addEventListener("click",(e) =>{
    e.preventDefault();
    
    if(valueFirstName != null  && valueLastName != null && valueAddress != null && valueCity != null && valueEmail != null)
  {
    let contact = {
      firstName: valueFirstName,
      lastName: valueLastName, 
      address: valueAddress, 
      city: valueCity, 
      email: valueEmail,
    }
    let products = [];
    for(let i = 0; i < product.length; i++ )
    {
      products.push(product[i].id)
    }
    let parent = {
   method : "POST", 
   body : JSON.stringify({contact, products}),
   headers : {"Accept": "application/json", "Content-type": "application/json"}   
    }
    fetch("http://localhost:3000/api/products/order", parent)
    .then((response) => {
      return response.json()
    })
    .then((result) =>{
      localStorage.clear();
      location.href = "confirmation.html?id=" + result.orderId;

    })
    .catch((error) => {
      console.log(error);
    })
  } else{
    alert ("formulaire invalide");
  }
  });
  
}

onCommande();