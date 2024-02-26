const APIurl = 'https://api.kedufront.juniortaker.com/';

if (!localStorage.getItem("order")) {
    let order = new Object();
    order.email = null;
    order.name = null;
    order.address = null;
    order.cart = [];
    localStorage.setItem("order", JSON.stringify(order));
}

let order = JSON.parse(localStorage.getItem("order"));

function shop_bouton() {
    const emplacement = document.getElementById("my_nav");
    const element = document.createElement('div');
    element.onclick = function(){window.location.href="shop.html";};
    element.style.position = "fixed";
    element.style.bottom = "50px";
    element.style.right = "50px";
    element.style.height = "70px";
    element.style.width = "70px";
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    element.style.backgroundColor = "rgb(204, 122, 86)";
    element.style.borderRadius = "50%";
    element.style.color = "white";
    const logo = document.createElement('i');
    logo.classList.add("fa-solid", "fa-cart-shopping", "fa-2xl");
    element.appendChild(logo);
    emplacement.appendChild(element);
}

function print_basket() {
    const disp = document.getElementById('main');

    for (let index = 0; index < order.cart.length; index++) {
        const produit = document.createElement('article');
        produit.classList.add("element_produit", order.cart[index].id);


        axios
        .get(APIurl + "item/" + order.cart[index].id)
        .then((liste_data) => {
            axios
            .get(APIurl + "item/picture/" + liste_data.data.item.image)
            .then((image_data) => {
                const img = document.createElement('img');
                img.src = image_data.config.url;
                img.style.height = "200px";
                img.style.objectFit = "cover";
                produit.appendChild(img);
            })

            const info = document.createElement('article');
            info.className = "element_info";
            info.style.order = "2";
    
            const name = document.createElement('p');
            name.className = "element_name";
            name.textContent = liste_data.data.item.name;
            name.style.marginBlock = "0";
            name.style.fontSize = "50px";
            info.appendChild(name);
    
            const shop = document.createElement('div');
            shop.className = "element_shop";
    
            const price = document.createElement('p');
            price.textContent = liste_data.data.item.price + " €";
            price.style.marginBlock = "0";
            price.style.fontSize = "30px";
            shop.appendChild(price);
    
            const price_buton = document.createElement('div');
            price_buton.textContent = "Suprimer du panier";
            price_buton.onclick = function(){
                order.cart.splice(index, 1); 
                localStorage.setItem("order", JSON.stringify(order));
                disp.removeChild(produit)
            };
            price_buton.style.fontFamily = "Arial, Helvetica, sans-serif";
            shop.appendChild(price_buton);
    
            info.appendChild(shop);
            produit.appendChild(info);
            disp.appendChild(produit);
        })
    }
    
}