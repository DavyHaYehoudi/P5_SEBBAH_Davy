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
        </table>`;
        
// Présentation des prix et articles du panier dans un tableau
tableauCalcul(stock);
    
// Suppression d'une ligne d'achat desktop 
articleDeleteDesktop(stock);

// Suppression d'une ligne d'achat responsive
articleDeleteResponsive(stock);      

// Apparition du bouton "Vider le panier" à partir du 2ème article
boutonViderPanierDeuxArticles(stock);
        
const formulaire = document.querySelector("form");

formulaire.addEventListener('submit', function(e){

    
    // // Valeur des champs
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
    
    // Non soumission du formulaire avant vérification des données utilisateur
    e.preventDefault();
    
    // Coloration des champs si correctement ou mal remplis
    colorationChamps(nodeInputNom,1);
    colorationChamps(nodeInputPrenom,1);
    colorationChamps(nodeInputVille,1)
    colorationChamps(nodeInputAdresse,6);
    colorationChampsMail(nodeInputMail);
    
    // Pop-up d'alerte pour les champs ne respectant pas les conditions
    alertChamps();
    
    // Redirection vers la page de confirmation si le formulaire est bien rempli
    if(
        nom.length > 1 
        &&prenom.length > 1
        && mailReg.test(mail)
        && adresse.length > 6
        && ville.length > 1){
 
            // Localstorage du prix total pour récupération dans la page confirmation
            articlePanier.unshift(total);
            localStorage.setItem("articleSelectionne", JSON.stringify(articlePanier));

            // Envoi des donnees par l'API Fetch pour confirmation
                envoiDonnees(url_endpoint);

        }

})

