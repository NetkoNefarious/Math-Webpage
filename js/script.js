// -------- //
// FUNCTIONS //
// -------- //

var errorMessage = 'The expression is invalid.';
var isDigit = char => (char >= '0' && char <= '9');
var operators = ['+', '-', '*', '/', '(', ')', '.'];
var ErrorHandler = function (fun, num) {
    try {
        return fun(num);
    }

    catch (ex) {
        alert(errorMessage);
    }
}

// -------- //
// BASIC ARITHMETIC //
// -------- //

function EvalArithmetic(operators) {
    var inp = document.getElementById('ar_input');
    
    if (!CheckValidity(inp.value, operators, false)) {
        throw 'Invalid expression!';
    }

    return ErrorHandler(eval, inp.value);
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

// -------- //
// FRACTION REDUCTION //
// -------- //

function EvalReduction(operators) {
    'use strict'
    var inp = document.getElementById('fr_input');

    if (inp.value === '') {
        return;
    }

    // Remove the point (for positive integers)
    var pointIndex = operators.indexOf('.');
    if (pointIndex > -1) {
        operators.splice(pointIndex, 1);
    }

    if (!CheckValidity(inp.value, operators, true)) {
        throw 'Invalid expression!';
    }

    var inp_ar = inp.value.split('/');
    inp_ar[0] = ErrorHandler(eval, inp_ar[0]);
    inp_ar[1] = ErrorHandler(eval, inp_ar[1]);
    var commonDenom = LeastCommonDenom(inp_ar[0], inp_ar[1]);

    // Vraca razlomak
    return ((inp_ar[0] / commonDenom) + '/' + (inp_ar[1] / commonDenom));
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
    if (!isNaN(timeDiff)) {
        return (timeDiff / 1000 / 60 / 60 / 24) + ' days';
    }
}

// #region EVENT HANDLERS AND LISTENERS //
var buttons = document.getElementsByTagName('button');

// Arithmetic
function WriteAr() {
    var result = ErrorHandler(EvalArithmetic, operators);
    if (result !== undefined) {
        document.getElementById('math-result').innerText = result;
        $('#math-result').slideDown();
    }
}
// Wrapper function to avoid onclick triggering on refresh
buttons[0].onclick = function () { WriteAr(); }
// If user presses Enter, evaluate expression
document.getElementById('ar_input').onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteAr();
    }
}

// Fractions
function WriteFr() {
    var result = ErrorHandler(EvalReduction, operators);
    if (result !== undefined) {
        document.getElementById('fr_input').value = result;
    }
}
buttons[1].onclick = function () { WriteFr(); }
document.getElementById('fr_input').onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteFr();
    }
}

// Date
function WriteDate() {
    var result = EvalDate();
    if (result !== undefined) {
        document.getElementById('time-result').textContent = result;
        $('#time-result').slideDown();
    }
}
buttons[2].onclick = function () { WriteDate(); }
document.getElementById('date2').onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteDate();
    }
}

//#endregion

// Smooth-scrolling links
$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
        }, 1000);
        return false;
        }
    }
});