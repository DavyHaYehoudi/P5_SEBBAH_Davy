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
                            <button class="bouton_supprimer" id="bouton_supprimer${i}"><img src="/poubelle.svg" alt="supprimer item" title="Supprimer cette ligne d'achat"></button>                 
                        </tr>
                </table>
       `  
                
            //   Calcul du total                   
            total += calculST ;
    
        }
        let NodeTotal = document.querySelector('#Total');
        NodeTotal.innerHTML = `Total net à régler : ${total},00€ `;

    
// Suppression d'une ligne d'achat
    
for(let i = 0; i<stock.length; i++){

    const nodeLigneAchat = document.querySelector(`.ligneAchat${i}`);
    const nodePoubelle = document.querySelector(`#bouton_supprimer${i}`);
    
    nodePoubelle.addEventListener('click', function(){

        nodeLigneAchat.remove();

        // Calcul du sous-total après suppression d'une ligne
        let calculST = `${stock[i].prix}` *`${stock[i].quantité}`;

        // Calcul du total après suppression d'une ligne                  
        total -= calculST ;
        let NodeTotal = document.querySelector('#Total');
        NodeTotal.innerHTML = `Total net à régler : ${total},00€`;

    }
)}

// Apparition du bouton "Vider le panier" à partir du 1er article
const nodeViderPanier = document.querySelector('#viderPanier');

if(articlePanier.length > 0){

    nodeViderPanier.innerHTML =`<button id="btn-empty">Vider le panier</br></br><img src="/poubelle.svg" alt="supprimer item"></button>`

}

// Suppresion d'un élément supprimé dans le tableau de stockage 
// const nodeBtnDelete = document.querySelector(`#bouton_supprimer`);

//     nodeBtnDelete.addEventListener('click', function(){
//     articlePanier.splice(0,1);
// })

// Vider complètement le panier
const nodeBtnEmpty = document.querySelector('#btn-empty');   

nodeBtnEmpty.addEventListener('click', function(){

    localStorage.clear();
    rev.innerHTML ="";
    NodeTotal.innerHTML ="";
    nodeViderPanier.classList.add('disparition');

})

           
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
    && ville.length > 1
)){
    alert('Les champs ne sont pas correctement renseignés')
    return
}
}

// Valider la commande finale
const btnCommande = document.querySelector("#passercommande");

btnCommande.addEventListener('click', function(){

    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const mail = document.querySelector('#email').value;
    const adresse = document.querySelector('#adresse').value;
    const ville = document.querySelector('#ville').value;


    const contact = {
        firstName : prenom,
        lastName : nom,
        address : adresse,
        city : ville,
        email : mail,
    };

    console.log(contact);
    validationChamps();

    // Recupérer les identifiants de chaque article sélectionné 
    let produitsEnvoyes =[];
    for(let i = 0; i < stock.length; i++){

    let produitsEnvoyes = [`${stock[i].identifiant}`];
        console.log(produitsEnvoyes);
    }

    // fetch pour une requête POST 
    const requetePost = {
        method : 'POST',
        body : JSON.stringify(contact, produitsEnvoyes),
        headers : { 'Content-Type' : 'application/json'},
    }

    fetch("http://localhost:3000/api/teddies/order", requetePost)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
    })
        .catch(() => {
            alert(err, 'Une erreur vient de se produire.')
        })

})
