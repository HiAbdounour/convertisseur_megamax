/*
* Functions for ensuring validity of inputs
*
*/
function isValidHexa(nb){
    return /^[0-9A-Fa-f]*$/.test(nb);
}

function isValidDuodeca(nb){
    // to complete
    pass
}

function isValidDecimal(nb){
    return /^[-]{0,1}\d*$/.test(nb);
}

function isValidOctal(nb){
    return /^[0-7]*$/.test(nb);
}

function isValidBinary(nb){
    return /^[0-1]*$/.test(nb);
}

function isValidBCD(nb){
    // to complete
    pass
}

function isValidTernary(nb){
    return /^[0-2]*$/.test(nb);
}

function isValidASCII(nb){
    // to complete
    pass
}

function isValidArabic(nb){
    // to complete
    pass
}


/*
* Functions for taking user inputs
*
*/
function checkValidity(nb,base){
    switch(base){
        case "hexa": return isValidHexa(nb);
        case "duodecimal": return isValidDuodeca(nb);
        case "decimal": return isValidDecimal(nb);
        case "octal": return isValidOctal(nb);
        case "cbinary" : case "ubinary" : case "sbinary" : case "gray" : return isValidBinary(nb);
        case "bcd": return isValidBCD(nb);
        case "ternary": return isValidTernary(nb);
        case "ascii": return isValidASCII(nb);
        case "arabic": return isValidArabic(nb);
        default: {console.log(`Unrecognized system : ${base}`); return false;}
    }
}


/*
* Utils
*
*/
function groupByX(nb,x){
    if(x<=0) return [];
    const chunks = [];
    for (let i = s.length; i>0; i-=x){
        const start = Math.max(0, i-x);
        let chunk = s.slice(start,i);
        // add leading zeros
        if (start === 0 && chunk.length < x) {
            chunk = chunk.padStart(x,'0');
        }
    chunks.unshift(chunk);
  }
  return chunks;
}

function errorInput(base){
    ids.forEach(idx=>{
        if(idx!=base) document.getElementById(idx).value = "Invalid input";
    });
}


/*
* Functions for converting
*
*/
function awesomeConvertorFromDecimal(nb,toBase){
    return Number(nb).toString(toBase).toUpperCase();
}

function awesomeConvertorToDecimal(nb,fromBase){
    return parseInt(nb,fromBase).toString();
}


/*
* Functions for writing into inputs
*
*/
function writeIntoX(nb,where){
    try{
        document.getElementById(where).value = nb;
    } catch(e) {
        return;
    }
}


/*
* Main function
*
*/
function mainx(nb,base){
    if(checkValidity(nb,base) && nb){
        const originBase = base;
        // we convert to decimal (easy to convert to other systems)
        const root = (()=>{
            switch(base){
                case "hexa": return awesomeConvertorToDecimal(nb,16);
                case "duodecimal": return;
                case "decimal": return nb;
                case "octal": return awesomeConvertorToDecimal(nb,8);
                case "cbinary" : case "sbinary" : case "gray" : return;
                case "ubinary": return awesomeConvertorToDecimal(nb,2);
                case "bcd": return;
                case "ternary": return awesomeConvertorToDecimal(nb,3);
                case "ascii": return;
                case "arabic": return;
            }
        })();
        ids.forEach(idx=>{
            const convertedValue = (()=>{
                if(idx=='decimal') return root;
                if(idx==originBase) return nb;
                switch(idx){
                    case "hexa": return awesomeConvertorFromDecimal(root,16);
                    case "duodecimal": return "";
                    case "octal": return awesomeConvertorFromDecimal(root,8);
                    case "ubinary": return awesomeConvertorFromDecimal(root,2);
                    case "cbinary" : case "sbinary" : case "gray" : return "";
                    case "bcd": return "";
                    case "ternary": return awesomeConvertorFromDecimal(nb,3);
                    case "ascii": return "";
                    case "arabic": return "";
                }
            })();
            writeIntoX(convertedValue,idx);
        });
    }
    else{
        errorInput(base);
    }
}


/*
* Event Listeners
*
*/
const ids = [
  'hexa','duodecimal','decimal','octal',
  'ubinary','sbinary','cbinary','bcd','gray',
  'ternary',
  'ascii','arabic'
];
ids.forEach(idx => {
    const idInput = document.getElementById(idx);
    idInput.addEventListener('input',(e)=>mainx(e.target.value,idx));
})