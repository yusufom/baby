import { PrismaClient, Priority } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const items = [
    {
      name: 'Baby Monitor with Camera',
      description: 'High-definition video baby monitor with night vision and smartphone app connectivity',
      price: 129.99,
      imageUrl: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/baby-monitor-camera',
      category: 'Safety',
      priority: Priority.HIGH,
    },
    {
      name: 'Convertible Crib',
      description: '4-in-1 convertible crib that grows with your baby',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/convertible-crib',
      category: 'Furniture',
      priority: Priority.HIGH,
    },
    {
      name: 'Diapers - Size Newborn',
      description: 'Soft and gentle diapers for newborns (Pack of 84)',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/newborn-diapers',
      category: 'Diapers & Care',
      priority: Priority.HIGH,
    },
    {
      name: 'Baby Carrier',
      description: 'Ergonomic baby carrier for comfortable carrying',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/baby-carrier',
      category: 'Travel',
      priority: Priority.MEDIUM,
    },
    {
      name: 'Baby Bottles Set',
      description: 'BPA-free baby bottles with anti-colic system (6-pack)',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/baby-bottles-set',
      category: 'Feeding',
      priority: Priority.MEDIUM,
    },
    {
      name: 'Organic Baby Blanket',
      description: 'Soft organic cotton blanket perfect for swaddling',
      price: 34.99,
      imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/organic-baby-blanket',
      category: 'Clothing',
      priority: Priority.MEDIUM,
    },
    {
      name: 'Baby Bath Tub',
      description: 'Ergonomic baby bath tub with temperature indicator',
      price: 45.99,
      imageUrl: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/baby-bath-tub',
      category: 'Bath Time',
      priority: Priority.MEDIUM,
    },
    {
      name: 'Soft Plush Teddy Bear',
      description: 'Adorable and cuddly teddy bear made from hypoallergenic materials',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/plush-teddy-bear',
      category: 'Toys',
      priority: Priority.LOW,
    },
    {
      name: 'Baby Board Books Set',
      description: 'Collection of colorful board books perfect for babies',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/baby-board-books',
      category: 'Books',
      priority: Priority.LOW,
    },
    {
      name: 'Newborn Onesies Pack',
      description: '100% cotton onesies in various colors (6-pack)',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1522771930-78848d47b359?w=400&h=300&fit=crop',
      amazonUrl: 'https://amazon.com/newborn-onesies',
      category: 'Clothing',
      priority: Priority.MEDIUM,
      purchased: true,
      purchasedBy: 'Sarah Johnson',
      purchasedAt: new Date('2024-01-15'),
    }
  ]

  for (const item of items) {
    await prisma.item.create({
      data: item
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })