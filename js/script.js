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

// -------- //
// BIN-DEC //
// -------- //

function EvalBinDec(num) {
    var result = 0, exp = 0;
    var rev_i = num.length;

    while(--rev_i > -1) {
        if (num[rev_i] != '0' && num[rev_i] != '1') {
            alert(errorMessage);
            return;
        }

        if (num[rev_i] == '1') {
            result += Math.pow(2, exp);
        }

        ++exp;
    }

    $('#bindec-result').text(result).show();
}

function EvalDecBin(num) {
    var result = '';
    while (num != 0) {
        result = (num % 2) + resultBin;
        num = Math.floor(num / 2);
    }

    $('#bindec-result').text(result).show();
}

// -------- //
// HEX-DEC //
// -------- //

function EvalHexDec(num) {
    var result = 0, exp = 0;
    var rev_i = num.length;

    while (--rev_i > -1) {
        let digit = parseInt(num[rev_i]);

        if (isNaN(digit)) {
            digit = (num.toUpperCase().charCodeAt(rev_i)) - 55;

            if (digit < 10 || digit > 15) {
                alert(errorMessage);
                return;
            }
        }

        result += digit * Math.pow(16, exp++);
    }

    var hexdec = document.getElementById('hex-dec');
    var hexdec_span = document.getElementById('result_hexdec');

    // S create element i appendChild kreiranje
    if ($('#hdswitch-button').is(':last-child')) {
        var br = document.createElement('br'); hexdec.appendChild(br);

        result_node = document.createElement('span');
        result_node.id = 'result_hexdec';
        result_node.innerText = result;
        hexdec.appendChild(result_node);
    }
    else { hexdec_span.innerText = result; }
}

function EvalDecHex(num) {
    var result = '', rem;
    while (num != 0) {
        rem = num % 16;

        if (isNaN(rem)) {
            alert(errorMessage);
            return;
        }

        if (num > 9) {
            result = String.fromCharCode(rem + 55) + result;
        }
        else {
            result = rem.toString() + result;
        }
        num = Math.floor(num / 16);
    }

    var hexdec = document.getElementById('hex-dec');
    var hexdec_span = document.getElementById('result_hexdec');

    // S create element i appendChild kreiranje
    if ($('#hdswitch-button').is(':last-child')) {
        var br = document.createElement('br'); hexdec.appendChild(br);

        result_node = document.createElement('span');
        result_node.id = 'result_hexdec';
        result_node.innerText = result;
        hexdec.appendChild(result_node);
    }
    else { hexdec_span.innerText = result; }
}

// -------- //
// HEX-BIN //
// -------- //

function EvalHexBin(num) {
    var result = '', rev_i = num.length;

    while (--rev_i > -1) {
        let digit = parseInt(num[rev_i]);

        if (isNaN(digit)) {
            digit = num.toUpperCase().charCodeAt(rev_i) - 55;

            if (digit < 10 || digit > 15) {
                alert(errorMessage);
                return;
            }
        }

        var resultBin = '';
        while (digit != 0) {
            resultBin = (digit % 2) + resultBin;
            digit = Math.floor(digit / 2);
        }

        result = resultBin + result;
    }

    $('#hexbin_result').text(result).show();
}

function EvalBinHex(num) {
    var result = '', rev_i = num.length;
    var cont = 0, exp = 0;
    while (--rev_i > -1) {
        if (num[rev_i] !== '0' && num[rev_i] !== '1') {
            alert(errorMessage);
            return;
        }

        if (exp < 4) {
            cont += Math.pow(parseInt(num[rev_i]), exp++);
        }
        else {
            exp = 0;
            cont = Math.pow(parseInt(num[rev_i]), exp++);
        }
    }

    $('#hexbin_result').text(result).show();
}