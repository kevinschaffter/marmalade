import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "mock-api",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === "/api/users") {
            const { handleUsers } = await import("./src/api/users");
            await handleUsers(req, res);
            return;
          }
          if (req.url === "/api/user-details") {
            const { handleUserDetails } = await import("./src/api/userDetails");
            await handleUserDetails(req, res);
            return;
          }
          next();
        });
      },
    },
  ],
});
