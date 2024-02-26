const APIurl = 'https://api.kedufront.juniortaker.com/';
// localStorage.removeItem("order");
if (!localStorage.getItem("order")) {
  let order = new Object();
  order.email = null;
  order.name = null;
  order.address = null;
  order.cart = [];
  localStorage.setItem("order", JSON.stringify(order));
}

let order = JSON.parse(localStorage.getItem("order"));

function liste() {
  axios
  .get(APIurl + "item/")
  .then((liste_data) => {
    console.log(liste_data);
    const disp = document.createElement('main');
    disp.className = "my_liste";
    for (let index = 0; index < liste_data.data.length; index++) {
      const element = document.createElement('atticle');
      element.classList.add("liste_element", liste_data.data[index]._id);
      element.onclick = function(){window.location.href="info.html" + "?item_id=" + element.classList[1];};
      axios
      .get(APIurl + "item/picture/" + liste_data.data[index].image)
      .then((image_data) => {
        const name = document.createElement('header');
        name.textContent = liste_data.data[index].name;
        name.style.marginBlock = "0";
        name.style.fontSize = "30px";
        element.appendChild(name);
        const img = document.createElement('img');
        img.src = image_data.config.url;
        img.style.height = "200px";
        img.style.objectFit = "cover";
        element.appendChild(img);
        const price = document.createElement('footer');
        price.textContent = liste_data.data[index].price + " €";
        price.style.marginBlock = "0";
        element.appendChild(price);
      })
      disp.appendChild(element); 
    }
    document.body.appendChild(disp);
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
