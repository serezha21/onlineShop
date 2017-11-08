'use strict';

document.addEventListener("DOMContentLoaded", function(){
    viewCategorys();
    document.querySelector("#cart").addEventListener("click", viewCart);
    document.querySelector("#view-cart .close").addEventListener("click", function(){
        this.parentElement.parentElement.style.display = "none";
    });
});

let main = document.querySelector("#main");

function viewCategorys(catID = -1, prod = 0, activeCat = 0, activeSubCat = 0) {
    main.innerHTML = "";
    let listCat = document.createElement('nav');
    listCat.id = "cat-list";
    let headTopLeftNav = document.querySelector("#header-left nav");
    headTopLeftNav.innerHTML = "";
    let ulHeadNav = document.createElement("ul");
    let headSubCat = document.querySelector("#header-subcategories");
    headSubCat.innerHTML = "";
    let ulSubCat = document.createElement("ul");
    ulSubCat.classList.add("clear");
    for (let i = 0; i < category.length; i++) {
        if(category[i].nsID == 0) {
            if(activeCat && activeCat == category[i].id) {
                viewCat(ulHeadNav, i, activeCat);
                document.querySelector("title").innerHTML = "electrify | " + category[i].name;
            }
            else viewCat(ulHeadNav, i);
        }else {
            if(category[i].nsID == catID || category[i].nsID > 0 && catID < 0) {
                if(activeSubCat && activeSubCat == category[i].id) viewCat(ulSubCat, i, activeSubCat);
                else viewCat(ulSubCat, i);
                if(!prod) viewCategory(listCat, i);
            }
        }
    }
    headTopLeftNav.append(ulHeadNav);
    headSubCat.append(ulSubCat);
    main.append(listCat);
}

function viewCat(ul, i, active = 0) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "#cat-" + category[i].id;
    a.innerHTML = category[i].name;
    if(active) a.classList.add("active");
    a.addEventListener("click", function(e){
        // Удаляем class active у активной ссылки
        let thisActive = this.parentElement.parentElement.querySelector(".active");
        if(thisActive != null)
            thisActive.classList.remove("active");
        // Добавляем class active у этой ссылки
        this.classList.add("active")
        if(category[i].nsID == 0)
            viewCategorys(category[i].id,0,category[i].id);
        else
            viewListProducts(category[i]);
        e.stopPropagation();
    });
    li.append(a);
    ul.append(li);
}

function viewCategory(listCat, i){
    //создание cat
    let cat = document.createElement("div");
    cat.classList.add("cat");
    cat.style.backgroundColor = "#" + category[i].color;
    // создание img в shell
    let shell = document.createElement("span");
    let img = document.createElement("img");
    img.src = category[i].imgURL;
    img.alt = category[i].name;
    shell.append(img);
    // создание title
    let title = document.createElement("p");
    title.innerHTML = category[i].name;
    // привязка события нажатия на ссылку
    cat.addEventListener("click",function(e) {
        viewListProducts(category[i]);
        e.stopPropagation();
    });
    //добавляем картинку
    cat.append(shell);
    //добавляем название
    cat.append(title);
    //добавляем элемент в список
    listCat.append(cat);
}

function viewListProducts(cat) {
    main.innerHTML = "";
    viewCategorys(cat.nsID, 1, cat.nsID, cat.id);
    let h2 = document.createElement("h2");
    for(let i = 0; i < category.length; i++) {
        if(category[i].id == cat.nsID) {
            h2.innerHTML = category[i].name;
            break;
        }
    }
    main.append(h2);

    // ASIDE Category Menu
    let aside = document.createElement("aside");
    aside.id = "categories";
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");
    for (let i = 0; i < category.length; i++) {
        if(category[i].nsID == 0 || cat.nsID != category[i].nsID) continue;
        if(cat.id == category[i].id)
           viewCat(ul, i, 1);
        else
           viewCat(ul, i);
    }
    nav.append(ul);
    aside.append(nav);
    main.append(aside);

    // Products View
    let content = document.createElement("div");
    content.id = "content";
    let products = document.createElement("div");
    products.id = "products";
    products.classList.add("clear");
    for(let i = 0; i < prodStore.length; i++)
        if(prodStore[i].category == cat.id)
            viewProd(products, i);
    content.append(products);
    main.append(content);

    // Pagination
}

