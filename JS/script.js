function purchase() {
    const priceList = [25.50, 37.75, 49.95, 24.89];
    const itemList = [`chair`, `recliner`, `table`, `umbrella`];
    stateList = [{ name: "al", zone: 3 }, { name: "ak", zone: 5 }, { name: "hi", zone: 5 }, { name: "az", zone: 5 }, { name: "ar", zone: 4 }, { name: "ca", zone: 4 }, { name: "ak", zone: 5 }, { name: "co", zone: 4 }, { name: "ct", zone: 1 }, { name: "de", zone: 5 }, { name: "dc", zone: 1 }, { name: "fl", zone: 3 }, { name: "ga", zone: 3 }, { name: "id", zone: 5 }, { name: "il", zone: 3 }, { name: "in", zone: 2 }, { name: "ia", zone: 3 }, { name: "ks", zone: 3 }, { name: "ky", zone: 2 }, { name: "la", zone: 4 }, { name: "me", zone: 1 }, { name: "md", zone: 1 }, { name: "ma", zone: 1 }, { name: "mi", zone: 3 }, { name: "mn", zone: 3 }, { name: "ms", zone: 4 }, { name: "mo", zone: 3 }, { name: "mt", zone: 5 }, { name: "ne", zone: 4 }, { name: "nv", zone: 5 }, { name: "nh", zone: 1 }, { name: "nj", zone: 1 }, { name: "nm", zone: 5 }, { name: "ny", zone: 1 }, { name: "nc", zone: 2 }, { name: "nd", zone: 4 }, { name: "oh", zone: 2 }, { name: "ok", zone: 4 }, { name: "or", zone: 5 }, { name: "pa", zone: 2 }, { name: "pr", zone: 5 }, { name: "ri", zone: 1 }, { name: "sc", zone: 4 }, { name: "sd", zone: 4 }, { name: "tn", zone: 3 }, { name: "tx", zone: 5 }, { name: "ut", zone: 5 }, { name: "vt", zone: 1 }, { name: "va", zone: 2 }, { name: "vi", zone: 5 }, { name: "wa", zone: 5 }, { name: "wv", zone: 2 }, { name: "wi", zone: 3 }, { name: "wy", zone: 5 }];

    let shippingCost
    let itemName
    let stateSelect
    let isShopping = true;
    
    shoppingCart = [];

    function quantCheck(itemQuerry) {
        let quantity = parseInt(prompt(`How many ${itemQuerry}s would you like to buy?`));
        if (isNaN(quantity)) {
            alert(`Please enter a number!`)
            quantity = quantCheck(itemQuerry)
        }
        return quantity;
    }

    function stateCheck() {
        let stateQuerry = prompt(`Please enter two letter state abbreviation.`);
        stateQuerry = stateQuerry.toLowerCase()

        let onListState = false;
        for (i = 0; i < stateList.length; i++) {
            if (stateList[i].name == stateQuerry) {
                stateSelect = stateList[i]
                console.log(stateSelect);
                onListState = true;
            }
        }
        if (!onListState) {
            alert(`Please enter a 2 letter state code.`)
            stateSelect = stateCheck()
        }
        return stateSelect;

    }

    while (isShopping == true) {

        let itemQuerry = prompt(`What item would you like to buy today: Chair, Recliner, Table, or Umbrella?`);
        itemQuerry = itemQuerry.toLowerCase()

        let onList = false;
        for (i = 0; i < itemList.length; i++) {
            let thisitem = itemList[i]
            let thisprice = priceList[i]
            if (thisitem == itemQuerry) {
                itemObject = { name: thisitem, price: thisprice, quantity: 1}
                shoppingCart.push(itemObject)
                onList = true
            }
        }

        if (onList == false) {
            alert(`Could not find item.`)
            continue;
        }

        itemObject.quantity = quantCheck(itemQuerry)

        let shopping = prompt(`Continue shopping? y/n`);
        shopping = shopping.toLowerCase()
        if (shopping == `yes` || shopping == `y`) {
            continue;
        }
        else {
            stateCheck()
            isShopping = false;
        }
    }

    


    switch (stateSelect.zone) {
        case 1:
            shippingCost = 0
            break;
        case 2:
            shippingCost = 20.00
            break;
        case 3:
            shippingCost = 30.00
            break;
        case 4:
            shippingCost = 35.00
            break;
        case 5:
            shippingCost = 45.00
            break;
    }

    let invoiceTotal = 0;
    let itemTax = 0;
    let Subtotal = 0;
    let itemTotal = 0;
    let itemString = '<tr class="Cart"><td>Item</td><td>Quantity</td><td>Unit Price</td> <td>Price</td></tr>'
    for (i = 0; i < shoppingCart.length; i++) {
        let cartItem = shoppingCart[i]
        let cartItemQuantity = cartItem.quantity
        let unitPrice = cartItem.price

        itemString += `<tr><td>${cartItem.name}</td> <td>${cartItem.quantity}</td>    <td>${cartItem.price.toFixed(2)}</td>    <td>${(cartItem.price * cartItem.quantity).toFixed(2)}</td></tr>`
        itemTotal += (cartItem.price * cartItem.quantity)
    }

    document.getElementById("invoiceList").style.visibility = "visible";

    Subtotal = (itemTotal + shippingCost)
    itemTax = (Math.floor(((Subtotal * .15)*100))/100)
    invoiceTotal = (Subtotal + itemTax)


    document.getElementById("shoppingCart").innerHTML = `${itemString}`;
    document.getElementById("itemTotal").innerHTML = `${itemTotal.toFixed(2)}`;
    document.getElementById("invoiceHeaderState").innerHTML = `Shipping to ${stateSelect.name}`;
    document.getElementById("stateSelect").innerHTML = `$${shippingCost.toFixed(2)}`;
    document.getElementById("Subtotal").innerHTML = `${Subtotal.toFixed(2)}`;
    document.getElementById("Tax").innerHTML = `${itemTax}`;
    document.getElementById("invoiceTotal").innerHTML = `${invoiceTotal.toFixed(2)}`;
    document.getElementById("Abutton").innerHTML = `<button type="button" id="purchase()" onclick="purchase()">Shop Again</button>`;

}

    //instrument = ["Flute", "Tuba"];
    //cleff = ["Treble Cleff", "Bass Cleff"];
    //for (index = 0; index < itemList.length; index++) {
        //listItem += "<li>" + instrument[index] + ": " + cleff[index] + "</li>";
    //}


    
