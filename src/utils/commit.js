import commitInfo from "../../assets/commit.json";

export async function getCommitInfo() {
  try {
    return {
      hash: commitInfo.hash || "N/A",
      date: commitInfo.date || "N/A",
    };
  } catch (error) {
    console.log("Erro ao carregar commit.json:", error);
    return {
      hash: "Erro",
      date: "Erro",
    };
  }
}
