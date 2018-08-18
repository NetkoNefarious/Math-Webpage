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
    $('#bindec-result').text(EvalBinDec(bindec_input.value)).show();
}
bindec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#bindec-result').text(EvalBinDec(bindec_input.value)).show();
    }
}

// Conversion (dec-bin)
var decbin_input = document.getElementById('decbin_input');
buttons[4].onclick = function () {
    $('#bindec-result').text(EvalDecBin(parseInt(decbin_input.value))).show();
}
decbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#bindec-result').text(EvalDecBin(parseInt(decbin_input.value))).show();
    }
}

// Conversion (hex-dec)
function WriteHexDec () {
    var hexdec = document.getElementById('hex-dec');
    var hexdec_span = document.getElementById('result_hexdec');
    var hexdec_input = document.getElementById('hexdec_input');
    var result = EvalHexDec(hexdec_input.value);

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

buttons[6].onclick = function () { WriteHexDec(); }
hexdec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteHexDec();
    }
}

// Conversion (dec-hex)

function WriteDecHex() {
    var hexdec = document.getElementById('hex-dec');
    var hexdec_span = document.getElementById('result_hexdec');
    var dechex_input = document.getElementById('dechex_input');
    var result = EvalDecHex(parseInt(dechex_input.value));

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

buttons[7].onclick = function () { WriteDecHex(); }
dechex_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteDecHex();
    }
}

// Conversion (hex-bin)
var hexbin_input = document.getElementById('hexbin_input');
buttons[9].onclick = function () {
    $('#hexbin_result').text(EvalHexBin(hexbin_input.value)).show();
}
hexbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#hexbin_result').text(EvalHexBin(hexbin_input.value)).show();
    }
}

// Conversion (bin-hex)
var binhex_input = document.getElementById('binhex_input');
buttons[10].onclick = function () {
    $('#hexbin_result').text(EvalBinHex(binhex_input.value)).show();
}
binhex_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#hexbin_result').text(EvalBinHex(binhex_input.value)).show();
    }
}