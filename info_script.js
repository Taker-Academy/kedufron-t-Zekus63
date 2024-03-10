const APIurl = 'https://api.kedufront.juniortaker.com/';
const urlparams = new URLSearchParams(window.location.search);
var item_id = parseInt(urlparams.get('item_id'));
console.log(typeof(item_id), item_id);

if (isNaN(item_id)) {
    window.location.href="home.html";
}

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
        disp.style.minHeight = "500px";

        const img_div = document.createElement('div');
        img_div.style.display = "flex";
        img_div.style.alignItems = "center";
        img_div.style.justifyItems = "center";
        axios
        .get(APIurl + "item/picture/" + liste_data.data.item.image)
        .then((image_data) => {
            const img = document.createElement('img');
            img.src = image_data.config.url;
            img.style.height = "auto";
            // img.style.width = "500px";
            img.style.maxWidth = "500px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "20px";
            img_div.appendChild(img);
        })
        disp.appendChild(img_div);


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

        const createin = document.createElement('p');
        createin.className = "element_createin";
        createin.style.fontFamily = "Arial, Helvetica, sans-serif";
        createin.textContent = "create in : " + liste_data.data.item.createdIn;
        createin.style.marginBlock = "0";
        createin.style.fontSize = "20px";
        info.appendChild(createin);
        

        const shop = document.createElement('div');
        shop.className = "element_shop";

        const price = document.createElement('p');
        console.log(liste_data.data.item.price);
        console.log(liste_data);
        price.textContent = liste_data.data.item.price + " €";
        price.style.marginBlock = "0";
        price.style.fontSize = "30px";
        shop.appendChild(price);

        const price_buton = document.createElement('div');
        price_buton.className = "button";
        price_buton.textContent = "Ajouter au panier";
        price_buton.onclick = function(){
            if (order.cart.map(el => el.id).indexOf(liste_data.data.item._id) == -1) {
                order.cart.push({id: item_id, amount: 1,});
                localStorage.setItem("order", JSON.stringify(order));
            } else {
                order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount++;
                localStorage.setItem("order", JSON.stringify(order));
            }
        };
        price_buton.style.fontFamily = "Arial, Helvetica, sans-serif";
        shop.appendChild(price_buton);

        info.appendChild(shop);

        disp.appendChild(info);
    })
    .catch(function (error) {
        window.location.href="home.html";
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
