document.addEventListener('DOMContentLoaded', () => {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Fetch product data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Find the product by ID
            const product = products.find(p => p.id === productId);

            if (product) {
                // Populate main product details
                document.getElementById('main-product-image').src = product.image;
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-price').textContent = `$${product.price}`;
                document.getElementById('product-category').textContent = `Category: ${product.category}`;
                document.getElementById('Specifications').textContent = `Specifications: ${product.Specifications || 'Not available'}`;
                document.getElementById('product-rating').innerHTML = `⭐ ${product.rating}`;

                // Load product images in carousel
                document.getElementById('image-1').src = product.images[0];
                document.getElementById('image-2').src = product.images[1];
                document.getElementById('image-3').src = product.images[2];

                // Add to cart functionality
                document.getElementById('add-to-cart').addEventListener('click', () => {
                    addToCart(product); // Save product to localStorage
                    alert(`${product.name} has been added to your cart!`);
                    updateCartCount(); // Update cart count in the UI
                });

                // Buy now functionality
                document.getElementById('buy-now').addEventListener('click', () => {
                    alert('Proceeding to checkout!');
                });

                // Load related products
                loadRelatedProducts(products, product.category);
            } else {
                alert('Product not found!');
            }
        })
        .catch(error => console.error('Error loading product data:', error));

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
        

    // Add product to cart and save to localStorage
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart or initialize empty array
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity if product exists
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart back to localStorage
    }

    // Update cart count displayed in the icon
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum all quantities
        document.getElementById('cart-count').textContent = totalItems; // Update cart count
    }

    // Load related products
    function loadRelatedProducts(products, category) {
        const relatedProductsContainer = document.getElementById('related-products');
        const related = products.filter(p => p.category === category).slice(0, 4); // Show up to 4 related products

        related.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('border', 'rounded', 'p-4', 'bg-white');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded mb-2">
                <h3 class="text-sm font-semibold">${product.name}</h3>
                 <p class="text-sm text-green-500 font-semibold">$${product.specifications}</p>
                <p class="text-sm text-green-500 font-semibold">$${product.price}</p>
            `;

            productCard.addEventListener('click', () => {
                window.location.href = `product-details.html?id=${product.id}`;
            });

            relatedProductsContainer.appendChild(productCard);
        });
    }

    // Initial update of cart count
    updateCartCount();
});
