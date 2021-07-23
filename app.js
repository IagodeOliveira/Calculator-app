

// Tá dando erro com o undefined
//olhar o moz-
//tentar fazer o metodo vma sei la
// falta fazer o desafio


// Global variables
const screen = document.querySelector('.screen');
const board = document.querySelector('.grid-container');
const themeButton = document.querySelector('input');
const r = document.querySelector(':root');
const toppper = document.querySelector('.top');
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

    // Limits size of keys1
    if(keys1.length > 9 && operators.length == 0) {
        keys1.pop();
    }

    // Limits size of keys2
    if(keys2.length > 9) {
        keys2.pop();
    }

    // Moving screen to the latest number tapped
    if(screen.scrollWidth > 220) {
        screen.scrollLeft = screen.scrollWidth;
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

    let keys1_comma = hasComma(keys1);
    let keys2_comma = hasComma(keys2);

    // Gathers all 3 arrays into one and shows in screen
    if(keys1_comma && keys2_comma) {
        screenView = [...keys1_comma, ...operators, ...keys2_comma];
    } else if(keys1_comma && !keys2_comma) {
        screenView = [...keys1_comma, ...operators, ...keys2];
    } else if(!keys1_comma && keys2_comma) {
        screenView = [...keys1, ...operators, ...keys2_comma];
    } else {
        screenView = [...keys1, ...operators, ...keys2];
    }
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

// Including commas if number is longer than 3 digits
function hasComma(array) {
    if(!array.includes('.') && !array.includes('-')) {
        if(array.length > 3) {
            return [Number(array.join('')).toLocaleString('en')];
        }
    }
    if(array.includes('-')) {
        if(array.length > 4) {
            return [Number(array.join('')).toLocaleString('en')];
        }
    }
}

// Controls delete button
function deletion() {
    const dotOperator = document.getElementsByClassName('dot')[0];
    if(keys2.length > 0){
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
                    if(output.toString().length > 16) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                case '-':
                    output = num1 - num2; 
                    if(output.toString().length > 16) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    break;
                case 'x':
                    output = num1 * num2; 
                    if(output.toString().length > 16) {
                        outcome = [output.toPrecision(3)];
                    } else {
                        outcome = [output];
                    }
                    console.log(output);
                    break;
                case '/':
                    output = num1 / num2;
                    if(num2 == 0) {
                        reset();
                        return
                    }   
                    if(output.toString().length > 16) {
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
    const equal = document.getElementsByClassName('item3')[0];;

    if(themeButton.className == 'theme1') {
        themeButton.className = '';
        themeButton.classList.add('theme2');

        r.style.setProperty('--bodyBack', 'hsl(0, 0%, 90%)');
        r.style.setProperty('--bodyColor', 'hsl(60, 10%, 19%)');
        r.style.setProperty('--ingriBack', 'hsl(0, 5%, 81%)');
        r.style.setProperty('--inpredBack', 'hsl(25, 98%, 40%)');
        r.style.setProperty('--screenBack', 'hsl(0, 0%, 93%)');
        r.style.setProperty('--grivBack', 'hsl(45, 7%, 89%)');
        r.style.setProperty('--whiteColor', 'hsl(0, 0%, 100%)');
        r.style.setProperty('--blueColor', 'hsl(185, 42%, 37%)');
        r.style.setProperty('--redShadow', 'hsl(25, 99%, 27%)');
        r.style.setProperty('--blueShadow', 'hsl(185, 58%, 25%)');
        r.style.setProperty('--gShadow', 'hsl(35, 11%, 61%)');

        toppper.classList.remove('white');
        toppper.classList.add('common');

        screen.classList.remove('white');
        screen.classList.add('common');

    } else if(themeButton.className == 'theme2') {
        themeButton.className = '';
        themeButton.classList.add('theme3');

        r.style.setProperty('--bodyBack', 'hsl(268, 75%, 9%)');
        r.style.setProperty('--bodyColor', 'hsl(52, 100%, 62%)');
        r.style.setProperty('--ingriBack', 'hsl(268, 71%, 12%)');
        r.style.setProperty('--inpredBack', 'hsl(176, 100%, 44%)');
        r.style.setProperty('--screenBack', 'hsl(268, 71%, 12%)');
        r.style.setProperty('--grivBack', 'hsl(268, 47%, 21%)');
        r.style.setProperty('--whiteColor', 'hsl(0, 0%, 100%)');
        r.style.setProperty('--blueColor', 'hsl(281, 89%, 26%)');
        r.style.setProperty('--redShadow', 'hsl(177, 92%, 70%)');
        r.style.setProperty('--blueShadow', 'hsl(285, 91%, 52%)');
        r.style.setProperty('--gShadow', 'hsl(290, 70%, 36%)');

        equal.classList.remove('white');
        equal.style.color = 'hsl(198, 20%, 13%)' ;

    } else {
        themeButton.className = '';
        themeButton.classList.add('theme1');

        r.style.setProperty('--bodyBack', 'hsl(222, 26%, 31%)');
        r.style.setProperty('--bodyColor', 'hsl(221, 14%, 31%)');
        r.style.setProperty('--ingriBack', 'hsl(223, 31%, 20%)');
        r.style.setProperty('--inpredBack', 'hsl(6, 63%, 50%)');
        r.style.setProperty('--screenBack', 'hsl(224, 36%, 15%)');
        r.style.setProperty('--grivBack', 'hsl(30, 25%, 89%)');
        r.style.setProperty('--whiteColor', 'hsl(0, 0%, 100%)');
        r.style.setProperty('--blueColor', 'hsl(225, 21%, 49%)');
        r.style.setProperty('--redShadow', 'hsl(6, 70%, 34%)');
        r.style.setProperty('--blueShadow', 'hsl(224, 28%, 35%)');
        r.style.setProperty('--gShadow', 'hsl(28, 16%, 65%)');

        toppper.classList.remove('common');
        toppper.classList.add('white');

        screen.classList.remove('common');
        screen.classList.add('white');
        equal.classList.add('white');
    }
});