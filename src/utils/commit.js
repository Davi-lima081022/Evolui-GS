import { Asset } from "expo-asset";

export async function getCommitInfo() {
  try {
    // Carrega commit.txt como asset
    const asset = Asset.fromModule(require("../../assets/commit.txt"));

    // Baixa o asset caso necessário
    await asset.downloadAsync();

    // Lê o conteúdo local
    const response = await fetch(asset.localUri);
    const content = await response.text();

    // Extrai hash e data
    const [hash, date] = content.split("\n");

    return {
      hash: hash?.trim() || "N/A",
      date: date?.trim() || "N/A",
    };
  } catch (error) {
    console.log("Erro ao ler commit.txt:", error);
    return {
      hash: "Erro",
      date: "Erro",
    };
  }
}
