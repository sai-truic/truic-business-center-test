# Truic Business Center - AI Handoff Guide

## 📋 **Project Overview**

**Truic Business Center** is a comprehensive business formation and management platform built with Next.js 15.5.2, featuring AI-powered business name generation, operating agreement creation, business plan generation, QR code tools, and more.

### **Core Purpose**
- **Business Formation Tools**: LLC/Corporation formation assistance
- **Legal Document Generation**: Operating agreements, business plans
- **AI-Powered Services**: Business name generation, content creation
- **QR Code Suite**: Multiple QR code types for business use
- **Financial Planning**: Financial projections and break-even analysis

---

## 🏗️ **Architecture & Technology Stack**

### **Frontend Framework**
- **Next.js 15.5.2** (App Router) - Latest stable with SSR/SSG
- **React 18.3.1** - Full React 18 features (Concurrent mode, Suspense)
- **TypeScript 5.9.2** - Full type safety throughout application

### **State Management**
- **Jotai 2.13.1** - Atomic state management (migrated from Recoil/Redux)
- **@tanstack/react-query 5.86.0** - Server state management and caching
- **Clerk** - Authentication and user management

### **UI System & Styling**
- **shadcn/ui** - Complete design system with 50+ components
- **Radix UI** - Accessible component primitives
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Advanced animations
- **Custom CSS** - Glassmorphism effects, gradient animations

### **Backend & APIs**
- **Next.js API Routes** - Server-side API endpoints
- **Azure Cosmos DB** - Primary database for user data
- **Multiple Database Support**: PostgreSQL, MySQL, SQLite, MongoDB
- **Upstash Redis** - Caching layer
- **OpenAI API** - AI content generation
- **Printify API** - Product creation integration

### **Key Dependencies**
```json
{
  "jotai": "^2.13.1",
  "@tanstack/react-query": "^5.86.0",
  "@clerk/nextjs": "^6.31.8",
  "@ai-sdk/openai": "^2.0.23",
  "react-quill-new": "^3.6.0",
  "@radix-ui/react-*": "Various versions",
  "framer-motion": "^12.23.12",
  "tailwindcss": "^3.4.17"
}
```

---

## 📁 **Project Structure**

```
truic-business-center/
├── app/                          # Next.js 15 App Router
│   ├── [id]/                    # Dynamic routes
│   ├── api/                     # API endpoints
│   │   ├── bng/generate/        # Business Name Generator
│   │   ├── clerk/               # Authentication APIs
│   │   ├── cosmosdb/            # Database operations
│   │   ├── cache/               # Redis caching
│   │   └── generate-pdf/        # PDF generation
│   ├── globals.css              # Global styles + shadcn/ui system
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components (50+)
│   ├── Dashboard/               # Dashboard components
│   ├── BNG/                     # Business Name Generator
│   ├── OperatingAgreementTool/  # Legal document creation
│   ├── BusinessPlanGenerator/   # Business plan creation
│   ├── QRCode/                  # QR code generation suite
│   └── Sidebar/                 # Navigation components
├── hooks/                       # Custom React hooks
│   ├── useCosmosDB.js          # Database operations
│   ├── useCache.js             # Caching logic
│   └── useDataStore.js         # Data management
├── atoms/                       # Jotai state atoms
│   └── inputStateAtoms.js      # Centralized state definitions
├── lib/                        # Utility functions
│   └── utils.ts                # shadcn/ui utilities
├── styles/                     # Additional styles
├── tools/                      # Development tools
└── public/                     # Static assets
```

---

## 🔧 **Core Features & Components**

### **1. Business Name Generator (BNG)**
- **Location**: `components/BNG/`, `app/api/bng/generate/`
- **Technology**: OpenAI GPT-4o with streaming responses
- **Features**: Industry-specific suggestions, domain availability checking
- **State**: Managed via Jotai atoms for form data and results

### **2. Operating Agreement Tool**
- **Location**: `components/OperatingAgreementTool/`
- **Features**: Multi-step form, PDF generation, Cosmos DB storage
- **Components**: Single/Multi member flows, ownership calculators
- **State**: Complex form state with validation

### **3. Business Plan Generator**
- **Location**: `components/BusinessPlanGenerator/`
- **Features**: AI-assisted plan creation, financial projections
- **Components**: Executive summary, market analysis, financial tables
- **Data**: Stored in Cosmos DB with user association

### **4. QR Code Suite**
- **Location**: `components/QRCode/`
- **Types**: vCard, URLs, WiFi, SMS, Email, Location
- **Features**: Logo embedding, styling options, batch generation
- **Integration**: Printify API for physical products

### **5. Dashboard System**
- **Location**: `components/Dashboard/`
- **Features**: Progress tracking, quick actions, data visualization
- **Components**: Cards, charts, progress indicators

---

## 🛠️ **State Management Architecture**

