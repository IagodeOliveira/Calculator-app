const screen = document.querySelector('.screen');
const keys = document.querySelector('.grid-container');
let ar = [];
let num1 = '';
let num2 = '';
let novo = '';
let key = '';
let bool = true;

document.addEventListener('DOMContentLoaded', () => {

    keys.innerHTML = 
    `<div class="number">7</div>
     <div class="number">8</div>
     <div class="number">9</div>  
     <div class="blue white" onclick="backOne()">DEL</div>
     <div class="number">4</div>
     <div class="number">5</div>
     <div class="number">6</div>
     <div>+</div>  
     <div class="number">1</div>
     <div class="number">2</div>
     <div class="number">3</div>
     <div>-</div>
     <div>.</div>
     <div class="number">0</div>
     <div>/</div>
     <div>x</div>
     <div class="item2 blue white" onclick="back()">RESET</div>
     <div class="item3 red white" onclick="result()">=</div>`;

     keys.addEventListener('click', (e) => {
        num1 = '';
        num2 = '';
        let classe = e.target.className;
        key = e.target.innerHTML;
        //console.log(key);
        if(classe == 'number') {
            key = Number(key);
        }

        if(!ar[0] && classe != 'number') {
            back();
        } else {
            bool = true;
        }

        if(bool) {

            let st = ar.find(a => {
                return (typeof(a) == 'string');
            });

            if(typeof(st) != 'string' && key != '=') {
                ar.push(key);
            } else {
                if(classe == 'number') {
                    ar.push(key);
                }
            }

            //console.log(ar);

            if(ar.includes('RESET')) {
                back();
            }
        }
    });
});

function result() {
    console.log(ar);
    let pos = ar.findIndex(i => {
        return typeof(i) == 'string';
    });
    if(pos == -1 || (pos != -1 && !ar[pos - 1]) || (pos != -1 && !ar[pos + 1])) {
        console.log("here");
        back();
    }

    if(bool) {

        for(let i = 0; i < ar.length; i ++) {
            if(i < pos) {
                num1 += ar[i];
            }
            if(i > pos) {
                num2 += ar[i];
            }
        }
        let conta = ar[pos];
        num1 = Number(num1);
        num2 = Number(num2);
        console.log(num1, num2, conta);

        switch(conta) {
            case '+':
            screen.innerHTML = num1 + num2;
            ar = [Number(screen.innerHTML)];
            //console.log(ar);
            break;
            case '-':
            screen.innerHTML = num1 - num2;
            ar = [Number(screen.innerHTML)];
            break;
            case 'x':
            screen.innerHTML = num1 * num2;
            ar = [Number(screen.innerHTML)];
            break;
            case '/':
            screen.innerHTML = num1 / num2;
            ar = [Number(screen.innerHTML)];
            break;
            default:
            console.log('deu merda');
        }
    }
}

function back() {
    ar = [];
    screen.innerHTML = '';
    bool = false;
}

function backOne() {
    ar.pop();
}