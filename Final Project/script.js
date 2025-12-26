import { products } from "./products.js";
// ---------------------------------------------------------
// ---------------- NEWSLETTER SUBSCRIPTION ----------------
// ---------------------------------------------------------
// alert("Thank you for subscribing.")
document.getElementById('subscribe-button').addEventListener('click', () => {
    alert('Thank you for subscribing.');
});

// -------------------------------------------------
// ---------------- CONTACT US PAGE ----------------
// -------------------------------------------------

// alert("Thank you for your message.")
const contact_us_messageBtn = document.getElementById('contact_us_message');
if (contact_us_messageBtn) {
    contact_us_messageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        //save cart to local storage
        // localStorage.setItem("CART", JSON.stringify(contact_us_messageBtn))
        alert('Thank you for your message.');
    });
}


// ----------------------------------------------------------------------------------------
// -------------------------- CHANGING THE HOMEPAGE PROMO BANNER --------------------------
// ----------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.carousel-indicators button');
    //   console.log(dots);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides.forEach((s) => s.classList.remove('active'));
            dots.forEach((d) => d.classList.remove('active'));

            slides[index].classList.add('active');
            dot.classList.add('active');
        });
    });
});

// -------------------------------------------------
// -------------- SHOPPING CART MODAL --------------
// -------------------------------------------------
const viewCart_modalContainer = document.querySelector('.viewCart-modal-section');
const click_viewCartBtn = document.getElementById('click_viewCart');
const exit_viewCartBtn = document.getElementById('exit_viewCart');

// Open modal
click_viewCartBtn.addEventListener('click', () => {
  viewCart_modalContainer.classList.add('click_viewCart');
  document.body.classList.add('modal-open'); // Prevent scrolling
});

// Close modal
exit_viewCartBtn.addEventListener('click', () => {
  viewCart_modalContainer.classList.remove('click_viewCart');
  document.body.classList.remove('modal-open'); // Re-enable scrolling
});

viewCart_modalContainer.addEventListener('click', (e) => {
  if (e.target === viewCart_modalContainer) {
    viewCart_modalContainer.classList.remove('click_viewCart');
    document.body.classList.remove('modal-open');
  }
});

// alert("Thank you for your order.")
const checkout_cartItemsBtn = document.getElementById('checkout_cartItems');
checkout_cartItemsBtn.addEventListener('click', () => {
    alert('Thank you for your order.');
});

// --------------------------------------------------
// -------------- CALCULATION FOR CART --------------
// --------------------------------------------------
// alert("Item added to the cart.")
const productsEl = document.getElementById("productsGrid");
const cartItemsEl = document.getElementById("productsModal");
const subtotalEl = document.querySelector(".viewCart-cart-total");

function renderProducts() {
    productsEl.innerHTML = products
        .map(
            (product) => `
                <div class="gallery-book-box">
                    <div class="gallery-icon">
                        <img src="${product.imgSrc}" alt="${product.desc}">
                    </div>

                    <h3>${product.name}</h3>
                    <p><span>$</span>${product.price}</p>

                    <button class="add-to-cart-button" onclick="addToCart(${product.id}) "data-price="${product.price}">
                        Add to Cart
                    </button>
                </div>
            `
        )
    .join("");
}

renderProducts();

// //Cart Array
// let cart = [];

let cart = JSON.parse(sessionStorage.getItem("CART")) || [];
updateCart();

// let cart = JSON.parse(localStorage.getItem("CART")) || [];
// updateCart();

// ADD TO CART FUNCTION
window.addToCart = addToCart;
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        alert("Added to Cart.")
        changeQuantity("plus", id) 
        
    }
    else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            quantity: 1,
        });
    }
    updateCart();
}

// update Cart
function updateCart() {
    renderCartItems();
    renderSubtotal();
    
    sessionStorage.setItem("CART", JSON.stringify(cart))
    // localStorage.setItem("CART", JSON.stringify(cart))
}

// calculate and render subtotal
function renderSubtotal(){
    let totalPrice = 0, 
        totalItem = 0;
    
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        totalItem += item.quantity;
    });
    subtotalEl.innerHTML = `Total (${totalItem} items) : $${totalPrice.toFixed(2)}`;
    console.log(subtotalEl);
    console.log(totalItem);
    console.log(totalPrice);
}
    

window.changeQuantity = changeQuantity;
function renderCartItems() {
    cartItemsEl.innerHTML = ""; //clear cart element
    cartItemsEl.innerHTML = cart
        .map(
            (item) => `
                <div class="modal-gallery-book-box">
                    <div class="modal-gallery-icon" id="item1">
                        <img src="${item.imgSrc}" class="cart-pic" id="cart-pic" onclick="removeItemFromCart(${item.id})" alt="${item.desc}">
                    </div>

                    <div class="modal-item-desc">
                        <div class="item-name">
                            <h3>${item.name}</h3>
                            <div class="item-price"><span>$</span>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>

                        <div class="quantity-row">
                            <button class="quantity-decrease" onclick="changeQuantity('minus', ${item.id})"><i class="fa-solid fa-minus"></i></button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-increase" onclick="changeQuantity('plus', ${item.id})"> <i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>

                 <div class="divider"></div>
            `
        )
    .join("");
}

// alert("Cart cleared") REMOVES ALLLL
const clear_cartItemsBtn = document.getElementById('clear_cartItems');
clear_cartItemsBtn.addEventListener('click', () => {
  cart = []; // Clear the cart array
  updateCart();  
    alert('Cart cleared');
});


//remove one item from cart
window.removeItemFromCart = removeItemFromCart;
function removeItemFromCart(id) {
    cart = cart.filter ((item) => item.id !== id)
    updateCart();
}


// update quantity in Cart 
function changeQuantity(action, id) {
    const item = cart.find((e) => e.id == id);
    let quantity = item.quantity; 

    if (action === "minus" && quantity > 1){
        item.quantity--;
    }
    else if (action === "plus" && quantity < 99){
        item.quantity++;
    }
    // renderCartItems();
    updateCart();
}
