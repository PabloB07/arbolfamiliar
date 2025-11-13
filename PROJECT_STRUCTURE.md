# 📁 Project Structure

```
arbolfamiliar/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── next.config.ts           # Next.js configuration
│   ├── eslint.config.mjs        # ESLint rules
│   ├── postcss.config.mjs       # PostCSS/Tailwind config
│   └── .gitignore               # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                # Main project documentation
│   ├── SETUP.md                 # Setup and installation guide
│   ├── FEATURES.md              # Complete feature list
│   └── PROJECT_STRUCTURE.md     # This file
│
├── 🗄️ Database
│   └── supabase-schema.sql      # Complete database schema
│
├── 🎨 app/ - Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar/Footer
│   ├── page.tsx                 # Home page with hero section
│   ├── globals.css              # Global styles and CSS variables
│   │
│   ├── 🔐 auth/                 # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── signup/
│   │       └── page.tsx         # Signup page
│   │
│   ├── 🌳 tree/                 # Family tree pages
│   │   └── page.tsx             # Tree visualization page
│   │
│   └── 👥 members/              # Family members pages
│       └── page.tsx             # Members list/grid page
│
├── 🧩 components/ - React Components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer component
│   ├── FamilyTree.tsx           # Tree visualization logic
│   ├── FamilyTreeNode.tsx       # Individual member node
│   └── MemberForm.tsx           # Add/Edit member form
│
├── 🔧 lib/ - Utility Functions
│   ├── supabase.ts              # Supabase server client
│   └── supabase-client.ts       # Supabase client + helpers
│
├── 📝 types/ - TypeScript Types
│   ├── supabase.ts              # Database table types
│   └── family.ts                # Family member interfaces
│
└── 📦 public/ - Static Assets
    ├── next.svg                 # Next.js logo
    ├── vercel.svg               # Vercel logo
    └── favicon.ico              # Site favicon
```

## 🗂️ File Descriptions

### Root Configuration

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies, scripts, and project metadata |
| `tsconfig.json` | TypeScript compiler options and path aliases |
| `next.config.ts` | Next.js build configuration |
| `eslint.config.mjs` | Code linting rules |
| `postcss.config.mjs` | PostCSS and Tailwind CSS setup |

### App Directory (`app/`)

The app directory follows Next.js 14+ App Router conventions:

| Path | Description | Type |
|------|-------------|------|
| `layout.tsx` | Root layout with navigation | Server Component |
| `page.tsx` | Landing page | Client Component |
| `globals.css` | Tailwind and custom styles | CSS |
| `auth/login/page.tsx` | Login form | Client Component |
| `auth/signup/page.tsx` | Registration form | Client Component |
| `tree/page.tsx` | Family tree visualization | Client Component |
| `members/page.tsx` | Member management | Client Component |

### Components (`components/`)

| Component | Purpose | Features |
|-----------|---------|----------|
| `Navbar` | Top navigation | Mobile menu, dark mode support |
| `Footer` | Bottom page footer | Links, contact info |
| `FamilyTree` | Tree visualization | Recursive rendering, modals |
| `FamilyTreeNode` | Single member display | Avatar, info card, animations |
| `MemberForm` | Add/Edit form | Full validation, modal |

### Library (`lib/`)

| File | Purpose | Functions |
|------|---------|-----------|
| `supabase.ts` | Server-side client | Database access on server |
| `supabase-client.ts` | Client-side helpers | Auth, CRUD operations |

### Types (`types/`)

| File | Purpose | Types |
|------|---------|-------|
| `supabase.ts` | Database schema types | Table definitions, enums |
| `family.ts` | Application types | FamilyMember, Relationship, TreeNode |

## 🎯 Key Patterns

### 1. Server vs Client Components

```typescript
// Server Component (default)
export default function Page() {
  return <div>Static content</div>
}

// Client Component (for interactivity)
'use client';
export default function InteractivePage() {
  const [state, setState] = useState();
  return <div>Interactive content</div>
}
```

### 2. Data Fetching