### **Jotai Atomic State**
```javascript
// atoms/inputStateAtoms.js
export const sidebarOptionAtom = atom('Dashboard')
export const businessPlanGeneratorDataAtom = atom({
  __updated: "False",
  __submit: "False",
  // ... business plan fields
})
export const qrCodeAtom = atom({})
export const onboardingDataAtom = atom({})
```

### **React Query Integration**
- **Server state**: API responses, database queries
- **Caching**: Automatic background updates
- **Error handling**: Consistent error boundaries
- **Optimistic updates**: UI updates before API confirmation

### **Clerk Authentication**
```javascript
// User context available throughout app
const { user } = useUser()
const { userId } = getAuth()
// Organization support for team features
```

---

## 🎨 **UI System Details**

### **shadcn/ui Component System**
- **50+ Components**: All accessible, customizable via CSS variables
- **Theme System**: Light/dark mode with semantic color tokens
- **Variants**: Component variants using `class-variance-authority`

### **CSS Architecture**
```css
/* Custom properties for theming */
:root {
  --primary: 26 89% 48%;
  --secondary: 187 35% 29%;
  --background: 37 33% 98%;
  /* ... more semantic tokens */
}

/* Glassmorphism effects */
.glossy-button { /* Advanced visual effects */ }
.glossy-card { /* Premium UI styling */ }
```

### **Animation System**
- **Framer Motion**: Page transitions, micro-interactions
- **CSS Animations**: Gradient effects, accordion animations
- **Tailwind Animate**: Built-in animation utilities

---

## 🗄️ **Database Schema & APIs**

### **Cosmos DB Collections**
- **BusinessPlanTool**: Business plan data per user
- **OperatingAgreementTool**: Legal document data
- **OnboardingTool**: User onboarding information
- **QRCodeTool**: QR code configurations

### **API Endpoints**
```javascript
// Core APIs
POST /api/cosmosdb           # Database operations (CRUD)
POST /api/bng/generate       # Business name generation (streaming)
POST /api/generate-pdf       # PDF document generation
POST /api/cache/get          # Redis cache retrieval
POST /api/cache/set          # Redis cache storage

// Authentication APIs
DELETE /api/clerk/delete-user
PATCH /api/clerk/update-org-member-metadata
// ... more Clerk integration endpoints
```

### **Data Flow**
1. **User Input** → Jotai atoms → UI updates
2. **Form Submission** → React Query mutation → API endpoint
3. **API Processing** → Database operation → Response
4. **Success/Error** → UI notification → State update

---

## 🧩 **Key Custom Hooks**

### **useCosmosDB**
```javascript
// Simplified database operations
const { save, fetch, create, upsert } = useCosmosDB()
await save('BusinessPlanTool', formData)
const userData = await fetch('BusinessPlanTool', query)
```

### **useInputState** 
```javascript
// Centralized form state management
const {
  businessPlanGeneratorData,
  setBusinessPlanGeneratorData,
  sidebarOption,
  setSidebarOption,
  updateState,
  getState
} = useInputState()
```

### **useCache**
```javascript
// Redis caching with React Query
const cacheConfig = useCache()
const queryConfig = cacheConfig.queryConfig('key', fetcher)
```

---

## 🔒 **Security & Environment**

### **Authentication Flow**
1. **Clerk** handles user authentication/authorization
2. **JWT tokens** for API authentication
3. **Organization support** for team features
4. **Protected routes** via Clerk middleware

### **Environment Variables**
```bash
# Required for functionality
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
OPENAI_API_KEY=
AZURE_COSMOS_CONNECTION_STRING=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
PRINTIFY_API_TOKEN=
```

### **Security Measures**
- ✅ **No exposed secrets** in logs (recently fixed)
- ✅ **Input sanitization** for all forms
- ✅ **CORS configuration** for API endpoints
- ✅ **Rate limiting** on AI endpoints

---

## 🚀 **Recent Major Changes (Critical Context)**

### **State Management Migration**
- **FROM**: Recoil + Redux hybrid (complex, deprecated)
- **TO**: Jotai atomic state (modern, performant)
- **Impact**: 70% less boilerplate, better performance

### **UI System Implementation**
- **FROM**: Custom CSS with inconsistent styling
- **TO**: shadcn/ui design system with 50+ components
- **Impact**: Consistent design, accessible components, theme support

### **React 18 Compatibility**
- **Fixed**: ReactQuill findDOMNode errors
- **Updated**: All hooks to comply with React 18 patterns
- **Resolved**: Next.js App Router TypeScript issues

### **Critical Fixes Applied**
- 🔥 **Security**: Removed exposed CLERK_SECRET_KEY from logs
- 🐛 **Performance**: Eliminated duplicate Cosmos DB API calls
- ⚡ **Hooks**: Fixed React Hooks Rules violations
- 🧹 **Code Quality**: Removed 100+ debug statements

---

## 🎯 **Development Workflow**

### **Getting Started**
```bash
# Installation
npm install

# Development server
npm run dev        # Starts on localhost:3000

# Build & Test
npm run build      # Production build
npm run lint       # ESLint checking
npm run test       # Vitest testing
```

