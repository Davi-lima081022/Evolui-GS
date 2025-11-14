import * as FileSystem from 'expo-file-system/legacy';

export async function getCommitInfo() {
  const fileUri = FileSystem.documentDirectory + 'commit.txt';

  try {
    const exists = await FileSystem.getInfoAsync(fileUri);

    if (!exists.exists) {
      return { hash: "N/A", date: "N/A" };
    }

    const content = await FileSystem.readAsStringAsync(fileUri);

    const [hash, date] = content.split('\n');

    return {
      hash: hash || "N/A",
      date: date || "N/A"
    };
  } catch (error) {
    console.error("Erro ao ler commit.txt", error);
    return { hash: "N/A", date: "N/A" };
  }
}
