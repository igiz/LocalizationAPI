RestAPI written in NodeJS using express and documented with OpenAPI through swagger-ui.
The purpose of this API is to aid automation of running localization scripts written in powershell that aid Sisulizer translations.

In order to run this API , you will need to create a **.env** file in the root of the project.

Contents of an example **.env** are shown below:

    LOG_FILE={appDir}\\logs\\log.txt
    API_DOCUMENTATION={appDir}\\public\\api-docs\\swagger.json
    API_PORT=8081
    TASK_ARCHIVE_FORMAT=zip
    COMPRESSION_LEVEL=9
    TASK_REMOVAL_INTERVAL_HOURS=36
    KEEP_LAST=3
    SCRIPT=Run.ps1
    SCRIPTS_LOCATION={appDir}\\Scripts

**Environment Requirements:**

 1. NodeJS `8.12.0 +`
 2. Node Package `npm or yarn`

**Running the API**

 1. Create a **.env** file in the root directory of the project. Can use an example given above.
 2. Restore all module dependencies by executing `npm install` 
 3. Run `node server.js` **or** alternatively register the app with pm2 by running `pm2 start server.json`
