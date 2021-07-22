

// Tá dando erro com o undefined

// Global variables
const screen = document.querySelector('.screen');
const board = document.querySelector('.grid-container');
const themeButton = document.querySelector('#theme1');
let keys1 = [];
let keys2 = [];
let operators = [];
let screenView = [];
let key = '';
let outcome = [];
let output = '';

// Creates de calculator
document.addEventListener('DOMContentLoaded', () => {

    board.innerHTML =
    `<div class="number">7</div>
        <div class="number">8</div>
        <div class="number">9</div>
        <div class="blue white" onclick="deletion()">DEL</div>
        <div class="number">4</div>
        <div class="number">5</div>
        <div class="number">6</div>
        <div class="operator">+</div>
        <div class="number">1</div>
        <div class="number">2</div>
        <div class="number">3</div>
        <div class="operator">-</div>
        <div class="number1 number2 dot">.</div>
        <div class="number">0</div>
        <div class="operator">/</div>
        <div class="operator">x</div>
        <div class="item2 blue white" onclick="reset()">RESET</div>
        <div class="item3 red white" onclick="result()">=</div>`;
});

var dotOperator = document.getElementsByClassName('dot')[0];

// Call every time a click happens
board.addEventListener('click', (e) => {

    const dotOperator = document.getElementsByClassName('dot')[0];
    key = e.target.innerHTML;
    let classe = e.target.className;
    let dot1_include = classe.includes('number1');
    let dot2_include = classe.includes('number2');

    // Inserts every outcome into keys1
    if(outcome[0]) {
        let treat = outcome[0].toString().split('');
        let numConvert = [];
        for (let i of treat) {
            if(i !== '.' && i!= '-' && i!= 'e') {
                i = Number(i);
            }
            numConvert.push(i);
        }
        let eCheck = numConvert.findIndex(res => {
            return res == 'e';
        });
        if(eCheck == -1) {
            keys1 = numConvert;
        } else {
            keys1 = [];
        }
        let dotContain = outcome[0].toString().includes('.');
        if(!dot1_include && !dotContain) {
            dotOperator.classList.add("number1");
        }
        if(!dot2_include) {
            dotOperator.classList.add("number2");
        }
        outcome = [];
    }

    // Controlling the minus operator
    if(keys1[0] == undefined) {
        if(key == '-') {
            keys1.push(key);
        }
    } 

    // Controlling input for first number
    if(!operators[0] && (classe == 'number' || dot1_include)) {
        if(dot1_include) {
            if(typeof(keys1[0]) == 'number') {
                keys1.push(key);
            } else if(typeof(keys1[1]) == 'number') {
                keys1.push(key);
            }
        } else{
            if(!keys1[1] && keys1[0] == 0) {
                if(key != '.') {
                    return
                }
            }
            keys1.push(Number(key));
        }
    }

    // Restricts only one dot for first number
    let str1 = keys1.find(res => {
        return res == '.';
    });

    if(str1 == '.') {
        let dot1 = document.getElementsByClassName('number1')[0];
        if(dot1) {
            dot1.classList.remove("number1");
        }
    }

    // Checks if array operators is already empty
    let stringCheck = operators.find(res => {
        return typeof(res) == 'string';
    });

    let opCheck = keys1.findIndex(res => {
        return typeof(res) == 'number';
    });

    let indexCheck = keys1.findIndex(res => {
        return res == '.';
    });

    // Controlling operator array
    if(opCheck != -1 && classe == 'operator' && !keys2[0] && !stringCheck) {
        if(typeof(keys1[0]) == 'number') {
            if(keys1[indexCheck + 1] != undefined) {
                operators.push(key);
            }
        } else if(typeof(keys1[1]) == 'number') {
            if(!str1) {
                operators.push(key);
            } else {
                if(keys1[indexCheck + 1] != undefined) {
                    operators.push(key);
                }
            }
        }
    }

    // Controlling input for second number
    if(stringCheck && keys2[0] == undefined) {
        if(key == '-') {
            keys2.push(key);
        }
    } 

    if(operators[0] && (classe == 'number' || dot2_include)) {
        if(dot2_include) {
            if(typeof(keys2[0]) == 'number') {
                keys2.push(key);
            } else if(typeof(keys2[1]) == 'number') {
                keys2.push(key);
            }
        } else{
            if(!keys2[1] && keys2[0] == 0) {
                if(key != '.') {
                    return
                }
            }
            keys2.push(Number(key));
        }
    }

    // Restricts only one dot for second number
    let str2 = keys2.find(res => {
        return res == '.';
    });

    if(str2 == '.') {
        let dot2 = document.getElementsByClassName('number2')[0];
        if(dot2) {
            dot2.classList.remove("number2");
        }
    }

    // Gathers all 3 arrays into one and shows in screen
    screenView = [...keys1, ...operators, ...keys2];
    screen.innerHTML = screenView.join('');

    // Controls what classes belongs to dotOperator
    if(keys1[0] == undefined) {
        screen.innerHTML = 0;
        if(!dot1_include) {
            dotOperator.classList.add("number1");
        }
        if(!dot2_include) {
            dotOperator.classList.add("number2");
        }
    }
});

// Controls delete button
function deletion() {
    const dotOperator = document.getElementsByClassName('dot')[0];
    if(keys2[0]){
        let is_dot2 = keys2.pop();
        if(is_dot2 == '.') {
            dotOperator.classList.add("number2");
        }
    } else if(keys2[0] == undefined && operators[0]) {
        operators.pop();
    } else if(keys2[0] == undefined && operators[0] == undefined && keys1.length > 0) {
        let is_dot = keys1.pop();
        if(is_dot == '.') {
            dotOperator.classList.add("number1");
        }
    }
}

// Controls RESET button
function reset() {
    keys1 = [];
    operators = [];
    keys2 = [];
    outcome = [];
    const dotOperator = document.getElementsByClassName('dot')[0];
    dotOperator.classList.add("number1");
    dotOperator.classList.add("number2");
}

// Deals with all equations on screen
function result() {

    let numCheck = keys2.findIndex(res => {
        return typeof(res) == 'number';
    });

    if(numCheck != -1){
        let dotCheck = keys2[keys2.length - 1];
        if(dotCheck != '.') {
            let num1 = Number(keys1.join(''));
            let num2 = Number(keys2.join(''));
            let operation = operators[0];

            switch(operation) {
                case '+':
                    output = num1 + num2;
                    if(output.toString().length > 6) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                case '-':
                    output = num1 - num2; 
                    if(output.toString().length > 6) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                case 'x':
                    output = num1 * num2; 
                    if(output.toString().length > 6) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                case '/':
                    output = num1 / num2;
                    if(num2 == 0) {
                        reset();
                        return
                    }   
                    if(output.toString().length > 6) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                default:
                    console.log('An error has ocorred');
            }
            keys1 = [];
            operators = [];
            keys2 = [];
        }
    }
}

// Controlling the theme
themeButton.addEventListener('click', () => {
    console.log('theme1');
});