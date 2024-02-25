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