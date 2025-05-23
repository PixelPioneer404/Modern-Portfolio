import { defineConfig } from "vite";

export default defineConfig({
    publicDir: "dist",
    server: {
        open: true,
    },
    build: {
        outDir: "dist",
    },
});