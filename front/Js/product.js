( async function(){
    const productId = getProductId()
    const product = await getProduct(productId)
    console.log(product)
    hydrateProduct(product)
})()

function getProductId(){
    /*return new URL(location.href).searchParams.get("id")*/
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if(params.has('id')){
        const id = params.get('id');
        return id;
    }
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
        addToCart(product)
}

function addToCart(product){
    document
    .getElementById("addToCart")
    .addEventListener("click", function() {
        let quantity = document.getElementById("quantity").value
        let couleur = document.getElementById("colors").value
        let panierValue = localStorage.getItem ("panier")
        let panier = JSON.parse(panierValue); 
        if (!panier) {
            panier =  []
        };
        if (couleur === ''){
            alert ("ajouté une couleur.");
            return
        };
        if (Number(quantity) < 1 ||  Number(quantity) > 100 ) {
            alert("definissez la quantité.");
            return
        } ;
        
        let contenu = {
            product: product._id,
            qty: quantity,
            color: couleur,
        }
        const p = panier.find(function(x){
            return x.product === contenu.product && x.color === contenu.color
        });
        if (p){
            p.qty = Number(p.qty) + Number(contenu.qty)
        } else {
            panier.push(contenu)
        }
        localStorage.setItem("panier", JSON.stringify(panier))
    });
}