function viewProd(products, i) {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.classList.add("clear");

    // IMG
    let span = document.createElement("span");
    span.classList.add("img");
    let img = document.createElement("img");
    img.src = prodStore[i].urlImg;
    img.alt = prodStore[i].name;
    img.addEventListener("click", function(e){
        viewProduct(prodStore[i]);
        e.stopPropagation();
    });
    span.append(img);
    productDiv.append(span);

    // block INFO
    let info = document.createElement("div");
    info.classList.add("info");
    let a = document.createElement("a");
    a.href = "#prod-" + prodStore[i].id;
    a.innerHTML = prodStore[i].name;
    a.addEventListener("click", function(e){
        viewProduct(prodStore[i]);
        e.stopPropagation();
    });
    info.append(a);
    info.append(document.createElement("br"));
    // Price
    let price = document.createElement("div");
    price.classList.add("price");
    if(prodStore[i].newPrice == 0){
        price.innerHTML = prodStore[i].price + " грн";
    }else{
        price.classList.add("stock");
        let spanPrice = document.createElement("span");
        spanPrice.innerHTML = prodStore[i].price + " грн";
        price.append(spanPrice);
        price.append(document.createElement("br"));
        price.append(prodStore[i].newPrice + " грн");
    }
    info.append(price);
    // Button Купить
    let button = document.createElement("button");
    button.innerHTML = "Купить";
    button.addEventListener("click", function() {
        addToCart(prodStore[i]);
    });
    info.append(button);
    productDiv.append(info);
    products.append(productDiv);
}

// get Category
function getCategory(id) {
    for(let i = 0; i < category.length; i++)
        if(category[i].id == id)
            return category[i].name;
}

