const products = [
    { name: "Fresh Fruits", price: 1000, img: "fresh images.jpg" },
    { name: "Home Appliances", price: 20000, img: "home appliances.jpg" },
    { name: "Smartphones", price: 30000, img: "phones.jpg" },
    { name: "Smartwatches", price: 15000, img: "smartwatches.jpg" },
    { name: "Vegetables", price: 500, img: "vegetables.jpg" },
    { name: "Non-Vegetarian Items", price: 2000, img: "non-veg.jpg" },
];

let totalAmount = 0;

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    document.getElementById('user-name').textContent = `Welcome, ${username}`;
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('sell-section').style.display = 'block';
    displayProducts(products);
});

function logout() {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('sell-section').style.display = 'none';
    document.getElementById('buy-section').style.display = 'none';
    document.getElementById('product-list').innerHTML = '';
    document.getElementById('username').value = '';
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <input type="number" id="quantity-${product.name}" min="1" value="1">
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productName, productPrice) {
    const quantity = document.getElementById(`quantity-${productName}`).value;
    const total = productPrice * quantity;
    totalAmount += total;
    document.getElementById('total-amount').textContent = totalAmount;

    // Enable the buy section and populate the product name
    document.getElementById('product-name').value = productName;
    document.getElementById('buy-section').style.display = 'block';
}

document.getElementById('buy-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const address = document.getElementById('address').value;

    alert(`Order submitted for: ${productName}\nTotal Amount: ₹${totalAmount}\nPayment Method: ${paymentMethod}\nDelivery Address: ${address}`);
    document.getElementById('buy-form').reset();
    totalAmount = 0;
    document.getElementById('total-amount').textContent = totalAmount;
    document.getElementById('buy-section').style.display = 'none';
});

let rating = 0;

function rateProduct(stars) {
    rating = stars;
    const ratingSpans = document.querySelectorAll('.rating span');
    ratingSpans.forEach((span, index) => {
        span.style.color = index < stars ? '#FFD700' : 'black';
    });
}

function submitReview() {
    const reviewText = document.getElementById('review-text').value;
    const reviewDisplay = document.getElementById('review-display');
    const review = document.createElement('p');

    review.textContent = `${reviewText} - Rating: ${rating} Stars`;
    reviewDisplay.appendChild(review);
    document.getElementById('review-text').value = '';
    rating = 0;
    document.querySelectorAll('.rating span').forEach(span => span.style.color = 'black');
}
