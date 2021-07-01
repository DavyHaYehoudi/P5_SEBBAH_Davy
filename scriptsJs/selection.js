// obtenir la valeur du paramètre de l'URL
console.log(window.location.search);
// Récupérer l' ID de l'url
let searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get('id'));
let id = searchParams.get('id');


/*localstorage*/
const listArticle =  localStorage.getItem("articleSelectionne") ? JSON.parse(localStorage.getItem("articleSelectionne")): [];
const NOM_DE_LA_CLE = "articleSelectionne";



appelApi(url_endpoint + id)
    .then(value => {

      // Affichage des caractéristiques de chaque article
      chargerCaracteristiques(value);

      // Boucle pour l'affichage des couleurs
      affichagePersonnalisationCouleurs(value)

      // Stockage dans le localstorage de chaque article sélectionné
      stockageArticleSelection(value);
      
    })
        
  




  

