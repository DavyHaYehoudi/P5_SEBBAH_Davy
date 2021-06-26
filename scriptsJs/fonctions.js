
// Api Fletch pour l'affichage des articles en page d'accueil


function api(url){
    fetch (url)
    .then(function(res){
        if (res.ok){
        return res.json();
        }
     })
    .then (function(value){
         console.log(value);
            for (let i=0; i<value.length; i++){
        
                document.querySelector("#accueil").innerHTML += 
            `
                <article class="articleAccueil">
                    <a href="../pages/selection.html?id=${value[i]._id}">
                        <h2>${value[i].name}</h2>
                        <p>${(value[i].price/100)},00€</p>
                        <p>${value[i].description}</p>
                        <img src="${value[i].imageUrl}">
                    </a>
                </article> `
            }
    })
    .catch(function(err){
     console.log(err, "Une erreur est survenue");
    });
  }

  function colorationChamps(nodeInput,longueur) {
    nodeInput.addEventListener('input',function(e){
    
        let valeurChamps = e.target.value;
        if(valeurChamps.length > longueur){
            nodeInput.classList.remove("red");
            nodeInput.classList.add("green");
        } 
        else{
            nodeInput.classList.remove("green");
            nodeInput.classList.add("red");
        }    
    })

}

function colorationChampsMail(nodeInput){

    const mail = document.querySelector('#email').value;
    const mailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

    nodeInput.addEventListener('input', function(e){

        let valeurChampsEmail = e.target.value;

        if(mailReg.test(valeurChampsEmail)){            
            nodeInput.classList.remove("red");
            nodeInput.classList.add("green");
        }
        else{      
            nodeInput.classList.remove("green");
            nodeInput.classList.add("red");
        }
    })
}