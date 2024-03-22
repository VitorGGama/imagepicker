import { View, StatusBar, Button, Image, Text, Alert } from "react-native";
import { useState, useEffect } from "react";

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

export default function App() {
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (através do hook useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  /* Ao entrar no app, será executada a verificação de permissões de uso */
  useEffect(() => {
    /* Esta função mostrará um popup para o usuário perguntando
    se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto). */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  /* Ao pressionar o botão, executa esta função: */
  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  /* Função para compartilhar a foto */
  const compartilharFoto = async () => {
    if (foto && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(foto);
    } else {
      Alert.alert(
        "Compartilhamento não disponível",
        "Não é possível compartilhar a foto no momento."
      );
    }
  };

  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={escolherFoto} title="Escolher foto" />
        <Button onPress={acessarCamera} title="Tirar uma nova foto" />
        {foto && <Button onPress={compartilharFoto} title="📤" />}

        {foto ? (
          <Image source={{ uri: foto }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>Sem foto!</Text>
        )}
      </View>
    </>
  );
}
