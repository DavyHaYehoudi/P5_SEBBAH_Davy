let articlePanier =[];



// Récupération des données de stock
let stock = localStorage.getItem("articleSelectionne");
stock = JSON.parse(stock);
console.log(stock);
articlePanier.push(stock);
console.log(articlePanier);


// Calcul du sous-total
let calculST = `${stock[0].prix}` *`${stock[0].quantité}`;

// Calcul du total - Comment faire un cumul des totaux de la variable calculST ?

    const rev = document.getElementById('revision');

    rev.innerHTML =
    `<table>

    <tr>
        <th>Nom</th>
        <th>Prix unitaire</th>
        <th>Quantité</th>
        <th>Sous-total</th>
    </tr>

    </table>`
    

   
    for(let i = 0; i<stock.length; i++){
        

        rev.innerHTML+=
        `                             
                <table>
                        <tr>
                            <td>${stock[i].nom}</td>
                            <td>${stock[i].prix},00€</td>
                            <td>${stock[i].quantité}</td>
                            <td>${calculST},00€<td>                      
                        </tr>

                </table>

        `
                   
               let NodeTotal = document.querySelector('#Total');
               console.log(NodeTotal);
               NodeTotal.innerHTML = `${calculST}` ;
    }

   
// Obligations des champs
function validationChamps (){
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const mail = document.querySelector('#email').value;
    const adresse = document.querySelector('#adresse').value;
    const ville = document.querySelector('#ville').value;
    // const mailReg = 
    // /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

if(!(
    nom.length > 1 
    && prenom.length > 1
    // && mailReg.test(mail)
    && adresse.length > 6
    && ville.length > 1
)){
    alert('Les champs ne sont pas correctement renseignés')
    return
}
}

// validationChamps();

const btnCommande = document.querySelector("#passercommande");

btnCommande.addEventListener('click', function(){
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const mail = document.querySelector('#email').value;
    const adresse = document.querySelector('#adresse').value;
    const ville = document.querySelector('#ville').value;

    let contact = {
        firstName : prenom,
        lastName : nom,
        address : adresse,
        city : ville,
        email : mail,
    }

    // Recupérer les identifiants de chaque article sélectionné, les placer dans un tableau et envoyer ce tableau avec un fetch pour une requête POST 
    let produitsEnvoyes = ['sfdsqfdsq','dsfqdfqs'];
    produitsEnvoyes.push(contact);
})