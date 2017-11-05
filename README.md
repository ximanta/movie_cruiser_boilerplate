# MovieCruiser

## Installation

Step 1. Install and run MySQL database server in your local machine.
Step 2. Create a schema in MySQL to be used by application along with a user through which application can connect to that schema (you will be adding data to this schema as you run the application and need not have any data before).
Step 3. Update and run `. ./env-variables.sh` to set the schema name, username, password in the environment variables as the server to them for booting up.
Step 4. For backend, run `mvn package` and then `npm run spring-boot:run` in the same process as Step 3.
Step 5. For frontend, run `npm install` and then `npm run start` in a different process.

Navigate to `http://localhost:4200/` to view the running application. For a demo, refer -> ./movie_cruiser_demo.mkv

## Running lint checks

Run `npm run lint`

## Running unit tests

Run `npm run test` to execute the karma unit tests.

## Running end-to-end tests

Run `npm run e2e` to execute the protractor end-to-end tests.
