## Document
**POST Options**
 - Create User ( Log in automatically afterward) :
      ```javascript 
      var request = require("request");

    var options = { method: 'POST',
      url: 'http://task-manager-duani.herokuapp.com/users',
      headers: 
       {'cache-control': 'no-cache',
         'Content-Type': 'application/json' },
      body: 
       { name: 'John Doe',
         'age ': 4,
         email: 'joan@doe.com',
         password: 'theRealDoe995' },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

   ```

 - Create a new Task (After logged in) :
     ```javascript 
         var request = require("request");
            
            var options = { method: 'POST',
              url: 'http://task-manager-duani.herokuapp.com/tasks',
              headers: 
               {'cache-control': 'no-cache',
                 'Content-Type': 'application/json' },
              body: { description: 'Task Name here' },
              json: true };
            
            request(options, function (error, response, body) {
              if (error) throw new Error(error);
            
              console.log(body);
    });
    ```
    
 - Upload Avatar/Profile Picture:
    ```javascript 
    var request = require("request");
    var options = { method: 'POST',
      url: 'http://task-manager-duani.herokuapp.com/users/me/avatar',
      headers: 
       {'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Singular User logout (available only when logged in ):
    ```javascript 
    var request = require("request");

    var options = { method: 'POST',
      url: 'http://task-manager-duani.herokuapp.com/users/logout',
      headers: 
       { 'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Logout all logged-in Users:
    ```javascript 
    var request = require("request");

    var options = { method: 'POST',
      url: 'http://task-manager-duani.herokuapp.com/users/logoutAll',
      headers: 
       {'cache-control': 'no-cache',
         'Content-Type': 'application/x-www-form-urlencoded' },
      form: false };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

    ```
 
**GET Options**

 - User login:
    ```javascript 
        var request = require("request");

    var options = { method: 'GET',
      url: 'http://task-manager-duani.herokuapp.com/users/login',
      headers: 
       {'cache-control': 'no-cache',
         'Content-Type': 'application/json' },
      body: { email: 'john@doe.com', password: 'theRealDoe995' },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Read my Profile:
    ```javascript 
    var request = require("request");

    var options = { method: 'GET',
      url: 'http://task-manager-duani.herokuapp.com/users/me',
      headers: 
       {'cache-control': 'no-cache',
         'Content-Type': 'application/json' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Read Get my Avatar/Profile Pic:
    ```javascript 
    
    var request = require("request");

    var options = { method: 'GET',
      url: 'http://task-manager-duani.herokuapp.com/me',
      headers: 
       { 'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Read Profile:
    ```javascript 
    
    var request = require("request");
    
    var options = { method: 'GET',
      url: 'http://task-manager-duani.herokuapp.com/users/<USER-ID>',
      headers: 
       { 'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
    ```
    
 - Read all my Tasks: 
    ```javascript 
        var request = require("request");
    
        var options = { method: 'GET',
          url: 'http://task-manager-duani.herokuapp.com/tasks',
          qs: { sortBy: 'createdAt:asc', completed: 'true' },
          headers: 
           { 'cache-control': 'no-cache' } };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });
    ```
    
 - Read a Singular Task:
    ```javascript 
    var request = require("request");
        var options = { method: 'GET',
          url: 'http://task-manager-duani.herokuapp.com/tasks/<TASK-ID>',
          headers: 
           {'cache-control': 'no-cache' } };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });
    ```
 
**PATCH Options**

 - UPDATE User:
     ```javascript 
             var request = require("request");
            
            var options = { method: 'PATCH',
              url: 'http://task-manager-duani.herokuapp.com/users/me',
              headers: 
               { 'Postman-Token': 'b5f7a84b-d4d9-40b1-a1d7-8d85e272d810',
                 'cache-control': 'no-cache',
                 'Content-Type': 'application/json' },
              body: { name: 'Tamir', age: '28' },
              json: true };
            
            request(options, function (error, response, body) {
              if (error) throw new Error(error);
            
              console.log(body);
            });
     ```
 
 - UPDATE Task:
     ```javascript 
     var request = require("request");
    
    var options = { method: 'PATCH',
      url: 'http://task-manager-duani.herokuapp.com/tasks/<TASK-ID>',
      headers: 
       { 'cache-control': 'no-cache',
         'Content-Type': 'application/json' },
      body: { completed: true },
      json: true };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

    ```
 
**DELETE Options** 
 - DELTE User (Must be logged-in): 
 ``` javascript
     var request = require("request");

        var options = { method: 'DELETE',
          url: 'http://task-manager-duani.herokuapp.com/users/me',
          headers: 
           {'cache-control': 'no-cache' } };
        
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          console.log(body);
        });
 ```
 
  - DELTE Task by ID: 
 ``` javascript 
     var request = require("request");
    
    var options = { method: 'DELETE',
      url: 'http://task-manager-duani.herokuapp.com/tasks/<TASK-ID>',
      headers: 
       {'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

 ```
   - DELTE Profile Picture/ Avatar: 
 ``` javascript 
     var request = require("request");

    var options = { method: 'DELETE',
      url: 'http://task-manager-duani.herokuapp.com/users/me/avatar',
      headers: 
       { 'cache-control': 'no-cache' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

 ```