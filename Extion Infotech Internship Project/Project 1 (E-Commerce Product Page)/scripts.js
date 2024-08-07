const mainImage = document.getElementById("main-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const buyNowButton = document.getElementById("buy-now");
const cartItems = document.getElementById("cart-items");
const totalPriceDisplay = document.getElementById("cart-total");
const sizeDropdown = document.getElementById("size");

let cart = [];

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.src;
    });
});

buyNowButton.addEventListener("click", addToCart);

function addToCart() {
    const selectedSize = sizeDropdown.value;
    if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
    }

    const product = {
        name: "Jordan Stadium 90",
        price: 99.99,
        size: selectedSize
    };
    cart.push(product);
    updateCart();

    buyNowButton.disabled = true;
    buyNowButton.textContent = "Added to Cart";
}

function updateCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price;
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} (Size: ${item.size}) - $${item.price.toFixed(2)}`;
        cartItems.appendChild(listItem);
    });
    totalPriceDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
}
