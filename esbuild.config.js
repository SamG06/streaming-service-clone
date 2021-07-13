import esbuildServe from 'esbuild-serve';

esbuildServe(
    {
        entry: './src/js/index.js',
        outdir: 'out',
    },
    {
        // serve options (optional)
        port: 7000,
        root: '.'
    }
);