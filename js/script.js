let primaryValue = '054545';
let secondValue = undefined;
let operation = undefined;
let screen = document.getElementById('screen');
screen.innerHTML = primaryValue;

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
    screen.innerHTML = '0';
});

$("#root").click(() => { 
    if(secondValue === undefined && operation === undefined){
        screen.innerHTML = Math.sqrt(screen.innerHTML);
    }else{
        errorEvent();
    }
});

$("#percentage").click(() => { 
    if(secondValue !== undefined && operation !== undefined){
        if(operation === "+"){
            primaryValue = parseFloat(primaryValue) + parseFloat(primaryValue) * (parseFloat(secondValue)/100);
            secondValue = undefined;
            screen.innerHTML = primaryValue;
        }else if(operation === "-"){
            primaryValue -= parseFloat(primaryValue) * (parseFloat(secondValue)/100);
            secondValue = undefined;
            screen.innerHTML = primaryValue;
        }else{
            errorEvent();
        }
    }else{
        errorEvent();
    }
});

$("#erase").click(() => { 
    if(secondValue !== undefined && operation !== undefined){
        if(secondValue.length > 1){
            secondValue = secondValue.slice(0, -1);
        }
        if(secondValue.length === 1){
            secondValue = undefined;
        }
    }
    if(secondValue === undefined && operation !== undefined){
        operation = undefined;
    }

    if(secondValue === undefined && operation === undefined){
        if(primaryValue.length > 1){
            primaryValue = primaryValue.slice(0, -1);
        }
        if(primaryValue.length === 1){
            primaryValue = 0;
        }
    }
});