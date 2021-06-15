// Récupération de l'identifiant
let ident = localStorage.getItem("articleSelectionne");
ident = JSON.parse(ident);
console.log(ident);



const nodeConf = document.querySelector('#confirmation h3');

nodeConf.innerHTML+=`
<p>${ident[0].identifiant}</p>`