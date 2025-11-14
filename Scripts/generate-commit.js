const fs = require("fs");
const { execSync } = require("child_process");

try {
  // Pegando hash e data
  const hash = execSync("git rev-parse HEAD").toString().trim();
  const date = execSync("git log -1 --format=%cd").toString().trim();

  // Criando objeto
  const commitInfo = { hash, date };

  // Salvando em assets
  fs.writeFileSync("./assets/commit.json", JSON.stringify(commitInfo, null, 2));

  console.log("commit.json atualizado com sucesso!");

} catch (error) {
  console.error("Erro ao gerar commit.json:", error);
  process.exit(1);
}
