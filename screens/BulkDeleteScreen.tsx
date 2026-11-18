// Path: screens/BulkDeleteScreen.tsx (TicketBox - React Native)
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = "http://localhost:8080";

export default function BulkDeleteScreen() {
  const [organizer, setOrganizer] = useState("");
  const [message, setMessage] = useState("");

  const performBulkDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/events?organizer=${encodeURIComponent(organizer)}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: { deletedRows: number } = await response.json();
      setMessage(
        data.deletedRows === 0
          ? "Khong co su kien nao thuoc don vi nay"
          : `Da xoa ${data.deletedRows} su kien cua ${organizer}`,
      );
    } catch (error) {
      Alert.alert("Xoa hang loat that bai", String(error));
    }
  };

  const handleBulkDelete = () => {
    if (organizer.trim() === "") {
      Alert.alert("Thieu thong tin", "Hay nhap ten don vi to chuc");
      return;
    }
    Alert.alert(
      "Xac nhan xoa hang loat",
      `Xoa TAT CA su kien cua "${organizer}"? Hanh dong nay khong the hoan tac.`,
      [
        { text: "Huy", style: "cancel" },
        { text: "Xoa", style: "destructive", onPress: performBulkDelete },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xoa su kien hang loat</Text>
      <TextInput
        style={styles.input}
        placeholder="Don vi to chuc (vi du: Code Academy)"
        value={organizer}
        onChangeText={setOrganizer}
      />
      <Button title="Xoa hang loat" color="crimson" onPress={handleBulkDelete} />
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
