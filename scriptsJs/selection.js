
// obtenir la valeur du paramètre de l'URL
console.log(window.location.search);
// Récupérer le ID de l'url
let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get('id'));
let id = searchParams.get('id');

/*localstorage*/

const listArticle =[];
const NOM_DE_LA_CLE = "articleSelectionne";


fetch ("http://localhost:3000/api/teddies/"+ id)
  .then(function(res){
    if (res.ok){
      return res.json();
    }
  })
  .then (function(value){
    console.log(value);

      document.querySelector("#selection").innerHTML += 
    `   <article class="articleSelection">
            <h2>${value.name}</h2>      
            <p>${(value.price/100)},00€</p>
            <span class="text-nombre">Nombre d'articles(s)</span>
            <input type="number" class="compteur" id="compteur" value="1" min="1">
            <p>${value.description}</p>
            <img src="${value.imageUrl}">             
            <h3>Couleur(s) au choix :</h3>   
            <div class='couleurs'></div>      
        </article> 
        
        <button class="btn-ajouterPanier" id="btn-ajouterPanier">
            Ajouter au panier cet article</button>    `;


          /*Boucle pour l'affichage des couleurs*/
          for(let i=0; i<value.colors.length; i++){
            
            document.querySelector("#selection article .couleurs").innerHTML+=
             `<input type="radio" name="couleur" value="${value.colors[i]}" class="choixCouleur"  id="choixCouleur${i}">
              <label for="${value.colors[i]}">${value.colors[i]}</label><br/>`

              }
            
           /*Ajout de la quantité d'articles sélectionnés*/
            const compteur = document.getElementById('compteur');
            compteur.addEventListener('click', function(){
              let quantity = compteur.value;
              donnees.quantité = quantity;
            })

           /*Données à envoyer au panier*/
              let donnees = {
              identifiant: value._id,
              nom: value.name,                
              prix: value.price/100,              
            };

            /*Si utilisateur ne clique pas dans le nombre d'article, prendre valeur par défaut*/
            if(donnees.quantité===undefined){
              donnees.quantité = compteur.value;
            }
            
            /*localstorage*/
            let btnPanier = document.getElementById("btn-ajouterPanier");

            btnPanier.addEventListener('click', function(){
              listArticle.push(donnees);
              let stockage = localStorage.setItem("articleSelectionne", JSON.stringify(listArticle));
            })
        })
        
  .catch(function(err){
    // une erreur est survenue
    console.log(err, "Une erreur est survenue");    
  })






  

