import { NextResponse } from 'next/server'

export async function GET() {
  // This would typically fetch from a database
  // For now, return sample data
  const sampleItems = [
    {
      id: '1',
      name: 'Baby Monitor',
      description: 'Smart baby monitor with night vision and two-way audio',
      amazonLink: 'https://www.amazon.com/dp/B08N5WRWNW',
      price: '$89.99',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
      isPurchased: false
    },
    {
      id: '2',
      name: 'Diaper Bag',
      description: 'Large capacity diaper bag with changing pad and insulated bottle pockets',
      amazonLink: 'https://www.amazon.com/dp/B07FZ8S74R',
      price: '$45.99',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
      isPurchased: false
    },
    {
      id: '3',
      name: 'Baby Bottles Set',
      description: 'Set of 6 anti-colic baby bottles with slow flow nipples',
      amazonLink: 'https://www.amazon.com/dp/B00X4WHP5E',
      price: '$24.99',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L._AC_SL1500_.jpg',
      isPurchased: false
    }
  ]

  return NextResponse.json(sampleItems)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // This would typically save to a database
    // For now, just return the item with an ID
    const newItem = {
      id: Date.now().toString(),
      ...body,
      isPurchased: false
    }

    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}