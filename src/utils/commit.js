import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export const getCommitHash = async () => {
  try {
    // carrega o asset do commit.txt
    const asset = Asset.fromModule(require('../../assets/commit.txt'));
    await asset.downloadAsync();

    // lê o arquivo do localUri
    const content = await FileSystem.readAsStringAsync(asset.localUri);
    return content.trim();
  } catch (error) {
    console.log("Erro ao ler commit:", error);
    return "Hash não encontrado";
  }
};
