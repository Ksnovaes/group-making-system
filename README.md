# Backend application for group making

This repository has the backend of an application I created for a college project (repository created for study purposes). It includes some APIs for user authentication, group creating, etc..

## Technologies used

- **Ⓜ️ Mongoose**: ODM for TypeScript & Node.js.
- **🐦 NestJS**: Framework for web applications
- **🟢 MongoDB**: Flexible and efficient non-relational database

## Local config

- **Follow the steps above**:

**1.** Clone the repository:
```bash
git clone https://github.com/Ksnovaes/group-making-system.git
```
**2.** Install the following dependencies:
```bash
npm install
# or 
yarn
# or
pnpm
```
**3.** Run the development server:
```bash
npm run start:dev
# or
yarn dev
# or
pnpm dev
```
**4.** Install postman:

We''ll manage/create our requisitions in postman, so install postman or any other API development (Insomnia, Postwoman, etc)

[Install clicking here](https://www.postman.com/downloads/)

Now that you have your postman successfully installed, you need to create a requisition, follow the image [here](https://prnt.sc/q0Gk3AC4ZbGi):

API will be available in `http://localhost:3000`
###### Copy this and paste in your postman

## API Endpoints

### User

- **POST /signup** - with this endpoint you can register
- **GET /login** - with this endpoint you can login

### Group

- **POST /create** - with this endpoint you can create groups
    - You will need authorization to create a group. Upon registration, you will receive a token. Use this token and place it in the value, just like in the image [here](https://prnt.sc/CsulHdVi5XVL).

- **GET /groups** - this endpoint will return all existent groups
- **GET /:id** - this endpoint will return a group by his id
- **PUT /:id** - with this endpoint you can update your group by his id 
- **DELETE /:id** - this endpoint will delete a group by his id

#### I created this project for learning purposes, as I still have some doubts in TypeScript and NestJS. I'm constantly seeking improvement to tackle larger projects. I welcome both criticism and praise for my project. You can also find me at:
##### [Linkedin](https://www.linkedin.com/in/ksnovaes81/)
##### Discord: kauanovaes
#### I aim to update this project and add more functionalities, and perhaps even integrate a frontend.
