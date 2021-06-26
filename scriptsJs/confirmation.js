// Récupération de l'identifiant
const nodeConf = document.querySelector('#confirmation h3');

let orderId = new URLSearchParams(location.search).get('orderId');
nodeConf.innerHTML+=`
${orderId}`

// Récupération du prix total
prixTotalConfirmation();

