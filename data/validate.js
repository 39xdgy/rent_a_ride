//function to validate array type field
function validateArray(argument,type="A"){

    if (!argument) throw `One of the sent parameter is missing`;  
    if (!Array.isArray(argument)) throw `Parameter sent ${argument} is not an array`;
    if (!argument.length>0) throw `Parameter sent ${argument} does not contain any element`;
        for(let arg of argument){
            validateString(arg);
        }
    }

//function to validate number type field
function validateNumber(argument,type="N"){
        if(!argument) throw `Sent Parameter is missing`;
        if (typeof argument !== "number") throw `Passed argument ${argument} is not a number`;
        if (!Number.isInteger(argument)) throw `Passed argument ${argument} is not an Integer`;
}

//function to validate object type field
function validateObject(argument,type="O"){
    
    if (!argument) throw `Sent parameter is missing`;    
    if (Array.isArray(argument)) throw `Sent Parameter ${argument} is an array`;
    if (typeof argument !== "object") throw `Sent Parameter ${argument} is not Object`;
    if (argument.hasOwnProperty(undefined)) throw `Sent Parameter Object contains undefined`;
}

/* if (type==="F"){
            if (typeof argument !== "function") throw `Sent Parameter ${argument} is not a function`;} */

//function to validate string type field
function validateString(stringArg){
    if (!stringArg) throw `Sent parameter is missing`;
    if (typeof stringArg !== "string") throw `Parameter sent ${stringArg} is not a string`
    if (stringArg.trim().length == 0) throw `Parameter sent ${stringArg} does not contain any charaters`;
   // if (stringArg.match(/^[0-9!@#\$%\^\&*\)\(+=._-\s]+$/) != null) throw  `Parameter sent ${stringArg} is not a valid string`;

}

//function to validate date type field and converts date from string to date type
function validateDate(argument){

    let daysInMonth = function (m, y) {
        switch (m) {
            case 1 :
                return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31
        }
    };
    
    
    let isValidDate = function (d, m, y) {
        m = parseInt(m, 10) - 1;
        return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
    };

    validateString(argument);
    if (argument.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/) )
    {
        let today = new Date();
        let parts = argument.split("/");
        let day = parseInt(parts[1], 10);
        let month = parseInt(parts[0], 10);
        let year = parseInt(parts[2], 10);
        if(year > today.getFullYear()) throw `Sent Parameter ${argument} is a future Date`;
        if(year === today.getFullYear() && month-1 > today.getMonth()) throw `Sent Parameter ${argument} is a future Date`;
        if(year === today.getFullYear() && month-1 === today.getMonth() && day > today.getDate()) throw `Sent Parameter ${argument} is a future Date`;
        if(!(isValidDate(day,month,year))) throw `Sent Parameter ${argument} is an invalid Date`;
        let returnDate = new Date(year,month-1,day);
        return returnDate;
    }
    else throw `Sent Parameter ${argument} is an invalid Date`;
}

//function to format date in mm/dd/yy field
function formatDateInString(argument){
    let month = argument.getMonth() + 1;
    let day = argument.getDate();
    if(day<10){
        day = 0 + "" + day;
    }
    if(month<10){
        month = 0 + "" + month;
    }
    let year = argument.getFullYear();
    let formatDate = `${month}/${day}/${year}`;
    console.log(formatDate);
    return formatDate;
}
    


module.exports={
    validateArray,
    validateObject,
    validateString,
    validateNumber,
    validateDate,
    formatDateInString
}