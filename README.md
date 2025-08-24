# EventEase - Event Planning and Management Tool

A modern, full-stack event management application built with Next.js 15, Supabase, and TypeScript. EventEase provides comprehensive tools for creating, managing, and tracking events with powerful RSVP management and analytics.

![EventEase Demo](https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

- **Authentication & Authorization**: Secure email-based authentication with role-based access control (Admin, Staff, Event Owner)
- **Event Management**: Create, edit, and delete events with comprehensive details
- **Public Event Pages**: Generate beautiful, shareable public URLs for each event
- **RSVP System**: Allow attendees to RSVP through public forms with automatic confirmation
- **Attendee Management**: Track and manage event attendees with export capabilities
- **CSV Export**: Export RSVP lists for further processing
- **Dashboard Analytics**: View event statistics and performance metrics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Role-Based Permissions**: Different access levels based on user roles

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel
- **Runtime**: Node.js v22.16.0

## 📋 Prerequisites

- Node.js v22.16.0 or later
- npm or yarn package manager
- Supabase account and project
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/eventeease.git
cd eventeease
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_database_url

# App Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

Initialize and deploy the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📊 Database Schema

The application uses the following main entities:

- **Users**: User accounts with role-based permissions
- **Events**: Event details with public URLs for sharing
- **RSVPs**: Event registrations from attendees

## 🔐 User Roles

- **Admin**: Full system access, can manage all events and users
- **Staff**: Can moderate events and manage attendees
- **Event Owner**: Can create and manage their own events

## 📱 Key Pages

- `/` - Landing page with features and pricing
- `/login` - User authentication
- `/register` - User registration
- `/dashboard` - Main dashboard for event management
- `/event/[publicUrl]` - Public event pages for RSVP

## 🔧 API Routes

- `GET /api/events` - List user's events
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get event details
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event
- `GET /api/events/[id]/rsvps` - Get event RSVPs
- `POST /api/events/[id]/rsvps` - Create new RSVP
- `GET /api/events/[id]/rsvps/export` - Export RSVPs as CSV

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

The application will be deployed at: `https://your-project-name.vercel.app`

## 🔧 Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── event/             # Public event pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client setup
│   ├── auth.ts           # Authentication helpers
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema
└── public/               # Static assets
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://eventeease-demo.vercel.app](https://eventeease-demo.vercel.app)
- **GitHub**: [https://github.com/johnsmith/eventeease](https://github.com/johnsmith/eventeease)
- **LinkedIn**: [https://linkedin.com/in/johnsmith](https://linkedin.com/in/johnsmith)

## 👤 Author

**John Smith**
- GitHub: [@johnsmith](https://github.com/johnsmith)
- LinkedIn: [John Smith](https://linkedin.com/in/johnsmith)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for backend services and authentication
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Prisma](https://prisma.io/) for type-safe database access
- [Vercel](https://vercel.com/) for seamless deployment

---

Made with ❤️ by [John Smith](https://github.com/johnsmith)