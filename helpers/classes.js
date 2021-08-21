
/**
 * A dictionary object that accepts two lists of equal length, and acts like a python dictionary
 * has getter, setter and print methods
 */
class Dict{
    /**
     * 
     * @param {list} keys list of strings
     * @param {list} values list of elements [str, int]
     */
    constructor(keys, values){
        // if either list isn't an object throw error
        if(typeof(keys) !== 'object' || typeof(values) !== 'object'){
            throw TypeError('Dictionary did not receive two object types');
        }
        // if either list is empty throw error
        if(keys.length === 0 || values.length ===0){
            throw TypeError('Dictionary did not receive lists of positive length');
        }
        // if any of the keys aren't strings, fail
        if(keys.some((key) => {
            if(typeof(key) !== 'string'){
                return true;
            } else {
                return false
            }
        })){
            throw TypeError('Received a key that was not a string');
        }
        // if any of the values are objects, fail
        if(values.some((value) => {
            if(typeof(value) === 'object'){
                return true;
            } else {
                return false
            }
        })){
            throw TypeError('Received a value that was an object');
        }
        if(keys.length === values.length){
            this.keys = keys;
            this.values = values;
        }
    }

    print(){
        for(let i =0; i < this.keys.length; i++){
            let curr_key = this.keys[i];
            let curr_val = this.get(curr_key);
            console.log(`${curr_key}: ${curr_val}`);
        }
    }

    get_as_list(){
        let result = [];
        for(let i =0; i < this.keys.length; i++){
            result[this.keys[i]] = this.values[i];
        }
        return result;
    }   

    get(key){
        try{
            let keyIndex = this.keys.indexOf(key);
            return this.values[keyIndex];
        } catch(error){
            console.error(error);
        }
    }
    /**Receives a key and returns the corresponding value
     * 
     * @param {str} key 
     * @param {obj} value 
     */
    set(key, value){
        try{
            let keyIndex = this.keys.findIndex(key);
            this.values[keyIndex] = value;
            return true
        } catch(error){
            console.error(error);
        }
    }
}

module.exports ={
    Dict,
}