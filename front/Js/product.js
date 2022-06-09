
( async function(){
    const productId = getProductId()
    const product = await getProduct(productId)
    console.log(product)
    hydrateProduct(product)
})()

function getProductId(){
    return new URL(location.href).searchParams.get("id")
}

function getProduct(productId){
    return fetch("http://localhost:3000/api/products/" + productId)
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

function hydrateProduct(product){
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
}

const xxx = require("cart.js")

/* addToCart redirect au panier + addEventListener fonction add */