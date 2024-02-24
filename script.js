const APIurl = 'https://api.kedufront.juniortaker.com/';

function liste() {
  axios
  .get(APIurl + "item/")
  .then((liste_data) => {
    const disp = document.createElement('main');
    disp.className = "my_liste";
    console.log(liste_data);
    for (let index = 0; index < Object.keys(liste_data.data).length; index++) {
      const element = document.createElement('article');
      element.classList.add("liste_element", index);
      axios
      .get(APIurl + "item/picture/" + liste_data.data[index].image)
      .then((image_data) => {
        const name = document.createElement('p');
        name.textContent = liste_data.data[index].name;
        name.style.marginBlock = "0";
        element.appendChild(name);
        const img = document.createElement('img');
        img.src = image_data.config.url;
        img.style.height = "200px";
        img.style.objectFit = "cover";
        element.appendChild(img);
        const price = document.createElement('p');
        price.textContent = liste_data.data[index].price;
        price.style.marginBlock = "0";
        element.appendChild(price);
      })
      disp.appendChild(element); 
    }
    document.body.appendChild(disp);
  })
}
liste();