// view Product
function viewProduct(prod) {
    main.innerHTML = '<div id="photo-slider"><span><img class="main" src="img/product/apple/iphone-7/7.jpg" alt="apple iphone 7"></span><div class="pagination clear"><img src="img/product/apple/iphone-7/7.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/8.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/9.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/1.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/2.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/3.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/4.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/5.jpg" alt="apple iphone 7"><img src="img/product/apple/iphone-7/6.jpg" alt="apple iphone 7"></div></div><div id="product-info"><div class="title"><h2>Apple iPhone 7 32GB Black</h2><div class="rating"><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><span>5 отзывов</span></div><div class="price">21 999 грн<span>22 999 грн</span></div></div><div class="memory"><span>Обьем памяти</span><button class="gb active">32 Гб</button> <button class="gb disable">64 Гб</button> <button class="gb disable">128 Гб</button></div><div class="order-btns"><button class="add-to-cart active">В корзину</button> <button class="fast-order">Быстрый заказ</button></div><div id="slider-1" class="slider"><div class="navigation"><a href="#feature" class="active" title="feature">Характеристики</a><a href="#description" title="description">Описание</a></div><div class="slids"><div class="slide feature active"><table><tr><td class="property">Бренд</td><td class="value">Most Famous</td></tr><tr><td class="property">Серия</td><td class="value">самая лучшая</td></tr><tr><td class="property">Страна производитель</td><td class="value">Украина</td></tr><tr><td class="property">Тип</td><td class="value">годный товар</td></tr><tr><td class="property">Комплектация</td><td class="value">расширенная</td></tr><tr><td class="property">Размеры, мм</td><td class="value">100 х 50 х 75</td></tr><tr><td class="property">Вид продукции</td><td class="value">хорошая продукция</td></tr><tr><td class="property">Классификация</td><td class="value">сделано для людей</td></tr><tr><td class="property">Коллекция</td><td class="value">2017-2018</td></tr><tr><td class="property">Краткие характеристики</td><td class="value">хороший товар, нужно брать</td></tr></table></div><div hidden class="slide description"><p><b>В iPhone 7 и Phone 7 Plus воплощены последние достижения Apple в области защиты окружающей среды. Следующие особенности устройств снижают их воздействие на окружающую среду:</b></p><ul><li>Дисплей с подсветкой LED не содержит ртути</li><li>Стекло дисплея не содержит мышьяка</li><li>Не содержит бромированных огнестойких добавок</li><li>Не содержит ПВХ</li><li>Корпус из алюминия, пригодного для вторичной переработки</li></ul></div></div></div><div id="slider-2" class="slider"><div class="navigation"><a href="#shipping" class="active" title="shipping">Доставка</a><a href="#payment" title="payment">Оплата</a><a href="#guarantee" title="guarantee">Гарантия</a><a href="#return" title="return">Возврат</a></div><div class="slids"><div class="slide shipping active"><p>Самовывоз <br>- из нашего магазина - бесплатно. <br>- из Новой Почты - бесплатно.</p><p>Курьером по Киеву <br>Мы доставим этот товар курьером службы доставки по вашему адресу - 35 грн</p></div><div hidden class="slide payment"><h4>Наличная</h4><p>Оплата наличными приполучении товара</p><h4>Безналичными</h4><p>Оплата по безналичному расчету производится в кассе отделения любого банка или с расчетного счета Вашей фирмы </p><p>При выборе безналичного способа оплаты доставка заказа возможна после поступления средств на наш расчетный счет</p>                        <h4>Visa и MasterCard</h4><p>Оплата заказа онлайн банковской картой Visa и MasterCard</p><p>Доставка товара возможна только после подтверждения платежа.</p></div><div hidden class="slide guarantee"><h4>Обмен и возврат товара в течение первых 14 дней после покупки.</h4><p>В соответствии с «Законом о защите прав потребителя» покупатели нашего магазина имеют право обменять или вернуть купленный у нас товар в течение первых 14 дней после покупки. <br>Пожалуйста, обратите внимание — обмену или возврату подлежит только новый товар, который не был в употреблении и не имеет следов использования: царапин, сколов, потёртостей, на счётчике телефона не более 5 минут разговоров, программное обеспечение не подвергалось изменениям и т.п. А так же должно быть сохранено:</p><ul><li>полный комплект товара;</li>                            <li>целостность и все компоненты упаковки;</li><li>ярлыки;</li><li>заводская маркировка.</li></ul></div><div hidden class="slide return"><h4>Где и как можно произвести обмен или возврат?</h4><p>Обменять или вернуть товар можно в нашем сервисном отделе по адресу: <br>г. Киев, ул. Рубинова (Релекс), 650, c понедельника по пятницу с 10-00 до 19-00, в субботу — с 10-00 до 17-00. Телефон: (044) 356-78-90</p></div></div></div></div>';
    slider("slider-1");
    slider("slider-2");
    sliderIMG("photo-slider");

    let mainIMG = document.querySelector("#photo-slider .main");
    mainIMG.src = prod.urlImg;
    mainIMG.alt = prod.name;

    let title = document.querySelector("#product-info h2");
    title.innerHTML = prod.name;

    let price = document.querySelector("#product-info .price");
    if(prod.newPrice == 0) price.innerHTML = prod.price + " грн";
    else {
        price.innerHTML = prod.newPrice + " грн";
        let span = document.createElement("span");
        span.innerHTML = prod.price + " грн";
        price.append(span);
    }

    let desc = document.querySelector("#product-info .description");
    desc.innerHTML = prod.description;
}

function addToCart(prod) {
    let viewCartContent = document.querySelector("#view-cart .content");
    if(cart.length == 0){
        viewCartContent.innerHTML = "";
        let h2 = document.createElement("h2");
        h2.innerHTML = "Корзина";
        viewCartContent.append(h2);
    }
    cart.addProduct(prod);
	if(cart.getCount(prod) > 1){
		document.querySelector("#val" + prod.id).value = cart.getCount(prod);
		document.querySelector("#allPrice" + prod.id).innerHTML = cart.getCount(prod) * prod.price;
		return;
	}
    document.querySelector("#cart").innerHTML = cart.length;
    addProductCart(viewCartContent, prod);
    //
}

