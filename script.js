import { products } from "./products.js";
// ---------------------------------------------------------
// ---------------- NEWSLETTER SUBSCRIPTION ----------------
// ---------------------------------------------------------
// alert("Thank you for subscribing.")
const newsletterBtn = document.getElementById('subscribe-button');
if (newsletterBtn) {
    newsletterBtn.addEventListener('click', (e) => { // *mouse event 
        e.preventDefault();

        const emailInput = document.getElementById('subscribe-email');
        const email = emailInput.value.trim();
        if (!email) {
            alert('Please enter an email address.');
            return;
        }

        let newsletter = JSON.parse(localStorage.getItem('Newsletter-Subscribers')) || []; //saving it as array 
        const newNewsletter = {
            email: email
        };

        newsletter.push(newNewsletter);
        localStorage.setItem('Newsletter-Subscribers', JSON.stringify(newsletter));

        alert('Thank you for subscribing.');
        emailInput.value = ''; // clears the previous input by user
    });
}

// -------------------------------------------------
// ---------------- CONTACT US PAGE ----------------
// -------------------------------------------------
// alert("Thank you for your message.")
const contactUsMessageBtn = document.getElementById('contact-us-form');

if (contactUsMessageBtn) {
    contactUsMessageBtn.addEventListener('submit', (e) => { //form submit, not just a click!!!
        e.preventDefault();

        // Key name = Form-Submission to local storage empty array
        let messages = JSON.parse(localStorage.getItem('Form-Submission')) || [];

        const newMessage = {
            Name: document.querySelector('input[name="name"]').value,
            Phone: document.querySelector('input[name="phone"]').value,
            Email: document.querySelector('input[name="email"]').value,
            RequestType: document.getElementById('requestType').value,
            Message: document.getElementById('message').value,
        };
        // save the newMessage collected to local storage
        messages.push(newMessage);
        localStorage.setItem('Form-Submission', JSON.stringify(messages));

        alert('Thank you for your message.');
        contactUsMessageBtn.reset(); // clears the previous input by user
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
const checkout_cartItemsBtn = document.getElementById('checkout_cartItems');

if (click_viewCartBtn && exit_viewCartBtn && viewCart_modalContainer) {
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
}

// --------------------------------------------------
// -------------- CALCULATION FOR CART --------------
// --------------------------------------------------
// alert("Item added to the cart.")
const productsEl = document.getElementById("productsGrid");
const cartItemsEl = document.getElementById("productsModal");
const subtotalEl = document.querySelector(".viewCart-cart-total");

//preventing the cart calculation from appearing in other pages
if (productsEl && cartItemsEl && subtotalEl) {
    function renderProducts() {
        let html = "";

        // Loop through each product and create HTML
        for (let product of products) {
            html += `
                <div class="gallery-book-box">
                    <div class="gallery-icon">
                        <img src="${product.imgSrc}" alt="${product.desc}">
                    </div>

                    <h3>${product.name}</h3>
                    <p><span>$</span>${product.price}</p>

                    <button class="add-to-cart-button" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            `;
        }
        productsEl.innerHTML = html;

        productsEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-button')) {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                addToCart(productId);
            }
        });
    }


    // Get cart from sessionStorage, or start with empty array
    let cart = [];
    const savedCart = sessionStorage.getItem("CART");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // ADD TO CART FUNCTION
    // window.addToCart = addToCart;
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
        renderCartItems();              // Show items in modal
        renderSubtotal();               // Update total price

        sessionStorage.setItem("CART", JSON.stringify(cart))
    }

    // calculate and render subtotal
    function renderSubtotal() {
        let totalPrice = 0,
            totalItem = 0;

        cart.forEach((item) => {
            totalPrice += item.price * item.quantity;
            totalItem += item.quantity;
        });
        subtotalEl.innerHTML = `Total (${totalItem} items) : $${totalPrice.toFixed(2)}`;
    }

    // window.changeQuantity = changeQuantity;
    function renderCartItems() {
        let html = "";

        // Loop through cart and create HTML for each item
        for (let item of cart) {
            const itemTotal = (item.price * item.quantity).toFixed(2);

            html += `
                <div class="modal-gallery-book-box">
                    <div class="modal-gallery-icon" id="item1">
                        <img src="${item.imgSrc}" class="cart-pic" id="cart-pic" 
                        alt="${item.desc}">
                    </div>

                    <div class="modal-item-desc">
                        <div class="item-name">
                            <h3>${item.name}</h3>
                            <div class="item-price">
                                <span>$</span>${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>

                        <div class="quantity-row">
                            <button class="quantity-decrease" data-product-id="${item.id}">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-increase" data-product-id="${item.id}">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                 <div class="divider"></div>
            `;
        }
        cartItemsEl.innerHTML = html;
    }

    cartItemsEl.addEventListener('click', function (e) {
        // Check if minus button was clicked
        if (e.target.closest('.quantity-decrease')) {
            const button = e.target.closest('.quantity-decrease');
            const id = parseInt(button.getAttribute('data-product-id'));
            changeQuantity('minus', id);
        }

        // Check if plus button was clicked
        if (e.target.closest('.quantity-increase')) {
            const button = e.target.closest('.quantity-increase');
            const id = parseInt(button.getAttribute('data-product-id'));
            changeQuantity('plus', id);
        }
    });

    // update quantity in Cart 
    function changeQuantity(action, id) {
        console.log('Looking for item with id:', id);
        console.log('Current cart:', cart);

        const item = cart.find((e) => e.id == id);
        let quantity = item.quantity;

        if (action === "minus" && quantity > 1) {
            item.quantity--;
        }
        else if (action === "plus" && quantity < 99) {
            item.quantity++;
        }
        updateCart();
    }

    // alert("Cart cleared")
    const clear_cartItemsBtn = document.getElementById('clear_cartItems');
    if (clear_cartItemsBtn) {
        clear_cartItemsBtn.addEventListener('click', () => {
            cart = []; // Clear the cart array
            updateCart();
            alert('Cart cleared');
        });
    }

    // alert("Thank you for your order.")
    if (checkout_cartItemsBtn) {
        checkout_cartItemsBtn.addEventListener('click', () => {
            sessionStorage.removeItem('CART');
            alert('Thank you for your order.');
            location.reload();
        });
    }
    updateCart();
    renderProducts();
}


