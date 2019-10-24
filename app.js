if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

let carts = [];
function ready (){
    const addBtn = document.querySelectorAll('.btn-addCard');
    addBtn.forEach(data => {
        data.addEventListener('click', clickedAddBtn);
    })
}

function clickedAddBtn (e) {
    let listCart = document.querySelector('.cartItem');
    listCart.innerHTML = '';
    let { target } = e;
    let shopItem = target.parentElement;
    let name = shopItem.querySelector('.card-title').innerHTML;
    let price = shopItem.querySelector('.card-text').innerHTML;
    price = price.split('$')[0];
    if(carts.some(e => e.name === name)){
        let currentItem = carts.find(e => e.name === name);
        ++currentItem.quality;
    }else{
        carts.push({name, price, quality: 1})
    }
    let itemHtml = showListCart();
    let containCart = document.createElement('div');
    containCart.classList.add('cart-row');
    containCart.innerHTML = itemHtml;
    listCart.append(containCart)
    containCart.querySelectorAll('.remove').forEach((data) => {
        data.addEventListener('click', remove);
    })
}

function showListCart () {
    let item;
    item = carts.map(data => {
        return `<div class="alert alert-primary" role="alert">
                    <p>${data.name} - ${data.quality} - ${data.price * data.quality} $ </p> 
                    <span class="btn btn-danger remove">X</span>
                </div>`;
    })
    return item;
}

function remove (e) {
    let contain = e.target.parentElement;
    let data = contain.querySelector('p').innerHTML;
    let product = data.split('-', 1)[0].trim();
    let productAttr = carts.find(e => e.name === product);
    carts.splice(carts.indexOf(productAttr), 1);
    contain.remove();
    console.log(carts);

}
