let itens = [];
let decimal = false;
let result = 0.0;

$(function() {
    $("#tabs").tabs();
    $('#btn1').button().click(function () {
        insertValue('1');
    });
    $('#btn2').button().click(function () {
        insertValue('2');
    });
    $('#btn3').button().click(function () {
        insertValue('3');
    });
    $('#btn4').button().click(function () {
        insertValue('4');
    });
    $('#btn5').button().click(function () {
        insertValue('5');
    });
    $('#btn6').button().click(function () {
        insertValue('6');
    });
    $('#btn7').button().click(function () {
        insertValue('7');
    });
    $('#btn8').button().click(function () {
        insertValue('8');
    });
    $('#btn9').button().click(function () {
        insertValue('9');
    });
    $('#btn0').button().click(function () {
        insertValue('0');
    });
    $('#btndot').button().click(function () {
        insertDecimal();
    });
    $('#btnequal').button().click(function () {
        equals();
    });
    $('#btnplus').button().click(function () {
        insertOperator('+');
    });
    $('#btnminus').button().click(function () {
        insertOperator('-');
    });
    $('#btntimes').button().click(function () {
        insertOperator('*');
    });
    $('#btndivision').button().click(function () {
        insertOperator('/');
    });
    $('#btnclear').button().click(function () {
        clear();
    });
    $('#btnpercent').button().click(function () {
        insertOperator('%');
    });
    $("#dialog").dialog({
        autoOpen: false,
        show: {
          effect: "bounce",
          duration: 1000
        },
        hide: {
          effect: "explode",
          duration: 1000
        }
    });
});

function insertValue(item) {
    
    if($('#input').val().length < 20) {
        let value = $('#input').val();
        value = value + item;
        $('#input').val(value);
    }

}

function insertDecimal() {
    
    if(!decimal) {
        let value = $('#input').val();
        let index = value.indexOf('.');
        if(value.length === 0) {
            return;
        }
        else if(value.length === 1) {
            if(index === -1 && value !== '-') {
                insertValue('.');
                decimal = true;
            }
        }
        else {
            if(index === -1) {
                insertValue('.');
                decimal = true;
            }
        }
    }

}

function insertOperator(operator) {

    let val = $('#input').val();

    if(itens.length === 0 && operator === '+') {        
        if(val.length > 0) {
            if(val.length === 1 && val === '.') {
                return;
            }
            else {
                itens.push(val);
                itens.push(operator);
                decimal = false;                
                $('#input').val('');
            }
        }
    }
    if(itens.length === 0 && operator === '-' && val !== '.') {
        if(val.length === 0 && itens.length === 0) {
            $('#input').val('-');
        }
        else if(val.length > 1 && itens.length === 0) {
            let index = val.indexOf('-');
            itens.push(val);
            itens.push(operator);
            decimal = false;                
            $('#input').val('');               
        }
    }
    if(itens.length === 2 && operator === '-') {
        let index = val.indexOf('-');
        if(index === -1 && (itens[1] === '*' || itens[1] === '/')) {
            $('#input').val('-');
        }
    }
    if(itens.length === 0 && operator === '*') {
        if(val.length === 0 && itens.length === 0) {
            return;
        }
        else if(val.length > 0 && itens.length === 0) {
            if(val.length === 1 && val === '.') {
                return;
            }
            else {
                itens.push(val);
                itens.push(operator);
                decimal = false;                
                $('#input').val('');
            }
        }
    }
    if(itens.length === 0 && operator === '/') {
        if(val.length > 0 && val !== '.' && val !== '-.' && val !== '.-') {
            itens.push(val);
            itens.push(operator);
            decimal = false;                
            $('#input').val('');
        }
    }
    if(itens.length === 0 && operator === '%') {
        if(val.length > 0 && val !== '.' && val !== '-.' && val !== '.-') {
            itens.push(val);
            itens.push(operator);
            decimal = false;                
            $('#input').val('');
        }
    }

}

function equals() {
    
    if(itens.length === 2) {
        let val = $('#input').val();
        if(val.length > 0 && val !== '.' && val !== '-.' && val !== '.-') {
            itens.push(val);
            $('#input').val(calculate(itens[1]));
        }
    }

}

function calculate(operator) {
    
    let val1 = parseFloat(itens[0]);
    let val2 = parseFloat(itens[2]);
    
    switch(operator) {
        case '+':
            result = val1 + val2;
        break;
        case '-':
            result = val1 - val2;
        break;
        case '*':
            result = val1 * val2;
        break;
        case '/':
            if(val2 === 0) {
                $("#dialog").dialog("open");
                $('#input').val('');
                result = 0.0;
            }
            else {
                result = val1 / val2;
            }
        break;
        case '%':
            if(val2 > 0 && val2 !== '.' && val2 !== '-.' && val2 !== '.-') {
                result = parseFloat((val1 / 100) * val2);
            }
        break;
    }

    itens = [];
    decimal = false;
    return result;

}

function clear() {
    
    $('#input').val('');
    decimal = false;
    itens = [];
    
}