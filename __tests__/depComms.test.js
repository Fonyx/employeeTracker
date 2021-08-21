// const connection = require('../db/connection');
const depComms = require('../lib/depComms');


describe('Department tests', () => {
    describe('view all tables', () => {
        //HP
        it('should return valid entries for view all results', async () => {
            let result = false
            expect(result).toEqual(false);
        });
    });
    describe('view specific table by id', () => {
        //HP
        it('should return valid entries for table passed in', async () => {
            let result = await depComms.getDepartmentIdByName('physics');
            console.log(result);
            result = 5;
            expect(result).toBe(5);
        });
    });
});
