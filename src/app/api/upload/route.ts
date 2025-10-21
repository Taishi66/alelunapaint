import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db/connection';
import { content } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'alelunapaint-super-secure-jwt-secret-key-2024-development';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'cv' or 'image'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    let fileName: string;
    let allowedTypes: string[];
    let maxSize: number;

    if (fileType === 'image') {
      // Image upload (for hero section)
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      maxSize = 4 * 1024 * 1024; // 4MB
      const ext = file.name.split('.').pop() || 'jpg';
      fileName = `hero-${Date.now()}.${ext}`;
    } else {
      // PDF upload (for CV)
      allowedTypes = ['application/pdf'];
      maxSize = 4 * 1024 * 1024; // 4MB
      fileName = `cv-${Date.now()}.pdf`;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: `Only ${fileType === 'image' ? 'image files (JPG, PNG, WebP)' : 'PDF files'} are allowed` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: `File size must be less than ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    });

    // Update database with the new URL
    if (fileType === 'cv') {
      // Get the active content record
      const activeContentResult = await db.select().from(content).where(eq(content.isActive, true)).limit(1);
      const activeContent = activeContentResult[0];

      if (activeContent) {
        await db.update(content)
          .set({
            contactCvPath: blob.url,
            updatedAt: new Date()
          })
          .where(eq(content.id, activeContent.id));
      }
    } else if (fileType === 'image') {
      // Update hero image in database
      const activeContentResult = await db.select().from(content).where(eq(content.isActive, true)).limit(1);
      const activeContent = activeContentResult[0];

      if (activeContent) {
        await db.update(content)
          .set({
            heroImage: blob.url,
            updatedAt: new Date()
          })
          .where(eq(content.id, activeContent.id));
      }
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: { path: blob.url }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
