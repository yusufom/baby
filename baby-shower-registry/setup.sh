#!/bin/bash

echo "🍼 Setting up Baby Shower Registry..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local 2>/dev/null || cat > .env.local << EOF
# Environment variables declared in this file are available at build-time and run-time.
# Next.js built-in support for loading environment variables from .env.local into process.env.

# Database - For local development, we'll use a simple connection string
# In production, replace this with your actual MongoDB connection string
DATABASE_URL="mongodb://localhost:27017/baby-shower-registry"

# Next.js (optional)
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
EOF
    echo "✅ .env.local created!"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🗄️  Setting up database..."

# Generate Prisma client
echo "🔨 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "📋 Pushing schema to database..."
npx prisma db push

# Seed database with sample data
echo "🌱 Seeding database with sample items..."
npm run db:seed

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 to see your baby shower registry!"
echo ""
echo "👶 Happy Baby Shower! 💕"