import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
    plugins: [pluginReact()],
    server: {
        open: false,
        port: 80,
    },
    html: {
        title: "Oncology Registry Automation",
    },
    dev: {
        progressBar: true,
    },
});
