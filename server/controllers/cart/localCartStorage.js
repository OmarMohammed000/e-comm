
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
async function syncCartWithServer() {
    const localCart = loadCartFromLocalStorage();
    for (let item of localCart) {
        await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: item.productId, quantity: item.quantity }),
        });
    }
    localStorage.removeItem('cart'); // Clear local cart after syncing
    
}
export {saveCartToLocalStorage,loadCartFromLocalStorage,syncCartWithServer};