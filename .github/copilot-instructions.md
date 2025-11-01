# AI Agent Instructions for Backend API Project

## Project Overview
This is a Node.js/Express.js REST API project using MongoDB as the database. The project follows a layered architecture with routes, controllers, and models.

### Key Components
- `models/` - Mongoose schemas defining data structure
- `controllers/` - Business logic and request handling
- `routes/` - API endpoint definitions
- `index.js` - Main application setup and middleware configuration

## Architecture Patterns

### API Structure
- RESTful endpoints follow `/api/{resource}` pattern
- Resources: users, products, reviews, inquiries
- Controllers handle business logic
- Models define MongoDB schemas using Mongoose
- JWT authentication middleware in `index.js`

### Authentication & Authorization
```javascript
// JWT token format in Authorization header
Authorization: Bearer <token>

// Token payload structure
{
  firstName: string,
  lastName: string,
  email: string,
  role: "admin" | "customer",
  profilePicture: string,
  phone: string
}
```

### Role-Based Access
```javascript
// Use these helper functions for role checks
isItAdmin(req)     // Checks if user is admin
isItCustomer(req)  // Checks if user is customer
```

## Development Workflow

### Environment Setup
1. Requires MongoDB connection string in `.env`:
   ```
   MONGO_URL=<your-mongodb-url>
   SECRET_KEY=<jwt-secret-key>
   ```
2. Install dependencies: `npm install`
3. Start development server: `npm start` (runs on port 3003)

### Common Patterns
- All routes are prefixed with `/api`
- Controllers use async/await with try-catch for error handling
- Models include validation rules in Mongoose schemas
- Authentication errors return 401, validation errors 400, not found 404

### Database Conventions
- Collection names are plural (users, products, reviews, inquiries)
- Required fields use Mongoose's `required: true`
- Schemas include field validation (e.g. email format, enum values)

## Integration Points
- MongoDB database (configure via MONGO_URL)
- JWT authentication (configure via SECRET_KEY)
- bcrypt for password hashing
- File uploads for profile pictures (URL storage only)

## Common Tasks
- Adding new API endpoint: Create route, controller function, update model if needed
- User authentication: Check JWT token in Authorization header
- Role-based access: Use `isItAdmin()` or `isItCustomer()` helper functions
- Error handling: Use HTTP status codes consistently (400, 401, 404, 500)