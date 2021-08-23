const {validators} = require('../helpers/validators');

describe('String validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed integer as bad name', async () => {
        const result = await validators.confirmStringValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed empty string as name', async () => {
        const result = await validators.confirmStringValidator('');
        expect(result).toBe(false);
    });
    // unhappy path - should reject parsable numbers
    it('Should return bool false when passed string that can be cast to int', async () => {
        const result = await validators.confirmStringValidator('12345');
        expect(result).toBe(false);
    });
    // UHP should reject strings containing special characters
    it('Should return false when pass a sql string containing special characters', async() => {
        const result = await validators.confirmStringValidator(') DROP TABLE department;');
        expect(result).toBe(false);
    })
    // HP should accept strings containing hyphen special character only
    it('Should return false when pass a sql string containing special characters', async() => {
        const result = await validators.confirmStringValidator('Sales-Force');
        expect(result).toBe(true);
    })
    // happy path
    it('Should return true boolean when passed valid string', async () => {
        const result = await validators.confirmStringValidator('Valid string');
        expect(result).toBe(true);
    });
});

describe('Id validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed string as bad id', async () => {
        const result = await validators.confirmIntValidator('Not an Integer');
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed string with mixed alpha numerics', async () => {
        const result = await validators.confirmIntValidator('3f4');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid int', async () => {
        const result = await validators.confirmIntValidator(1);
        expect(result).toBe(true);
    });
});