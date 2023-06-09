# RESTful API Node Boilerplate

## Quick Start

To create a project, simply run:

```bash
npx znode-cquel <project-name>
```

- Change Directory
  ```bash
  cd <project-name>
  ```
- Change the DB Credentials (Username, Password) in
  _**src/config/config.json**_
  ```bash
  "development": {
      "username": '<db_username>',
      "password": '<db_password>',
      "database": "db_dev",
      "host": "127.0.0.1",
      "dialect": "postgres"
  }
  ```
- Run the Script
  ```bash
  npm i -g sequelize-cli
  sequelize db:create
  npm run setup
  npm run dev
  ```
- Generate a Schema
  ```
  sequelize model:generate --name <schema_name> --attributes <key>:<data_type>
  ```
   - example
      ```
      sequelize model:generate --name User --attribute name:string,age:number,phone:number
      ```
