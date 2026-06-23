import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Symbols that MUST NOT appear in the published bundle. These are internal
// business logic / security boundaries living in @rymi/shared-types. If the
// curated allowlist in src/index.ts ever transitively pulls one in, this fails.
const DENYLIST = [
    'MIN_GROSS_MARGIN',
    'REALTIME_MODEL_COST_PER_MIN',
    'STANDARD_MODEL_COST_PER_MIN',
    'BYOK_FLAT_RATE_PER_MIN',
    'ROLE_RATES_PER_MIN',
    'MODEL_TIER_CEILING',
    'stackFitsRole',
    'cheapestRoleForStack',
    'PUBLISHABLE_KEY_ALLOWED_SCOPES',
    'SECRET_KEY_ONLY_SCOPES',
    'SERVER_FLAG_REQUIRED_SCOPES',
    'validatePublishConfig',
    'ROLE_STACK_POLICY',
    'AGENT_CONFIG_SCHEMA',
    'CHANGE_SET_VALIDATORS',
    'DEPENDENCY_GRAPH',
    'QUEUE_RETRY_DEFAULTS',
    'deriveUsageIdempotencyKey'
];

describe('no sensitive symbol leaks into the published bundle', () => {
    let blob = '';

    beforeAll(() => {
        execSync('pnpm run build', { stdio: 'inherit', cwd: fileURLToPath(new URL('..', import.meta.url)) });
        for (const f of ['dist/index.js', 'dist/index.mjs', 'dist/index.d.ts']) {
            blob += readFileSync(fileURLToPath(new URL(`../${f}`, import.meta.url)), 'utf8');
        }
    }, 120_000);

    it.each(DENYLIST)('does not contain %s', (sym) => {
        expect(blob.includes(sym)).toBe(false);
    });
});
