/* =========================================================
   FATIMA'S KITCHEN
   ADVANCED MENU.JS
========================================================= */



/* =========================================================
   MENU CARDS
========================================================= */

const allMenuCards =
    document.querySelectorAll(".menu-card");



/* =========================================================
   LOCAL STORAGE
========================================================= */

let fatimaOrders =
    JSON.parse(
        localStorage.getItem("fatimaOrders")
    ) || [];



/* =========================================================
   SAVE ORDERS
========================================================= */

function saveOrders() {

    localStorage.setItem(
        "fatimaOrders",
        JSON.stringify(fatimaOrders)
    );

}



/* =========================================================
   CALCULATE TOTAL
========================================================= */

function calculateGrandTotal() {

    let total = 0;



    fatimaOrders.forEach(item => {

        total += item.total;

    });



    return total;

}



/* =========================================================
   REMOVE ITEM
========================================================= */

window.removeItem = function(index) {

    fatimaOrders.splice(index, 1);

    saveOrders();

    updateOrderSummary();

}



/* =========================================================
   UPDATE CART QUANTITY
========================================================= */

window.updateCartQuantity = function(index, action) {

    if (action === "plus") {

        fatimaOrders[index].quantity++;

    }



    if (
        action === "minus" &&
        fatimaOrders[index].quantity > 1
    ) {

        fatimaOrders[index].quantity--;

    }



    fatimaOrders[index].total =
        fatimaOrders[index].price *
        fatimaOrders[index].quantity;



    saveOrders();

    updateOrderSummary();

}



/* =========================================================
   UPDATE ORDER SUMMARY
========================================================= */

function updateOrderSummary() {

    const orderContainer =
        document.querySelector(
            ".order-summary-items"
        );



    const grandTotalElement =
        document.querySelector(
            ".grand-total-price"
        );



    if (!orderContainer) return;



    /* EMPTY */

    if (fatimaOrders.length === 0) {

        orderContainer.innerHTML = `

        <div class="empty-order">

            No items added yet 🍽

        </div>

        `;



        grandTotalElement.innerText =
            "₹0";



        return;

    }



    let html = "";



    fatimaOrders.forEach((item, index) => {

        html += `

        <div class="order-item">

            <div class="order-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>

                    ${item.type.toUpperCase()}

                </p>

            </div>



            <div class="cart-controls">

                <button
                    onclick="updateCartQuantity(${index}, 'minus')"
                    class="cart-btn"
                >

                    -

                </button>



                <span>

                    ${item.quantity}

                </span>



                <button
                    onclick="updateCartQuantity(${index}, 'plus')"
                    class="cart-btn"
                >

                    +

                </button>

            </div>



            <div class="order-item-price">

                ₹${item.total}

            </div>



            <button
                onclick="removeItem(${index})"
                class="remove-item-btn"
            >

                ✕

            </button>

        </div>

        `;

    });



    orderContainer.innerHTML = html;



    grandTotalElement.innerText =
        "₹" + calculateGrandTotal();



    saveOrders();

}



/* =========================================================
   SETUP MENU CARDS
========================================================= */

allMenuCards.forEach(card => {

    const minusBtn =
        card.querySelector(".minus-btn");

    const plusBtn =
        card.querySelector(".plus-btn");

    const qtyNumber =
        card.querySelector(".qty-number");

    const addBtn =
        card.querySelector(".add-order-btn");

    const totalPrice =
        card.querySelector(".live-total-price");

    const priceButtons =
        card.querySelectorAll(".price-option");



    let quantity = 1;

    let selectedPrice = 0;

    let selectedType = "";



    /* DEFAULT */

    if (priceButtons.length > 0) {

        const firstBtn =
            priceButtons[0];



        firstBtn.classList.add(
            "active-price"
        );



        selectedPrice =
            parseInt(
                firstBtn.dataset.price
            );



        selectedType =
            firstBtn.dataset.type;



        updateLivePrice();

    }



    /* LIVE PRICE */

    function updateLivePrice() {

        totalPrice.innerText =
            "₹" +
            (selectedPrice * quantity);

    }



    /* PRICE SELECT */

    priceButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            priceButtons.forEach(b => {

                b.classList.remove(
                    "active-price"
                );

            });



            btn.classList.add(
                "active-price"
            );



            selectedPrice =
                parseInt(
                    btn.dataset.price
                );



            selectedType =
                btn.dataset.type;



            updateLivePrice();

        });

    });



    /* PLUS */

    plusBtn.addEventListener("click", () => {

        quantity++;

        qtyNumber.innerText = quantity;

        updateLivePrice();

    });



    /* MINUS */

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            qtyNumber.innerText = quantity;

            updateLivePrice();

        }

    });



    /* ADD TO ORDER */

    addBtn.addEventListener("click", () => {

        const itemName =
            card.querySelector("h3")
            .innerText;



        /* CHECK EXISTING */

        const existingItem =
            fatimaOrders.find(item =>

                item.name === itemName &&
                item.type === selectedType

            );



        if (existingItem) {

            existingItem.quantity += quantity;

            existingItem.total =
                existingItem.price *
                existingItem.quantity;

        }

        else {

            fatimaOrders.push({

                name: itemName,

                type: selectedType,

                quantity: quantity,

                price: selectedPrice,

                total:
                    selectedPrice * quantity

            });

        }



        saveOrders();

        updateOrderSummary();



        /* BUTTON ANIMATION */

        addBtn.innerText =
            "✓ Added";



        addBtn.classList.add(
            "added"
        );



        setTimeout(() => {

            addBtn.innerText =
                "Add To Order";



            addBtn.classList.remove(
                "added"
            );

        }, 2000);

    });

});



/* =========================================================
   SEARCH SYSTEM
========================================================= */

const menuSearch =
    document.getElementById("menuSearch");



if (menuSearch) {

    menuSearch.addEventListener(
        "keyup",
        () => {

            const value =
                menuSearch.value
                .toLowerCase();



            allMenuCards.forEach(card => {

                const itemName =
                    card.innerText
                    .toLowerCase();



                if (
                    itemName.includes(value)
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

}



/* =========================================================
   INIT
========================================================= */

window.addEventListener("load", () => {

    updateOrderSummary();

});



console.log(

    "%cADVANCED CART SYSTEM READY 🛒",

    "color: cyan; font-size: 16px;"

);