import { RefillingTokenBucket } from "$lib/server/rate-limit";
import { validateSession, setSessionCookie, deleteSessionCookie } from "$lib/server/hooks/session";
import { sequence } from "@sveltejs/kit/hooks";
import { paraglideMiddleware } from '$lib/paraglide/server';
import prisma from "$lib/server/db";

import type { Handle } from "@sveltejs/kit";

const bucket = new RefillingTokenBucket<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
	// Note: Assumes X-Forwarded-For will always be defined.
	const clientIP = event.request.headers.get("X-Forwarded-For");
	if (clientIP === null) {
		return resolve(event);
	}
	let cost: number;
	if (event.request.method === "GET" || event.request.method === "OPTIONS") {
		cost = 1;
	} else {
		cost = 3;
	}
	if (!bucket.consume(clientIP, cost)) {
		return new Response("Too many requests", {
			status: 429
		});
	}
	return resolve(event);
};

const authHandle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get("session") ?? null;
	if (sessionId === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSession(sessionId);
	if (session !== null) {
		setSessionCookie(event, session.id, session.expiresAt);
	} else {
		deleteSessionCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};

import { getCenterFromAdmin, getCenterFromCookie } from "$lib/server/hooks/central";

const centralHandle: Handle = async ({ event, resolve }) => {
	// Check if the user is admin and center assigned
	if (event.locals.user && event.locals.user.role === "ADMIN") {
		const center = await getCenterFromAdmin(event.locals.user.id);

		event.locals.center = center;
	}

	// if user is SUPER_ADMIN, see if center is assigned
	if (event.locals.user && event.locals.user.role === "SUPER_ADMIN") {
		const center = await getCenterFromCookie(event)
		event.locals.center = center
	}

	return resolve(event);
}

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});


export const handle = sequence(rateLimitHandle, authHandle, handleParaglide, centralHandle);
