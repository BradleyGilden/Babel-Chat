# Babel-Chat - Realtime Chat App with Live Translation

<p align='center'>
<img width='200' src='./resources/chat.svg' />
</p>

<h1 align='center' color='blue'>BABEL CHAT</h1>

<p align="center">
    <a href="https://bchat.bradleygilden.tech">
    <img src="https://img.shields.io/badge/deployed_on_render-black?style=for-the-badge&logo=render&logoColor=white" />
    </a>
</p>

* [About](#about)
* [Demo](#demo)
* [Features](#features)
* [Technologies used](#technologies-used)
* [Important Path Descriptions](#important-path-descriptions)
* [Liscence](#license)
* [Blog](#blog)
* [Credits](#credits)

<div align="center">

## About

</div>

This is a web-based realtime chat application that allows users to communicate seamlessly across language barriers. Powered by advanced translation capabilities, users can send and receive messages in their preferred language while the app automatically translates the messages in real-time.

<div align="center">

## Demo

<a href='https://www.youtube.com/watch?v=j_6HYnIJuzI'>
<img width='500' src='./resources/thumbnail.png'>
</a>

</div>

<div align="center">

## Features

</div>

- ### Realtime chat functionality
  * Babel Chat utilizes the socket.io library to enable real time communication over the web
- ### Live translation of messages
  * the google-translate-api-x library is build ontop of googles translation api allowing for less rate limiting with free use using batch translations
- ### User-friendly interface
  * The interface was designed with inspiration from Slack and Discord allowing for users to be familiar with the layout
- ### Support for multiple languages
  * The application supports all languages supported by google translate

<div align="center">

## Technologies used

</div>

<img src='https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00'>
<img src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge'>
<img src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'>
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'>
<img src='https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white'>

### Backend

- **Express**: A minimal and flexible Node.js web application framework utilized for building the server-side logic.
- **Socket.io**: Enables real-time, bidirectional, and event-based communication between web clients and servers.
- **Swagger**: API documentation tool used for documenting the RESTful APIs of the application.
- **google-translate-api-x**: A translation API library integrated for translating messages in real-time.

### Frontend

- **Svelte**: A modern JavaScript framework utilized for building interactive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without having to leave your HTML.
- **Daisy UI**: A set of configurable components built on top of Tailwind CSS, used for enhancing UI design.

<div align="center">

## API Documentation

</div>

API documentation is available using Swagger. Once the server is running, access <a href='https://bchat-1-0.onrender.com/api'>https://bchat-1-0.onrender.com/docs</a> to view the API documentation.

<div align="center">

## Contributing

</div>

Contributions are welcome! Feel free to open issues or submit pull requests.


<div align="center">

## Credits

</div>

* [Custom Alerts - SweetAlert2](https://sweetalert2.github.io/)
* [Badges - Shields.io](https://shields.io)
* [Icons - remixicon.com](https://remixicon.com)

<div align="center">

## Blog

</div>
<p align="center">
    <img src="https://img.shields.io/badge/hashnode-2962ff?style=for-the-badge&logo=hashnode" />
    <img src="https://img.shields.io/badge/medium-black?style=for-the-badge&logo=medium" />
</p>
<p align="center">
<a href="https://www.buymeacoffee.com/comascript" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>
