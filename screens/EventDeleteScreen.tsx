// Path: screens/EventDeleteScreen.tsx (TicketBox - React Native)
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = "http://localhost:8080";

export default function EventDeleteScreen() {
  const [idText, setIdText] = useState("");
  const [message, setMessage] = useState("");

  const performDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${idText}`, { method: "DELETE" });
      if (response.status === 404) {
        setMessage(`Khong tim thay su kien co ma ${idText}`);
        return;
      }
      if (response.status !== 204) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      // 204: khong co than phan hoi nen KHONG goi response.json()
      setMessage(`Da xoa su kien co ma ${idText}`);
    } catch (error) {
      Alert.alert("Xoa that bai", String(error));
    }
  };

  // Hop thoai xac nhan truoc khi xoa vi xoa khong the hoan tac
  const handleDelete = () => {
    Alert.alert("Xac nhan xoa", `Ban co chac muon xoa su kien co ma ${idText}?`, [
      { text: "Huy", style: "cancel" },
      { text: "Xoa", style: "destructive", onPress: performDelete },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xoa su kien</Text>
      <TextInput
        style={styles.input}
        placeholder="Ma su kien (id)"
        keyboardType="numeric"
        value={idText}
        onChangeText={setIdText}
      />
      <Button title="Xoa" color="crimson" onPress={handleDelete} />
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#999", borderRadius: 6, padding: 10, marginVertical: 8 },
  message: { marginTop: 16, fontWeight: "bold" },
});
