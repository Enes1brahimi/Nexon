// Shopping Cart Functionality
console.log('Cart script loaded');

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productName, productImage, productPrice) {
    const item = {
        name: productName,
        image: productImage,
        price: parseFloat(productPrice),
        quantity: 1
    };

    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count in header
    updateCartCount();
    
    // Show success message with redirect
    showAddToCartNotification(productName);
}

// Function to update cart count in header and menu
function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(count => {
        count.textContent = totalItems;
    });
}

// Function to show beautiful thank you modal
function showThankYouModal(productName) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'thank-you-overlay';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'thank-you-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-heart"></i>
            </div>
            <h2>Thank You!</h2>
            <p class="product-name">${productName}</p>
            <p class="thank-message">has been added to your cart</p>
            <div class="confetti-container" id="confetti"></div>
            <div class="modal-buttons">
                <button class="btn-continue">Continue Shopping</button>
            </div>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Trigger animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Create confetti effect
    createConfetti();
    
    // Button listeners
    modal.querySelector('.btn-continue').addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 400);
    });
    
    modal.querySelector('.btn-checkout').addEventListener('click', function() {
        window.location.href = 'shoping-cart.html';
    });
    
    // Click overlay to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 400);
        }
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.classList.remove('show');
            setTimeout(() => {
                if (overlay.parentNode) overlay.remove();
            }, 400);
        }
    }, 5000);
}

// Create confetti animation
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = ['#667eea', '#764ba2', '#FFD700', '#FFA500', '#3b82f6'][Math.floor(Math.random() * 5)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);
    }
}

// Function to show add to cart notification and redirect
function showAddToCartNotification(productName) {
    // Show thank you modal
    showThankYouModal(productName);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        </div>
        <div class="notification-actions">
            <button class="notification-continue">Continue Shopping</button>
            <button class="notification-checkout">Go to Cart</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Event listeners for notification buttons
    notification.querySelector('.notification-continue').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    notification.querySelector('.notification-checkout').addEventListener('click', function() {
        window.location.href = 'shoping-cart.html';
    });
    
    // Auto close and redirect after 4 seconds if not interacted
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const taxElement = document.querySelector('.tax');
    const totalAmountElement = document.querySelector('.total-amount');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="ri-shopping-cart-line"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        if (subtotalElement) subtotalElement.textContent = '$0';
        if (shippingElement) shippingElement.textContent = '$0';
        if (taxElement) taxElement.textContent = '$0';
        if (totalAmountElement) totalAmountElement.textContent = '$0';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemHTML = `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description || 'Product description'}</p>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})"><i class="ri-delete-bin-line"></i></button>
            </div>
        `;

        cartItemsContainer.innerHTML += cartItemHTML;
    });

    const shipping = subtotal > 0 ? 50 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalAmountElement) totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

// Function to update quantity of item in cart
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCartItems();
});

// Add event listener to document for buy buttons using event delegation
document.addEventListener('click', function(event) {
    console.log('Click detected on:', event.target);
    
    // Check if it's a buy button or submit button within product container
    const isBuyButton = event.target.matches('.buy-button') || 
                        (event.target.matches('button[type="submit"]') && 
                         event.target.closest('.grid-item'));
    
    if (isBuyButton) {
        console.log('Buy button clicked');
        event.preventDefault();
        
        // Find the product item container - try different selectors for different page layouts
        let productItem = event.target.closest('.phone-item') || 
                          event.target.closest('.ei-item') || 
                          event.target.closest('.product-item') ||
                          event.target.closest('.product-card') ||
                          event.target.closest('.grid-item');
        
        if (!productItem) {
            console.error('Could not find product item container');
            return;
        }
        
        // Extract product details - handle different HTML structures
        let productName = productItem.querySelector('h3')?.textContent || 
                          productItem.querySelector('h4')?.textContent ||
                          'Unknown Product';
        let productImage = productItem.querySelector('img')?.src || '../Images/placeholder.png';
        
        // Try to find price - handles both p tag and id="price" structures
        let priceElement = productItem.querySelector('#price') ||
                           Array.from(productItem.querySelectorAll('p'))
                               .find(p => p.textContent.includes('$'));
        let priceText = priceElement?.textContent || '$0';
        let productPrice = parseFloat(priceText.replace('$', '').replace(',', ''));
        
        console.log('Product name:', productName);
        console.log('Product image:', productImage);
        console.log('Product price:', productPrice);

        addToCart(productName, productImage, productPrice);
    }
});
