// Selectors for the Billing Address section
export const fullName = 'input[name="firstname"]';
export const emailInput = 'input[name="email"]';
export const addressInput = 'input[name="address"]';
export const cityInput = 'input[name="city"]';
export const stateInput = 'input[name="state"]';
export const zipInput = 'input[name="zip"]';

// Selectors for the Payment section
export const cardNameInput = 'input[name="cardname"]';
export const cardNumberInput = 'input[name="cardnumber"]';
export const expiryInput = 'select[name="expmonth"]';
export const expireYearInput = 'input[id="expyear"]';
export const cvvInput = 'input[name="cvv"]';

// Selector for the checkout 
export const sameAsBillingCheckbox = 'input[name="sameadr"]';
export const submitOrderButton = 'button[class="btn"]';
export const orderConfirmationNumber = 'p[data-id="ordernumber"]';

// Selector for the cart items and total
export const cartItemPrices = '//span[not(contains(@style, "color:black"))]';
export const cartTotal = '(//span[@style="color:black"])[2]';