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

const cart = [];
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const Price = rolls[rollType]["basePrice"];
const ImageFile = rolls[rollType]["imageFile"];
const title = document.querySelector('.title');
title.textContent = rollType + " Cinnamon Roll";
const productImg = document.querySelector(".productImg");
productImg.src = "../assets/products/" + ImageFile;

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


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
    const basePrice = Price;
    finalPrice = (basePrice + glazingPrice) * packPrice;
    price.textContent = `Price: $${finalPrice.toFixed(2)}`;
}

glazingDropdown.addEventListener("change", onDropDownChange);
packSizeDropdown.addEventListener("change", onDropDownChange);


function addToCart(){
    let myRoll = new Roll(rollType, selectedGlazing, selectedQuantity, Price);
    cart.push(myRoll);
    console.log(cart);
}

calculatePrice();

