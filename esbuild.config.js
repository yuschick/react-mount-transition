require('esbuild')
    .build({
        bundle: true,
        entryPoints: ['src/index.ts'],
        minify: true,
        outfile: 'dist/index.ts',
    })
    .catch(() => process.exit(1));