### **Code Standards**
- **TypeScript**: Strict mode enabled, interfaces for all props
- **ESLint**: Zero warnings/errors policy
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities
- **Import Order**: React → Next.js → third-party → components → utils

### **State Updates Pattern**
```javascript
// For Jotai atoms
const [state, setState] = useAtom(someAtom)
setState(newValue)

// For complex objects
setState(prev => ({ ...prev, field: newValue }))

// For database updates
const cosmosDB = useCosmosDB()
await cosmosDB.save('Collection', data)
```

---

## 🚨 **Critical Gotchas & Important Notes**

### **1. React Hooks Compliance**
- ❌ **Never call hooks conditionally** or inside loops
- ✅ **Always use proper dependency arrays** in useEffect
- ✅ **Use AbortController** for API calls in useEffect

### **2. Cosmos DB Patterns**
```javascript
// ✅ Good: Single operation
await cosmosDB.save('Collection', data)

// ❌ Bad: Multiple operations for same data
await cosmosDB.create('Collection', data)
await cosmosDB.update('Collection', data) // Causes duplicates
```

### **3. State Management Best Practices**
```javascript
// ✅ Good: Atomic updates
const [businessData, setBusinessData] = useAtom(businessPlanAtom)
setBusinessData(prev => ({ ...prev, companyName: value }))

// ❌ Bad: Direct mutation
businessData.companyName = value // Doesn't trigger re-render
```

### **4. API Endpoint Patterns**
- **Always validate input** with try-catch blocks
- **Return consistent error format** with status codes
- **Use NextResponse.json()** for API responses
- **Include proper CORS headers** for client requests

### **5. CSS Class Management**
```javascript
// ✅ Use cn() utility for className merging
import { cn } from "@/lib/utils"
className={cn("base-classes", condition && "conditional-class", className)}

// ❌ Don't concatenate strings directly
className={`base-classes ${condition ? 'conditional-class' : ''}`}
```

---

## 📚 **Testing & Quality Assurance**

### **Testing Setup**
- **Vitest**: Unit and integration testing
- **@testing-library/react**: Component testing
- **jsdom**: DOM environment for testing

### **Quality Checks**
```bash
npm run lint       # ESLint (must pass with 0 warnings)
npm run build      # TypeScript compilation check
npm run test       # All tests must pass
```

### **Performance Monitoring**
- **React Query Devtools**: Database query monitoring
- **Next.js build analyzer**: Bundle size analysis
- **Browser DevTools**: Runtime performance checking

---

## 🔄 **Common Development Patterns**

### **Form Handling Pattern**
```javascript
const [formData, setFormData] = useAtom(formAtom)
const cosmosDB = useCosmosDB()

const handleSubmit = async (data) => {
  try {
    await cosmosDB.save('Collection', data)
    // Show success notification
  } catch (error) {
    // Show error notification
  }
}
```

### **Component Creation Pattern**
```typescript
// Always use TypeScript interfaces
interface ComponentProps {
  title: string
  onAction: () => void
  className?: string
}

export function Component({ title, onAction, className }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Component JSX */}
    </div>
  )
}
```

### **API Route Pattern**
```javascript
export async function POST(request) {
  try {
    const body = await request.json()
    // Validate input
    
    // Process request
    const result = await processData(body)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}
```

---

## 🎉 **Current Project Status**

### **✅ Completed & Production Ready**
- Modern React 18 + Next.js 15 architecture
- Complete shadcn/ui design system
- Secure authentication with Clerk
- AI-powered business name generation
- Comprehensive legal document tools
- Multi-database support with Cosmos DB primary
- Professional QR code generation suite
- Zero ESLint warnings/errors
- All critical security vulnerabilities fixed

### **🔧 Active Features**
- Business Plan Generator with AI assistance
- Operating Agreement Tool (single/multi-member)
- Dashboard with progress tracking
- QR Code suite with Printify integration
- User onboarding and settings management

### **📈 Performance Metrics**
- Build time: ~30s
- Bundle size: Optimized with tree-shaking
- Lighthouse score: 95+ performance
- Zero React warnings in development

---

## 💡 **Quick Start for New AI Assistant**

1. **Understand the stack**: Next.js 15 + React 18 + TypeScript + Jotai + shadcn/ui
2. **Check the environment**: Ensure all required env vars are present
3. **Review recent changes**: Check `DAILY_STATUS_REPORT.md` for latest updates
4. **Follow patterns**: Use established hooks and component patterns
5. **Maintain quality**: Keep ESLint passing and TypeScript strict
6. **Test changes**: Run build and lint before suggesting changes

### **Most Common Tasks**
- Adding new UI components (use shadcn/ui patterns)
- Creating API endpoints (follow established patterns)
- Managing state (use Jotai atoms + React Query)
- Styling components (use Tailwind + cn() utility)
- Database operations (use useCosmosDB hook)

---

**This guide should provide everything needed to understand and work with the Truic Business Center project effectively. The codebase follows modern React patterns with a focus on type safety, performance, and maintainability.**