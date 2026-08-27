import { NextRequest } from 'next/server';
import { setMockSession, clearMockSession } from '@/lib/auth';
import { createErrorResponse, createSuccessResponse } from '@/lib/errors';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email } = body;

    if (action === 'logout') {
      await clearMockSession();
      return createSuccessResponse({ message: 'Logged out successfully' });
    }

    if (!email || typeof email !== 'string') {
      return createErrorResponse('VALIDATION_ERROR', 'Email is required');
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return createErrorResponse('VALIDATION_ERROR', 'User not found');
    }

    await setMockSession(user.role, user.id);

    return createSuccessResponse({
      message: 'Logged in successfully',
      role: user.role,
    });
  } catch {
    return createErrorResponse('INTERNAL_ERROR', 'Failed to process login');
  }
}
