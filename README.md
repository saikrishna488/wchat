# wchat
A chat App where users can connect to random users and chat also users can create and join chatrooms with room code and username 

Sure! Here is a basic documentation for a chat app built using Node.js, Express, Socket.IO for the backend, and React, Next.js for the frontend.

Overview
The chat app allows users to connect with each other and chat in real-time. There are two main features of the app:

Random chat - Users can connect to a random user and chat with them.
Chat rooms - Users can create or join chat rooms with a unique room ID and chat with other users who are also in the same room.
Backend
The backend of the chat app is built using Node.js, Express, and Socket.IO. Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server.

Installation
To install the backend dependencies, run the following command:

lua
Copy code
npm install express socket.io
Configuration
The backend server can be configured in the server.js file. Here are the main configurations:

Server port: The port on which the server will listen for incoming connections.
Room ID length: The length of the unique ID for each chat room.
Maximum number of users per room: The maximum number of users that can join a single chat room.
User object structure: The structure of the user object that will be sent to the frontend.
API
The backend server exposes the following API endpoints:

/api/random: Connects the user to a random user for one-on-one chat.
/api/room/create: Creates a new chat room with a unique ID.
/api/room/:roomId/join: Joins an existing chat room with the given ID.
/api/room/:roomId/leave: Leaves the chat room with the given ID.
Socket.IO events
Socket.IO enables real-time communication between the browser and the server using events. The following events are used in the chat app:

connection: Triggered when a user connects to the server.
disconnect: Triggered when a user disconnects from the server.
join-room: Triggered when a user joins a chat room.
leave-room: Triggered when a user leaves a chat room.
message: Triggered when a user sends a message in a chat room.
Frontend
The frontend of the chat app is built using React and Next.js. The app is designed to be responsive and work on both desktop and mobile devices.

Installation
To install the frontend dependencies, run the following command:

lua
Copy code
npm install react next react-dom socket.io-client
Pages
The app has the following pages:

index.js: The landing page of the app. Allows users to choose between random chat or chat rooms.
random.js: The page for one-on-one random chat.
rooms.js: The page for creating or joining chat rooms.
room.js: The page for a specific chat room.
Components
The app has several reusable components that are used across the pages:

Header: The header of the app, which contains the logo and navigation links.
Footer: The footer of the app, which contains copyright information.
UserList: A list of users in a chat room.
ChatBox: The box where messages are displayed and new messages are typed.
Socket.IO client
The Socket.IO client is used to connect to the backend server and listen for events. The following events are used in the chat app:

connect: Triggered when the client connects to the server.
disconnect: Triggered when the client disconnects from the server.
join-room: Triggered when the client joins a chat room.
leave-room: Triggered when the client
message: Triggered when a message is received in a chat room.


Pages and Components
index.js
The landing page of the app displays two buttons, one for random chat and one for chat rooms. Clicking on either button will navigate the user to the corresponding page.

random.js
The random chat page connects the user to a random user and allows them to chat in a one-on-one conversation. The page consists of a header, a chat box, and a message input field. When a user sends a message, it is sent to the backend server using the message event.

rooms.js
The chat rooms page allows users to create or join a chat room. The page consists of a header, a list of existing chat rooms, and a form to create a new chat room. When a user creates a new chat room, a unique room ID is generated and sent to the backend server using the create-room event. When a user joins an existing chat room, they are redirected to the corresponding room.js page.

room.js
The chat room page displays the list of users in the room and the chat box. The page consists of a header, a user list component, and a chat box component. When a user sends a message, it is sent to the backend server using the message event.

Conclusion
This concludes the documentation for the chat app. It is important to note that this is just a basic implementation, and there are many ways to improve and customize the app based on specific requirements.
