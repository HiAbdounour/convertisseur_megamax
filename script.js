// Functions for ensuring validity of inputs
function isValidDecimal(nb){
    return /^\d*$/.test(nb);
}

function isValidOctal(nb){
    return /^[0-7]*$/.test(nb);
}