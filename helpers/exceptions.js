class AnonymousError{
    constructor(message){
        if(message){
            this.message = message;
        } else {
            this.message = 'Anonymous Raise'
        }
        this.prototype = new Error();
    }
}

class customError extends AnonymousError{};

module.exports = {
    customError,
}