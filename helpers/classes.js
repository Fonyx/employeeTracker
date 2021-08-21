
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

    length(){
        return this.keys.length;
    }

    get_keys_string(){
        let result = '';
        for(let i=0; i<this.keys.length; i++){
            let current_key = this.keys[i]
            result += `${current_key}`;
            // don't add a comma after last entry or SQL will break
            if(i < this.length() -1){
                result +=', ';
            }
        }
        return result;
    }

    get_values_string(){
        let result = '';
        for(let i=0; i<this.length(); i++){
            let current_value = this.values[i]
            result += `${current_value}`;
            // don't add a comma after last entry or SQL will break
            if(i < this.length() -1){
                result +=', ';
            }
        }
        return result;
    }

    /**
     * Method that returns the number of values as a string of ? chars
     */
    get_values_as_question_marks(){
        let result = '';
        for(let i=0; i<this.values.length; i++){
            result += '?';
            // don't add a comma after last entry or SQL will break
            if(i < this.length() -1){
                result +=', ';
            }
        }
        return result;
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
    /**Receives a key and value pair, only adds new pairs to dict
     * 
     * @param {str} key 
     * @param {str/int} value 
     */
    set(key, value){
        try{
            // check if key is already in dict
            let keyIndex = this.keys.indexOf(key);
            // indexOf returns -1 if not found
            if(keyIndex === -1){
                this.keys.push(key);
                this.values.push(value);
                return true
            }else {
                console.log('Key already in dictionary, ignore')
            }
        } catch(error){
            console.error(error);
        }
    }
    /**Receives a key and value pair, only changes value if key present
     * 
     * @param {str} key 
     * @param {str/int} value 
     */
    update(key, value){
        try{
            // check if key is already in dict then update that key
            let keyIndex = this.keys.indexOf(key);
            // since the key value pairs are synced we don't need to check for value index
            // key index will be -1 if not found
            if(keyIndex !== -1){
                this.keys[keyIndex] = key;
                this.values[keyIndex] = value;
                return true
            }else {
                console.log('Key not already in dictionary, will not update missing element, use set instead')
            }
        } catch(error){
            console.error(error);
        }
    }
}

module.exports ={
    Dict,
}