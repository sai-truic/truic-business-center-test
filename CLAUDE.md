# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- `pnpm run dev` - Run development server (Next.js + Flask API)
- `pnpm run next-dev` - Run only Next.js frontend
- `pnpm run flask-dev` - Run only Flask API
- `pnpm run build` - Build the application
- `pnpm run lint` - Run linting
- `pnpm run test` - Run all Jest tests
- `npx jest <path/to/test>` - Run specific test file
- `npx cypress open` - Open Cypress test runner

## Code Style Guidelines
- Use TypeScript for new components when possible
- React components use PascalCase, other files use camelCase
- React hooks prefix with `use` (useEffect, useState, custom hooks)
- Import order: React, next, third-party libraries, components, utils/helpers
- For UI components, prefer Tailwind CSS for styling
- Use functional components with hooks instead of class components
- Use React Hook Form for form handling and validation
- Error handling: use try/catch blocks with specific error messages
- Prefer async/await over Promise chains
- Use destructuring for props and state
- For TypeScript components, define interfaces for props and state