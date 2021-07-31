import esbuild from "esbuild";
import babel from "esbuild-plugin-babel";

esbuild
  .build({
    entryPoints: ["./src/js/index.js"],
    bundle: true,
    outfile: "/out/out.js",
    watch: true,
    plugins: [babel()],
    // target: ['es5'] // if you target es5 with babel, add this option
  })
  .catch(() => process.exit(1));
