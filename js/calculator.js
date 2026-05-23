/* =========================================================
   FATIMA'S KITCHEN
   CALCULATOR.JS
========================================================= */



/* =========================================================
   GST & SERVICE SETTINGS
========================================================= */

const GST_PERCENTAGE = 0;

const SERVICE_CHARGE = 0;

const DELIVERY_CHARGE = 0;



/* =========================================================
   GET MENU ORDERS
========================================================= */

function getCalculatorMenuOrders() {

    const data =
        localStorage.getItem("fatimaOrders");

    return data
        ? JSON.parse(data)
        : [];

}



/* =========================================================
   GET PLATTER ORDERS
========================================================= */

function getCalculatorPlatterOrders() {

    const data =
        localStorage.getItem("fatimaPlatters");

    return data
        ? JSON.parse(data)
        : [];

}



/* =========================================================
   CALCULATE SUBTOTAL
========================================================= */

function calculateSubtotal() {

    const menuOrders =
        getCalculatorMenuOrders();

    const platterOrders =
        getCalculatorPlatterOrders();



    let subtotal = 0;



    menuOrders.forEach(item => {

        subtotal += item.total;

    });



    platterOrders.forEach(item => {

        subtotal += item.total;

    });



    return subtotal;

}



/* =========================================================
   GST CALCULATION
========================================================= */

function calculateGST(subtotal) {

    return (
        subtotal * GST_PERCENTAGE
    ) / 100;

}



/* =========================================================
   FINAL TOTAL
========================================================= */

function calculateFinalTotal() {

    const subtotal =
        calculateSubtotal();

    const gst =
        calculateGST(subtotal);



    const finalTotal =
        subtotal +
        gst +
        SERVICE_CHARGE +
        DELIVERY_CHARGE;



    return finalTotal;

}



/* =========================================================
   UPDATE BILL UI
========================================================= */

function updateBillUI() {

    const subtotalElement =
        document.querySelector(
            ".subtotal-price"
        );



    const gstElement =
        document.querySelector(
            ".gst-price"
        );



    const serviceElement =
        document.querySelector(
            ".service-price"
        );



    const deliveryElement =
        document.querySelector(
            ".delivery-price"
        );



    const finalTotalElement =
        document.querySelector(
            ".final-total-price"
        );



    const subtotal =
        calculateSubtotal();

    const gst =
        calculateGST(subtotal);

    const finalTotal =
        calculateFinalTotal();



    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" + subtotal;

    }



    if (gstElement) {

        gstElement.innerText =
            "₹" + gst;

    }



    if (serviceElement) {

        serviceElement.innerText =
            "₹" + SERVICE_CHARGE;

    }



    if (deliveryElement) {

        deliveryElement.innerText =
            "₹" + DELIVERY_CHARGE;

    }



    if (finalTotalElement) {

        finalTotalElement.innerText =
            "₹" + finalTotal;

    }

}



/* =========================================================
   LIVE UPDATE EVERY SECOND
========================================================= */

setInterval(() => {

    updateBillUI();

}, 1000);



/* =========================================================
   CLEAR BILL SYSTEM
========================================================= */

function resetCompleteBill() {

    localStorage.removeItem(
        "fatimaOrders"
    );

    localStorage.removeItem(
        "fatimaPlatters"
    );



    updateBillUI();

}



/* =========================================================
   APPLY DISCOUNT
========================================================= */

function applyDiscount(code) {

    let subtotal =
        calculateSubtotal();



    if (code === "FATIMA10") {

        subtotal =
            subtotal - (subtotal * 0.10);

    }



    return subtotal;

}



/* =========================================================
   FUTURE COUPON SYSTEM READY
========================================================= */

console.log(

    "%cCoupon System Ready 🎁",

    "color: pink; font-size: 15px;"

);



/* =========================================================
   PRICE FORMATTER
========================================================= */

function formatPrice(price) {

    return "₹" + price.toLocaleString();

}



/* =========================================================
   BILL EXPORT SYSTEM READY
========================================================= */

function exportBillData() {

    return {

        subtotal:
            calculateSubtotal(),

        finalTotal:
            calculateFinalTotal(),

        orders:
            getCalculatorMenuOrders(),

        platters:
            getCalculatorPlatterOrders()

    };

}



/* =========================================================
   AUTO INIT
========================================================= */

updateBillUI();



/* =========================================================
   DEBUG CONSOLE
========================================================= */

console.log(

    "%cCALCULATOR SYSTEM READY 🧮",

    "color: yellow; font-size: 16px;"

);



/* =========================================================
   END OF CALCULATOR.JS
========================================================= */