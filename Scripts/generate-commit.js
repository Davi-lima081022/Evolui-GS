const fs = require("fs");
const { execSync } = require("child_process");

try {
  const hash = execSync("git rev-parse HEAD").toString().trim();
  const date = execSync("git log -1 --format=%cd").toString().trim();
  const commitInfo = { hash, date };
  fs.writeFileSync("./assets/commit.json", JSON.stringify(commitInfo, null, 2));

  console.log("commit.json atualizado com sucesso!");

} catch (error) {
  console.error("Erro ao gerar commit.json:", error);
  process.exit(1);
}
