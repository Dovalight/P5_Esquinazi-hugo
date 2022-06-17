 export class Panier {
    constructor() {
        let panier = localStorage.getItem("panier");
        if(panier == null){
            this.panier = [];
        } else {
            this.panier = JSON.parse(panier);
        }
    }
    
    save() {
        localStorage.setItem("panier", JSON.stringify(this.panier));
    }

    add(product){
        let foundProduct = this.panier.find(f => f.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity++;
        } else {
            product.quantity = 1;
            this.panier.push(product);
        }
        this.save();
    }

    remove(product){
        this.panier = this.panier.filter(f => f.id != product.id);
        this.save();
    }

    changeQuantity(product,quantity){
        let foundProduct = this.panier.find(f => f.id == product.id);
        if(foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0){s
                remove(foundProduct);
            } else {
                this.save();
            }
        } 
    }

    getNumberProduct(){
        let number = 0;
        for(let product of this.panier){
            number += product.quantity;
        }
        return number;
    }
    
    getTotalPrice(){
        let total = 0;
        for(let product of this.panier){
            total += product.quantity * product.price;
        }
        return total;
    }
}