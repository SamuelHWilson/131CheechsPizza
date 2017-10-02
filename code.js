var items = ["Cheese Pizza", "Peperoni Pizza"];
var prices = [7.95, 8.95];
var summaryShown = false;
var TAX_RATE = 0.076;

window.addEventListener("load", SetupForm, false);

//Order functions
function PlaceOrder() {
	DisplayContact();
	DisplayItems();
	DisplayBill();
	
	if (!summaryShown) {
		ShowSummary();
		summaryShown = true;
	}
}

function DisplayContact() {
	contactName = document.getElementById("order-form-name");
	contactPhone = document.getElementById("order-form-phone");
	summaryContact = document.getElementById("summary-contact");
	
	summaryContact.innerHTML = contactName.value + " @ " + contactPhone.value;
}

function DisplayItems() {
	orderItem = items[document.getElementById("order-form-item").selectedIndex];
	orderItemPrice = prices[document.getElementById("order-form-item").selectedIndex];
	orderQuantity = document.getElementById("order-form-quantity").value;
	summaryItems = document.getElementById("summary-items");
	
	summaryItems.innerHTML = "$" + orderItemPrice + " " + orderItem + " (x" + orderQuantity + ")";
}

function DisplayBill() {
	orderItemPrice = prices[document.getElementById("order-form-item").selectedIndex];
	orderQuantity = document.getElementById("order-form-quantity").value;
	billHolder = document.getElementById("summary-bill-holder");
	
	subTotal = SmartRound((orderItemPrice * orderQuantity), 2);
	tax = SmartRound(subTotal * TAX_RATE, 2);
	
	billHolder.innerHTML = "";
	billHolder.innerHTML += "<p><strong>Sub Total:</strong> $" + subTotal + "<\p>";
	billHolder.innerHTML += "<p><strong>Tax:</strong> $" + tax + "<\p>";
	billHolder.innerHTML += "<p><strong>Total:</strong> $" + (subTotal + tax) + "</p>";
}

function ShowSummary() {
	summaryHiderHeader = document.getElementById("summary-hider-header");
	summaryHider = document.getElementById("summary-hider");
	
	summaryHiderHeader.style.display = "none";
	summaryHider.style.display = "block";
}

//Setup functions
function SetupForm() {
	LoadItems();
	LoadQuantity();
	
	document.getElementById("order-form-order").addEventListener("click", PlaceOrder, false);
}

function LoadItems() {
	selectControl = document.getElementById("order-form-item");
	
	for (i = 0; i < items.length; i++) {
		newOption = document.createElement("option");
		newOption.text = "$" + prices[i] + " " + items[i];
		
		selectControl.add(newOption);
	}
}

function LoadQuantity() {
	quantityControl = document.getElementById("order-form-quantity");

	for (i = 1; i < 11; i++) {
		newOption = document.createElement("option");
		newOption.text = i;
		
		quantityControl.add(newOption);
	}
}

//Util
function SmartRound(num, places) {
	place = Math.pow(10, places);
	return Math.round(num * place) / place;
}