/* =========================================================
   FATIMA'S KITCHEN
   WHATSAPP-ORDER.JS
========================================================= */



/* =========================================================
   WHATSAPP NUMBER
========================================================= */

const restaurantWhatsApp =
    "919958792286";



/* =========================================================
   GET ORDER DATA
========================================================= */

function getMenuOrders() {

    const orders =
        localStorage.getItem("fatimaOrders");

    return orders
        ? JSON.parse(orders)
        : [];

}



function getPlatterOrders() {

    const platters =
        localStorage.getItem("fatimaPlatters");

    return platters
        ? JSON.parse(platters)
        : [];

}



/* =========================================================
   CALCULATE GRAND TOTAL
========================================================= */

function calculateGrandTotal() {

    const menuOrders =
        getMenuOrders();

    const platterOrders =
        getPlatterOrders();



    let total = 0;



    menuOrders.forEach(item => {

        total += item.total;

    });



    platterOrders.forEach(item => {

        total += item.total;

    });



    return total;

}



/* =========================================================
   DISPLAY ORDER SUMMARY
========================================================= */

function displayOrderSummary() {

    const summaryContainer =
        document.querySelector(
            ".order-summary-items"
        );



    if (!summaryContainer) return;



    const menuOrders =
        getMenuOrders();

    const platterOrders =
        getPlatterOrders();



    let html = "";



    /* =====================================================
       MENU ITEMS
    ===================================================== */

    menuOrders.forEach(item => {

        html += `

        <div class="order-item">

            <div class="order-item-info">

                <h3>${item.name}</h3>

                <p>
                    ${item.type} × ${item.quantity}
                </p>

            </div>

            <div class="order-item-price">

                ₹${item.total}

            </div>

        </div>

        `;

    });



    /* =====================================================
       PLATTER ITEMS
    ===================================================== */

    platterOrders.forEach(item => {

        html += `

        <div class="order-item">

            <div class="order-item-info">

                <h3>${item.name}</h3>

                <p>
                    Platter Qty × ${item.quantity}
                </p>

            </div>

            <div class="order-item-price">

                ₹${item.total}

            </div>

        </div>

        `;

    });



    if (
        menuOrders.length === 0 &&
        platterOrders.length === 0
    ) {

        html = `

        <div class="empty-order">

            No items added yet 🍽

        </div>

        `;

    }



    summaryContainer.innerHTML = html;



    /* =====================================================
       UPDATE TOTAL
    ===================================================== */

    const totalElement =
        document.querySelector(
            ".grand-total-price"
        );



    if (totalElement) {

        totalElement.innerText =
            "₹" + calculateGrandTotal();

    }

}



/* =========================================================
   GENERATE WHATSAPP MESSAGE
========================================================= */

function generateWhatsAppMessage() {

    const menuOrders =
        getMenuOrders();

    const platterOrders =
        getPlatterOrders();



    const tableNumber =
        document.querySelector(
            "#tableNumber"
        )?.value || "Not Provided";



    let message =
`🍽 *Fatima's Kitchen Order*

━━━━━━━━━━━━━━

🪑 Table Number: ${tableNumber}

━━━━━━━━━━━━━━

`;


    /* =====================================================
       MENU ITEMS
    ===================================================== */

    if (menuOrders.length > 0) {

        message += `🍗 *Menu Items*\n\n`;



        menuOrders.forEach(item => {

            message +=
`• ${item.name}
  ${item.type} × ${item.quantity}
  ₹${item.total}

`;

        });

    }



    /* =====================================================
       PLATTER ITEMS
    ===================================================== */

    if (platterOrders.length > 0) {

        message += `🍽 *Platters*\n\n`;



        platterOrders.forEach(item => {

            message +=
`• ${item.name}
  Qty × ${item.quantity}
  ₹${item.total}

`;

        });

    }



    /* =====================================================
       GRAND TOTAL
    ===================================================== */

    message +=
`━━━━━━━━━━━━━━

💰 *Grand Total: ₹${calculateGrandTotal()}*

Thank You For Ordering ❤️

Fatima's Kitchen
`;



    return encodeURIComponent(message);

}



/* =========================================================
   SEND WHATSAPP ORDER
========================================================= */

function sendWhatsAppOrder() {

    const total =
        calculateGrandTotal();



    if (total <= 0) {

        alert(
            "Please add items before ordering 🍽"
        );

        return;

    }



    const finalMessage =
        generateWhatsAppMessage();



    const whatsappURL =
`https://wa.me/${restaurantWhatsApp}?text=${finalMessage}`;



    window.open(
        whatsappURL,
        "_blank"
    );

}



/* =========================================================
   BUTTON EVENT
========================================================= */

const whatsappButton =
    document.querySelector(
        ".whatsapp-order-btn"
    );



if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        sendWhatsAppOrder
    );

}



/* =========================================================
   CLEAR ORDER AFTER SUCCESS
========================================================= */

function clearAllOrders() {

    localStorage.removeItem(
        "fatimaOrders"
    );

    localStorage.removeItem(
        "fatimaPlatters"
    );

}



/* =========================================================
   AUTO LOAD SUMMARY
========================================================= */

displayOrderSummary();



/* =========================================================
   DEBUG CONSOLE
========================================================= */

console.log(

    "%cWHATSAPP ORDER SYSTEM READY 📲",

    "color: cyan; font-size: 16px;"

);



/* =========================================================
   END OF WHATSAPP-ORDER.JS
========================================================= */