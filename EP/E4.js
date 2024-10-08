const menuItems = [
    { id: 1, name: 'Cheeseburger', price: 8.99, image: 'Cheeseburger.jpg' },
    { id: 2, name: 'Margherita Pizza', price: 12.99, image: 'Margherita Pizza.jpg' },
    { id: 3, name: 'Caesar Salad', price: 7.99, image: 'Caesar Salad Caesar Salad.jpg' },
    { id: 4, name: 'Pasta Primavera', price: 10.99, image: 'pasta.jpg' },
];

const cart = [];
const reviews = [];

document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        alert(`Welcome, ${username}!`);
        document.getElementById('username').value = ''; // Clear input
    } else {
        alert('Please enter your name.');
    }
});

function displayMenu() {
    const menuList = document.getElementById('menu-items');
    menuList.innerHTML = ''; // Clear previous menu items
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
            ${item.name} - $${item.price.toFixed(2)} 
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuList.appendChild(li);
    });
}

function addToCart(id) {
    const item = menuItems.find(item => item.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price;
    });

    document.getElementById('total-price').innerText = total.toFixed(2);
}

document.getElementById('place-order').addEventListener('click', function() {
    const address = document.getElementById('address').value.trim();
    const paymentMethod = document.getElementById('payment-method').value;

    if (cart.length > 0 && address) {
        alert(`Order placed successfully!\nAddress: ${address}\nPayment Method: ${paymentMethod}`);
        cart.length = 0; // Clear the cart
        updateCart();
        document.getElementById('address').value = ''; // Clear the address input
    } else {
        alert('Please fill in your address and add items to your cart.');
    }
});

// Search functionality
function searchDishes() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(searchInput));
    
    const menuList = document.getElementById('menu-items');
    menuList.innerHTML = ''; // Clear previous menu items
    const searchMessage = document.getElementById('search-message');

    if (filteredItems.length > 0) {
        searchMessage.style.display = 'none'; // Hide the message if dishes are found
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'menu-item';
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                ${item.name} - $${item.price.toFixed(2)} 
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            menuList.appendChild(li);
        });
    } else {
        searchMessage.style.display = 'block'; // Show the message if no dishes are found
        menuList.innerHTML = ''; // Clear the menu list
        setTimeout(() => {
            searchMessage.style.display = 'none'; // Hide message after 5 seconds
        }, 5000); // 5000 milliseconds = 5 seconds
    }
}

// Reviews functionality
document.getElementById('submit-review').addEventListener('click', function() {
    const reviewInput = document.getElementById('review-input').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    if (reviewInput && rating) {
        const review = {
            text: reviewInput,
            stars: parseInt(rating.value)
        };
        reviews.push(review);
        displayReviews();
        document.getElementById('review-input').value = ''; // Clear the input
        document.querySelector('input[name="rating"]:checked').checked = false; // Clear selected rating
    } else {
        alert('Please enter a review and select a rating.');
    }
});

function displayReviews() {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear previous reviews
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.className = 'review-item';
        li.innerHTML = `
            ${review.text} - <span class="rating">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</span>
        `;
        reviewsList.appendChild(li);
    });
}

// Initial call to display the menu
displayMenu();





