import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Priority } from '@prisma/client'

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: [
        { purchased: 'asc' }, // Show unpurchased items first
        { priority: 'desc' }, // High priority first
        { createdAt: 'desc' }  // Newest first
      ]
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, imageUrl, amazonUrl, category, priority } = body

    if (!name || !amazonUrl) {
      return NextResponse.json(
        { error: 'Name and Amazon URL are required' },
        { status: 400 }
      )
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        price: price ? parseFloat(price) : null,
        imageUrl,
        amazonUrl,
        category,
        priority: priority as Priority || Priority.MEDIUM,
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    )
  }
}