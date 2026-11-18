// Path: screens/BatchCreateEventsScreen.tsx (TicketBox - React Native)
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = 'http://localhost:8080';

interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
}

// Du lieu mau: khong gui kem id vi MySQL se tu cap
const sampleEvents = [
  { eventName: 'Hoi Thao AI 2026', organizerName: 'AI Vietnam', ticketPrice: 0 },
  { eventName: 'Trien Lam Anh', organizerName: 'Studio Sang', ticketPrice: 50000 },
  { eventName: 'Khoa Hoc Python', organizerName: 'Code Academy', ticketPrice: 1200000 },
];

export default function BatchCreateEventsScreen() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  const handleBatchSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleEvents),
      });
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: Event[] = await response.json();
      setSavedEvents(data); // moi phan tu da co id do MySQL cap
    } catch (error) {
      Alert.alert('Luu hang loat that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tao 3 su kien mau</Text>
      <Button title="Luu 3 su kien" onPress={handleBatchSave} />
      {savedEvents.map((e) => (
        <Text key={e.id} style={styles.row}>
          id {e.id}: {e.eventName}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  row: { marginTop: 8 },
});