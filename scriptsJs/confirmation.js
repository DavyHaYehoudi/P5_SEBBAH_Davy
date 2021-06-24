// Récupération de l'identifiant

let orderId = new URLSearchParams(location.search).get('orderId');
console.log(orderId);

const nodeConf = document.querySelector('#confirmation h3');

nodeConf.innerHTML+=`
<p>${orderId}</p>`