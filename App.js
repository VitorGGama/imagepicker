import { View, StatusBar, Button, Image } from "react-native";
import { useState, useEffect } from "react";

//Importando os recursos da API nativa/móvel
import * as Imagepicker from "expo-image-picker";

export default function App(){

  /* State tradicional para armazenar a referencia da foto (quando existir) */
  const [foto, setFoto] = useState(null);

  /* State de checagem de permissões de uso (através do hook useCameraPermissions)*/
  const [status, requestPermission] = Imagepicker.useCameraPermissions();

  console.log(status);
}


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
