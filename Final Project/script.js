// alert("Thank you for subscribing.")
document.getElementById("subscribe-button").addEventListener(
    "click", () => {
        alert("Thank you for subscribing.");
    }
);

// alert("Item added to the cart.")
const addToCartButtons = document.getElementsByClassName('add-to-cart-button');
function Cart() {
    alert("Item added to the cart.")

}

for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener(
        "click", () => Cart()
    );
}

// alert("Thank you for your message.")
const contact_us_messageBtn = document.getElementById('contact_us_message');
if (contact_us_messageBtn){
    contact_us_messageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("Thank you for your message."); 
        }
    );
}


// alert("Cart cleared")
const clear_cartItemsBtn = document.getElementById('clear_cartItems');
clear_cartItemsBtn.addEventListener(
    'click', () => {
        alert("Cart cleared");
    }
);

// alert("Thank you for your order.")
const checkout_cartItemsBtn = document.getElementById('checkout_cartItems');
checkout_cartItemsBtn.addEventListener(
    'click', () => {
        alert("Thank you for your order."); 
    }
 );


const viewCart_modalContainer = document.querySelector('.viewCart-modal-section')
const exit_viewCartBtn = document.getElementById('exit_viewCart');
const click_viewCartBtn = document.getElementById('click_viewCart');

// open cart
click_viewCartBtn.addEventListener('click', () => {
    viewCart_modalContainer.classList.add('click_viewCart'); 
});

// close cart
exit_viewCartBtn.addEventListener('click', () => {
    viewCart_modalContainer.classList.remove('click_viewCart'); 
});



