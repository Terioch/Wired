# Wired

Wired is a messaging app built in React, PostgreSQL, Material UI and
Socket.io.

## General Information

This projects utilizes web sockets to form connections between multiple
clients, allowing them to create, leave and delete rooms as well as send
and receive messages. Authentication was implemented using JSON Web Tokens
and passwords are securely encrypted with Bcrypt. All relevant data is
stored within a remote PostgreSQL database consisting of tables named
Users, Rooms and Messages.

## Launch

The frontend was deployed on Vercel at https://wired-terioch.vercel.app/
and the backend via Heroku.
