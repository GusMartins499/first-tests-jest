# first-tests-jest
A simple test repository using [Jest](https://jestjs.io/pt-BR/)

To run this app in linux or mac, change the scripts in package.json:

(Windows)from:
```
    "pretest": "SET NODE_ENV=test&& sequelize db:migrate",
    "test": "SET NODE_ENV=test&& jest",
    "posttest": "SET NODE_ENV=test&& sequelize db:migrate:undo:all"
```

for:
```
    "pretest": "NODE_ENV=test sequelize db:migrate",
    "test": "NODE_ENV=test jest",
    "posttest": "NODE_ENV=test sequelize db:migrate:undo:all"
```
