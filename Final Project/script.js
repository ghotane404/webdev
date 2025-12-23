//Add a JavaScript alert for the Subscribe button in the footer of every webpage.

//On the Gallery page, add alert messages to the 
    // Add to Cart 
    // Clear Cart 
    // Process Order 

// These buttons act as placeholders for features you will build later.
// For this task, each button only needs to display a simple alert when clicked.

//On the About Us / Contact page, add a JavaScript alert to the Submit button on the contact form.


// alert("Thank you for subscribing.")

document.getElementById("subscribe-button").addEventListener(
    "click", () => {
        alert("Thank you for subscribing.");
    }
);

// alert("Item added to the cart.")
var addToCartButton = document.getElementsByClassName('.add-to-cart-button');

addToCartButton.addEventListener("click", Cart());



function Cart(){

    alert("Item added to the cart.")
}

// alert("Cart cleared")

// alert("Thank you for your order.")

// alert("Thank you for your message.")
