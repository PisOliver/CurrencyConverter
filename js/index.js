var currencies = [];

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}  

function fetchingData() {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json").then((response) => response.json()).then((data) => {
        currencies = data;
        uploadingCurrencyList();
});
}

function uploadingCurrencyList() {
    let currencyList = document.getElementById("currencylist");
    let keys = Object.keys(currencies);
    let values = Object.values(currencies);
    for (let i = 0; i < keys.length; i++) {
        var option = document.createElement("option");
        option.value = values[i];
        currencyList.appendChild(option);
    }
}

function convertCurrency() {
    let fromCurrencyvalue = document.getElementById("fromcurrency").value;
    let toCurrencyvalue = document.getElementById("tocurrency").value;
    let fromCurrency = getKeyByValue(currencies, fromCurrencyvalue);
    let toCurrency = getKeyByValue(currencies, toCurrencyvalue);
    console.log(fromCurrency);
    console.log(toCurrency);
    let amount = document.getElementById("amount").value;
    let result = document.getElementById("result");
    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'+ fromCurrency + '/'+ toCurrency +'.json').then((response) => response.json()).then((data) => {
        let rate = data[toCurrency];
        let convertedAmount = amount * rate;
        result.innerHTML = convertedAmount;
    });
}

window.onloadstart = fetchingData();