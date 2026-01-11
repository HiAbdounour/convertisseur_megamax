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
    // to complete
    pass
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
        case "cbinary"||"ubinary"||"sbinary"||"gray": return isValidBinary(nb);
        case "bcd": return isValidBCD(nb);
        case "ternary": return isValidTernary(nb);
        case "ascii": return isValidASCII(nb);
        case "arabic": return isValidArabic(nb);
        default: {console.log("Unrecognized base"); return false;}
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

/*
* Functions for converting
*
*/


/*
* Main function
*
*/
function mainx(nb,base){
    if(checkValidity(nb,base) && nb){
        const originBase = base;
    }
    else{
        pass
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