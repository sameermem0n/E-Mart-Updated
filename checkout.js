document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = document.getElementById('order-summary');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.removeItem('cart');

    // Handle empty cart
    if (cart.length === 0) {
        orderSummary.innerHTML = `<p class="text-gray-500">Your cart is empty.</p>`;
        totalPriceElement.textContent = `$0.00`;
        return;
    }

    // Fetch product data from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Iterate over the cart and find corresponding products
            cart.forEach(cartItem => {
                const product = products.find(p => p.id === cartItem.id);
            
                if (product) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover">
                        <span>${product.name} (x${cartItem.quantity})</span>
                        <span>$${(product.price * cartItem.quantity).toFixed(2)}</span>
                    `;
                    orderSummary.appendChild(cartItemDiv);
                    totalPrice += product.price * cartItem.quantity;
                }
            });

            const toggleSidebar = () => {
                const sidebar = document.getElementById("sidebar");
                sidebar.classList.toggle("-translate-x-full");
              };
              function toggleProduct() {
                // Target the button
                const button = document.getElementById("btn");
        
                // Target all grid items starting from the 5th
                const products = document.querySelectorAll(
                  ".grid > div:nth-child(n+5)" // Corrected selector for grid items
                );
        
                // Check if the first product in the selection is hidden
                const isHidden = products[0].classList.contains("hidden");
        
                // Toggle the hidden class for all selected products
                products.forEach((item) => {
                  item.classList.toggle("hidden");
                });
        
                // Update the button text accordingly
                button.textContent = isHidden ? "Source less" : "Source now";
              }
        
              function toggleProducts() {
                const button = document.getElementById("toggleBtn");
                const products = document.querySelectorAll(
                  "#productGrid > div:nth-child(n+5)"
                );
        
                // Check the current state (hidden or visible)
                const isHidden = products[0].classList.contains("hidden");
        
                products.forEach((product) => {
                  if (isHidden) {
                    product.classList.remove("hidden"); // Show all items
                  } else {
                    product.classList.add("hidden"); // Hide additional items
                  }
                });
        
                // Update button text
                button.textContent = isHidden ? "Source less" : "Source now";
              }
              function selectOption(country, icon) {
                document.getElementById(
                  "dropdownButton"
                ).innerHTML = `${country} <img src="${icon}" class="inline-block w-4 h-4 ml-2" />`;
                toggleDropdown();
              }
        
              // Close the dropdown if clicked outside
              window.onclick = function (event) {
                if (!event.target.matches("#dropdownButton")) {
                  document.getElementById("dropdownMenu").classList.add("hidden");
                }
              };
            

            // Update total price display
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error loading products.json:', error);
            orderSummary.innerHTML = `<p class="text-red-500">Failed to load cart items.</p>`;
        });

    // Handle form submission for shipping
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();

        const address = checkoutForm.address.value.trim();
        const city = checkoutForm.city.value.trim();
        const postalCode = checkoutForm.postalCode.value.trim();
        const paymentMethod = checkoutForm.paymentMethod.value;

        if (!address || !city || !postalCode || !paymentMethod) {
            alert('Please fill out all fields.');
            return;
        }

        // Clear the cart after order confirmation
        localStorage.removeItem('cart');
        alert(`Order Confirmed!\nTotal: $${totalPrice.toFixed(2)}`);
        window.location.href = 'index.html'; // Redirect to homepage
    });

    const addToCart = (productId, productImage) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        const existingItem = cart.find(item => item.id === productId);
    
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, image: productImage, quantity: 1 });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    };
    
    
    // Attach event listener to "Add to Cart" button
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id, 10);
            const productImage = button.dataset.image; // Get image from button data attribute
            addToCart(productId, productImage);
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-container');
    
        if (cart.length === 0) {
            cartContainer.textContent = 'Your cart is empty.';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <hr>
                `;
                cartContainer.appendChild(cartItem);
            });
        }
    });
        
});
