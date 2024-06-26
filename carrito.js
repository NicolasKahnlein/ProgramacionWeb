document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItemsElement = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');
    const addToCarritoButtons = document.querySelectorAll('.add-to-carrito');

    const updateCart = () => {
        cartItemsElement.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <input class="cart-item-quantity" type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-item" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        totalElement.textContent = total.toFixed(2);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    addToCarritoButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const id = button.getAttribute('data-product-id');
            const name = button.getAttribute('data-product-name');
            const price = parseFloat(button.getAttribute('data-product-price'));

            // Verificar si el producto ya está en el carrito
            const existingProduct = carrito.find(item => item.id === id);

            if (existingProduct) {
                // Incrementar la cantidad del producto existente
                existingProduct.quantity++;
            } else {
                // Agregar un nuevo producto al carrito
                carrito.push({ id, name, price, quantity: 1 });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Notificar al usuario que el producto fue agregado al carrito
            alert(`${name} ha sido agregado al carrito.`);

            // Redireccionar a la página del carrito
            window.location.href = 'carrito.html';

            // Actualizar visualización del carrito
            updateCart();
        });
    });

    cartItemsElement.addEventListener('change', (event) => {
        if (event.target.classList.contains('cart-item-quantity')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            const item = carrito.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
            }
        }
    });

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const id = event.target.getAttribute('data-id');
            // Confirmación antes de eliminar
            if (confirm('¿Estás seguro de eliminar este producto?')) {
                const itemIndex = carrito.findIndex(item => item.id === id);
                if (itemIndex !== -1) {
                    carrito.splice(itemIndex, 1);
                    updateCart();
                }
            }
        }
    });

    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada. Total: $' + totalElement.textContent);
        localStorage.removeItem('carrito');
        updateCart();
    });

    // Actualizar el carrito al cargar la página
    updateCart();
});



// -----------------------------------------------------------------------------------------