```typescript
// Client-side
import { getFamilyMembers } from '@/lib/supabase-client';

const { data, error } = await getFamilyMembers(userId);
```

### 3. Routing

```typescript
// Programmatic navigation
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/tree');

// Link component
import Link from 'next/link';
<Link href="/members">Members</Link>
```

### 4. Styling

```typescript
// Tailwind classes
<div className="bg-emerald-600 text-white rounded-lg p-4">

// Dark mode
<div className="bg-white dark:bg-gray-800">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 5. Animations

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{ scale: 1.05 }}
>
```

## 📊 Component Hierarchy

```
RootLayout
├── Navbar
├── Children (Page content)
│   ├── Home (/)
│   ├── Tree (/tree)
│   │   ├── FamilyTree
│   │   │   └── FamilyTreeNode (x N)
│   │   └── Stats Cards
│   ├── Members (/members)
│   │   ├── Search Bar
│   │   ├── Member Cards
│   │   └── MemberForm (modal)
│   └── Auth (/auth/*)
│       └── Login/Signup Forms
└── Footer
```

## 🔄 Data Flow

```
User Action
    ↓
React Component (Client)
    ↓
Supabase Client Helper
    ↓
Supabase API
    ↓
PostgreSQL Database
    ↓
Row Level Security Check
    ↓
Return Data
    ↓
Update UI (React State)
```

## 🎨 Styling System

### Color Palette

```css
/* Primary */
--primary: #10b981      /* Emerald 500 */
--primary-dark: #059669 /* Emerald 600 */

/* Secondary */
--secondary: #6366f1    /* Indigo 500 */

/* Neutrals */
--background: #ffffff   /* Light mode */
--foreground: #171717   /* Text */
--card-bg: #ffffff      /* Cards */
--border: #e5e7eb       /* Borders */

/* Dark Mode */
--background: #0a0a0a   /* Dark mode */
--foreground: #ededed   /* Text */
--card-bg: #1a1a1a      /* Cards */
--border: #2a2a2a       /* Borders */
```

### Spacing Scale

Using Tailwind's default spacing scale:
- `p-4` = 1rem (16px)
- `p-6` = 1.5rem (24px)
- `p-8` = 2rem (32px)
- etc.

### Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🔍 Finding Files

### "Where do I find...?"

| What | Where |
|------|-------|
| Page content | `app/[route]/page.tsx` |
| Shared UI | `components/[Component].tsx` |
| Database queries | `lib/supabase-client.ts` |
| Type definitions | `types/[name].ts` |
| Global styles | `app/globals.css` |
| Database schema | `supabase-schema.sql` |
| Config | Root `*.config.*` files |

### "Where do I add...?"

| What | Where |
|------|-------|
| New page | `app/[route]/page.tsx` |
| New component | `components/[Component].tsx` |
| New database helper | `lib/supabase-client.ts` |
| New type | `types/[name].ts` |
| CSS variable | `app/globals.css` |
| Dependency | `package.json` (via npm install) |

## 🎓 Code Style

### Naming Conventions

- **Components**: PascalCase (`FamilyTree.tsx`)
- **Files**: camelCase or kebab-case (`supabase-client.ts`)
- **Functions**: camelCase (`getFamilyMembers`)
- **Types**: PascalCase (`FamilyMember`)
- **Constants**: UPPER_CASE (`MAX_MEMBERS`)

### Import Order

```typescript
// 1. External packages
import { motion } from 'framer-motion';

// 2. Internal utilities/types
import { supabase } from '@/lib/supabase';
import type { FamilyMember } from '@/types/family';

// 3. Components
import Navbar from '@/components/Navbar';

// 4. Relative imports
import styles from './styles.module.css';
```

## 🚀 Development Workflow

1. **Make changes** to files
2. **Hot reload** sees changes instantly
3. **Check browser** for visual updates
4. **Check console** for errors
5. **Build** before deploying
6. **Deploy** to Vercel/Netlify

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion)

---

**Pro Tip**: Use `Ctrl/Cmd + P` in VS Code to quickly navigate between files!

