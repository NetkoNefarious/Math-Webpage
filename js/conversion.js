// -------- //
// BIN-DEC //
// -------- //

function EvalBinDec(num) {
    if (num.match(/[^01]/) !== null) {
        throw 'Invalid expression!';
    }

    return parseInt(num, 2);
}

function EvalDecBin(num) {
    if (num.match(/\D/) !== null) {
        throw 'Invalid expression!';
    }

    return parseInt(num).toString(2);
}

// -------- //
// HEX-DEC //
// -------- //

function EvalHexDec(num) {
    if (num.match(/[^\dABCDEF]/i) !== null) {
        throw 'Invalid expression!';
    }

    return parseInt(num, 16);
}

function EvalDecHex(num) {
    if (num.match(/\D/) !== null) {
        throw 'Invalid expression!';
    }

    else if (num === '') {
        return;
    }

    return parseInt(num).toString(16).toUpperCase();
}

// -------- //
// HEX-BIN //
// -------- //

function EvalHexBin(num) { return EvalDecBin(EvalHexDec(num).toString()); }
function EvalBinHex(num) { return EvalDecHex(EvalBinDec(num).toString()); }

// #region EVENT HANDLERS //
// -------- //

// Conversion (bin-dec)
var bindec_input = document.getElementById('bindec_input');
buttons[3].onclick = function () {
    $('#bindec-result').text(ErrorHandler(EvalBinDec, bindec_input.value)).show();
}
bindec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#bindec-result').text(ErrorHandler(EvalBinDec, bindec_input.value)).show();
    }
}

// Conversion (dec-bin)
var decbin_input = document.getElementById('decbin_input');
buttons[4].onclick = function () {
    $('#bindec-result').text(ErrorHandler(EvalDecBin, decbin_input.value)).show();
}
decbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#bindec-result').text(ErrorHandler(EvalDecBin, decbin_input.value)).show();
    }
}

// Conversion (hex-dec)
function WriteHexDec () {
    var hexdec_input = document.getElementById('hexdec_input');
    var result = ErrorHandler(EvalHexDec, hexdec_input.value);
    if (result === undefined || isNaN(result)) {
        return;
    }
    
    // S create element i appendChild kreiranje
    if ($('#hdswitch-button').is(':last-child')) {
        var hexdec = document.getElementById('hex-dec');
        hexdec.appendChild(document.createElement('br'));

        result_node = document.createElement('span');
        result_node.id = 'result_hexdec';
        result_node.innerText = result;
        hexdec.appendChild(result_node);
    }
    else {
        var hexdec_span = document.getElementById('result_hexdec');
        hexdec_span.innerText = result;
    }
}

buttons[6].onclick = function () { WriteHexDec(); }
hexdec_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        WriteHexDec();
    }
}

// Conversion (dec-hex)
function WriteDecHex() {
    var dechex_input = document.getElementById('dechex_input');
    var result = ErrorHandler(EvalDecHex, dechex_input.value);
    if (result === undefined) {
        return;
    }

    // S create element i appendChild kreiranje
    if ($('#hdswitch-button').is(':last-child')) {
        var hexdec = document.getElementById('hex-dec');
        hexdec.appendChild(document.createElement('br'));

        result_node = document.createElement('span');
        result_node.id = 'result_hexdec';
        result_node.innerText = result;
        hexdec.appendChild(result_node);
    }
    else {
        var hexdec_span = document.getElementById('result_hexdec');
        hexdec_span.innerText = result;
    }
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
    $('#hexbin_result').text(ErrorHandler(EvalHexBin, hexbin_input.value)).show();
}
hexbin_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#hexbin_result').text(ErrorHandler(EvalHexBin, hexbin_input.value)).show();
    }
}

// Conversion (bin-hex)
var binhex_input = document.getElementById('binhex_input');
buttons[10].onclick = function () {
    $('#hexbin_result').text(ErrorHandler(EvalBinHex, binhex_input.value)).show();
}
binhex_input.onkeydown = function (event) {
    if (event.key === 'Enter') {
        $('#hexbin_result').text(ErrorHandler(EvalBinHex, binhex_input.value)).show();
    }
}

// #endregion