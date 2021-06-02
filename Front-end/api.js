
// async function api(url){

//  const response = await fetch(url)

//  .catch(function(err){
//     console.log("Une erreur est survenue");
// })

//  const json = await response.json();
//  return json;

// }

// api("http://localhost:3000/api/teddies")
// .then (function(value){
//     console.log(value);
// })

fetch ("http://localhost:3000/api/teddies")

.then(function(res){
  if (res.ok){
    return res.json();
  }
})

.then (function(value){
  console.log(value);
  
  const array = value;


for (let i=0; i<array.length; i++){

  document.querySelector("#accueil").innerHTML += 
`

 <article classe="article${i}" id="article${i}">
<h2>${array[i].name}</h2>
<p>${(array[i].price/100)}€</p>
<p>${array[i].description}</p>
 <img src="${array[i].imageUrl}">
</article> `

}
})

.catch(function(err){
  // une erreur est survenue
  console.log("Une erreur est survenue");
});


const articleSelect = document.querySelector(`#article0`);
  
  articleSelect.addEventListener('click',function(){
  
      document.querySelector("#favoris").innerHTML +=
  
      ` <article classe="article0" id="article0">
      <h2>${array[0].name}</h2>
      <p>${(array[0].price/100)}€</p>
      <p>${array[0].description}</p>
       <img src="${array[0].imageUrl}">
      </article> `
  })
