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

// Fonction qui permet de modifier le prix total et de l'aficher.
function nb_total(commande, total) {
    var price = 0;
    total.classList.add("arial_font");

    for (let index = 0; index < order.cart.length; index++) {
        axios
        .get(APIurl + "item/" + order.cart[index].id)
        .then((liste_data) => {
            price = price + (liste_data.data.item.price * order.cart[index].amount);
            total.textContent = "Total: " + price + " €";
        })
    }
    if (order.cart.length == 0)
        total.textContent = "Total: " + 0 + " €";
    commande.prepend(total);
}

// Fonction qui affiche l'orsque le panier est vide
function panier_vide(disp, commande, liste_produit) {
    disp.removeChild(liste_produit);
    disp.removeChild(commande);
    disp.style.display = "flex";
    const vide = document.createElement('p');
    vide.className = "vide";
    vide.textContent = "Votre panier est vide.";
    // disp.appendChild(vide);
    disp.appendChild(vide);
}

// Fonction qui permet de suprimer un article du panier
function f_del_buton(disp, liste_produit, produit, liste_data, total, commande) {
    commande.removeChild(total);
    order.cart.splice(order.cart.map(el => el.id).indexOf(liste_data.data.item._id), 1);
    localStorage.setItem("order", JSON.stringify(order));
    nb_total(commande, total);
    liste_produit.removeChild(produit);
}

// Fonction qui ajoute un oncler qui permet de modifier la quantité d'un article dans le panier.
function f_selecte(disp, liste_produit, produit, liste_data, total, produit_shop, del_buton, commande) {
    const number_select = document.createElement('select');
    const number_search = document.createElement('input');

    // element qui permet de selectioner les quantité inferieur à 10.
    number_select.className = "selecte";
    for (let x = 1; x <= 10; x++) {
        const option = document.createElement('option');
        option.value = x;
        if (x < 10) {
            option.textContent = x;
        } else {
            option.textContent = x + "+";
        }
        number_select.appendChild(option);
    }
    number_select.selectedIndex = order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount - 1;
    number_select.addEventListener("change", () => {
        const value_selected = parseInt(number_select.options[number_select.selectedIndex].value);
        order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount = value_selected;
        localStorage.setItem("order", JSON.stringify(order));
        nb_total(commande, total);
        if (value_selected == 10) {
            number_search.value = order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount;
            produit_shop.replaceChild(number_search, number_select);
        }
    });

    // element qui permet d'ecrire les quantité supérieur à 10.
    number_search.type = "number";
    number_search.value = order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount;
    number_search.addEventListener("change", () => {
        const value_selected = parseInt(number_search.value);
        if (value_selected == 0) {
            del_buton.click();
        } else {
            order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount = value_selected;
            localStorage.setItem("order", JSON.stringify(order));
            nb_total(commande, total);
            if (value_selected > 0 && value_selected < 10){
                number_select.selectedIndex = order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount - 1;
                produit_shop.replaceChild(number_select, number_search);
            }
        }
    });

    if (order.cart[order.cart.map(el => el.id).indexOf(liste_data.data.item._id)].amount < 10) {
        produit_shop.appendChild(number_select);
    } else {
        produit_shop.appendChild(number_search);
    }
}

// Fonction qui ajoute une div qui contient des element permetant de communiquer avce le panier.
function f_produit_shop(disp, liste_produit, produit, liste_data, total, commande) {
    const produit_shop = document.createElement('div');
    produit_shop.className = "produit_shop";

    const del_buton = document.createElement('div');
    del_buton.className = "button";
    del_buton.classList.add("arial_font");
    del_buton.textContent = "Suprimer du panier";
    del_buton.onclick = function(){
        f_del_buton(disp, liste_produit, produit, liste_data, total, commande);
        if (order.cart.length === 0) {
            panier_vide(disp, commande, liste_produit);
        }
    };
    produit_shop.appendChild(del_buton);

    f_selecte(disp, liste_produit, produit, liste_data, total, produit_shop, del_buton, commande);

    produit.appendChild(produit_shop);
}

// Fonction qui permet d'afficher les information d'un article.
function f_produit_info(produit, liste_data) {
    const produit_info = document.createElement('div');
    produit_info.className = "produit_info";

    const name = document.createElement('p');
    name.className = "produit_name";
    name.textContent = liste_data.data.item.name;
    name.style.marginBlock = "0";
    name.style.fontSize = "50px";
    produit_info.appendChild(name);

    const price = document.createElement('p');
    price.textContent = liste_data.data.item.price + " €";
    price.style.marginBlock = "0";
    price.style.fontSize = "30px";
    produit_info.appendChild(price);

    produit.appendChild(produit_info);
}

// Fonction qui ajoute à un element l'image qui corespond au produit.
function f_produit_img(produit, liste_data) {
    const produit_img = document.createElement('img');
    produit_img.className = "produit_img";
    axios
    .get(APIurl + "item/picture/" + liste_data.data.item.image)
    .then((image_data) => {
        produit_img.src = image_data.config.url;
    })
    produit.appendChild(produit_img);
}

