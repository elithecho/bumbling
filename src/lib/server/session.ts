import { randomBytes } from 'crypto';
import prisma from './db';
import type { RequestEvent } from '@sveltejs/kit';

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

export async function validateSession(sessionId: string): Promise<{ session: Session | null; user: any | null }> {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session) {
    return { session: null, user: null };
  }

  // Check if session has expired
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: { id: session.id }
    });
    return { session: null, user: null };
  }

  // Extend session if it's close to expiring (15 days)
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: newExpiresAt }
    });
    session.expiresAt = newExpiresAt;
  }

  return { session, user: session.user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({
    where: { id: sessionId }
  });
}

export async function invalidateUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId }
  });
}

export function setSessionCookie(event: RequestEvent, sessionId: string, expiresAt: Date): void {
  event.cookies.set('session', sessionId, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt
  });
}

export function deleteSessionCookie(event: RequestEvent): void {
  event.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0
  });
}

export function generateSessionId(): string {
  return randomBytes(32).toString('hex');
}

export async function createSession(userId: string): Promise<Session> {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
  const session = await prisma.session.create({
    data: {
      id: generateSessionId(),
      userId,
      expiresAt
    }
  });
  return session;
}
