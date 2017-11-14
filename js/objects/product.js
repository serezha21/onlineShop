class Product {
    constructor(id, name, price, newPrice, category, urlImg, urlImgDir, description) {
        this.id = id;
        this.name = name;
        this.urlImg = urlImg;
        this.urlImgDir = urlImgDir;
        this.description = description;
        this.price = price;
        this.newPrice = newPrice;
        this.category = category;
    }

    /*mDesc() {
    	let mDesc = {
    		title: this.name,
    		img: this.urlImg,
    		catID: this.category,
    		btn: "btn" + this.id
    	};
    	return mDesc;
    }

    getDescription() {
    	return {
    		title: this.name,
    		img: this.urlImg,
        	description: this.description,
        	price: this.price,
    		btn: "btn" + this.id
    	};
    }*/

    compare(ProductA,ProductB) {
		return ProductA.name==ProductB.name;
	}
}
