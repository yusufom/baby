# 👶 Baby Shower Registry

A beautiful, modern baby shower registry website built with Next.js, Tailwind CSS, React Query, Prisma, and MongoDB.

## ✨ Features

- **Beautiful Design**: Soft, baby-themed color palette with gentle pastels
- **Item Management**: Add, view, and mark items as purchased
- **Amazon Integration**: Direct links to Amazon for easy purchasing
- **Real-time Updates**: Using React Query for smooth data fetching
- **Responsive**: Works beautifully on all devices
- **Search & Filter**: Find items by name, category, or purchase status
- **Priority System**: Mark items as high, medium, or low priority
- **Purchase Tracking**: See who purchased what and when

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd baby-shower-registry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the setup script**
   ```bash
   ./setup.sh
   ```
   
   This will:
   - Create a `.env.local` file with default settings
   - Set up the database schema
   - Seed the database with sample items
   
4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Manual Setup

If you prefer to set up manually:

1. **Create environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/baby-shower-registry"
   
   # Next.js (optional)
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push the schema to your database
   npx prisma db push
   
   # (Optional) Seed with sample data
   npm run db:seed
   ```

## 🗄️ Database Setup

### Local MongoDB
If you're using local MongoDB, make sure it's running:
```bash
mongod
```

### MongoDB Atlas (Cloud) - Recommended for Production
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Replace the `DATABASE_URL` in your `.env.local` file (or set it as an environment variable in production)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/baby-shower-registry?retryWrites=true&w=majority
```

## 📱 Usage

1. **Add Items**: Click the "Add Item" button to add new items to your registry
2. **Amazon Links**: Include Amazon URLs so people can easily purchase items
3. **Mark as Purchased**: Visitors can mark items as purchased and leave their name
4. **Search & Filter**: Use the search bar and filters to find specific items
5. **Share**: Share the URL with friends and family

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Data fetching and state management
- **[Prisma](https://prisma.io/)** - Database ORM
- **[MongoDB](https://mongodb.com/)** - NoSQL database
- **[Framer Motion](https://framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 🎨 Design Features

- **Soft Color Palette**: Baby blues, soft pinks, and gentle yellows
- **Rounded Corners**: Modern, friendly design
- **Subtle Animations**: Gentle hover effects and transitions
- **Gradient Accents**: Beautiful gradients throughout the interface
- **Card-based Layout**: Easy to scan and visually appealing

## 📋 API Endpoints

- `GET /api/items` - Fetch all items
- `POST /api/items` - Create a new item
- `PATCH /api/items/[id]` - Update an item (mark as purchased)
- `DELETE /api/items/[id]` - Delete an item

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms
This is a standard Next.js application and can be deployed to any platform that supports Node.js.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for authentication (if added later) | No |
| `NEXTAUTH_URL` | Base URL of your application | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Acknowledgments

- Thanks to all the amazing open-source projects that made this possible
- Special thanks to the Next.js and Tailwind CSS teams
- Built with love for growing families everywhere 👶💕

---

**Happy Baby Shower! 🎉👶**
