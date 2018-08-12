var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var buttons = document.getElementsByTagName('button');
var errorMessage = 'The expression is invalid.';
var isDigit = char => (char >= '0' && char <= '9');
var operators = ['+', '-', '*', '/', '(', ')', '.'];

// -------- //
// BASIC ARITHMETIC //
// -------- //

function EvalArithmetic(operators) {
    var inp = document.getElementById('ar_input').value;
    
    if (!CheckValidity(inp, operators, false)) {
        alert(errorMessage);
        return;
    }

    var result = Arithmetic(inp)
    if (result !== undefined) {
        document.getElementById('math-result').textContent = Arithmetic(inp)
        $('#math-result').slideDown();
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
    var inp = document.getElementById('fr_input').value;

    // Remove the point (for positive integers)
    var pointIndex = operators.indexOf('.');
    if (pointIndex > -1) {
        operators.splice(pointIndex, 1);
    }

    if (!CheckValidity(inp, operators, true)) {
        alert(errorMessage);
        return;
    }

    //
    inp = inp.split('/');
    try {
        // Calculating the numerator and denominator
        inp[0] = Arithmetic(inp[0]);
        inp[1] = Arithmetic(inp[1]);

        var commonDenom = LeastCommonDenom(inp[0], inp[1]);
    } catch (ex) {
        alert(errorMessage);
        return;
    }
    // Vraca razlomak
    document.getElementById('fr_input').value = ((inp[0] / commonDenom) + '/' + (inp[1] / commonDenom));
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
// EVENT HANDLERS AND LISTENERS //
// -------- //

// Arithmetic
// Wrapper function to avoid onclick triggering on refresh
buttons[0].onclick = function () {
    EvalArithmetic(operators);
}
// If user presses Enter, evaluate expression
document.getElementById('ar_input').onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalArithmetic(operators);
    }
}

// Fractions
buttons[1].onclick = function () {
    EvalReduction(operators);
}
document.getElementById('fr_input').onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalReduction(operators);
    }
}