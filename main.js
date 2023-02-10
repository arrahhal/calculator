const operators = document.querySelectorAll('.opr:not([value="="])');
const numbers = document.querySelectorAll('.num')
const clearBtn = document.querySelector('.clr')
const operationScreen = document.querySelector('.operation-screen');
const inputScreen = document.querySelector('.input-screen');
const comma = document.querySelector('.comma')
const equalsBtn = document.querySelector('.opr[value="="]');
const deleteBtn = document.querySelector('.delete')

let firstNum = 0;
let secondNum = 0;
let result = 0;
let currentOperator = "";
let firstNumReceived = false; // turn true after opration occur

clearBtn.addEventListener('click', clearScreen);
function clearScreen(){
    inputScreen.textContent = "";
    operationScreen.textContent = "";
    firstNumReceived = false;
}

operators.forEach(opr => opr.addEventListener('click', ()=>{
    const value = opr.getAttribute('value');
    setOperator(value);
    getNumFromScreen();
    clearInputScreen();
    addToOperationScreen(value);
    firstNumReceived = true;
}));

function getNumFromScreen(){
    if(!firstNumReceived){
        firstNum = parseFloat(inputScreen.textContent);
    }
    else
        secondNum = parseFloat(inputScreen.textContent);
}

function addToOperationScreen(opr){
    if(opr === "=")
        operationScreen.textContent += `${secondNum} = `;
    else
        operationScreen.textContent += `${firstNum} ${currentOperator} `;
}

function clearInputScreen(){
    inputScreen.textContent = '';
}

function setOperator(newOpr){
    currentOperator = newOpr;
}

numbers.forEach(num => num.addEventListener('click', ()=>{
    const value = num.getAttribute('value')
    addToInputPane(value);
}))

function addToInputPane(newValue){
    if(inputScreen.textContent.length <= 7)
        inputScreen.textContent += newValue;
    else
        inputScreen.textContent = "out of range"
}


equalsBtn.addEventListener('click', ()=>{
    getNumFromScreen();
    calcResult();
    addToOperationScreen(equalsBtn.getAttribute('value'));
    addToInputPane(result);
    firstNum = result;
})

function calcResult(){
    switch(currentOperator){
        case '+': result = sum(firstNum, secondNum);
            break;
        case '-': result =  substract(firstNum, secondNum);
            break;
        case '*': result = muliply(firstNum, secondNum);
            break;
        case '/': result = divide(firstNum, secondNum);
            break;
        default: inputScreen = 'ERROR!';
    }
}

function sum(a, b){
    return a + b;
}
function substract(a, b){
    return a - b;
}
function muliply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}