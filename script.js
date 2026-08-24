/*
* Functions for ensuring validity of inputs
*
*/
function isValidHexa(nb){
    return /^[-]{0,1}[0-9A-Fa-f]*$/.test(nb);
}

function isValidDuodeca(nb){
    return /^[-]{0,1}[0-9αß]*$/.test(nb);
}

function isValidDecimal(nb){
    return /^[-]{0,1}\d*$/.test(nb);
}

function isValidOctal(nb){
    return /^[-]{0,1}[0-7]*$/.test(nb);
}

function isValidBinary(nb){
    return /^[0-1]*$/.test(nb);
}

function isValidBCD(nb){
    return /^(?:- )?[01]{4}(?: [01]{4})*$/.test(nb);
}

function isValidTernary(nb){
    return /^[-]{0,1}[0-2]*$/.test(nb);
}

function isValidASCII(nb){
    return /^[ -~]$/.test(nb);
}

function isValidArabic(nb){
    return /^[٠١٢٣٤٥٦٧٨٩]*[-]{0,1}$/.test(nb);
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

function alphaToA(nb){
    return nb.replaceAll('α','A').replaceAll('ß','B');
}

function aToAlpha(nb){
    return nb.replaceAll('A','α').replaceAll('B','ß');
}

function inversC2(nb){
    const d = {"0":"1","1":"0"}
    let nd = "";
    for(let i=0;i<nb.length;i++){
        nd = nd + d[nb[i]];
    }
    return add1_binary(nd);
}

function add1_binary(nb) {
  const bits = nb.split('');
  let i = nb.length-1;
  while (i >= 0 && bits[i] === '1') {
    bits[i] = '0';
    i--;
  }
  if (i >= 0) {
    bits[i] = '1';
    return bits.join('');
  }
  return '1' + bits.join('');
}

function errorInput(base){
    ids.forEach(idx=>{
        if(idx!=base) document.getElementById(idx).value = "Invalid input";
    });
}

function emptyInput(){
    ids.forEach(idx=>{
       document.getElementById(idx).value = "";
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

function only_pos2u(nb){
    if(nb[0]=="-") return "Cannot convert negative numbers";
    return awesomeConvertorFromDecimal(nb,2);
}

function uConvertorToDecimal(nb){
    const rnb = nb.slice(1);
    if(nb[0]==='1') return "-"+awesomeConvertorToDecimal(rnb,2);
    return awesomeConvertorToDecimal(rnb,2);
}

function uConvertorFromDecimal(nb){
    const rnb = nb[0]==="-" ? nb.slice(1) : nb;
    const converted = awesomeConvertorFromDecimal(rnb,2);
    const length = parseInt(Math.log2(converted.length))+1;    
    return nb[0]==="-" ? "1"+converted.padStart(2**length-1,'0') : converted.padStart(2**length,'0');
}

function c2ConvertorToDecimal(nb){
    const rnb = nb[0]==="1" ? nb.slice(1) : nb;
    return nb[0]==="1" ? "-"+awesomeConvertorToDecimal(inversC2(rnb),2) : awesomeConvertorToDecimal(rnb,2);
}

function c2ConvertorFromDecimal(nb){
    const rnb = nb[0]==="-" ? nb.slice(1) : nb;
    const converted = awesomeConvertorFromDecimal(rnb,2);
    const length = parseInt(Math.log2(converted.length))+1;
    const fnb = converted.padStart(2**length,'0');
    return nb[0]==="-" ? inversC2(fnb) : fnb;
}

function BCDtoDecimal(nb){
	let valueDecimal = "";
    if(nb[0]=='-'){
        valueDecimal = "-";
    }
	const groups = nb.split(' ');
	groups.forEach(digitGroup => {
		if(digitGroup && digitGroup!='-') valueDecimal = valueDecimal + awesomeConvertorToDecimal(digitGroup,2);
	});
	return valueDecimal;
}

function decimalToBCD(nb){
	let valueBCD = "";
	for(let i=0; i<nb.length; i+=1){
        if(i==0 && nb[i]=="-"){valueBCD = "- ";continue;}
		valueBCD = valueBCD + awesomeConvertorFromDecimal(nb[i],2).padStart(4,"0");
		if(i!=nb.length-1) valueBCD = valueBCD + ' ';
	}
	return valueBCD;
}

function ASCIItoDecimal(nb){
    return nb.charCodeAt(0);
}

function decimalToASCII(nb){
    const nbInt = parseInt(nb);
    if(0<=nbInt && nbInt<=127) return String.fromCharCode(nbInt);
    return `Cannot convert ${nb} to ASCII`
}

function decimalToEA(nb){
    const arabic = "٠١٢٣٤٥٦٧٨٩"
    let neg = false;
    let valueEA = ""
    for(let i=0; i<nb.length; i+=1){
        if(nb[i]=='-'){neg=true;continue;}
        valueEA = valueEA + arabic[nb[i]];
    }
    if(neg){valueEA = valueEA+"-";}
    return valueEA;
}

function EAToDecimal(nb){
    const table = {
        "٠":"0","١":"1","٢":"2","٣":"3","٤":"4",
        "٥":"5","٦":"6","٧":"7","٨":"8","٩":"9"
    }
    let valueDecimal = "";
    let neg = false;
    for(let i=0; i<nb.length; i+=1){
        if(nb[i]=='-'){neg=true;continue;}
        valueDecimal = valueDecimal + table[nb[i]];
    }
    if(neg){valueDecimal = "-"+valueDecimal;}
    return valueDecimal;
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
                case "duodecimal": return awesomeConvertorToDecimal(alphaToA(nb),12);
                case "decimal": return nb;
                case "octal": return awesomeConvertorToDecimal(nb,8);
                case "sbinary": return uConvertorToDecimal(nb);
                case "cbinary" : return c2ConvertorToDecimal(nb);
                case "gray" : return;
                case "ubinary": return awesomeConvertorToDecimal(nb,2);
                case "bcd": return BCDtoDecimal(nb);
                case "ternary": return awesomeConvertorToDecimal(nb,3);
                case "ascii": return ASCIItoDecimal(nb);
                case "arabic": return EAToDecimal(nb);
            }
        })();
        ids.forEach(idx=>{
            const convertedValue = (()=>{
                if(idx=='decimal') return root;
                if(idx==originBase) return nb;
                switch(idx){
                    case "hexa": return awesomeConvertorFromDecimal(root,16);
                    case "duodecimal": return aToAlpha(awesomeConvertorFromDecimal(root,12));
                    case "octal": return awesomeConvertorFromDecimal(root,8);
                    case "ubinary": return only_pos2u(root);
                    case "sbinary" : return uConvertorFromDecimal(root);
                    case "cbinary" : return c2ConvertorFromDecimal(root);
                    case "gray" : return "";
                    case "bcd": return decimalToBCD(root);
                    case "ternary": return awesomeConvertorFromDecimal(root,3);
                    case "ascii": return decimalToASCII(root);
                    case "arabic": return decimalToEA(root);
                }
            })();
            writeIntoX(convertedValue,idx);
        });
    }
    else if(!nb) emptyInput(base);
    else errorInput(base);
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