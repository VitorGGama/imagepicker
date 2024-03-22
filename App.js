import { View, StatusBar, Button, Image } from "react-native";
import { useState, useEffect } from "react";

/* Importando os recursos da API nativa/móvel */
import * as ImagePicker from "expo-image-picker";

export default function App() {
  /* State tradicional para armazenar a referência da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (através do hook useCameraPermission) */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  console.log(status);

  /* Ao entrar no app, será executada a verificação de permissões de uso */
  useEffect(() => {
    /* Esta função mostrará um popup para o usuário perguntando
    se ele autoriza a utilização do recurso móvel (no caso, selecionar/tirar foto). */
    async function verificaPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      /* Ele dando autorização (granted), isso será armazenado
      no state de requestPermission. */
      requestPermission(cameraStatus === "granted");
    }

    verificaPermissoes();
  }, []);

  return (
    <>
      <StatusBar />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Escolher foto" />
        <Image style={{ width: 300, height: 300 }} />
      </View>
    </>
  );
}
