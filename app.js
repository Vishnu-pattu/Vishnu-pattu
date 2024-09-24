// Sample menu data
const menuItems = [
    { id: 1, name: 'Burger', price: 5.99 },
    { id: 2, name: 'Pizza', price: 8.99 },
    { id: 3, name: 'Pasta', price: 7.49 },
    { id: 4, name: 'Salad', price: 4.99 },
];

// Array to hold cart items
let cart = [];

// Function to display menu items
function displayMenu() {
    const menuList = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="addToCart(${item.id})">Add to Cart</button>`;
        menuList.appendChild(li);
    });
}

// Function to add items to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    cart.push(item);
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

// Function to handle order placement
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    alert('Order placed successfully!');
    cart = []; // Clear the cart
    displayCart();
}

// Initialize the menu and cart
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    document.getElementById('place-order').addEventListener('click', placeOrder);
});
