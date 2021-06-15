

// Récupération des données de stockage
let stockage = localStorage.getItem("articleSelectionne");
stockage = JSON.parse(stockage);
console.log(stockage);


// Calcul du sous-total
let calculST = `${stockage[0].prix}` *`${stockage[0].quantité}`;

// Calcul du total - Ne marche pas encore---

    const rev = document.getElementById('revision');
    

   
    for(let i = 0; i<stockage.length; i++){
        let cumule =0;
        cumule += calculST;

        rev.innerHTML+=
        `                 
                <table>
                        <tr>
                            <td>Nom : ${stockage[i].nom}</td>
                            <td>Prix unitaire : ${stockage[i].prix},00€</td>
                            <td>Quantité : ${stockage[i].quantité}</td>
                            <td>Sous-total : ${calculST},00€</td>
                        </tr>
                </table>
                    `
                let total = calculST+ cumule;
               console.log(total);     
    }

   
    let NodeTotal = document.querySelector('#Total');
