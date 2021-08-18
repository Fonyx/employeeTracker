const Employee = require('../lib/Employee');
const Exceptions = require('../lib/Exceptions');

// top level test of Employee class
describe('Employee', () => {
    // testing initialization
    var validEmployee = {name: 'James', id:'1', email:'validEmail'};
    describe('Initialization', () => {
        // Happy Path
        it("HP should return a name string", () => {
            const employee = new Employee(validEmployee);
            expect(employee.name).toBe('James');
        });
        it("HP should return a id integer", () => {
            const employee = new Employee(validEmployee);
            expect(employee.id).toBe(1);
        });
        it("HP should return an email string", () => {
            const employee = new Employee(validEmployee);
            expect(employee.email).toBe('validEmail');
        });

        // Missing arguments
        it("UHP should raise a MissingArgumentError if no arguments", () => {
            expect(()=> {
                new Employee({});
            }).toThrowError(Exceptions.MissingArgumentError);
        });
        it("UHP should raise a MissingArgumentError if missing id", () => {
            expect(() => {
                new Employee({name: 'Jarrod', email:'email'});
            }).toThrowError(Exceptions.MissingArgumentError);
        });
        it("UHP should raise a MissingArgumentError if missing email", () => {
            expect(()=> {
                new Employee({name: 'Jarrod', id:4});
            }).toThrowError(Exceptions.MissingArgumentError);
        });

        // incorrect types for arguments - str, int, str
        it("UHP should raise a BadArgumentError if bad name", () => {
            expect(()=> {
                new Employee({name:0, id:1, email:'email'});
            }).toThrowError(Exceptions.BadArgumentError);
        });
        it("UHP should raise a BadArgumentError if bad id", () => {
            expect(()=> {
                new Employee({name:'ValidName', id:'bad int', email:'email'});
            }).toThrowError(Exceptions.BadArgumentError);
        });
        it("UHP should raise a BadArgumentError if bad email", () => {
            expect(()=> {
                new Employee({name: 'Name', id: 'BadId-ShouldBeInt', email: {badEmail:'ThisShouldBeAStringNotAnObject'}});
            }).toThrowError(Exceptions.BadArgumentError);
        });
    });
    //testing get name method

    describe('get name method', () => {
        const employee = new Employee(validEmployee);
        it("should return a name string", () => {
            expect(employee.getName()).toBe('James');
        });
    });
    // testing get id method
    describe('get id method', () => {
        const employee = new Employee(validEmployee);
        it("should return an id integer", () => {
            expect(employee.getId()).toBe(1);
        });
    });
    // testing get email method
    describe('get email method', () => {
        const employee = new Employee(validEmployee);
        it("should return an email string", () => {
            expect(employee.getEmail()).toBe('validEmail');
        });
    });
    // testing get role method
    describe('get role method', () => {
        const employee = new Employee(validEmployee);
        it("should return a role string", () => {
            expect(employee.getRole()).toBe('Employee');
        });
    });
});