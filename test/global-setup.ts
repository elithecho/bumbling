import { execSync } from 'child_process';

async function globalSetup() {
  // Pass the test database URL directly via the environment without overwriting your .env
  execSync('bun prisma db push', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'file:./test.db' }
  });
}

export default globalSetup;
