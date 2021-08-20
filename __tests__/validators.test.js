const {confirmStringValidator, confirmIntValidator} = require('../helpers/validators');

describe('String validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed integer as bad name', async () => {
        const result = await confirmStringValidator(0);
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed empty string as name', async () => {
        const result = await confirmStringValidator('');
        expect(result).toBe(false);
    });
    // unhappy path - should reject parsable numbers
    it('Should return bool false when passed string that can be cast to int', async () => {
        const result = await confirmStringValidator('12345');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid string', async () => {
        const result = await confirmStringValidator('Valid string');
        expect(result).toBe(true);
    });
});

describe('Id validator testing', ()=>{
    // unhappy path
    it('Should return bool false when passed string as bad id', async () => {
        const result = await confirmIntValidator('Not an Integer');
        expect(result).toBe(false);
    });
    // unhappy path
    it('Should return bool false when passed string with mixed alpha numerics', async () => {
        const result = await confirmIntValidator('3f4');
        expect(result).toBe(false);
    });
    // happy path
    it('Should return true boolean when passed valid int', async () => {
        const result = await confirmIntValidator(1);
        expect(result).toBe(true);
    });
});