let primaryValue = '0';
let secondValue = undefined;
let operation = undefined;
let result = undefined;
let screen = document.getElementById('screen');
screen.innerHTML = primaryValue;

// console.log(eval('5+2'))

function writeScreen(){
    screen.innerHTML = `${primaryValue} ${operation !== undefined ? operation: '' } ${secondValue !== undefined ? secondValue: ''}`;
}

$("#error").css({"visibility":"hidden"});
async function errorEvent(){
    $("#error").css({"visibility":"visible"});
    setTimeout(() => {
        $("#error").css({"visibility":"hidden"});
    }, 1000);
}

$("#eraseAll").click(() => { 
    primaryValue = '0';
    secondValue = undefined;
    operation = undefined;
    screen.innerHTML = '0';
});

$("#root").click(() => { 
    if(secondValue === undefined && operation === undefined){
        const root = Math.sqrt(screen.innerHTML)
        screen.innerHTML = root;
        primaryValue = root;
        operation = undefined;
        secondValue = undefined;
    }else{
        errorEvent();
    }
});

$("#percentage").click(() => { 
    if(secondValue !== undefined && operation !== undefined){
        if(operation === "+"){
            primaryValue = parseFloat(primaryValue) + parseFloat(primaryValue) * (parseFloat(secondValue)/100);
            secondValue = undefined;
            operation = undefined;
            screen.innerHTML = primaryValue;
        }else if(operation === "-"){
            primaryValue -= parseFloat(primaryValue) * (parseFloat(secondValue)/100);
            secondValue = undefined;
            operation = undefined;
            screen.innerHTML = primaryValue;
        }else{
            errorEvent();
        }
    }else{
        errorEvent();
    }
});

$("#erase").click(() => { 
    if(secondValue !== undefined){
        if(secondValue.length > 1){
            secondValue = secondValue.slice(0, -1);
        }
        if(secondValue.length === 1){
            secondValue = undefined;
        }
    }else{
        if(secondValue === undefined && operation !== undefined){
            operation = undefined;
        }else{
            if(secondValue === undefined && operation === undefined){
                if(primaryValue.length > 1){
                    primaryValue = primaryValue.slice(0, -1);
                }
                if(primaryValue.length === 1){
                    primaryValue = 0;
                }
            }
        }
    }
    writeScreen();
});

$('[name = "operator"]').click((e) => {
    if(operation !== undefined && secondValue !== undefined){
        equal();
    }
    operation = e.target.value;
    writeScreen();
});

$('[name = "number"]').click((e) => {
    if(operation === undefined){
        if(primaryValue === "0" || primaryValue === 0 && e.target.value !== '.'){
            primaryValue = `${e.target.value}`;
        }else{
            primaryValue = `${primaryValue}${e.target.value}`;
        }
    }else{
        if((secondValue === "0" || secondValue === 0  || secondValue === undefined )&& e.target.value !== '.' ){
            secondValue = `${e.target.value}`;
        }else{
            secondValue = `${secondValue}${e.target.value}`;
        }
    }
    writeScreen();
});

$('#equal').click(() => {
    equal();
});

function equal(){
    const result = eval(`${primaryValue} ${operation} ${secondValue}`);
    if(result === Infinity){
        errorEvent();
    }else{
        screen.innerHTML = result;
        primaryValue = result;
        operation = undefined;
        secondValue = undefined;
    }
}