import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.registryItem.findMany({
            include: {
                purchaseLinks: true,
                purchases: true,
            },
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch items' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, quantity, category, imageUrl, purchaseLinks } = body;

        // Validate required fields
        if (!name || !quantity || !category || !imageUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create the item with nested purchase links
        const item = await prisma.registryItem.create({
            data: {
                name,
                description,
                price: price ? parseFloat(price) : null,
                quantity: parseInt(quantity),
                category,
                imageUrl,
                purchaseLinks: {
                    create: purchaseLinks || [],
                },
            },
            include: {
                purchaseLinks: true,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        return NextResponse.json(
            { error: 'Failed to create item' },
            { status: 500 }
        );
    }
} 
