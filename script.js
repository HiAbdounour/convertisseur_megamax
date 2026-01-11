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
function binaryToOctal(nb){
    const table = {
        "000":"0",
        "001":"1",
        "010":"2",
        "011":"3",
        "100":"4",
        "101":"5",
        "110":"6",
        "111":"7"
    }
    const groups = groupByX(nb,3);
    let valueOctal = "";
    for(let i=0; i<groups.length; i+=1){
        valueOctal = valueOctal + table[groups[i]];
    }
    return valueOctal;
}

function binaryToHexa(nb){
    const table = {
        "0000":"0","1000":"8",
        "0001":"1","1001":"9",
        "0010":"2","1010":"A",
        "0011":"3","1011":"B",
        "0100":"4","1100":"C",
        "0101":"5","1101":"D",
        "0110":"6","1110":"E",
        "0111":"7","1111":"F"
    }
    const groups = groupByX(nb,4);
    let valueHexa = "";
    for(let i=0; i<groups.length; i+=1){
        valueHexa = valueHexa + table[groups[i]];
    }
    return valueHexa;
}

function binaryToDecimal(nb){
    let valueDecimal = 0;
    const sizex = nb.length;
    for(let i=0; i<sizex; i+=1){
        valueDecimal += parseInt(nb[i])*2**(sizex-i-1);
    }
    return String(valueDecimal);
}

function hexaToBinary(nb){
    const table = {
        "0":"0000","8":"1000",
        "1":"0001","9":"1001",
        "2":"0010","A":"1010",
        "3":"0011","B":"1011",
        "4":"0100","C":"1100",
        "5":"0101","D":"1101",
        "6":"0110","E":"1110",
        "7":"0111","F":"1111"
    }
    let valueBinary = "";
    for(let i=0; i<nb.length; i+=1){
        valueBinary = valueBinary + table[nb[i]];
    }
    return valueBinary;
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
        // we convert to binary (easy to convert to other systems)
        const root = (()=>{
            switch(base){
                case "hexa": return hexaToBinary(nb);
                case "duodecimal": return;
                case "decimal": return decimalToBinary(nb);
                case "octal": return octalToBinary(nb);
                case "cbinary"||"sbinary"||"gray": return;
                case "ubinary": return nb;
                case "bcd": return;
                case "ternary": return;
                case "ascii": return;
                case "arabic": return;
                default: return;
            }
        })();
        ids.forEach(idx=>{
            const convertedValue = (()=>{
                if(idx=='ubinary') return root;
                if(idx==originBase) return nb;
                switch(base){
                    case "hexa": return binaryToHexa(root);
                    case "duodecimal": return "";
                    case "decimal": return binaryToDecimal(root);
                    case "octal": return binaryToOctal(root);
                    case "cbinary"||"sbinary"||"gray": return "";
                    case "bcd": return "";
                    case "ternary": return "";
                    case "ascii": return "";
                    case "arabic": return "";
                }
            })();
            writeIntoX(convertedValue,idx);
        });
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