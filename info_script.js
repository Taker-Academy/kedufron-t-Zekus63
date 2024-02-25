const APIurl = 'https://api.kedufront.juniortaker.com/';
const urlparams = new URLSearchParams(window.location.search);
const item_id = urlparams.get('item_id')

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
        .get(APIurl + "item/picture/" + item_id)
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
        
        const price = document.createElement('p');
        price.className = "element_price";
        price.textContent = liste_data.data.item.price + " €";
        price.style.marginBlock = "0";
        price.style.fontSize = "30px";
        info.appendChild(price);

        disp.appendChild(info);


        // const 
    })
  }
