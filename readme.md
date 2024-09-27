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

<img src="./accessories/archeticture.drawio.svg" style="border-radius: 15px;" />

## 💾 Database Design

[Preview](https://dbdiagram.io/d/Inventory-App-66752fb95a764b3c720e3f9e)

## 📘 API Documentation

After you run the App you can find API Docs in route: http://localhost:3000/api-docs

## 🔧 Install Instructions

### 📦 Using `NPM` Package Manager

1. Clone the Repo

```bash
    git clone https://github.com/ahmedmohmd/inventory-app
```

```bash
    cd inventory-app
```

2. Add Your Desired Environment Variables in `.env` File

```typescript
// JWT Configs
JWT_SECRET: string;

// Database ceredintials
DB_URL: string;

// Email Provider Credentials (Gmail)
MAIL_USERNAME: string;
MAIL_PASSWORD: string;
MAIL_PORT: string;
MAIL_HOST: string;
SENDER_EMAIL: string;

// Cloudinary
CLOUDINARY_CLOUD_NAME: string;
CLOUDINARY_API_KEY: string;
CLOUDINARY_API_SECRET: string;
```

3. Install Dependencies

```bash
    npm install
```

4. Create Database postgres and Called it `inventory`.

   - Open the Temrinal
   - Write: `psql -U <your username>`
   - Type your password if desired
   - write: `create database if not exists inventory`
   - write: `exit`

5. Apply Drizzle Schema on created Database

```bash
    npx drizzle-kit push
```

6. Run the APP

```bash
    npm run start:dev
```

### 🐋 Using Docker

1. Clone the Repo

```bash
    git clone https://github.com/ahmedmohmd/inventory-app
```

```bash
    cd inventory-app
```

2. Add necessary Environemnt Variables in `docker-compose.yaml` file

```typescript
// JWT Configs
JWT_SECRET: string;

// Database ceredintials
DB_URL: string;

// Email Provider Credentials (Gmail)
MAIL_USERNAME: string;
MAIL_PASSWORD: string;
MAIL_PORT: string;
MAIL_HOST: string;
SENDER_EMAIL: string;

// Cloudinary
CLOUDINARY_CLOUD_NAME: string;
CLOUDINARY_API_KEY: string;
CLOUDINARY_API_SECRET: string;
```

3. Run Docker Compose Command

```
    docker-compose up
```

4. Apply `drizzle` schema on the database

```bash
    docker-compose exec inventory npx drizzle-kit push
```

## 🖥️ Usage

1. Moderators can order any quantity of products from their suppliers
2. Order related so specific warehouse
3. When any action happened, email sent to the target employer
4. Products are organized by categories
5. Products are organized in the storage area by sections
6. Products have at least 4 screenshots
7. Users can reset his password

## 🏋️ Challanges

- **Relations in Elastic Search**

  💪 **Problem**

       I am using **Postgres** as my primary database, which follows a relational model. This has presented challenges when mapping my relational tables into **Elasticsearch** indexes since **Elasticsearch** is not designed to handle complex relationships natively.

  💡 **Solution**

       I explored two potential solutions:

            1. **Embed Documents in Elasticsearch Directly:**
                Initially, I tried embedding related documents directly in **Elasticsearch**, which seemed like a good solution at first, but I encountered some issues later.

            2. **Separate Each Table into Its Own Index:**
                I then removed the embedded documents and created individual indexes for specific tables.

  🤔 **Why**

  When I first chose the embedding approach, I used **Elasticsearch** scripts to keep the embedded children and their fields synchronized with the main database. This worked fine initially, but as the data grew more complex, issues started to arise. Tables with deeply nested children—often spanning more than one level—became difficult to manage. For instance, the `products` table had an array of children, which made synchronizing the data between **Elasticsearch** and the main database increasingly complicated.

  As a result, I shifted to a different solution. I created separate indexes for just the `products` and `orders` tables, adding only the essential data to these indexes, while keeping the rest of the tables in the main database.

  For search operations like `findAll` and `search`, I fetch data from these **Elasticsearch** indexes. However, for more granular methods like `findOne`, I left them as-is in the main database, as there would be no significant advantage in moving these queries to **Elasticsearch**.

  What about the embedded documents and relations? I decided to discard them. I realized that when retrieving products and related tables, they are often returned as arrays of items. In most cases, I don’t need all the detailed data upfront. Basic information suffices for listing pages, and I can fetch the full details for each item on its dedicated page, directly from the main database.

  This solution allows me to implement efficient **Search** and **Filtering** features with minimal effort, while avoiding the complexities of deeply nested relationships in **Elasticsearch**.

## 🏠 Offecial Project's Home Page

[Inventory App](https://ahmedmohmd.vercel.app/projects/inventory-app)
