let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let del = document.querySelector(".del");
let screen = document.querySelector(".screen")
let equalSign = document.querySelector(".equalSign");
let topScreen = document.querySelector(".topScreen")

let currentActions = '';
let operation = undefined;
let privousAction = '';


let outcome = () => {
    let act;

    if (!privousAction || !currentActions) {
        return
    }
    let privous = parseFloat(privousAction);
    let current = parseFloat(currentActions);

    switch (operation) {
        case '+':
            result = privous + current;

            break;

        case '-':
            result = privous - current;

            break;
        case 'X':
            result = privous * current;

            break;
        case '/':
            result = privous / current;

            break;
        case '%':
            result = privous / 100 + current;

            break;

        default:
            return;
    }

    currentActions = result;
    operation = undefined;
    privousAction = "";
}

let algebraicOperation = (operator) => {
    if (currentActions === "") {
        return
    }

    if (privousAction !== "") {
        count();
    }
    operation = operator;
    privousAction = currentActions;
    currentActions = "";
}

let count = () => {
    screen.innerText = currentActions;
}

let addNumber = (number) => {
    if (number === ".") {
        if (currentActions.includes(".")) {
            return
        }
    }
    currentActions = currentActions.toString() + number.toString();
}

let clean = () => {
    currentActions = '';
    operation = undefined;
    privousAction = '';
}

numbers.forEach((number) => {

    number.addEventListener('click', () => {
        addNumber(number.innerText);
        count();
    });
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        algebraicOperation(operator.innerText);
        count();
    })
});

equalSign.addEventListener('click', () => {
    outcome();
    count();
})

del.addEventListener('click', () => {
    clean();
    count();
})