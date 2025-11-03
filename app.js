document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Jackfruit', price: 12.99, image: 'images/jackfruit.jpeg', origin: 'Originates from the Western Ghats of southern India and is the national fruit of Bangladesh.' },
        { id: 2, name: 'Dragon Fruit', price: 8.50, image: 'images/dragonfruit.jpeg', origin: 'Native to southern Mexico and Central America, today it is grown all over the world.' },
        { id: 3, name: 'Lychee', price: 9.99, image: 'images/Lychee.jpeg', origin: 'A tropical tree native to the Guangdong and Fujian provinces of southeastern China.' },
        { id: 4, name: 'Rambutan', price: 7.25, image: 'images/rambutan.jpeg', origin: 'Native to the Malay-Indonesian region, and other regions of tropical Southeast Asia.' },
        { id: 5, name: 'Mangosteen', price: 15.00, image: 'images/mangosteen.jpeg', origin: 'Known as the "Queen of Fruits", it is native to Southeast Asia, mainly the Sunda Islands and the Moluccas.' },
        { id: 6, name: 'Durian', price: 20.00, image: 'images/durian.jpeg', origin: 'Regarded by many people in southeast Asia as the "king of fruits", it is native to Borneo and Sumatra.' },
        { id: 7, name: 'Passion Fruit', price: 6.75, image: 'images/passionfruit.jpeg', origin: 'A vine species of passion flower native to southern Brazil through Paraguay and northern Argentina.' },
        { id: 8, name: 'Star Fruit', price: 5.50, image: 'images/starfruit.jpeg', origin: 'Also known as carambola, its origin is unknown, but it has been cultivated in the Indian Subcontinent and Southeast Asia for centuries.' },
        { id: 9, name: 'Papaya', price: 4.99, image: 'images/papaya.jpeg', origin: 'Native to the tropics of the Americas, perhaps from southern Mexico and neighboring Central America.' },
        { id: 10, name: 'Guava', price: 3.50, image: 'images/guava.jpeg', origin: 'A common tropical fruit cultivated in many tropical and subtropical regions. Native to Mexico, Central America, the Caribbean and northern South America.' },
        { id: 11, name: 'Kiwano', price: 8.00, image: 'images/kiwano.jpeg', origin: 'Also known as the horned melon, it is native to Sub-Saharan Africa. It is now cultivated in countries all over the world.' },
        { id: 12, name: 'Persimmon', price: 7.80, image: 'images/persimmon.jpeg', origin: 'The most widely cultivated species is the "Japanese persimmon", which is native to China.' },
    ];

    const productGrid = document.getElementById('product-grid');
    const modal = document.getElementById('details-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
    const cartCountEl = document.getElementById('cart-count');

    // --- Product Loading ---
    function loadProducts() {
        if (!productGrid) return;
        productGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}" data-name="${product.name.toLowerCase()}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-hover-overlay">
                        <button class="hover-btn details-btn" data-id="${product.id}">Details</button>
                        <button class="hover-btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    // --- Modal Logic ---
    function showModal(productId) {
        const product = products.find(p => p.id == productId);
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.origin;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // --- Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('voxiCart')) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountEl) cartCountEl.textContent = totalItems;
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id == productId);
        const existingItem = cart.find(item => item.id == productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('voxiCart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'toast-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.innerHTML = `
    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 2000;
        transform: translateX(120%);
        transition: transform 0.5s ease-in-out;
    }
    .toast-notification.show {
        transform: translateX(0);
    }
    `;
    document.head.appendChild(style);

    // --- Event Listeners ---
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('details-btn')) {
                showModal(e.target.dataset.id);
            }
            if (e.target.classList.contains('add-to-cart-btn')) {
                addToCart(e.target.dataset.id);
            }
        });
    }

    if (closeButton) closeButton.onclick = closeModal;
    if (modal) window.onclick = (e) => {
        if (e.target == modal) {
            closeModal();
        }
    };
    
    // --- Cart Page Logic ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalEl = document.getElementById('cart-total');

    function loadCartPage() {
        if (!cartItemsContainer) return;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            document.getElementById('cart-summary').style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-from-cart-btn"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalEl.textContent = total.toFixed(2);

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItemDiv = e.target.closest('.cart-item');
                const productId = cartItemDiv.dataset.id;
                removeFromCart(productId);
                loadCartPage(); // Reload the cart display
            });
        });
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id != productId);
        localStorage.setItem('voxiCart', JSON.stringify(cart));
        updateCartCount();
    }

    // --- Initialize Page ---
    loadProducts();
    updateCartCount();
    loadCartPage();
});

