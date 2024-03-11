var glazingOptions = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double Chocolate": 1.5,
};

var packSizeOptions = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
      this.element = null;
      this.image = rolls[this.type]["imageFile"];
  }
}
////////////////////////////////////////////
const cart = new Set();

function calculateTotalPrice() {
    let totalPrice = 0;

    // Iterate through each roll in the cart
    cart.forEach(roll => {
        // Calculate the price of the current roll
        const price = (roll.basePrice + glazingOptions[roll.glazing]) * packSizeOptions[roll.size];
        
        // Add the price of the current roll to the total price
        totalPrice += price;
    });

    // Return the total price, rounded to 2 decimal places
    return totalPrice.toFixed(2);

}

//////////////////////////////////////////////////////////////
  

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const Price = rolls[rollType]["basePrice"];
const ImageFile = rolls[rollType]["imageFile"];
const title = document.querySelector('.title');
title.textContent = rollType + " Cinnamon Roll";
const productImg = document.querySelector(".productImg");
productImg.src = "../assets/products/" + ImageFile;

function addToCart(){
  let myRoll = new Roll(rollType, selectedGlazing, selectedQuantity, Price);
  cart.add(myRoll);
  console.log(cart);
  saveToLocalStorage();
  updateBadge();
}

//Product Detail page price calculating//
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



calculatePrice();
/////////////////////////////////////////////////

function saveToLocalStorage() {
  const rollArray = Array.from(cart);
  console.log(rollArray);
  
  const rollArrayString = JSON.stringify(rollArray);
  console.log(rollArrayString);

  localStorage.setItem('storedRolls', rollArrayString);
}

function loadFromLocalStorage() {
  const rollArrayString = localStorage.getItem('storedRolls');
  if (rollArrayString) {
      const rollArray = JSON.parse(rollArrayString);
      rollArray.forEach(rollData => {
          const roll = new Roll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
          cart.add(roll);
      });
      updateBadge();
  }
  updateBadge();
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  updateBadge();
  // Any other initialization code can go here
});


function updateBadge(){
  const badge = document.querySelector(".badge");
  badge.textContent = cart.size;
}