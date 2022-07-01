async function commande() {
    const getCommande = getCommandeId()
    const bonDeCommande = await commandeId(getCommande) 
    console.log(commandeId);
}


//*******affichage du numero de commande dans l'url
function getCommandeId(){
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    if (params.has('id')){
        const p = params.get('id');
        return p;
    }
}



const orderId = document.getElementById("orderId");
orderId.textContent = getCommandeId();