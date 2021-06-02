

const array = value;


for (let i=0; i<array.length; i++){


const articleSelect = document.querySelector(`#article${i}`);

articleSelect.addEventListener('click',function(){

    document.querySelector("#favoris").innerHTML +=

    ` <article classe="article${i}" id="article${i}">
    <h2>${array[i].name}</h2>
    <p>${(array[i].price/100)}€</p>
    <p>${array[i].description}</p>
     <img src="${array[i].imageUrl}">
    </article> `
})}