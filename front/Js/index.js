main()

async function main(){
    const products = await getProducts()
    for (product of products){
        displayProducts(product)
    }
}

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

function displayProducts(product){
    const templateElt = document.getElementById("items")
    templateElt.innerHTML += ` <a href="front/html/product.html?id=${product._id}"> 
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article> `
}

