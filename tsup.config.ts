import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    // JS only. Declarations are produced by api-extractor (see package.json
    // build script) which inlines @rymi/shared-types' types via `bundledPackages`
    // into a single self-contained dist/index.d.ts. tsup's own dts bundler can't
    // disambiguate shared-types' `export *` barrel. This is a TYPE-ONLY package;
    // no runtime values are re-exported from shared-types (that would drag in its
    // side-effectful internal module graph and leak business logic).
    dts: false,
    splitting: false,
    sourcemap: true,
    clean: true
});
