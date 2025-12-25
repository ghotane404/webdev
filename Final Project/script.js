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


// open cart
    if (click_viewCartBtn) {
        click_viewCartBtn.addEventListener('click', () => {
        viewCart_modalContainer.classList.add('click_viewCart');
        document.body.classList.add('modal-open');
    });
    }

    // close cart
    if (exit_viewCartBtn) {
        exit_viewCartBtn.addEventListener('click', () => {
        viewCart_modalContainer.classList.remove('click_viewCart');
        });
        document.body.classList.remove('modal-open');
    }

// alert("Thank you for your order.")
const checkout_cartItemsBtn = document.getElementById('checkout_cartItems');
checkout_cartItemsBtn.addEventListener('click', () => {
  alert('Thank you for your order.');
});

// --------------------------------------------------
// -------------- CALCULATION FOR CART --------------
// --------------------------------------------------

// alert("Cart cleared")
const clear_cartItemsBtn = document.getElementById('clear_cartItems');
clear_cartItemsBtn.addEventListener('click', () => {
  alert('Cart cleared');
});

// alert("Item added to the cart.")
const addToCartButtons = document.getElementsByClassName('add-to-cart-button');

function Cart() {
  alert('Item added to the cart.');
}

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', () => Cart());
}


//--------------- show total ------------------------


// -------------------------------------------------

var addItemId = 0;

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', (e) => {
    const item = e.currentTarget.closest('.gallery-book-box');
    addToCart(item);
  });
}

function addToCart(item) {
    if (!item) return;

    addItemId += 1;

    var selectedItem = document.createElement('div');
    selectedItem.classList.add('cartImg');
    selectedItem.setAttribute('id', addItemId);

    var img = document.createElement('img');

    const sourceImg = item.querySelector('.gallery-icon img');
    if (sourceImg) {
        img.setAttribute('src', sourceImg.currentSrc || sourceImg.src);
    }

    var cartItems = document.getElementById('cart_items');
    selectedItem.append(img);
    cartItems.append(selectedItem);
}


