const APIurl = 'https://api.kedufront.juniortaker.com/';
const urlparams = new URLSearchParams(window.location.search);
const item_id = urlparams.get('item_id')
console.log(item_id);


function info() {
    axios
    .get(APIurl + "item/" + item_id)
    .then((liste_data) => {
      const disp = document.createElement('main');
      disp.className = "element";
      console.log(liste_data.data.item);

        axios
        .get(APIurl + "item/picture/" + item_id)
        .then((image_data) => {
          const name = document.createElement('header');
          name.textContent = liste_data.data.item.name;
          name.style.marginBlock = "0";
          name.style.fontSize = "30px";
          disp.appendChild(name);


          const img = document.createElement('img');
          img.src = image_data.config.url;
          img.style.height = "200px";
          img.style.objectFit = "cover";
          disp.appendChild(img);


          const price = document.createElement('footer');
          price.textContent = liste_data.data.item.price + " €";
          price.style.marginBlock = "0";
          disp.appendChild(price);


          const description = document.createElement('footer');
          description.textContent = liste_data.data.item.description;
          description.style.marginBlock = "0";
          disp.appendChild(description);
        })
        // disp.appendChild(element); 


        
      document.body.appendChild(disp);
    })
  }
