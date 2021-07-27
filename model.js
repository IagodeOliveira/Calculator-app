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

// Computes the math operations
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
                    outcome = resultFormat(output);
                    break;
                case '-':
                    output = num1 - num2; 
                    outcome = resultFormat(output);
                    break;
                case 'x':
                    output = num1 * num2;
                    outcome = resultFormat(output);
                    break;
                case '/':
                    output = num1 / num2;
                    if(num2 == 0) {
                        reset();
                        return
                    }   
                    outcome = resultFormat(output);
                    break;
                default:
                    console.log('An error has ocorred');
                    return
            }
            keys1 = [];
            operators = [];
            keys2 = [];
        }
    }
}

// Controls output's precision
function resultFormat(output) {
    if(output.toString().length > 12) {
        if(output.toString().includes('e')) {
            output = 0;
            return [output];
        }
        if(output.toPrecision(3).includes('e')) {
            return [output];
        } else if(output > 1) {
            return [output.toPrecision(3)];
        } else {
            return [output.toPrecision(2)];
        }
    } else {
        return [output];
    }
}

