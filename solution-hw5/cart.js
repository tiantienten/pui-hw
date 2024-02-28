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

const cart = new Set();

function calculateTotalPrice() {
    let totalPrice = 0;

    // Iterate through each roll in the cart
    cart.forEach(roll => {
        // Calculate the price of the current roll
        // Note: Ensure that `glazingOptions[roll.glazing]` and `packSizeOptions[roll.size]` are numbers.
        const price = (roll.basePrice + glazingOptions[roll.glazing]) * packSizeOptions[roll.size];
        
        // Add the price of the current roll to the total price
        totalPrice += price;
    });

    // Return the total price, rounded to 2 decimal places
    return totalPrice.toFixed(2);

}function updateTotalPriceDisplay() {
    const totalPrice = calculateTotalPrice();
    // Assuming you have an element with an ID of 'total-price' to display the total price
    document.querySelector('.total').innerText = "$ " + totalPrice;
}
function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
    // Create a new notecard object. The Notecard constructor takes three
    // arguments: the image URL, title text,  and body text.
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
  
    // Add the notecard object to our notecard Set, which keeps track of all
    // the notecards in our application.
    cart.add(roll);
    updateTotalPriceDisplay()
    return cart;
  }
  
  function createElement(roll) {
    // make a clone of the notecard template
    const template = document.querySelector('#productBoxTemplate');
    const clone = template.content.cloneNode(true);
    
    // connect this clone to our notecard.element
    // from this point we only need to refer to notecard.element
    roll.element = clone.querySelector('.rollBox');
  
    const btnDelete = roll.element.querySelector('.removeBut');
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
    rollTypeElement.innerText = roll.type + " Cinnamon Roll";
    rollGlazingElement.innerText = "Glazing: " + roll.glazing;
    packSizeElement.innerText = "Pack Size: " + roll.size;
    itemPrice = ((roll.basePrice + glazingOptions[roll.glazing]) * packSizeOptions[roll.size]).toFixed(2)
    priceElement.innerText = "$ " + itemPrice
    imageElement.src = "../assets/products/" + roll.image;
  }
  
  function deleteRoll(roll) {
    // remove the notecard DOM object from the UI
    roll.element.remove();
    // remove the actual Notecard object from our set of notecards
    cart.delete(roll);
    updateTotalPriceDisplay()
  }


const roll1 = addNewRoll('Original', 'Sugar Milk', 1, rolls["Original"]["basePrice"]);
const roll2 = addNewRoll('Walnut', 'Vanilla Milk', 12, rolls["Walnut"]["basePrice"]);
const roll3 = addNewRoll('Raisin', 'Sugar Milk', 3, rolls["Raisin"]["basePrice"]);
const roll4 = addNewRoll('Apple', 'Keep Original', 3, rolls["Apple"]["basePrice"]);

for (const roll of cart) {
    console.log(roll);
    createElement(roll);
    updateTotalPriceDisplay()
  }