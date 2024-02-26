const APIurl = 'https://api.kedufront.juniortaker.com/';
const urlparams = new URLSearchParams(window.location.search);
const item_id = parseInt(urlparams.get('item_id'));

if (!localStorage.getItem("order")) {
  let order = new Object();
  order.email = null;
  order.name = null;
  order.address = null;
  order.cart = [];
  localStorage.setItem("order", JSON.stringify(order));
}

let order = JSON.parse(localStorage.getItem("order"));


function print_info() {
    axios
    .get(APIurl + "item/" + item_id)
    .then((liste_data) => {

        const disp = document.getElementById('main');

        axios
        .get(APIurl + "item/picture/" + liste_data.data.item.image)
        .then((image_data) => {
            const img = document.createElement('img');
            img.src = image_data.config.url;
            img.style.height = "500px";
            img.style.objectFit = "cover";
            disp.appendChild(img);
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

        const description = document.createElement('p');
        description.className = "element_description";
        description.textContent = liste_data.data.item.description;
        description.style.marginBlock = "0";
        description.style.fontSize = "30px";
        info.appendChild(description);
        

        const shop = document.createElement('div');
        shop.className = "element_shop";

        const price = document.createElement('p');
        price.textContent = liste_data.data.item.price + " €";
        price.style.marginBlock = "0";
        price.style.fontSize = "30px";
        shop.appendChild(price);

        const price_buton = document.createElement('div');
        var index = 0;
        for (; index < order.cart.length && order.cart[index].id != item_id; index++) {}
        if (index < order.cart.length && order.cart[index].id == item_id) {
            price_buton.textContent = "Suprimer du panier";
        } else {
            price_buton.textContent = "Ajouter au panier";
        }
        price_buton.onclick = function(){
            if (price_buton.textContent == "Suprimer du panier") {
                price_buton.textContent = "Ajouter au panier";
                order.cart.splice(index, 1); 
                localStorage.setItem("order", JSON.stringify(order));
            } else {
                price_buton.textContent = "Suprimer du panier";
                order.cart[index] = {id: item_id, amount: 1,}; 
                localStorage.setItem("order", JSON.stringify(order));
                localStorage.setItem("order", JSON.stringify(order));
            }
            console.log(order);
        };
        price_buton.style.fontFamily = "Arial, Helvetica, sans-serif";
        shop.appendChild(price_buton);

        info.appendChild(shop);

        disp.appendChild(info);


    })
}

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
