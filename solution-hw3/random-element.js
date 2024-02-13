let glazingOptions = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double Chocolate": 1.5,
};

let packSizeOptions = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};

let glazingDropdown = document.querySelector('#glaze');
let packSizeDropdown = document.querySelector('#quantity');
let price = document.querySelector("#priceDisplay");
let selectedQuantity = packSizeDropdown.value;
let selectedGlazing = glazingDropdown.value;

function onDropDownChange() {
    selectedQuantity = packSizeDropdown.value;
    selectedGlazing = glazingDropdown.value;
    calculatePrice();
}

function calculatePrice (){
    const glazingPrice = glazingOptions[selectedGlazing];
    const packPrice = packSizeOptions[selectedQuantity];
    const basePrice = 2.49;
    finalPrice = (basePrice + glazingPrice) * packPrice;
    price.textContent = `Price: $${finalPrice.toFixed(2)}`;
}

glazingDropdown.addEventListener("change", onDropDownChange);
packSizeDropdown.addEventListener("change", onDropDownChange);
calculatePrice();