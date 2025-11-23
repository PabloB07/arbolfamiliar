# 🌳 Árbol Familiar - Genealogic Tree Website

A beautiful and modern genealogic tree website built with Next.js 16, TypeScript, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Interactive Family Tree Visualization**: View your family history in a beautiful, animated tree structure
- **Member Management**: Add, edit, and delete family members with detailed information
- **Authentication**: Secure login and signup with Supabase Auth
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Beautiful Animations**: Smooth animations powered by Framer Motion
- **Modern UI**: Clean and intuitive interface built with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- A Supabase account

## 🛠️ Installation

1. **Clone the repository** (if using git) or navigate to the project directory:
   ```bash
   cd arbolfamiliar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to find your project URL and anon key
   - Go to Settings > Database to get your connection string

4. **Configure environment variables**:
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres?schema=public"
     ```
   - Use the **Direct connection** string (not the pooler) for Prisma migrations

5. **Set up Prisma** (for database migrations):
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push schema to database (or use migrations)
   npm run db:push
   # OR create a migration
   npm run db:migrate
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database & Auth**: Supabase
- **ORM & Migrations**: Prisma
- **Animations**: Framer Motion
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
arbolfamiliar/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── members/           # Family members page
│   ├── tree/              # Family tree visualization page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── FamilyTree.tsx     # Family tree visualization
│   ├── FamilyTreeNode.tsx # Individual tree node
│   ├── MemberForm.tsx     # Member add/edit form
│   ├── Navbar.tsx         # Navigation bar
│   └── Footer.tsx         # Footer component
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase server client
│   └── supabase-client.ts # Supabase client helpers
├── types/                 # TypeScript type definitions
│   ├── supabase.ts        # Supabase database types
│   └── family.ts          # Family-related types
└── supabase-schema.sql    # Database schema
```

## 🗄️ Database Schema

The application uses three main tables:

### profiles
- User profile information
- Linked to Supabase Auth

### family_members
- Detailed information about family members
- Includes birth/death dates, occupation, bio, etc.

### relationships
- Connects family members together
- Supports parent, spouse, sibling, and child relationships

## 🎨 Customization

### Colors
The primary color scheme uses emerald green. To change this, update the colors in:
- `app/globals.css` (CSS variables)
- Component className props (Tailwind classes)

### Fonts
The project uses Geist Sans and Geist Mono. To change fonts, modify `app/layout.tsx`.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to a Git repository
2. Import your repository on [Netlify](https://netlify.com)
3. Add build command: `npm run build`
4. Add publish directory: `.next`
5. Add your environment variables
6. Deploy!

## 📝 Development Roadmap

- [ ] Implement actual Supabase authentication
- [ ] Add photo upload functionality
- [ ] Create relationship management interface
- [ ] Add search and filter capabilities
- [ ] Export family tree as PDF/Image
- [ ] Add family events timeline
- [ ] Multi-language support
- [ ] Share family tree with others
- [ ] Import/Export GEDCOM files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- Framer Motion for beautiful animations

## 📞 Support

If you have any questions or need help, please open an issue on the repository.

---

Made with ❤️ for preserving family histories
