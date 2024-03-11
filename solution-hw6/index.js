const cart = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}
rollArray = JSON.parse(localStorage.getItem('storedRolls'));
rollArray.forEach(rollData => {
    const roll = new Roll(rollData.type, rollData.glazing, rollData.size, rollData.basePrice);
    cart.add(roll);
});
updateBadge();
function updateBadge(){
    const badge = document.querySelector(".badge");
    badge.textContent = cart.size;
  }

