import { products } from './products.js';
// ---------------- NEWSLETTER SUBSCRIPTION ----------------
// alert("Thank you for subscribing.")
const newsletterBtn = document.getElementById('newsletter-form');
if (newsletterBtn) {
  newsletterBtn.addEventListener('submit', (e) => {
    // *mouse event
    e.preventDefault();

    const emailInput = document.getElementById('subscribe-email');
    const email = emailInput.value.trim();

    let newsletter =
      JSON.parse(localStorage.getItem('newsletterSubscribers')) || []; //saving it as array
    const newNewsletter = {
      email: email,
    };

    newsletter.push(newNewsletter);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(newsletter));

    alert('Thank you for subscribing.');
    newsletterBtn.reset(); // clears the previous input by user
  });
}

// ---------------- CONTACT US PAGE ----------------
// alert("Thank you for your message.")
const contactUsMessageBtn = document.getElementById('contact-us-form');

if (contactUsMessageBtn) {
  contactUsMessageBtn.addEventListener('submit', (e) => {
    e.preventDefault();

    // Key name = formSubmissions to local storage empty array
    let messages = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    const newMessage = {
      name: document.querySelector('input[name="name"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      email: document.querySelector('input[name="email"]').value,
      requestType: document.getElementById('requestType').value,
      message: document.getElementById('message').value,
    };
    // save the newMessage collected to local storage
    messages.push(newMessage);
    localStorage.setItem('formSubmissions', JSON.stringify(messages));

    alert('Thank you for your message.');
    contactUsMessageBtn.reset(); // clears the previous input by user
  });
}

// -------------------------- CHANGING THE HOMEPAGE PROMO BANNER --------------------------
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.banner');
  const dots = document.querySelectorAll('.carousel button');
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

// -------------- SHOPPING CART MODAL --------------
const viewCart_modalContainer = document.querySelector(
  '.viewCart-modal-section'
);
const click_viewCartBtn = document.getElementById('click_viewCart');
const exit_viewCartBtn = document.getElementById('exit_viewCart');
//js not working outside gallery page
if (click_viewCartBtn && exit_viewCartBtn && viewCart_modalContainer) {
  // Open modal
  click_viewCartBtn.addEventListener('click', () => {
    viewCart_modalContainer.classList.add('click_viewCart');
    document.body.classList.add('modal-open');
  });

  // Close modal
  exit_viewCartBtn.addEventListener('click', () => {
    viewCart_modalContainer.classList.remove('click_viewCart');
    document.body.classList.remove('modal-open');
  });

  // Close on outside click
  viewCart_modalContainer.addEventListener('click', (e) => {
    if (e.target === viewCart_modalContainer) {
      viewCart_modalContainer.classList.remove('click_viewCart');
      document.body.classList.remove('modal-open');
    }
  });
}

// -------------- CALCULATION FOR CART --------------
const productsEl = document.getElementById('productsGrid');
const cartItemsEl = document.getElementById('productsModal');
const subtotalEl = document.querySelector('.viewCart-cart-total');

// stop gallry event listener page from being nosy
if (productsEl && cartItemsEl && subtotalEl) {
  function renderProducts() {
    let html = '';

    // check the dumb text issue ughghgh
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

  // CART from sessionStorage or start with empty array
  let cart = JSON.parse(sessionStorage.getItem('CART')) || [];

  function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
      // chekcing item already in cart - + qty
      alert('Added to Cart.');
      changeQuantity('plus', id);
    } else {
      // new item - find it in products and add to cart   // checking for id from product for matches
      const item = products.find((product) => product.id === id);
      cart.push({
        ...item, // copies the info from products
        quantity: 1,
      });
    }
    updateCart();
  }

  function updateCart() {
    renderCartItems(); // modal item
    renderTotal(); // Update price
    sessionStorage.setItem('CART', JSON.stringify(cart));
  }

  function renderTotal() {
    let totalPrice = 0,
      totalItem = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
      totalItem += item.quantity;
    });
    subtotalEl.innerHTML = `Total (${totalItem} items): $${totalPrice.toFixed(
      2
    )}`;
  }

  function renderCartItems() {
    let html = '';

    // Loop through cart and create HTML for each item
    for (let item of cart) {
      const itemTotal = (item.price * item.quantity).toFixed(2);

      html += `
          <div class="modal-gallery-book-box">
            <div class="modal-gallery-icon">
              <img src="${
                item.imgSrc
              }" class="cart-pic" id="cart-pic" data-product-id="${
        item.id
      }" alt="${item.desc}">
            </div>
            <div class="modal-item-desc">
              <div class="item-name">
                <h3>${item.name}</h3>
                <div class="item-price"><span>$</span>${(
                  item.price * item.quantity
                ).toFixed(2)}</div>
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

  cartItemsEl.addEventListener('click', (e) => {
    if (e.target.closest('.quantity-decrease')) {
      const button = e.target.closest('.quantity-decrease');
      const id = parseInt(button.getAttribute('data-product-id'));
      changeQuantity('minus', id);
    }
    if (e.target.closest('.quantity-increase')) {
      const button = e.target.closest('.quantity-increase');
      const id = parseInt(button.getAttribute('data-product-id'));
      changeQuantity('plus', id);
    }
  });

  function changeQuantity(action, id) {
    const item = cart.find((e) => e.id == id);
    let quantity = item.quantity;

    if (action === 'minus') {
      item.quantity--;
    } else if (action === 'plus' && item.quantity < 99) {
      item.quantity++;
    }

    if (item.quantity <= 0) {
      cart = cart.filter((cartItem) => cartItem.id !== id);
    }
    updateCart();
  }

  // Clear cart button (check if cart exists)
  const clear_cartItemsBtn = document.getElementById('clear_cartItems');
  if (clear_cartItemsBtn) {
    clear_cartItemsBtn.addEventListener('click', () => {
      cart = []; // Clear the cart array
      updateCart();
      alert('Cart cleared');
    });
  }

  // alert("Thank you for your order.")
  const checkout_cartItemsBtn = document.getElementById('checkout_cartItems');
  if (checkout_cartItemsBtn) {
    checkout_cartItemsBtn.addEventListener('click', () => {
      const savedCart = sessionStorage.getItem('CART');
      // let time = 9;                 // if true : if not true
      // let greeting = time < 12 ? "Goodmorning" : "Afternoon";
      // console.log(greeting);
      const cart = savedCart ? JSON.parse(savedCart) : [];
      if (cart.length === 0) {
        alert(
          'No item(s) in cart to check out. Please add items and try again.'
        );
        return;
      }
      sessionStorage.removeItem('CART');
      alert('Thank you for your order.');
      location.reload();
    });
  }

  renderProducts();
  updateCart();
}
