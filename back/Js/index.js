main()

async function main(){
    const products = await getProducts()

    for (article of articles){
        displayProducts(article)
    }
}

function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then(function(httpBodyResponse){
        return response.json()
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
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("Title").textContent = article.title
    cloneElt.getElementById("Body").textContent = article.body

    document.getElementById("items").appendChild(cloneElt)
}

/* déclarer les produits via l'api
allez chercher les produits
les afficher
rediriger vers la page correspondante */
