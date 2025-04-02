/**
 * Hash a password using Bun's built-in password hashing.
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function passHash(password: string): Promise<string> {
  return await Bun.password.hash(password);
}

/**
 * Verify a password against its hash using Bun's built-in password verification.
 * @param password - The plain text password to verify
 * @param hash - The hashed password to verify against
 * @returns True if the password matches the hash, false otherwise
 */
export async function passVerify(password: string, hash: string): Promise<boolean> {
  return await Bun.password.verify(password, hash);
}
