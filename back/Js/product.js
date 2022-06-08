
(function(){
    const productId = getProductId()
    const product = await getProduct(productId)
    hydrateProduct(product)
})()

function getProductId(){
    return new URL(location.href).searchParams.get("item__img")
}

function getProduct(){
    return fetch("http://localhost:3000/api/products/${productId}")
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

function hydrateProduct(){
    document.getElementsById("_id").textContent = product.title
    document.getElementById("_id").textContent = product.body
}