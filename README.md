# pirple-nodejs-master-Homework-assignment-1

Solution of Assignment for NodeJs Master Class.

There is only one route called **/hello** at the moment. When you create **POST** request at that route, it will return a **Welcome Message**. If you have given a **query parameter** then it will check for **name** query and if it exists then It will return a welcome message with the provided name.

Any other routes than **/hello** will return a **not found** message and **Error Code - 404**.

- Code is written using ES6.

- To run, just clone the repo and run `node index.js` and test it with **Postman**.
