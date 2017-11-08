function Cart() {

    //private
    let products = [];

    //public
    this.delProduct = function(product){
        for(let i = 0 ; i < products.length ; i++){
            if(product.compare(products[i].product,product)){
                products.splice(i, 1);
                break;
            }
        }
    }

    this.changeCount = function(product, quantity){
        for(let i = 0 ; i < products.length ; i++){
            if(product.compare(products[i].product,product)){
                products[i].quantity = quantity;
                break;
            }
        }
    }

    this.addProduct = function(product, quantity = 1){
        for(let i = 0 ; i < products.length ; i++){
            if(product.compare(products[i].product, product)){
                products[i].quantity += quantity;
                return;
            }
        }
        products.push({"product":product, "quantity":quantity});
        console.dir(products);
    }

    this.getProducts = function(product) {
        for(let i = 0 ; i < products.length ; i++)
            if(product.compare(products[i].product,product))
                return products[i].quantity;
    }

    this.getCount = function(product){
        for(let i = 0 ; i < products.length ; i++)
            if(product.compare(products[i].product,product))
                return products[i].quantity;
    }

    Object.defineProperty(this, "length", { get: function() {
        return products.length;
    }});

    Object.defineProperty(this, "sum", {
        get: function() {
            let temp = [];
            let total = 0;

            for(let i = 0; i < products.length; i++){
                temp.push({"product" : products[i].product, "sum" : products[i].product.price * products[i].quantity});
                total += temp[i].sum;
            }

            return {"total" : total, "products" : temp};
        }
    });
}

