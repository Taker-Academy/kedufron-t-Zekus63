const APIurl = 'https://api.kedufront.juniortaker.com/';
const urlparams = new URLSearchParams(window.location.search);
const item_id = urlparams.get('item_id')

console.log(item_id);

