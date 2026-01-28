import { defineConfig } from "vite";

export default defineConfig({
    publicDir: "src",
    server: {
        open: true,
    },
    build: {
        outDir: "dist",
    },
});