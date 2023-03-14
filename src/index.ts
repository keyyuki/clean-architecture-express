import { config } from "dotenv";
config();
import { AppConfig } from "./app.config";
import { createApp } from "./apps/create-express-app";
import { createConnection } from "./infrastructure/database/create-connection";

function main() {
  const connection = createConnection(AppConfig.DB_URL);
  const app = createApp({ connection });
  app.listen(AppConfig.PORT, () => {
    console.log(
      `application start at port ${AppConfig.PORT}. Open link http://localhost:${AppConfig.PORT}`
    );
  });
}
main();
