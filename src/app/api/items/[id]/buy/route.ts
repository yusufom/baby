import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function POST(request: Request, { params }: RouteParams) {
    try {
        const { id } = params;
        const body = await request.json();
        const { name, message, quantity } = body;

        // Validate required fields
        if (!name || !quantity || quantity < 1) {
            return NextResponse.json(
                { error: 'Name and quantity are required' },
                { status: 400 }
            );
        }

        // Check if item exists
        const item = await prisma.registryItem.findUnique({
            where: { id },
            include: { purchases: true },
        });

        if (!item) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        // Check if there are enough items available
        const purchasedQuantity = item.purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
        const availableQuantity = item.quantity - purchasedQuantity;

        if (quantity > availableQuantity) {
            return NextResponse.json(
                { error: `Only ${availableQuantity} items available` },
                { status: 400 }
            );
        }

        // Create purchase record
        const purchase = await prisma.purchase.create({
            data: {
                name,
                message,
                quantity: parseInt(quantity.toString()),
                itemId: id,
            },
        });

        // Return updated item with purchases
        const updatedItem = await prisma.registryItem.findUnique({
            where: { id },
            include: {
                purchases: true,
                purchaseLinks: true,
            },
        });

        return NextResponse.json({
            purchase,
            item: updatedItem,
        });
    } catch (error) {
        console.error('Error marking item as purchased:', error);
        return NextResponse.json(
            { error: 'Failed to mark item as purchased' },
            { status: 500 }
        );
    }
} 
