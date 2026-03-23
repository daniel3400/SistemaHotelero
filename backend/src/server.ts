import "dotenv/config";
import { buildApp } from "./app.js";
import { ensureAdminUser } from "./infrastructure/persistence/seed.js";

const { app, container } = buildApp();

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const start = async () => {
  await ensureAdminUser(container.repositories.userRepository);

  app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
  });
};

start().catch((error) => {
  console.error("No se pudo iniciar el servidor", error);
  process.exit(1);
});