function panier_commander(disp, commande, liste_produit, code) {
    disp.removeChild(liste_produit);
    disp.removeChild(commande);
    disp.style.display = "flex";
    const vide = document.createElement('p');
    vide.className = "vide";
    vide.classList.add("arial_font");
    vide.textContent = "Votre code de validation est : " + code;
    disp.appendChild(vide);
}

function commande_div(commande, disp, liste_produit) {
    const formulaire = document.createElement('div');
    formulaire.className = "formulaire";

    const name_titel = document.createElement('label')
    name_titel.classList.add("arial_font");
    name_titel.textContent = "Nom";
    formulaire.appendChild(name_titel);
    const name_input = document.createElement('input')
    name_input.type = "text";
    name_input.placeholder = "ex: Prénom et NOM";
    if (order.name) {
        name_input.value = order.name;
    }
    name_input.addEventListener("change", () => {
        const value_selected = name_input.value;
        if (value_selected) {
            order.name = value_selected;
            localStorage.setItem("order", JSON.stringify(order));
        }
    });
    formulaire.appendChild(name_input);
    // formulaire.appendChild(name);

    const email_titel = document.createElement('label')
    email_titel.classList.add("arial_font");
    email_titel.textContent = "Email";
    formulaire.appendChild(email_titel);
    const email_input = document.createElement('input')
    email_input.type = "email";
    email_input.placeholder = "ex: exemple@domaine.com";
    if (order.email) {
        email_input.value = order.email;
    }
    email_input.addEventListener("change", () => {
        const value_selected = email_input.value;
        if (value_selected) {
            order.email = value_selected;
            localStorage.setItem("order", JSON.stringify(order));
        }
    });
    formulaire.appendChild(email_input);
    // formulaire.appendChild(email);

    const address_titel = document.createElement('label')
    address_titel.className = "arial_font";
    address_titel.classList.add("arial_font");
    address_titel.textContent = "adresse";
    formulaire.appendChild(address_titel);
    const address_input = document.createElement('input')
    address_input.type = "text";
    address_input.placeholder = "ex: 5 Av. Anatole France, 75007 Paris";
    if (order.address) {
        address_input.value = order.address;
    }
    address_input.addEventListener("change", () => {
        const value_selected = address_input.value;
        if (value_selected) {
            order.address = value_selected;
            localStorage.setItem("order", JSON.stringify(order));
        }
    });
    formulaire.appendChild(address_input);

    commande.appendChild(formulaire);


    const commande_buton = document.createElement('div');
    commande_buton.className = "button";
    commande_buton.classList.add("arial_font");
    commande_buton.textContent = "Valider ma commande";
    commande_buton.onclick = function(){
        if (!name_input.value) {
            name_input.style.borderColor = "red";
        } else {
            name_input.style.borderColor = "#666666";
        }
        if (!email_input.value) {
            email_input.style.borderColor = "red";
        } else {
            email_input.style.borderColor = "#666666";
        }
        if (!address_input.value) {
            address_input.style.borderColor = "red";
        } else {
            address_input.style.borderColor = "#666666";
        }
        if (name_input.value && email_input.value && address_input.value) {
            axios
            .post(APIurl + "order/", order)
            .then((reponse) => {
                name_titel.style.borderColor = "black";
                email_titel.style.borderColor = "black";
                address_titel.style.borderColor = "black";
                localStorage.removeItem("order")
                panier_commander(disp, commande, liste_produit, reponse.data.command_id);
            })
            .catch(function (error) {
            if (error.request.response.split('&#x27;').indexOf("name") != -1) {
                name_titel.style.borderColor = "red";
            } else {
                name_titel.style.borderColor = "black";
            }
            if (error.request.response.split('&#x27;').indexOf("email") != -1) {
                email_titel.style.borderColor = "red";
            } else {
                email_titel.style.borderColor = "black";
            }
            if (error.request.response.split('&#x27;').indexOf("address") != -1) {
                address_titel.style.borderColor = "red";
            } else {
                address_titel.style.borderColor = "black";
            }
            })
        }
    };
    commande.appendChild(commande_buton);


}

// Fonction qui affiche les article du panier et le total.
function print_basket() {
    const disp = document.getElementById('main');
    const liste_produit = document.createElement('div');
    liste_produit.className = "liste_produit";
    const commande = document.createElement('div');
    commande.className = "commande";

    const total = document.createElement('div');
    total.className = "total";

    for (let index = 0; index < order.cart.length; index++) {
        axios
        .get(APIurl + "item/" + order.cart[index].id)
        .then((liste_data) => {
            const produit = document.createElement('article');
            produit.classList.add("produit", order.cart[index].id, "produit_border");

            f_produit_img(produit, liste_data);

            f_produit_info(produit, liste_data);

            f_produit_shop(disp, liste_produit, produit, liste_data, total, commande);

            liste_produit.appendChild(produit);
        })
    }
    disp.appendChild(liste_produit);

    nb_total(commande, total);
    commande_div(commande, disp, liste_produit);

    disp.appendChild(commande);
    if (order.cart.length == 0) {
        panier_vide(disp, commande, liste_produit);
    }

}
