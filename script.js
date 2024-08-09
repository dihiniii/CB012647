


document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.getElementById("addtoCart");
    const addToFavouritesButton = document.getElementById("addToFavourites");
    const applyFavouritesButton = document.getElementById("applyFavourites");    //Setting Variables
    const buyNowButton = document.getElementById("Buynow");
    const tableCart = document.getElementById("tablecart");
    const totalPriceElement = document.getElementById("totalPrice");

    let cart = []; //creating an empty cart to store items

    function updateCart() {     //function to update the table -  To shows item in tne cart
        let total = 0;
        tableCart.innerHTML = `
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        `;

        cart.forEach(item => {
            let row = tableCart.insertRow();
            row.insertCell(0).textContent = item.name;
            row.insertCell(1).textContent = item.quantity;
            row.insertCell(2).textContent = item.totalPrice.toFixed(2);
            total += item.totalPrice;
        });

        let totalRow = tableCart.insertRow();
        totalRow.insertCell(0).textContent = "Total";
        totalRow.insertCell(1).textContent = "";
        totalRow.insertCell(2).textContent = total.toFixed(2);

        totalPriceElement.textContent = total.toFixed(2);
    }

    addToCartButton.addEventListener("click", function () {
        cart = [];
        document.querySelectorAll("input[type='number']").forEach(input => {
            let quantity = parseInt(input.value);
            if (quantity > 0) {

                let itemName = input.name;
                let itemPrice = parseFloat(input.dataset.price);
                let itemTotalPrice = itemPrice * quantity;
                cart.push({
                    name: itemName,
                    quantity: quantity,
                    totalPrice: itemTotalPrice

                });
            }
        });
        updateCart();
    });

    addToFavouritesButton.addEventListener("click", function () {   //saves the current selcted items, quantity and total price to the local storage 
        localStorage.setItem("favourites", JSON.stringify(cart));
        alert("Added to favourites"); //Gives the alert message 
    });

    applyFavouritesButton.addEventListener("click", function () {   // shows the items, quantity and total prices that are saved in the local storage 
        let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        cart = favourites;
        updateCart();
        alert("Applied Favorites")
    });

});
