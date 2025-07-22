import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: {
        id: string;
    };
}

// GET a single item by ID
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = params;

        const item = await prisma.registryItem.findUnique({
            where: { id },
            include: {
                purchaseLinks: true,
                purchases: true,
            },
        });

        if (!item) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        return NextResponse.json(
            { error: 'Failed to fetch item' },
            { status: 500 }
        );
    }
}

// PATCH (update) an item
export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { id } = params;
        const body = await request.json();
        const { name, description, price, quantity, category, imageUrl, purchaseLinks } = body;

        // Check if item exists
        const existingItem = await prisma.registryItem.findUnique({
            where: { id },
        });

        if (!existingItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        // Update the item
        const updatedItem = await prisma.registryItem.update({
            where: { id },
            data: {
                name: name !== undefined ? name : undefined,
                description: description !== undefined ? description : undefined,
                price: price !== undefined ? parseFloat(price) : undefined,
                quantity: quantity !== undefined ? parseInt(quantity) : undefined,
                category: category !== undefined ? category : undefined,
                imageUrl: imageUrl !== undefined ? imageUrl : undefined,
            },
            include: {
                purchaseLinks: true,
                purchases: true,
            },
        });

        // Handle purchase links update if provided
        if (purchaseLinks && Array.isArray(purchaseLinks)) {
            // Delete existing links
            await prisma.purchaseLink.deleteMany({
                where: { itemId: id },
            });

            // Create new links
            for (const link of purchaseLinks) {
                await prisma.purchaseLink.create({
                    data: {
                        label: link.label,
                        url: link.url,
                        itemId: id,
                    },
                });
            }
        }

        // Fetch the updated item with all relations
        const finalItem = await prisma.registryItem.findUnique({
            where: { id },
            include: {
                purchaseLinks: true,
                purchases: true,
            },
        });

        return NextResponse.json(finalItem);
    } catch (error) {
        console.error('Error updating item:', error);
        return NextResponse.json(
            { error: 'Failed to update item' },
            { status: 500 }
        );
    }
}

// DELETE an item
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = params;

        // Check if item exists
        const existingItem = await prisma.registryItem.findUnique({
            where: { id },
        });

        if (!existingItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }

        // Delete related purchase links
        await prisma.purchaseLink.deleteMany({
            where: { itemId: id },
        });

        // Delete related purchases
        await prisma.purchase.deleteMany({
            where: { itemId: id },
        });

        // Delete the item
        await prisma.registryItem.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: 'Item deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting item:', error);
        return NextResponse.json(
            { error: 'Failed to delete item' },
            { status: 500 }
        );
    }
} 
