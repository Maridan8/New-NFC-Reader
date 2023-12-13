import React, { useState } from "react";
import { scanPassport, NFCPassportModel } from '@better-network/react-native-nfc-passport-reader';

import {
    View,
    Button,
    Text,
    TextInput,
    StyleSheet
}
    from "react-native";
import Toast from "react-native-toast-message";

interface CardDetails {
    personalNumber: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    nationality: string | null;
}
function convertDateToISO8601(dateString: any): (string) {
    // Step 1: Ensure the date string is in a recognized format
    // In this example, we assume the date string is in the format "YYYY-MM-DD"

    // Step 2: Use a date parsing function to convert the date string into a date object
    let date = new Date(dateString);
    // Step 3: Format the date object using the ISO 8601 format
    let iso8601Date = date.toISOString();
    return iso8601Date;
}
const PassportReader = () => {

    const [test, setTest] = useState<string>("default");
    const [PassportNo, setPassportNo] = useState<string>("");
    const [Birth, setBirth] = useState<string>("");
    const [Expiry, setExpiry] = useState<string>("");
    const [cardDetails, setCardDetails] = useState<CardDetails>({
        personalNumber: null,
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        gender: null,
        nationality: null,
    });

    // const onChangeHandlerBirth = (e: any) => {
    //     // e.prevent.default();
    //     let iso8601Date = convertDateToISO8601("2000-09-08");
    //     setBirth(iso8601Date);
    //     setTest(iso8601Date);
    // }
    // const onChangeHandlerExpiry = (e: any) => {
    //     // e.prevent.default();
    //     setExpiry(convertDateToISO8601(e.target.value));
    // }
    const clickHandler = () => {
        if (Birth != "" && Expiry != "" && PassportNo != "") {
            setBirth(convertDateToISO8601(Birth));
            setExpiry(convertDateToISO8601(Expiry));
            Toast.show({
                type: 'info',
                text1: 'Starting',
                text2: "Scanning...",
                position: 'top',
                visibilityTime: 3000,
            });
            // birthdate & expiryDate must be of type iso8601 string
            try {
                scanPassport({
                    birthDate: Birth,
                    expiryDate: Expiry,
                    passportNumber: PassportNo,
                    useNewVerificationMethod: true
                }).then((result: any) => {
                    if ('error' in result) {
                        // Errors during scanning session
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: 'Error Corrupted',
                            position: 'top',
                            visibilityTime: 2000,
                        });
                    }
                    else {
                        setCardDetails(result);
                        Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: "result",
                            position: 'top',
                            visibilityTime: 2000,
                        });
                    }
                    // Do something with result of type NFCPassportModel
                })
            } catch {
                (err: any) => {
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: "result",
                        position: 'top',
                        visibilityTime: 2000,
                    });
                    console.log(err)
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: err,
                        position: 'top',
                        visibilityTime: 2000,
                    });
                }
            }
        }
        else{
            Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: "Type your credential",
                position: 'top',
                visibilityTime: 2000,
            });
        }

    }
    return (
        <View style={styles.container}>
            <View
                style={{ backgroundColor: "#dadada" }}
            >
                <Text
                    style={{
                        color: "red",
                        textAlign: "center",
                    }}
                >
                    Info:Input your credential since a e-passport protected by password!
                </Text>
            </View>
            <View style={styles.container}>
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
                        placeholder="0000-00-00"
                        value={Birth}
                        // onChangeText={(e) => { onChangeHandlerBirth(e) }}
                        onChangeText={setBirth}
                        style={styles.textInput}
                    />
                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>Date of expiry</Text>
                    <TextInput
                        placeholder="0000-00-00"
                        value={Expiry}
                        // onChangeText={(e) => { onChangeHandlerExpiry(e) }}
                        onChangeText={setExpiry}
                        style={styles.textInput}
                    />
                </View>
            </View>
            <View
                style={{
                    padding: 20
                }}>
                <Button
                    title="Start Scan"
                    onPress={clickHandler}
                >
                </Button>
            </View>
            <View style={styles.container}>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>personalNumber </Text>
                    <Text>{cardDetails.personalNumber}</Text>
                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>firstName </Text>
                    <Text>{cardDetails.firstName}</Text>

                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>lastName </Text>
                    <Text>{cardDetails.lastName}</Text>

                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text> gender</Text>
                    <Text>{cardDetails.gender}</Text>

                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>nationality </Text>
                    <Text>{cardDetails.nationality}</Text>

                </View>
                <View
                    style={styles.labelInputContainer}
                >
                    <Text>dateOfBirth </Text>
                    <Text>{cardDetails.dateOfBirth}</Text>

                </View>
            </View>
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "space-between",
        height: "100%"
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
        alignItems: "stretch",
        justifyContent: "space-between",
        borderWidth: 0,
        margin: 10
    },
    button: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
        color: "#fff",
    },
});
export default PassportReader;