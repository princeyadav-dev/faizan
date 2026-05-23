/* =========================================================
   FATIMA'S KITCHEN
   ADVANCED PLATTERS.JS
========================================================= */



/* =========================================================
   SELECT ALL PLATTER CARDS
========================================================= */

const platterCards =
    document.querySelectorAll(".platter-card");



/* =========================================================
   LOCAL STORAGE
========================================================= */

let platterOrders =
    JSON.parse(
        localStorage.getItem("fatimaPlatters")
    ) || [];



/* =========================================================
   SAVE ORDERS
========================================================= */

function savePlatters() {

    localStorage.setItem(

        "fatimaPlatters",

        JSON.stringify(platterOrders)

    );

}



/* =========================================================
   GRAND TOTAL
========================================================= */

function calculateGrandTotal() {

    let total = 0;



    platterOrders.forEach(item => {

        total += item.total;

    });



    return total;

}



/* =========================================================
   REMOVE ITEM
========================================================= */

window.removePlatter = function(index) {

    platterOrders.splice(index, 1);

    savePlatters();

    updatePlatterSummary();

}



/* =========================================================
   UPDATE CART QTY
========================================================= */

window.updatePlatterQty = function(index, action) {

    if (action === "plus") {

        platterOrders[index].quantity++;

    }



    if (

        action === "minus" &&

        platterOrders[index].quantity > 1

    ) {

        platterOrders[index].quantity--;

    }



    platterOrders[index].total =

        platterOrders[index].price *

        platterOrders[index].quantity;



    savePlatters();

    updatePlatterSummary();

}



/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updatePlatterSummary() {

    const summaryContainer =

        document.querySelector(

            ".order-summary-items"

        );



    const grandTotalElement =

        document.querySelector(

            ".grand-total-price"

        );



    if (!summaryContainer) return;



    /* EMPTY */

    if (platterOrders.length === 0) {

        summaryContainer.innerHTML = `

        <div class="empty-order">

            No platters selected yet 🍽

        </div>

        `;



        grandTotalElement.innerText =

            "₹0";



        return;

    }



    let html = "";



    platterOrders.forEach((item, index) => {

        let itemsHTML = "";



        item.items.forEach(food => {

            itemsHTML += `

            <li>${food}</li>

            `;

        });



        html += `

        <div class="order-item platter-order-item">

            <div class="order-item-info">

                <h4>

                    ${item.name}

                </h4>

                <p>

                    Qty: ${item.quantity}

                </p>

                <ul class="platter-summary-items">

                    ${itemsHTML}

                </ul>

            </div>



            <div class="cart-controls">

                <button
                    onclick="updatePlatterQty(${index}, 'minus')"
                    class="cart-btn"
                >

                    -

                </button>



                <span>

                    ${item.quantity}

                </span>



                <button
                    onclick="updatePlatterQty(${index}, 'plus')"
                    class="cart-btn"
                >

                    +

                </button>

            </div>



            <div class="order-item-price">

                ₹${item.total}

            </div>



            <button
                onclick="removePlatter(${index})"
                class="remove-item-btn"
            >

                ✕

            </button>

        </div>

        `;

    });



    summaryContainer.innerHTML = html;



    grandTotalElement.innerText =

        "₹" + calculateGrandTotal();



    savePlatters();

}



/* =========================================================
   SETUP ALL PLATTER CARDS
========================================================= */

platterCards.forEach(card => {

    const plusBtn =
        card.querySelector(".plus-btn");

    const minusBtn =
        card.querySelector(".minus-btn");

    const qtyNumber =
        card.querySelector(".qty-number");

    const addBtn =
        card.querySelector(".add-order-btn");

    const livePrice =
        card.querySelector(".live-total-price");



    const platterName =
        card.querySelector("h3")
        .innerText;



    const platterPrice =
        parseInt(

            card.querySelector(
                ".platter-price"
            )
            .innerText
            .replace("₹", "")

        );



    let quantity = 1;



    /* =====================================================
       LIVE PRICE
    ===================================================== */

    function updateLivePrice() {

        livePrice.innerText =

            "₹" +
            (platterPrice * quantity);

    }



    updateLivePrice();



    /* =====================================================
       PLUS
    ===================================================== */

    plusBtn.addEventListener("click", () => {

        quantity++;

        qtyNumber.innerText = quantity;

        updateLivePrice();

    });



    /* =====================================================
       MINUS
    ===================================================== */

    minusBtn.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            qtyNumber.innerText = quantity;

            updateLivePrice();

        }

    });



    /* =====================================================
       ADD TO ORDER
    ===================================================== */

    addBtn.addEventListener("click", () => {

        const platterItems = [];



        card.querySelectorAll(
            ".platter-items li"
        )
        .forEach(item => {

            platterItems.push(

                item.innerText

            );

        });



        /* EXISTING CHECK */

        const existingPlatter =

            platterOrders.find(item =>

                item.name === platterName

            );



        if (existingPlatter) {

            existingPlatter.quantity += quantity;

            existingPlatter.total =

                existingPlatter.price *

                existingPlatter.quantity;

        }

        else {

            platterOrders.push({

                name: platterName,

                price: platterPrice,

                quantity: quantity,

                total:
                    platterPrice * quantity,

                items: platterItems

            });

        }



        savePlatters();

        updatePlatterSummary();



        /* BUTTON ANIMATION */

        addBtn.innerText =

            "✓ Added";



        addBtn.classList.add("added");



        setTimeout(() => {

            addBtn.innerText =

                "Add Platter";



            addBtn.classList.remove(
                "added"
            );

        }, 2000);

    });

});



/* =========================================================
   INIT
========================================================= */

window.addEventListener("load", () => {

    updatePlatterSummary();

});



console.log(

    "%cADVANCED PLATTER SYSTEM READY 🍗",

    "color: orange; font-size: 16px;"

);