function addProductCart(viewCartContent, prod) {
	// product
	let productCart = document.createElement("div");
    productCart.classList.add("product");
    productCart.classList.add("clear");
	
	// уадление продукта из корзины
    let iRemove = document.createElement("i");
    iRemove.classList.add("fa");
    iRemove.classList.add("fa-times-circle-o");
    iRemove.classList.add("remove");
    iRemove.addEventListener("click", function() {
        this.parentElement.remove();
        cart.delProduct(prod);
        document.querySelector("#cart").innerHTML = cart.length;
		if(cart.length == 0)
			cartEmpty(viewCartContent);
    });
    productCart.append(iRemove);
	
	// картинка продукта 
    let imgCart = document.createElement("img");
    imgCart.src = prod.urlImg;
    imgCart.alt = prod.name;
    productCart.append(imgCart);
	
	// информация о продукте
    let infoCart = document.createElement("div");
    infoCart.classList.add("info");
	// {
		// Название продукта
		let titleCart = document.createElement("div");
		titleCart.classList.add("title");
		titleCart.classList.add("clear");
		// {
			// Ссылка на продукт
			let aCart = document.createElement("a");
			aCart.href = "#";
			aCart.innerHTML = prod.name;
			aCart.addEventListener("click", function() {
				viewProduct(prod);
				document.querySelector("#view-cart").style.display = "none";
			});
			titleCart.append(aCart);
			// Span Сумма
			let spanCart = document.createElement("span");
			spanCart.innerHTML = "Сумма";
			titleCart.append(spanCart);
			infoCart.append(titleCart);
		// }
		// block prices
		let pricesCart = document.createElement("div");
		pricesCart.classList.add("prices");
		pricesCart.classList.add("clear");
		// {
			// Цена
			let priceCart = document.createElement("div");
			priceCart.classList.add("price");
			priceCart.innerHTML = prod.price;
			pricesCart.append(priceCart);
			// Общая стоимость за кол-во
			let allPriceCart = document.createElement("div");
			allPriceCart.classList.add("allPrice");
			allPriceCart.innerHTML = prod.price;
			allPriceCart.id = "allPrice" + prod.id;
			pricesCart.append(allPriceCart);
			// block Count
			let quantityCart = document.createElement("div");
			quantityCart.classList.add("quantity");
			// {
				// minusQuantity
				let minusCart = document.createElement("i");
				minusCart.classList.add("fa");
				minusCart.classList.add("fa-minus");
				minusCart.addEventListener("click", function() {
					let allPrice = this.parentElement.parentElement.querySelector(".allPrice");
					let inputCount = this.parentElement.querySelector("input");
					let inputValue = +(inputCount.value);
					inputValue--;
					document.querySelector("#cart").innerHTML = cart.length;
					if(inputValue <= 0) {
						this.parentElement.parentElement.parentElement.parentElement.remove();
						cart.delProduct(prod);
						document.querySelector("#cart").innerHTML = cart.length;
						if(cart.length == 0)
							cartEmpty(viewCartContent);
						return;
					}
					cart.changeCount(prod, inputValue);
					inputCount.value = inputValue;
					allPrice.innerHTML = inputValue * prod.price;
				});
				quantityCart.append(minusCart);
				// inputQuantity
				let inputCart = document.createElement("input");
				inputCart.type = "text";
				inputCart.value = "1";
				inputCart.id = "val" + prod.id;
				quantityCart.append(inputCart);
				// plusQuantity
				let plusCart = document.createElement("i");
				plusCart.classList.add("fa");
				plusCart.classList.add("fa-plus");
				plusCart.addEventListener("click", function() {
					let allPrice = this.parentElement.parentElement.querySelector(".allPrice");
					let inputCount = this.parentElement.querySelector("input");
					cart.addProduct(prod);
					let inputValue = +(inputCount.value);
					inputValue++;
					if(inputValue <= 0) {
						this.parentElement.parentElement.parentElement.parentElement.remove();
						return;
					}
					inputCount.value = inputValue;
					allPrice.innerHTML = inputValue * prod.price;
				});
				quantityCart.append(plusCart);
			// }
			pricesCart.append(quantityCart);
		// }
	// }
    infoCart.append(pricesCart);
    productCart.append(infoCart);
    viewCartContent.append(productCart);
}

function cartEmpty(viewCartContent) {
	let h1 = document.createElement("h1");
	let iCart = document.createElement("i");
	iCart.classList.add('fa');
	iCart.classList.add('fa-shopping-cart');
	h1.append(iCart);
	h1.innerHTML += ' Корзина пуста';
	viewCartContent.innerHTML = "";
	viewCartContent.append(h1);
}

// onClick to #cart
function viewCart() {
    document.querySelector("#view-cart").style.display = "block";
}

