# Hercules Gym Management System Backend

Hercules is a comprehensive NestJS + PostgreSQL backend solution designed for modern gym management. It provides robust APIs for managing gym operations, including user management, session scheduling, workout programs, and payment processing.

## 🏗️ Core Features

- **Role-Based Authentication** - JWT-based auth with admin, trainer, and client roles
- **User Management** - Complete CRUD operations for users with role-specific permissions
- **Session Scheduling** - Book, manage, and track training sessions
- **Workout Program Management** - Create and assign customized workout plans
- **Payment Integration** - Support for membership payments and billing
- **Reporting & Analytics** - Generate insights on members, trainers, and revenue

## 🛠️ Technology Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest + Supertest
- **Containerization**: Docker support

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/HesamMarshal/hercules-backend.git
   cd hercules-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=hercules_db
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. **Database Setup**

   ```bash
   # Create database (ensure PostgreSQL is running)
   createdb hercules_db

   # Run migrations
   npm run migration:run
   ```

5. **Start the application**

   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run start:prod
   ```

## 🚀 API Documentation

Once the application is running, access the Swagger API documentation at:
`http://localhost:3000/api`

## 📁 Project Structure

```
src/
├── modules/          # Feature modules
│   ├── auth/        # Authentication
│   ├── user/        # User management
│   ├── plan/        # Workout plans
│   ├── exercise/    # Exercise catalog
│   └── session/     # Session management
├── common/          # Shared utilities
│   ├── decorators/  # Custom decorators
│   ├── guards/      # Authentication guards
│   └── interfaces/  # TypeScript interfaces
└── database/        # Database configuration
    ├── migrations/  # Database migrations
    └── seeds/       # Data seeding
```

## 🔐 Authentication

The API uses JWT authentication. Include the token in requests:

```
Authorization: Bearer <your_token>
```

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🐳 Docker Support

Build and run with Docker:

```bash
# Build the image
docker build -t hercules-backend .

# Run the container
docker run -p 3000:3000 hercules-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Hercules** - Powering modern gym management systems with robust backend technology.
