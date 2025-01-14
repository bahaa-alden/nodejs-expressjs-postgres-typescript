# nodejs-expressjs-postgres-typescript

this reop is a Node.js application built with Express.js, PostgreSQL, Passport.js , prisma , typeScript, and JWT authentication.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bahaa-alden/nodejs-expressjs-postgres-typescript.git
   or
   git clone https://github.com/MahamdSirafi/nodejs-expressjs-postgres-typescript.git
   ```

2. **Install Dependencies**

   ```bash
   cd nodejs-expressjs-postgres-typescript
   yarn install
   ```

3. **Set Up PostgreSQL**

   - Make sure PostgreSQL is installed and running on your machine.
   - If not installed, you can download and install it from PostgreSQL Official Website.
   - Start PostgreSQL service.

4. **Environment Variables**

   - Create a .env file in the root directory.
   - Add the following environment variables to the .env file:

   - ```makefile
     NODE_ENV=development/production
     PORT=3000
     DATABASE_URL="postgresql://postgres:123@localhost:5432/dbName?schema=public"
     JWT_SECRET=your_jwt_secret_key
     JWT_ACCESS_EXPIRATION=jwt_expire_time
     ```

5. **Run the Application**

```bash
yarn build
yarn start
```

or

```bash
yarn watch
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
