# Overview

Oria Dawn is a mobile-responsive website that serves as a dual-purpose platform combining financial analytics tools with youth empowerment programs. The site features two main branches: "Oria Dawn Analytics" for market intelligence and trading systems, and "Oria Dawn R.I.S.E." for heart-centered youth programs. The application is built as a full-stack web application using React for the frontend and Express.js for the backend, with a focus on modern design aesthetics and smooth user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## Contact Form Enhancements (January 2025)
- Updated "Work With Me" button to link directly to /contact page
- Modified contact form with specific service dropdown options: Custom App Build, System Consulting, Trading/Market Analysis, Other
- Implemented mailto functionality with prefilled contact@oriadawn.xyz
- Added form validation for required fields
- Enhanced user experience with proper error handling

## Image Integration and Display Improvements (January 2025)
- Replaced all stock photos on RISE page with authentic user-provided images showing actual program activities
- Fixed image import paths using proper ES6 imports for reliable display across all pages
- Implemented object-contain display for RISE photos to show complete images without cropping
- Generated custom retro sun design for Analytics page using teal-orange-cream brand colors
- Removed duplicate repetitive images, creating cleaner visual presentation
- Enhanced image sizing and positioning for optimal viewing on all devices

## Content Strategy Update (January 2025)
- Updated homepage messaging to focus on "Maximize your potential" theme
- Implemented question-driven approach: "What can you imagine? What would you like to create? What problem would you like to solve?"
- Emphasized "building tomorrow's tools today" through visionary prompt engineering
- Updated Analytics page to reflect problem-solving focus
- Added comprehensive list of services: Applications, Alert systems, Intelligent Bots, Analytics/strategies, RISE program

# System Architecture

## Frontend Architecture
The client-side application is built using **React** with **TypeScript** and utilizes modern React patterns including hooks and functional components. The frontend employs **Vite** as the build tool and development server, providing fast hot module replacement and optimized production builds. The application uses **Wouter** for client-side routing, which is a lightweight alternative to React Router.

**State Management**: The application uses **TanStack React Query** for server state management, handling API calls, caching, and data synchronization. Local component state is managed through React's built-in useState and useEffect hooks.

**UI Framework**: The interface is built with **shadcn/ui** components, which are built on top of **Radix UI** primitives. This provides a comprehensive set of accessible, customizable components following modern design patterns. The styling system uses **Tailwind CSS** for utility-first styling with custom CSS variables for theming.

**Typography and Design**: The application implements a sophisticated design system with serif fonts (Playfair Display) for headlines and rounded sans-serif fonts (Nunito) for body text. The color palette includes custom brand colors like deep green, soft beige, and accent colors for different sections.

## Backend Architecture
The server is built using **Express.js** with **TypeScript**, following RESTful API principles. The server handles contact form submissions and can be extended for additional API endpoints.

**API Structure**: Currently implements a single POST endpoint (`/api/contact`) for handling contact form submissions with proper validation using Zod schemas.

**Error Handling**: Centralized error handling middleware captures and formats errors consistently across the application.

**Development Features**: The development setup includes request logging, response time tracking, and integration with Vite's development server for seamless full-stack development.

## Data Storage Solutions
The application uses **Drizzle ORM** as the database abstraction layer with **PostgreSQL** as the primary database. The current implementation includes:

**Schema Design**: Defines users and contact submissions tables with proper typing and validation schemas using Drizzle and Zod integration.

**Migration System**: Uses Drizzle Kit for database migrations and schema management, with migrations stored in a dedicated directory.

**Connection Management**: Configured for PostgreSQL with Neon Database serverless integration for cloud deployment.

**Development Storage**: Includes an in-memory storage implementation for development and testing purposes.

## Authentication and Authorization
The current implementation includes basic user schema structure but authentication is not yet fully implemented. The system is prepared for user-based authentication with username/password fields defined in the database schema.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database service using `@neondatabase/serverless` for cloud-hosted database functionality
- **Drizzle ORM**: Modern TypeScript ORM for database operations and schema management

## UI and Styling Libraries
- **Radix UI**: Comprehensive collection of low-level UI primitives for building accessible design systems
- **shadcn/ui**: Pre-built component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent iconography throughout the application
- **class-variance-authority**: Utility for creating variant-based component APIs

## Development and Build Tools
- **Vite**: Modern build tool and development server with React plugin support
- **TypeScript**: Static type checking for improved code quality and developer experience
- **ESBuild**: Fast JavaScript bundler used by Vite for production builds
- **PostCSS**: CSS processing tool with Autoprefixer for cross-browser compatibility

## Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library for form data and API endpoints
- **@hookform/resolvers**: Integration layer between React Hook Form and validation libraries

## External Services Integration
- **Google Fonts**: Custom font loading for Playfair Display and Nunito typography
- **Unsplash**: Image service for high-quality stock photography used in the RISE program section
- **Replit Integration**: Development environment integration with runtime error overlays and cartographer tools for debugging

The architecture emphasizes modern web development practices with strong TypeScript integration, accessible UI components, and a scalable foundation for adding additional features like user authentication, payment processing, and expanded analytics capabilities.