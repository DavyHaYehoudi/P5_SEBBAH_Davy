// Récupération de l'identifiant
const nodeConf = document.querySelector('#confirmation h3');

let orderId = new URLSearchParams(location.search).get('orderId');
nodeConf.innerHTML+=`
${orderId}`

// Récupération du prix total
const nodePrixFinal = document.querySelector('#confirmation h4');
let prixFinal = localStorage.getItem('articleSelectionne');

prixFinal = JSON.parse(prixFinal);
nodePrixFinal.innerHTML += `Montant net de la transaction : ${prixFinal},00€`

localStorage.clear();