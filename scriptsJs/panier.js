let articlePanier =[];

// Récupération des données de stock
let stock = localStorage.getItem("articleSelectionne");
stock = JSON.parse(stock);
console.log(stock);
articlePanier.push(stock);
console.log(articlePanier);

// Variables pour le calcul du total cumulé
let total = 0;
let cumule ;

// Ajout des lignes du tableau
 const rev = document.getElementById('revision');

 rev.innerHTML =
        `<table>
            <tr>
                <th>Nom</th>
                <th>Prix unitaire</th>
                <th>Quantité</th>
                <th>Sous-total</th>
                <th>Supprimer</th>
            </tr>
        </table>`
    
 for(let i = 0; i<stock.length; i++){
        
    // Calcul du sous-total
    let calculST = `${stock[i].prix}` *`${stock[i].quantité}`;

    // Insertion des lignes du tableau récapitulatif des achats
    rev.innerHTML+=
        `                             
        <table>
                <tr class="ligneAchat${i}">
                    <td>${stock[i].nom}</td>
                    <td>${stock[i].prix},00€</td>
                    <td>${stock[i].quantité}</td>
                    <td>${calculST},00€<td>   
                    <button class="bouton_supprimer" data-index="${i}" id="bouton_supprimer${i}"><img src="/poubelle.svg" alt="supprimer item" title="Supprimer cette ligne d'achat"></button>                 
                </tr>
        </table>
       `  
                
    // Calcul du total                   
    total += calculST ;
    
        }
    let NodeTotal = document.querySelector('#Total');
    NodeTotal.innerHTML = `Total net à régler : ${total},00€ `;

    
// Suppression d'une ligne d'achat
for(let i = 0; i<stock.length; i++){

    const nodeLigneAchat = document.querySelector(`.ligneAchat${i}`);
    const nodePoubelle = document.querySelector(`#bouton_supprimer${i}`);
    
    nodePoubelle.addEventListener('click', function(){
        let id = nodePoubelle.dataset.index;
        console.log(id)
        
        stock.splice(id,1);
        localStorage.setItem('articleSelectionne',JSON.stringify(stock));
        window.location.reload();

        // Calcul du sous-total après suppression d'une ligne
        let calculST = `${stock[i].prix}` *`${stock[i].quantité}`;
        
        // Calcul du total après suppression d'une ligne                  
        total -= calculST ;
        let NodeTotal = document.querySelector('#Total');
        NodeTotal.innerHTML = `Total net à régler : ${total},00€`;

    }
)}

// Apparition du bouton "Vider le panier" à partir du 2ème article
const nodeViderPanier = document.querySelector('#viderPanier');

if(stock.length > 1){

    nodeViderPanier.innerHTML =`<button id="btn-empty">Vider le panier</br></br><img src="/poubelle.svg" alt="supprimer item"></button>`
    // Vider complètement le panier
    const nodeBtnEmpty = document.querySelector('#btn-empty');   

    nodeBtnEmpty.addEventListener('click', function(){

        localStorage.clear();
        rev.innerHTML ="";
        NodeTotal.innerHTML ="";
        nodeViderPanier.classList.add('disparition');

    })
}
          
// Obligations des champs

function validationChamps (){
const nom = document.querySelector('#nom').value;
const prenom = document.querySelector('#prenom').value;
const mail = document.querySelector('#email').value;
const adresse = document.querySelector('#adresse').value;
const ville = document.querySelector('#ville').value;
const mailReg = 
/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    if(!(
        nom.length > 1 
        && prenom.length > 1
        && mailReg.test(mail)
        && adresse.length > 6
        && ville.length > 1)){
            alert("Les champs ne sont pas correctement remplis. Les nom, prenom et ville doivent contenir au moins deux caractères. L'adresse doit contenir au moins 6 caractères."          
            )          
        }  
}


// Valider la commande finale
const btnCommande = document.querySelector("#passercommande");
const formulaire = document.querySelector("form");

formulaire.addEventListener('submit', function(e){
const nom = document.querySelector('#nom').value;
const prenom = document.querySelector('#prenom').value;
const mail = document.querySelector('#email').value;
const adresse = document.querySelector('#adresse').value;
const ville = document.querySelector('#ville').value;
const mailReg = 
/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    validationChamps();
    e.preventDefault();

    const contact = {
        firstName : prenom,
        lastName : nom,
        address : adresse,
        city : ville,
        email : mail,
    };

    console.log(contact);

    // Recupérer les identifiants de chaque article sélectionné 
    let produitsEnvoyes =[];
    for(let i = 0; i < stock.length; i++){

        produitsEnvoyes.push(stock[i].identifiant);
    }
    console.log(produitsEnvoyes);

    let requeteData = {contact: contact,products: produitsEnvoyes}

    // fetch pour une requête POST 
    let requetePost = {
        method : 'POST',
        body : JSON.stringify(requeteData),
        headers : { 'Content-Type' : 'application/json'},
    }

    if(
        nom.length > 1 
        && prenom.length > 1
        && mailReg.test(mail)
        && adresse.length > 6
        && ville.length > 1){
                     
            fetch("http://localhost:3000/api/teddies/order", requetePost)
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);                   
                    window.location.href = `../pages/confirmation.html?orderId=${json.orderId}`                       
            })
                .catch(() => {
                    alert(err,'Une erreur vient de se produire.')
            })
        }  

})
