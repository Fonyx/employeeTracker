const confirmStringValidator = async (userText)=> {
    try{
        // check that we can't turn the userText into a number
        if(parseInt(userText, 10)){
            return false;
        }
    } catch {
        // do nothing
    }
    // if the type of the user text is not a string
    if(typeof(userText) !== 'string'){
        return false;
    } else {
        if(userText === ''){
            return false
        }
    }
    // check for special characters
    let badFormat = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
    if(badFormat.test(userText)){
        return false;
    }
    return true;
}

const confirmIntValidator = async (userText)=> {
    // quick check of if userText fails to be turned into an int
        if(isNaN(parseInt(userText, 10))){
            return false;
        } else {
            // check for hex issues i.e number is 12b5, confirm every element is an int
            for(let i=0; i<userText.length;i++){
                if(isNaN(parseInt(userText.charAt(i)))){
                    return false;
                }
            }
        }
        return true
}

module.exports = {
    confirmStringValidator,
    confirmIntValidator
}