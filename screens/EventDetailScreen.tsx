// Path: screens/EventDetailScreen.tsx (TicketBox - React Native)
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = "http://localhost:8080";

interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
  // C03L10-03: Cập nhật Địa điểm tổ chức trong interface Event
  venue?: string | null; 
}

export default function EventDetailScreen() {
  const [idText, setIdText] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      //! reset
      setMessage("");
      setEvent(null);
      const response = await fetch(`${API_BASE_URL}/api/events/${idText}`);

      if (response.status === 404) {
        setMessage(`Khong tim thay su kien co ma ${idText}`);
        return;
      }
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }

      const data: Event = await response.json();
      setEvent(data);
    } catch (error) {
      Alert.alert("Tra cuu that bai", String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tra cuu su kien theo ma</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhap ma su kien (id)"
        keyboardType="numeric"
        value={idText}
        onChangeText={setIdText}
      />
      <Button title="Tra cuu" onPress={handleSearch} />

      {message !== "" && <Text style={{ marginTop: 16, color: "crimson" }}>{message}</Text>}

      {event && (
        <View style={styles.result}>
          <Text style={styles.name}>{event.eventName}</Text>
          <Text>To chuc boi: {event.organizerName}</Text>
          <Text>Gia ve: {event.ticketPrice.toLocaleString()} VND</Text>
          <Text>Dia diem: {event.venue ?? 'Chua cap nhat'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#999", borderRadius: 6, padding: 10, marginBottom: 12 },
  result: { marginTop: 16 },
  name: { fontSize: 18, fontWeight: "bold" },
});
