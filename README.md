# Wired

Wired is a full-stack messaging app built in React and Node with
PostgreSQL, Material UI and Socket.io.

## General Information

This project incorporates RESTful architecture and utilizes web sockets to
form connections between multiple clients, allowing them to create, leave
and delete rooms as well as send and receive messages. Authentication was
implemented using JSON Web Tokens and passwords are securely encrypted with
Bcrypt. All relevant data is stored within a remote PostgreSQL database
consisting of tables named Users, Rooms and Messages.

## Launch

This application was deployed on Heroku at
https://wired-terioch.herokuapp.com
