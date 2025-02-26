![Console example](/gRPC-title.png?raw=true "gRPC Fundamentals")

# gRPC Fundamentals

Welcome to the gRPC Fundamentals! This repository contains the source code and presentation materials used in the gRPC
Fundamentals, where we explore the basics of gRPC and its implementation in various programming languages.


Table of contents
=================

<!--ts-->

* [About](#about)
* [Assets Included](#assets-included)
* [Installation and Running Example Project](#example)
* [Credits](#credits)

<!--te-->

About
=====

The gRPC Fundamentals is designed to introduce developers to gRPC, an open-source remote procedure call (RPC) framework
developed by Google. It allows communication between different services in a simple and efficient way, making it a
powerful tool for building distributed systems.

Throughout the Fundamentals, we delve into a brief history of the RPC Framework, passing through the core concepts of gRPC,
including protocol buffers, unary and streaming RPCs,
error handling, and more. By the end of the Fundamentals, you'll have a good understanding of gRPC and be able to implement
it in your own projects.

Assets Included
===============
This repository includes the following assets:

1. **Presentation Slides**: The presentation slides used in the Fundamentals are available in PDF format. You can find them
   in the `presentation/` directory. Also, the presentation can be
   found [in this Google Slides](https://docs.google.com/presentation/d/1ISWf5k_wwGf1BKFwKisFd0gGvIRuIVwcP27U_Z5kO04/edit?usp=sharing).
2. **Code Examples**: We have provided a simple code example of the gRPC implementation using NodeJS. You can find it in
   the `code/` directory.

Installation and Running
========================
To run the code example and explore the Fundamentals materials, follow these steps:

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:
   ```bash
   git clone git@github.com:fiskolini/gRPC-fundamentals
   ```
2. **Install dependencies**:
    1. In order to run this solution locally, you have to have installed `npm` and `node` dependencies locally.
    2. Once you have them, install all the npm packages required to run it
       ```bash
       (cd code && npm install)
       ```
3. **Running solution**: To run solution, you can run two processes at the same time:
    1. **Server**: to run server, just run the following command: `npm run server --prefix code`
    2. **Client**: ro run the client, open a new terminal tab and run `npm run client:create --prefix code`. After every run, you should
       see a log on the terminal window from the server process (`New todo item added. { id: 1, text: THE_TODO_NAME }`).

Credits
=======
The gRPC Fundamentals and the materials provided in this repository were created in the scope of
multiple workshops and trainings lead by @fiskolini.
