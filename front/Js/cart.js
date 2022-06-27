//let someProduct = [];

const product = JSON.parse(localStorage.getItem("panier"));
const cart_items = document.getElementById("cart__items");

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
  alert(event.target.value);
 let foundProduct = panier.find(p => p.id == product._id);
 if(foundProduct != undefined){
  foundProduct.quantity++;
 } else {
  product.quantity = 1;
  panier.push(product);
 }
});

cart__item__content__settings__quantity.appendChild(quantité);
cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

const cart__item__content__settings__delete = document.createElement("div");
cart__item__content__settings__delete.setAttribute("class","cart__item__content__settings__delete");

const deleteItem = document.createElement("p");
deleteItem.setAttribute("class", "deleteItem");
deleteItem.addEventListener("click", function(event){
  product = product.filter(p => p.id != product._id); 
  alert();
  event.preventDefault();
})
deleteItem.textContent = "Supprimer";
cart__item__content__settings__delete.appendChild(deleteItem);
cart__item__content__settings.appendChild(cart__item__content__settings__delete);

cart__item__content.appendChild(cart__item__content__settings);

  article.appendChild(cart__item__content);

  cart_items.appendChild(article);


 getTotalProduct();
 //removeProduct();

 //localStorage.setItem("panier", JSON.stringify(panier));
};

const inCartBis = () => {
    if (product){
      product.forEach(function(k) {
        fetch (`http://localhost:3000/api/products/${k.id}`).then( function (response) {
           return response.json() 
        
        }).then( function(result){
          inCart(result, k)
        }).catch (function(error){
        
        }) 
      });
    }  
    }

inCartBis();


const getTotalProduct = async (inCart, changeQuantity, removeProduct) => {
    await inCart;
    await changeQuantity;
    await removeProduct;
    let totalPrice = [];
    let totalProduct = [];
    let maxArray = JSON.parse(localStorage.getItem("panier")); 
    let showQuantity = document.querySelectorAll(".itemQuantity");
    maxArray.forEach((contenue, product) => {
        totalPrice.push(product.price * contenue.qty)
        totalProduct.push(contenue.qty)
    });  
    document
    .getElementById("totalQuantity")
    .textContent = `${eval(totalProduct.join("+"))}`; 

    document
    .getElementById("totalPrice")
    .textContent = `${eval(totalPrice.join("+"))}`; 
};






/**************************************** validation formulaire***********************************************/







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
      addressErrorMsg.innerHTML = "L'addresse' doit contenir entre 3 et 35 lettres";
      valueAddress = null
  } if(e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{5,50}$/)){
      addressErrorMsg.innerHTML = "";
      valueAddress = e.target.value;
  } if(
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{5,50}$/) && 
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

/* mettre location.href="confirmation.html" sur id "order" du formulaire */



/*const removeProduct = async (inCart) => {
  await inCart;
  let corbeilles = document.querySelectorAll(".deleteItem");
  corbeilles.forEach((corbeille) => 
  {corbeille.addEventListener("click", () => { 
      let totalRemove = product.length;
      console.log(totalRemove);
      
      if(totalRemove == 1) {
          return (
          localStorage.removeItem("panier"),
          (location.href = "cart.html")
          );
      } else {
          someProduct = product.filter(k => {
              if(corbeille.dataset.if != k.id || corbeille.dataset.color != k.color){
              return true
              }       
          });
          localStorage.setItem("panier", JSON.stringify(someProduct));
          getTotalProduct();
          (location.href = "cart.html")
      }
      });
  });
  return;
};*/
