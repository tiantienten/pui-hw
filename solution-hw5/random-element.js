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
        this.element = null;
        this.image = rolls[this.type]["imageFile"];
    }
}

const cart = new set();


function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    // Create a new notecard object. The Notecard constructor takes three
    // arguments: the image URL, title text,  and body text.
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
  
    // Add the notecard object to our notecard Set, which keeps track of all
    // the notecards in our application.
    cart.add(roll);
  
    return cart;
  }
  
  function createElement(roll) {
    // make a clone of the notecard template
    const template = document.querySelector('#productBoxTemplate');
    const clone = template.content.cloneNode(true);
    
    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    roll.element = clone.querySelector('.roll');
  
    const btnDelete = roll.element.querySelector('.remove');
    console.log(btnDelete);
    btnDelete.addEventListener('click', () => {
      deleteRoll(roll);
    });
    
    // add the notecard clone to the DOM
    // find the notecard parent (#notecard-list) and add our notecard as its child
    const rollListElement = document.querySelector('.checkOutBox');
    rollListElement.prepend(roll.element);
    
    // populate the notecard clone with the actual notecard content
    updateElement(roll);
  }
  function updateElement(roll) {
    // get the HTML elements that need updating
    const rollTypeElement = roll.element.querySelector('.productName');
    const rollGlazingElement = roll.element.querySelector('.glazing');
    const packSizeElement = roll.element.querySelector('.quantity');
    const priceElement = roll.element.querySelector('.cost');
    const imageElement = roll.element.querySelector('.shoppingCartImg')
    
    // copy our notecard content over to the corresponding HTML elements
    rollTypeElement.innerText = roll.type;
    rollGlazingElement.innerText = roll.glazing;
    packSizeElement.innerText = roll.size;
    priceElement = (roll.basePrice + glazingOptions[roll.glazing]) * packSizeOptions[roll.size]
    imageElement.src = roll.image;
  }
  
  function deleteRoll(roll) {
    // remove the notecard DOM object from the UI
    roll.element.remove();
    // remove the actual Notecard object from our set of notecards
    cart.delete(roll);
  }
  


function addToCart(){
    let myRoll = new Roll(rollType, selectedGlazing, selectedQuantity, Price);
    cart.push(myRoll);
    console.log(cart);
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
////



calculatePrice();

