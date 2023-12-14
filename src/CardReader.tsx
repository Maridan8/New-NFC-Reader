import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import NfcCardReader from 'react-native-nfc-card-reader';

interface CardDetails {
  cardNumber: string | null;
  expiryDate: string | null;
  cardType: string | null;
  firstname: string | null;
  surname: string | null;
}

const CardReader = () => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: null,
    expiryDate: null,
    cardType: null,
    firstname: null,
    surname: null,
  });

  const startScan = async () => {
    try {
      const scannedCardDetails = await NfcCardReader.startNfc();
      console.log(scannedCardDetails);
      setCardDetails(scannedCardDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', margin: 20, alignContent: 'center' }}>
      <Button title="Start NFC Scan!" onPress={startScan}></Button>
      <Text>{cardDetails.cardNumber}</Text>
      <Text>{cardDetails.expiryDate}</Text>
      <Text>{cardDetails.cardType}</Text>
      <Text>{cardDetails.firstname}</Text>
      <Text>{cardDetails.surname}</Text>
    </View>
  );
};

export default CardReader;