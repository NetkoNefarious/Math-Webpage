// -------- //
// FUNCTIONS //
// -------- //

var errorMessage = 'The expression is invalid.';
var isDigit = char => (char >= '0' && char <= '9');
var operators = ['+', '-', '*', '/', '(', ')', '.'];

// -------- //
// BASIC ARITHMETIC //
// -------- //

function EvalArithmetic(operators) {
    var inp = document.getElementById('ar_input');
    
    if (!CheckValidity(inp.value, operators, false)) {
        alert(errorMessage);
        return;
    }

    var result = Arithmetic(inp.value)
    if (result !== undefined) {
        document.getElementById('math-result').innerText = result;
        $('#math-result').show('slow');
    }
}

// Helper function
function CheckValidity(inp, operators, isFraction) {
    'use strict'
    // Since we use eval for this, we only want arithmetic to evaluate
    for (let char of inp) {
        if (!isDigit(char) && !operators.includes(char)) {
            return false;
        }
    }

    // If we're checking fractions, check if it has more or less than 1 slash
    if (isFraction){
        if (inp.match(/\//gi) == null || inp.match(/\//gi).length != 1) {
            return false
        }
    }
    return true;
}

// Helper function (evaluates arithmetic)
function Arithmetic(equation) {
    try {
        return eval(equation);
    } catch (ex) {
        alert(errorMessage);
    }
}

// -------- //
// FRACTION REDUCTION //
// -------- //

function EvalReduction(operators) {
    'use strict'
    var inp = document.getElementById('fr_input');

    // Remove the point (for positive integers)
    var pointIndex = operators.indexOf('.');
    if (pointIndex > -1) {
        operators.splice(pointIndex, 1);
    }

    if (!CheckValidity(inp.value, operators, true)) {
        alert(errorMessage);
        return;
    }

    var inp_ar = inp.value.split('/');
    try {
        // Calculating the numerator and denominator
        inp_ar[0] = Arithmetic(inp_ar[0]);
        inp_ar[1] = Arithmetic(inp_ar[1]);

        var commonDenom = LeastCommonDenom(inp_ar[0], inp_ar[1]);
    } catch (ex) {
        alert(errorMessage);
        return;
    }
    // Vraca razlomak
    inp.value = ((inp_ar[0] / commonDenom) + '/' + (inp_ar[1] / commonDenom));
}

function LeastCommonDenom(x, y) { // Euklidov algoritam
    'use strict'
    if (x == undefined || y == undefined) {
        return;
    }

    var remainder = x % y;
    if (remainder == 0) {
        return y;
    } else {
        return LeastCommonDenom(y, remainder)
    }
}

// -------- //
// DATE DIFFERENCE //
// -------- //
function EvalDate() {
    // Kako naci razliku
    var date1 = new Date(document.getElementById('date1').value);
    var date2 = new Date(document.getElementById('date2').value);

    var timeDiff = date2.getTime() - date1.getTime();
    document.getElementById('time-result').textContent = (timeDiff / 1000 / 60 / 60 / 24) + ' days';

    $('#time-result').show('slow');
}