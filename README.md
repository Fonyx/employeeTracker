# Project: [Employee Tracker CMS](https://github.com/Fonyx/employeeTracker)

## Version

1.0.0  

![badmath](https://img.shields.io/github/license/Fonyx/employeeTracker)  ![badmath](https://img.shields.io/github/languages/count/Fonyx/employeeTracker)  ![badmath](https://img.shields.io/github/commit-activity/m/Fonyx/employeeTracker)  ![badmath](https://img.shields.io/github/contributors/Fonyx/employeeTracker)  

## Description

A node CMS project for employee management  
![Alt text](https://github.com/Fonyx/employeeTracker/blob/main/assets/show.gif?raw=true "Using cli")

## License

GNU General Public License v3.0  

### Details  

```Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.  ```

### Permissions  

```commercial-use,modifications,distribution,patent-use,private-use  ```

## Content 

- [Dependencies](#dependencies)
- [Usage](#usage)
- [Contributors](#contributors)
- [Installation](#installation)
- [Credits](#credits)
- [Features](#features)
- [Contributing](#contributing)
- [Testing](#testing)
- [Questions](#questions)




## Dependencies  

[console.table:^0.10.0](https://www.npmjs.com/package/console.table)

[dotenv:^10.0.0](https://www.npmjs.com/package/dotenv)

[inquirer:^8.1.2](https://www.npmjs.com/package/inquirer)

[jest:^27.0.6](https://www.npmjs.com/package/jest)

[mysql2:^2.3.0](https://www.npmjs.com/package/mysql2)



## Usage

1. Run entry point with 'npm start'
2. Navigate root menu and make selection, or navigate to subsequent menu lists
3. Follow prompt to complete desired action
4. Select 'exit cms' when done  

Walkthrough Video: https://drive.google.com/file/d/1LGMTJctBGjotc_yrhomMg6Oit9WoTgwS/view

## Contributors 

[Fonyx](https://github.com/Fonyx)

## Installation

1. Install node.js
2. Install Mysql and built root user
3. Checkout software
4. Run npm install to gather dependencies
5. Add your mysql local instance user details into a root directory (employeeTracker root) .env file as
    DB_USER=username
    DB_PASS=password
    - note the lack of quotes on anything
6. Enter mysql Shell and run db/source.sql to setup database structure
7. (Optional) "npm run seed" to populate with fake seed data if you are assessing the cli - HINT TO ADMINISTRATORS!
8. Run npm start to open cms shell

## Credits

This is a homework assignment run through the University of Sydney  

## Features

1. Mysql integration with command line requests
2. Enables saving of employees, roles and departments with strict guides to maintain data integrity
3. Can related data between tables
4. Data is validated by type so database stays clean
5. User sees filtered data where appropriate to avoid creating sql queries that damage data  

## Contributing

This is a close project as it was homework  

## Testing

The project uses Jest framework
-Primary focus of testing is on user input validation
-Future development will involved test-database and db communication testing  

## Questions

nick.alex.ritchie@gmail.com  



## Checkout my github account [Fonyx](https://github.com/Fonyx)



