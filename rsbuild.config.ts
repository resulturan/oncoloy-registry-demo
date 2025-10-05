import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
    plugins: [pluginReact()],
    server: {
        open: false,
        port: 5003,
    },
    html: {
        title: "Oncology Registry Automation",
    },
    dev: {
        progressBar: true,
    },
});
