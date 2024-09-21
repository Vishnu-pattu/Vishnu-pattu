const restaurantList = document.getElementById('restaurant-list');

const restaurants = [
    { id: 1, name: 'Pizza Place', menu: ['Margherita', 'Pepperoni', 'BBQ Chicken'] },
    { id: 2, name: 'Burger Joint', menu: ['Classic Burger', 'Cheese Burger', 'Veggie Burger'] },
    { id: 3, name: 'Sushi Spot', menu: ['California Roll', 'Nigiri', 'Sashimi'] }
];

function displayRestaurants() {
    restaurantList.innerHTML = '';
    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.classList.add('restaurant');
        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <h4>Menu</h4>
            <ul>${restaurant.menu.map(item => `<li>${item}</li>`).join('')}</ul>
            <button onclick="orderFood(${restaurant.id})">Order Food</button>
        `;
        restaurantList.appendChild(div);
    });
}

function orderFood(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
        const order = prompt(`Place your order from ${restaurant.name} (choose from: ${restaurant.menu.join(', ')})`);
        if (restaurant.menu.includes(order)) {
            alert(`Your order for ${order} from ${restaurant.name} has been placed!`);
        } else {
            alert('Sorry, that item is not on the menu.');
        }
    }
}

// Initialize the app
displayRestaurants();
