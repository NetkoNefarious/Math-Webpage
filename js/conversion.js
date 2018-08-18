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

    return result;
}

function EvalDecBin(num) {
    if (isNaN(num)) {
        alert(errorMessage);
        return;
    }

    var result = '';
    while (num != 0) {
        result = (num % 2) + result;
        num = Math.floor(num / 2);
    }

    return result;
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

    return result;
}

function EvalDecHex(num) {
    if (isNaN(num)) {
        alert(errorMessage);
        return;
    }
    
    var result = '', rem;
    while (num != 0) {
        rem = num % 16;

        if (num > 9) {
            result = String.fromCharCode(rem + 55) + result;
        }
        else {
            result = rem.toString() + result;
        }
        num = Math.floor(num / 16);
    }

    return result;
}

// -------- //
// HEX-BIN //
// -------- //

function EvalHexBin(num) { return EvalDecBin(EvalHexDec(num)); }
function EvalBinHex(num) { return EvalDecHex(EvalBinDec(num)); }