import React, { useState } from "react";
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import Toast from "react-native-toast-message";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
}
  from "react-native";
// Pre-step, call this before any NFC operations
NfcManager.start();
function MyNfcManager() {
  const [PassportNo, setPassportNo] = useState<string>("");
  const [Birth, setBirth] = useState("");
  const [Expiry, setExpiry] = useState("");
  const [result, setResult] = useState<string>("No exist");
  async function readNdef() {
    console.log("------------->");
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (tag != undefined) {
        const msg: string = String(tag?.ndefMessage);
        setResult(msg);
      }
      // console.warn('Tag found', tag);
      Toast.show({
        type: 'success',
        text1: 'OK!',
        text2: 'Tag Detected!',
        position: 'top',
        visibilityTime: 2000,
      });
    } catch (ex) {
      // console.warn('Corrupted while scanning', ex);
      Toast.show({
        type: 'error',
        text1: 'Notification',
        text2: 'No NFC Tag',
        position: 'top',
        visibilityTime: 2000,
      });
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'NFC Scanning Stopped!',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#555555"
        }}
      >
        <Text
          style={{
            color: "#dadada",
            textAlign: "center",
            fontSize: 20
          }}
        >
          Info:Input your credential since a e-passport protected by password!
        </Text>
      </View>

      <View
        style={styles.labelInputContainer}
      >
        <Text>Passsport No.</Text>
        <TextInput
          placeholder="XXXXXXXXX"
          value={PassportNo}
          onChangeText={setPassportNo}
          style={styles.textInput}
        />
      </View>
      <View
        style={styles.labelInputContainer}
      >
        <Text>Date of birth</Text>
        <TextInput
          placeholder="00/00/0000"
          value={Birth}
          onChangeText={setBirth}
          style={styles.textInput}
        />
      </View>
      <View
        style={styles.labelInputContainer}
      >
        <Text>Date of expiry</Text>
        <TextInput
          placeholder="00/00/0000"
          value={Expiry}
          onChangeText={setExpiry}
          style={styles.textInput}
        />
      </View>
      <Button
        title="Start Scan"
        onPress={readNdef}
      >
      </Button>
      <Toast />
      <View
        style={{
          padding: 20,
          backgroundColor: "#cacaca",
          alignContent: "center"
        }}
      >
        <Text
          style={{
            color: "#555",
            textAlign: "center",
            fontSize: 20
          }}
        >
          Scan Result
        </Text>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 20
          }}
        >{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  labelInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
});

export default MyNfcManager;