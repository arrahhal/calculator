const operators = document.querySelectorAll('.opr:not([value="="])');
const numbers = document.querySelectorAll('.num')
const clearBtn = document.querySelector('.clr')
const operationScreen = document.querySelector('.operation-screen');
const inputScreen = document.querySelector('.input-screen');
const comma = document.querySelector('.comma')
const equalsBtn = document.querySelector('.opr[value="="]');
const deleteBtn = document.querySelector('.delete')

let firstOperand = "";
let secondOperand = "";
let result = "";
let currentOperator = null;

clearBtn.addEventListener('click', clearScreen);
function clearScreen(){
    inputScreen.textContent = "";
    operationScreen.textContent = "";
}

operators.forEach(opr => opr.addEventListener('click',() => setOperator(opr.textContent)));

function getInputNum(){
    return parseFloat(inputScreen.textContent);
}

function setOperator(newOpr){
    if(newOpr === "÷") currentOperator = "/";
    else if(newOpr === "×") currentOperator = "*";
    else currentOperator = newOpr;
        firstOperand = getInputNum();
        inputScreen.textContent = "";
        operationScreen.textContent += `${firstOperand} ${currentOperator}`
}

numbers.forEach(num => num.addEventListener('click', () => addToInputPane(num.textContent)))

function addToInputPane(newValue){
    if(inputScreen.textContent.length <= 7)
        inputScreen.textContent += newValue;
    else
        inputScreen.textContent = "out of range"
}

equalsBtn.addEventListener('click', evaluate);

function evaluate(){
    if(inputScreen.textContent === "" || currentOperator === null) return;
    secondOperand = getInputNum();
    result = calcResult();
    operationScreen.textContent += ` ${secondOperand} = `;
    inputScreen.textContent = result;
}

function calcResult(){
    if(currentOperator === "/" && secondOperand === 0){
        alert("You can not divide by 0");
        return;
    }
    switch(currentOperator){
        case '+': return firstOperand + secondOperand;

        case '-': return firstOperand - secondOperand;

        case '*': return firstOperand * secondOperand;

        case '/': return firstOperand / secondOperand;

        default: inputScreen = 'ERROR!';
    }
}

deleteBtn.addEventListener('click',handleDeleteBtn);

function handleDeleteBtn(){
    inputScreen.textContent = inputScreen.textContent.slice(0 ,-1);
}

comma.addEventListener('click', addPoint)

function addPoint(){
    const checkPoint = inputScreen.textContent.includes(".");
    if(checkPoint) return;
    inputScreen.textContent += ".";
}