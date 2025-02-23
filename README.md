# Library Management System

A full-stack library management system featuring a dashboard to view pending book returns on a given day. This project includes:

- **Server:** Node.js, Express, and Prisma ORM with MySQL with API Key Authentication.

- **Client:** Next.js application styled with Tailwind CSS.

## Setup Instructions

### Server

1. **Install dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `server` directory with:

   ```env
   DATABASE_URL="mysql://user:password@localhost:DB-PORT-NUMBER/YOUR-DB-NAME"
   API_KEY="YOUR-KEY"
   PORT=5000
   ```

3. **Prisma Setup:**
   Generate the Prisma client and migrate the database:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate

   ```

4. **Seed Sample Data:**
   To populate the database with sample data, run:

   ```bash
   node ./utils/seedData.js
   ```

5. **Start your Server:**
   ```bash
   npm run dev
   ```

### Client

1. **Install dependencies:**

   ```bash
   cd client
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the `client` directory with:

   ```env
   NEXT_PUBLIC_API_KEY=YOUR-KEY
   ```

3. **Start the Client:**

   ```bash
   npm run dev
   ```

4. **Navigate to the Application:**
   Open your browser at [http://localhost:YOUR-PORT-NUMBER](http://localhost:YOUR-PORT-NUMBER) and click on "Go to Dashboard" to view the pending book returns.

## Technologies Used

- **Server:** Node.js, Express, Prisma, MySQL
- **Client:** Next.js, Tailwind CSS
