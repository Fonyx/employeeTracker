
/**
 * A dictionary object that accepts two lists of equal length, and acts like a python dictionary
 * has getter, setter and print methods
 */
class Dict extends Object{
    /**
     * 
     * @param {list} keys list of strings
     * @param {list} values list of elements
     */
    constructor(keys, values){
        if(typeof(keys) !== 'list' || typeof(values) !== 'list'){
            throw TypeError('Dictionary did not receive two list types');
        }
        if(keys.length === values.length){
            this.keys = keys;
            this.values = values;
        }
    }

    print(){
        for(let i =0; i < this.keys.length; i++){
            console.log(`${this.key}: ${this.value}`);
        }
    }

    get(key){
        return this.keys[key];
    }
    /**Receives a key and returns the corresponding value
     * 
     * @param {str} key 
     * @param {obj} value 
     */
    set(key, value){
        let keyIndex = this.keys.findIndex(key);
        return this.values[keyIndex];
    }
}