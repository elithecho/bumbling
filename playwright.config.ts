import { defineConfig } from '@playwright/test';

export default defineConfig({
	globalSetup: './test/global-setup.ts',
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173
	},
	testDir: 'e2e',
	use: {
		headless: false,
	}
});
