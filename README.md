# Store

## Technologies

#### Backend ####

- expressjs
- MySQL
    
#### Frontend ####
- AngularJS 1.6.x
- Angular Material

### Installation ###
```sh
$ git clone git@github.com:aon1/store.git
$ cd store
$ npm install
```

### Configuration ###

- Edit database user and password on backend/config/connection.js file
- There is a dump file containing database structure and some dummy data
- Execute
    ```sh
    $ mysql -u <user> -p < data/dump.sql
    ```
    
### Running ###

```sh
$ npm start
```

Go to http://localhost:3000/products or http://localhost:3000/categories