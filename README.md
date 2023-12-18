Chat Application Documentation
INTRODUCTION- Real time Chat app for chatting with friends of friend list. Registered user can send messages to its list of friends (all the other registered user). User can like and delete messages and navigate to home without disturbing its existing chat.
Following are components of app
Pages-
•	Register page- Handle registration of new
•	Login page- Handle login of registered user
•	Home page – After successful registration redirected to home where list of other users with button to initiate chat
•	Chat page- Display chat between selected user and login user with like and delete button.
Redux 
•	Chatreducer- For updating the state and action of chat like send message, receive message, like, delete and for clearing the state once user is toggled to other user.
•	Store- integrated in parent node.
Models
•	Users- model for saving registered users with token.
•	Messages- for storing message before clearing the state.
Routes
•	Auth- For validating the registration id and password
•	User- for creating and sending logged user id and token
•	Friendlist- For retrieving the list of registered user for chat
Server- For connection apis for above routes
Socket- For updating chat in real-time .

INSTALLATION-
Packages needs to install to run application-
1.	Install node.js 
2.	Install dependent packages using 
For chat store and real-time chat-
o	npm install redux react-redux 
o	npm install socket.io-client 
o	npm install socket.io 
o	npm install react-router-dom
o	npm install cors
For friendlist display packages 
o	npm install joi-password-complexity
o	npm install bcrypt
o	npm install jsonwebtoken    
o	npm install axios  
o	npm install express
o	npm install mongoose
o	npm install cors

For styling
o	npm install bootstrap react-bootstrap
o	npm install react-icons
o	npm install react-avatar
CONFIGURATION-
1.	server.js file for database connection and routes (port no:5000)
2.	socket.js file for chat connection with socket server (port no: 8080)
3.	Client(reactapp) in local host server(port no 3000)
4.	MongoDB local server used. Configuration file is db.js
Mongoose database named admin used.Schemas such as users.js used 
STEPS
1.	After installing required packages run the react app using npm start after coming to project directory
2.	Run server.js file and socket.js file using nodemon filename.
3.	For friend list, first need to register.
4.	Duplicate the local host tab from one tab login a user(let test) and from another tab login another user(test2).
5.	After login select the another logged in user to chat to see real-time message. For example test user chat with test2 and test2 chat with test. To start chat one need to click chat icon
6.	Send message using send button
7.	For deleting message press delete button.
8.	For liking the message press like.

LOGIN PAGE-
![image](https://github.com/NiharikPatel/chat-application/assets/132447067/a98c7b95-9c9a-4804-983a-a1b5e8cc1adb)

 

USER 1 LOGIN (TEST)
![image](https://github.com/NiharikPatel/chat-application/assets/132447067/019b62dc-6ace-499e-a2c5-4eb189aa65f1)

 




USER 1(Test)CHAT MESSAGES with USER2(Neha)
 
![image](https://github.com/NiharikPatel/chat-application/assets/132447067/64197643-d4cd-4ba6-a9f4-f50ab4f9107d)

 ![image](https://github.com/NiharikPatel/chat-application/assets/132447067/f88f5c98-891f-4f46-a1fe-a4a2eb14b435)





USER2 LOGIN (NEHA)
 
![image](https://github.com/NiharikPatel/chat-application/assets/132447067/fa049831-9477-46c0-8a90-48461b3b732d)

USER 2(Neha)CHAT MESSAGES with USER2(Test)

![image](https://github.com/NiharikPatel/chat-application/assets/132447067/bcc722ee-7212-47db-bccd-526a070d952c)

 

