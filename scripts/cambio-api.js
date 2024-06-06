"use strict";
const listOne = document.querySelector(".list_one");
const listTwo = document.querySelector(".list_two");
const inputAmount = document.querySelector(".input_amount");

const change = document.querySelector(".change");

const resultAmount = document.querySelector(".result_amount");
const resultBtn = document.querySelector(".result_btn");

const apiObject = {
    apiKey: "5264dec08d79ebce1f87dbf4"
};

let request, resultRequest, option, firstLoad = true, finalResult;

function createList(acronymCurrency, list){
    let option = document.createElement("OPTION");
    option.value = acronymCurrency;
    option.innerHTML = acronymCurrency;
    list.appendChild(option);
}
async function getFirstData(currencyOne, currencyTwo, amount){
    request = await fetch(`https://v6.exchangerate-api.com/v6/${apiObject.apiKey}/latest/${currencyOne}`);
    resultRequest = await request.json();

    inputAmount.value = amount;
    finalResult = amount * resultRequest.conversion_rates[currencyTwo];
    resultAmount.innerHTML = `${finalResult.toFixed(2)} ${currencyTwo}`;

    if(firstLoad){
        Object.keys(resultRequest.conversion_rates).forEach((e)=>{
            createList(e, listOne);
            createList(e, listTwo);
        });
        listTwo.value = currencyTwo;
        firstLoad = false;
    };
};

window.addEventListener("load", ()=>{
    getFirstData("USD", "BRL", "1");
});

resultBtn.addEventListener("click", ()=>{
    getFirstData(listOne.value, listTwo.value, inputAmount.value);
});

change.addEventListener("click", ()=>{
    let valueListOne = listOne.value;
    listOne.value = listTwo.value;
    listTwo.value = valueListOne;
    console.log(valueListOne, listTwo.value)
});