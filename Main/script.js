window.onscroll = function() { stickyNavbar() };

const navbar = document.querySelector('.navbar');

function stickyNavbar() {
  const sticky = navbar.offsetTop; // Move this inside the function
  if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky");
  } else {
      navbar.classList.remove("sticky");
  }
}


// Get the modal
var modal = document.getElementById("productModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get all product boxes
var boxes = document.querySelectorAll('.box');

// Loop through each box and add click event
boxes.forEach(function(box) {
  box.addEventListener('click', function() {
    // Get product details
    var title = box.querySelector('h3').innerText;
    var price = box.querySelector('p').innerText;
    var rating = box.querySelector('p:nth-of-type(2)').innerText;
    var imageUrl = box.style.backgroundImage.slice(5, -2); // Extract URL from style

    // Set modal content
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalRating').innerText = rating;
    document.getElementById('modalImage').src = imageUrl;

    // Display the modal
    modal.style.display = "block";
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




const cartIcon = document.getElementById('cartIcon');
const cart = document.getElementById('cart');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmount = document.getElementById('totalAmount');
const checkoutButton = document.getElementById('checkoutButton');

let cartItems = [];

// Function to update the cart display
function updateCart() {
  cartItemsContainer.innerHTML = ''; // Clear current items
  let total = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div>
        <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity; // Calculate total
  });

  totalAmount.innerText = total; // Update total amount
}

// Add event listener to add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const name = this.getAttribute('data-name');
    const price = parseInt(this.getAttribute('data-price'));
    const image = this.getAttribute('data-image');

    // Check if item is already in the cart
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity
    } else {
      cartItems.push({ name, price, quantity: 1, image }); // Add new item with image
    }

    updateCart(); // Update cart display
  });
});

// Show cart when cart icon is clicked
cartIcon.addEventListener('click', () => {
  cart.style.right = '0'; // Slide in the cart
});

// Close cart when close button is clicked
closeCart.addEventListener('click', () => {
  cart.style.right = '-339.8px'; // Slide out the cart
});

// Checkout button functionality
checkoutButton.addEventListener('click', () => {
  alert('Thank you for your order!'); // Alert on checkout
  cartItems = []; // Clear the cart
  updateCart(); // Update cart display
  cart.style.right = '-339.8px'; // Close the cart
});