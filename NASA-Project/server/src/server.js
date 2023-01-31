const http = require("http");
const { start } = require("repl");
const app = require("./app");
const { loadPlanetsData, planets } = require("./models/planets.model");

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

startServer();
