// -------- //
// EVENT HANDLERS AND LISTENERS //
// -------- //

var buttons = document.getElementsByTagName('button');

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

// Date
buttons[2].onclick = function () {
    EvalDate();
}
document.getElementById('date2').onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalDate();
    }
}

// Conversion (bin-dec)
var bindec_input = document.getElementById('bindec_input');
buttons[3].onclick = function () {
    $('#bindec-result').text(result).show();
}
bindec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalBinDec(bindec_input.value);
    }
}

// Conversion (dec-bin)
var decbin_input = document.getElementById('decbin_input');
buttons[4].onclick = function () {
    EvalDecBin(parseInt(decbin_input.value));
}
decbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalDecBin(parseInt(decbin_input.value));
    }
}

// Conversion (hex-dec)
var hexdec_input = document.getElementById('hexdec_input');
buttons[6].onclick = function () {
    EvalHexDec(hexdec_input.value);
}
hexdec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalHexDec(hexdec_input.value);
    }
}

// Conversion (dec-hex)
var dechex_input = document.getElementById('dechex_input');
buttons[7].onclick = function () {
    EvalDecHex(parseInt(dechex_input.value));
}
dechex_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalDecHex(parseInt(dechex_input.value));
    }
}

// Conversion (hex-bin)
var hexbin_input = document.getElementById('hexbin_input');
buttons[9].onclick = function () {
    EvalHexBin(hexbin_input.value);
}
hexbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalHexBin(hexbin_input.value);
    }
}

// Conversion (bin-hex)
var binhex_input = document.getElementById('binhex_input');
buttons[10].onclick = function () {
    EvalBinHex(binhex_input.value);
}
binhex_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        EvalBinHex(binhex_input.value);
    }
}