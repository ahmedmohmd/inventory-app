# Inventory App

## 🚀 Brief Overview

Inventory Management API built with Node.js and TypeScript, providing comprehensive functionality for handling suppliers, users, products, and orders. Employers can place orders for product quantities from suppliers, manage order statuses, and streamline the entire inventory workflow. The API includes robust features like documentation, testing, and scalable architecture, making it ideal for businesses seeking efficient inventory control. Fully tested and optimized for performance, it's a flexible solution for modern inventory needs.

## ✨ Key Features

1. Well Organized and Clean code thanks to TypeScript, Prettier and ESlint tools.
2. Clean Archeticture thanks to Modular Monolothic Arch.
3. Strong Authentication Feature thanks to JWT Strategy.
4. Logging with **rotation** Fetaure thanks to Winston.
5. Awesome performance for Database operations thanks to **Drizzle**.
6. Easy to start as a container with **Doecker** and **docker-compose**.

## 🛠️ Tech Stack

- Node.js
- Typescript
- **Drizzle** as ORM
- **Postgres** as Main DB
- **Docker** and **docker-compose** for Containerization
- **Nginx** as Reverse Proxy
- **Multer** as mail library with **Gamil** as Mail Provider
- **Winston** as logging library (with rotation feature)
- **Swagger** as Docs Solution

## 🏗️ Architecture

<img src="./accessories/archeticture.drawio.svg" style="width: 750px; height: 750px;border-radius: 15px;" />

## 💾 Database Design

[Preview](https://dbdiagram.io/d/Inventory-App-66752fb95a764b3c720e3f9e)

## 📘 API Documentation

After you run the App you can find API Docs in route: http://localhost:3000/api-docs

## 🔧 Install Instructions

### Using `NPM` Package Manager

1. Clone the Repo

```bash
    git clone https://github.com/ahmedmohmd/inventory-app
```

```bash
    cd inventory-app
```

2. Install Dependencies

```bash
    npm install
```

3. Run the APP

```bash
    npm run start:dev
```

### Using Docker

1. Clone the Repo

```bash
    git clone https://github.com/ahmedmohmd/inventory-app
```

```bash
    cd inventory-app
```

2. Run Docker Compose Command

```
    docker-compose up
```

## 🖥️ Usage

1. Moderators can order any quantity of products from their suppliers
2. Order related so specific warehouse
3. When any action happened, email sent to the target employer
4. Products are organized by categories
5. Products are organized in the storage area by sections
6. Products have at least 4 screenshots
7. Users can reset his password

## 🏠 Offecial Project's Home Page

[Inventory App](https://ahmedmohmd.vercel.app/projects/inventory-app)
