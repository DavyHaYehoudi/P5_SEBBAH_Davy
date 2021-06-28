let articlePanier =[];

// Récupération des données de stock
let stock = localStorage.getItem("articleSelectionne");
stock = JSON.parse(stock);
console.log(stock);
articlePanier.push(stock);
console.log(articlePanier);

// Variables pour le calcul du total cumulé plus bas
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
                    <button class="bouton_supprimer" data-index="${i}" id="bouton_supprimer1${i}"><img src="/poubelle.svg" alt="supprimer item" title="Supprimer cette ligne d'achat"></button>                 
                </tr>
        </table>
        
        
        <article class="responsive">
            <p>Nom : ${stock[i].nom}</p>
            <p>Prix unitaire : ${stock[i].prix},00€</p>
            <p>Quantité : ${stock[i].quantité}</p>
            <p> Sous-total : ${calculST},00€</p>
            <button class="bouton_supprimer" data-index="${i}" id="bouton_supprimer2${i}"><img src="/poubelle.svg" alt="supprimer item" title="Supprimer cet article"></button>
        </article>`
        

        // Calcul du total                   
        total += calculST ;
        
    }
    let NodeTotal = document.querySelector('#Total');
    NodeTotal.innerHTML = `Total net à régler : ${total},00€ `;
    
    // Suppression d'une ligne d'achat
    for(let i = 0; i<stock.length; i++){
        
        // const nodeLigneAchat = document.querySelector(`.ligneAchat${i}`);
        const nodePoubelle = document.querySelector(`#bouton_supprimer1${i}`);
        
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
    // Suppression d'une ligne d'achat responsive
    for(let i = 0; i<stock.length; i++){
        
        // const nodeLigneAchat = document.querySelector(`.ligneAchat${i}`);
        const nodePoubelle = document.querySelector(`#bouton_supprimer2${i}`);
        
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
        })
    }      

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
        
const formulaire = document.querySelector("form");

formulaire.addEventListener('submit', function(e){

    // Valeur des champs
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const mail = document.querySelector('#email').value;
    const adresse = document.querySelector('#adresse').value;
    const ville = document.querySelector('#ville').value;
    const mailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

    // pop-up erreur de remplissage des champs
    let nodeInputNom = document.querySelector("#nom");
    let nodeInputPrenom = document.querySelector('#prenom');
    let nodeInputMail = document.querySelector('#email');
    let nodeInputAdresse = document.querySelector('#adresse');
    let nodeInputVille = document.querySelector('#ville');

    if(! (nom.length > 1)){
        nodeInputNom.classList.add("red");
        alert("Assurez-vous que le nom contient au moins 2 caractères.");
    }
   
    if(! (prenom.length > 1) ){
        nodeInputPrenom.classList.add("red");
        alert("Assurez-vous que le prénom contient au moins 2 caractères.");
    }
    
    if(! (ville.length > 1) ){
        nodeInputVille.classList.add("red");
        alert("Assurez-vous que le nom de la ville contient au moins 2 caractères.");
    }
    
    if(! (adresse.length > 6)){
        nodeInputAdresse.classList.add("red")
        alert("Assurez-vous que l'adresse contient au moins 6 caractères.");
    }
    
    if(! (mailReg.test(mail))){
        nodeInputMail.classList.add("red")
        alert("L'adresse mail n'est pas conforme.");
    }

    // Coloration des champs si correctement ou mal remplis
    colorationChamps(nodeInputNom,1);
    colorationChamps(nodeInputPrenom,1);
    colorationChamps(nodeInputVille,1)
    colorationChamps(nodeInputAdresse,6);
    colorationChampsMail(nodeInputMail);

    // Non soumission du formulaire avant vérification des données utilisateur
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

    // Redirection vers la page de confirmation si le formulaire est bien rempli
    if(
        nom.length > 1 
        && prenom.length > 1
        && mailReg.test(mail)
        && adresse.length > 6
        && ville.length > 1){

            // Localstorage du prix total pour récupération dans la page confirmation
            articlePanier.unshift(total);
            localStorage.setItem("articleSelectionne", JSON.stringify(articlePanier));

                     
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