/* Product INFO Slider */
function slider(nameSlider) {
    let sliderA = document.querySelectorAll("#" + nameSlider + " a");
    for(let i = 0; i < sliderA.length; i++){
        sliderA[i].addEventListener("click", function(e) {
            let active = document.querySelector("#" + nameSlider + " .navigation .active");
            active.classList.remove("active");
            this.classList.add("active");
            active = document.querySelector("#" + nameSlider + " .slids .active");
            active.style.display = "none";
            active.classList.remove("active");
            active = document.querySelector("#" + nameSlider + " ." + this.title);
            active.style.display = "block";
            active.classList.add("active");
            e.stopPropagation();
        }, false);
    }
}

/* Slider IMG */
function sliderIMG(nameSlider) {
    let listImg = document.querySelectorAll("#" + nameSlider + " .pagination img");
    for(let i = 0; i < listImg.length; i++){
        listImg[i].addEventListener("click", function() {
            document.querySelector("#" + nameSlider + " .main").src = this.src;
        });
    }
}





// СТарье
/*function fillProductsSection(catId = -1) {
	for (let i = 0; i < product.length; i++) {
		let objProduct = prodStore[i].mDesc();
		if(catId == -1){ // || p[i].catId == catId
			fillProduct(prodStore[i]);
		}else if(objProduct.catID == catId) {
			fillProduct(prodStore[i]);
		}
	}
}

function fillProduct(prod) {
	let objProduct = prod.mDesc();
	let productDiv = document.createElement("div");
	productDiv.classList.add("product");
	let titleH3 = document.createElement("h3");
	titleH3.innerHTML = objProduct.title;
	let imgURL = document.createElement("img");
	imgURL.src = objProduct.img;
	imgURL.alt = "product";
	imgURL.id = objProduct.btn;
	let buttonCart = document.createElement("button");
	buttonCart.id = objProduct.btn;
	buttonCart.innerHTML = "Добавить в корзину";
	productDiv.append(titleH3); //= titleH3 + "\n" + imgURL + "\n" + buttonCart;
	productDiv.append(imgURL);
	productDiv.append(buttonCart);
	document.querySelector("#main").append(productDiv);
	imgURL.addEventListener("click", function(){
		fillProductSection(prod);
	});
}

function fillProductSection(prod) {
	document.querySelector("#main").innerHTML = "";
	let objProduct = prod.getDescription();
	let productDiv = document.createElement("div");
	productDiv.classList.add("productShop");
	let titleH2 = document.createElement("h2");
	titleH2.innerHTML = objProduct.title;
	let priceSpan = document.createElement("span");
	priceSpan.innerHTML = "Цена " + objProduct.price + "$";
	let imgURL = document.createElement("img");
	imgURL.src = objProduct.img;
	imgURL.alt = "product";
	let descriptionDiv = document.createElement("div");
	descriptionDiv.innerHTML = objProduct.description;
	let buttonCart = document.createElement("button");
	buttonCart.id = objProduct.btn;
	buttonCart.innerHTML = "Добавить в корзину";
	productDiv.append(titleH2); //= titleH3 + "\n" + imgURL + "\n" + buttonCart;
	productDiv.append(priceSpan);
	productDiv.append(imgURL);
	productDiv.append(descriptionDiv);
	productDiv.append(buttonCart);
	document.querySelector("#main").append(productDiv);
}

// получение блока для категорий
let aside = document.getElementById('categories');

//формирование списка категорий
let list = document.createElement("ul");


for (let i = 0; i < c.length; i++) {
    //создание li
    let li = document.createElement("li");
    // создание ссылки
    let a = document.createElement("a");
    a.href = "#";
    // добавление id категории к ссылке
    //a.cat_id = c[i].id;
    // привязка события нажатия на ссылку
    a.addEventListener("click",function(e) {
        document.querySelector("#main").innerHTML = "";
        //вызов функции формирования списка товаров
        fillProductsSection(c[i].id);
        e.stopPropagation();
    });
    //помещаем название категории в ссылку
    a.innerHTML = c[i].name;
    //добавляем ссылку в элемент списка
    li.append(a);
    //добавляем элемент в список
    list.append(li);

}

// добавление списка в блок
aside.append(list);

fillProductsSection();*/
