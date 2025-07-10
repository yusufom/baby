# Baby Shower Registry

A beautiful, responsive baby shower gift registry built with Next.js. Friends and family can browse items, click through to Amazon to purchase, and mark items as purchased.

## Features

- ✨ **Beautiful Design**: Soft baby-themed colors with gentle animations
- 📱 **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- 🛒 **Amazon Integration**: Direct links to Amazon for easy purchasing
- ✅ **Purchase Tracking**: Mark items as purchased with visual indicators
- 📊 **Progress Tracking**: See how many items have been purchased
- 💾 **Local Storage**: Items persist between sessions
- 🖼️ **Image Support**: Add product images for better visual appeal
- 🎨 **Modern UI**: Clean, elegant design with hover effects

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom baby-themed colors
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Storage**: Local Storage for data persistence

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

### Adding Items
1. Click the "Add New Item" button
2. Fill in the item details:
   - **Name**: The item name
   - **Price**: Optional price display
   - **Amazon Link**: Direct link to the Amazon product
   - **Description**: Optional description
   - **Image URL**: Optional product image
3. Click "Add Item" to save

### Purchasing Items
1. Browse the items in the registry
2. Click "Buy on Amazon" to open the product page
3. Purchase the item on Amazon
4. Return to the registry and click "Mark Purchased"

### Features Overview
- **Progress Bar**: Shows how many items have been purchased
- **Visual Indicators**: Purchased items show a checkmark and become slightly transparent
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Gentle hover effects and transitions

## Color Palette

The app uses a soft, baby-themed color palette:
- **Baby Blue**: #E3F2FD
- **Baby Pink**: #FCE4EC  
- **Baby Yellow**: #FFF8E1
- **Soft Blue**: #BBDEFB
- **Soft Pink**: #F8BBD9
- **Gentle Purple**: #E1BEE7

## Development

### Project Structure
```
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main registry page
├── lib/
│   └── utils.ts         # Utility functions
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies and scripts
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (Recommended)
- **Netlify**
- **Railway**
- **AWS Amplify**

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own baby shower!