// Expose products to global scope for voice script
window.products = [
    { id: 1, name: 'Jackfruit', price: 12.99, image: 'https://images.unsplash.com/photo-1628102293374-f37b6b107e3c?q=80&w=2787&auto=format&fit=crop', origin: 'Originates from the Western Ghats of southern India and is the national fruit of Bangladesh.' },
    { id: 2, name: 'Dragon Fruit', price: 8.50, image: 'https://images.unsplash.com/photo-1596593352225-06a73cde75d2?q=80&w=2787&auto=format&fit=crop', origin: 'Native to southern Mexico and Central America, today it is grown all over the world.' },
    { id: 3, name: 'Lychee', price: 9.99, image: 'https://images.unsplash.com/photo-1598024483739-0a624aad2729?q=80&w=2787&auto=format&fit=crop', origin: 'A tropical tree native to the Guangdong and Fujian provinces of southeastern China.' },
    { id: 4, name: 'Rambutan', price: 7.25, image: 'https://images.unsplash.com/photo-1616695279269-f3316e05f653?q=80&w=2787&auto=format&fit=crop', origin: 'Native to the Malay-Indonesian region, and other regions of tropical Southeast Asia.' },
    { id: 5, name: 'Mangosteen', price: 15.00, image: 'https://images.unsplash.com/photo-1627798384593-5182390f05b1?q=80&w=2787&auto=format&fit=crop', origin: 'Known as the "Queen of Fruits", it is native to Southeast Asia, mainly the Sunda Islands and the Moluccas.' },
    { id: 6, name: 'Durian', price: 20.00, image: 'https://images.unsplash.com/photo-1628563721156-f48a27b82a7a?q=80&w=2803&auto=format&fit=crop', origin: 'Regarded by many people in southeast Asia as the "king of fruits", it is native to Borneo and Sumatra.' },
    { id: 7, name: 'Passion Fruit', price: 6.75, image: 'https://images.unsplash.com/photo-1617112520815-a75a0658790a?q=80&w=2788&auto=format&fit=crop', origin: 'A vine species of passion flower native to southern Brazil through Paraguay and northern Argentina.' },
    { id: 8, name: 'Star Fruit', price: 5.50, image: 'https://images.unsplash.com/photo-1591993423724-42452391a2a2?q=80&w=2787&auto=format&fit=crop', origin: 'Also known as carambola, its origin is unknown, but it has been cultivated in the Indian Subcontinent and Southeast Asia for centuries.' },
    { id: 9, name: 'Papaya', price: 4.99, image: 'https://images.unsplash.com/photo-1521123468531-64b6d5885c3b?q=80&w=2835&auto=format&fit=crop', origin: 'Native to the tropics of the Americas, perhaps from southern Mexico and neighboring Central America.' },
    { id: 10, name: 'Guava', price: 3.50, image: 'https://images.unsplash.com/photo-1621213753383-a175510c441a?q=80&w=2787&auto=format&fit=crop', origin: 'A common tropical fruit cultivated in many tropical and subtropical regions. Native to Mexico, Central America, the Caribbean and northern South America.' },
    { id: 11, name: 'Kiwano', price: 8.00, image: 'https://images.unsplash.com/photo-1627670150242-2a7b9f368153?q=80&w=2787&auto=format&fit=crop', origin: 'Also known as the horned melon, it is native to Sub-Saharan Africa. It is now cultivated in countries all over the world.' },
    { id: 12, name: 'Persimmon', price: 7.80, image: 'https://images.unsplash.com/photo-1628827346513-35649b9d31f0?q=80&w=2787&auto=format&fit=crop', origin: 'The most widely cultivated species is the "Japanese persimmon", which is native to China.' },
];

// --- Welcome Bar Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const welcomeBar = document.getElementById('welcome-bar');
    const dismissBtn = document.getElementById('dismiss-bar-btn');
    const hasBeenWelcomed = localStorage.getItem('voxiUserWelcomed');

    // Show the bar only if the user hasn't dismissed it before
    if (!hasBeenWelcomed && welcomeBar) {
        welcomeBar.style.display = 'flex';
    }

    // Handle the dismiss button click
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            welcomeBar.style.display = 'none';
            // Set a flag in localStorage so it doesn't show again
            localStorage.setItem('voxiUserWelcomed', 'true');
        });
    }
});