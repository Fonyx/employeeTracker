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

class MissingArgumentError extends AnonymousError{};
class BadArgumentError extends AnonymousError{};
class AttributeError extends AnonymousError{};

module.exports = {
    MissingArgumentError,
    BadArgumentError,
    AttributeError
}