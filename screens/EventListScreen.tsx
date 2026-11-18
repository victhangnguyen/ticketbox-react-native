// Path: screens/EventListScreen.tsx (TicketBox - React Native)
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = 'http://localhost:8080';

interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
}

export default function EventListScreen() {
  const [organizer, setOrganizer] = useState('');
  const [events, setEvents] = useState<Event[]>([]);

  // Goi API: co organizer thi loc, khong co thi lay tat ca
  const loadEvents = async (organizerName: string) => {
    try {
      const query = organizerName
        ? `?organizer=${encodeURIComponent(organizerName)}`
        : '';
      const response = await fetch(`${API_BASE_URL}/api/events${query}`);
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      Alert.alert('Tai danh sach that bai', String(error));
    }
  };

  useEffect(() => {
    loadEvents(''); // tai tat ca su kien khi mo man hinh
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Su kien noi bat</Text>
      <TextInput style={styles.input} placeholder="Loc theo nha to chuc (vi du: Jazz Club)"
        value={organizer} onChangeText={setOrganizer} />
      <View style={styles.row}>
        <Button title="Loc" onPress={() => loadEvents(organizer)} />
        <Button title="Tat ca" onPress={() => { setOrganizer(''); loadEvents(''); }} />
      </View>

      {events.map((e) => (
        <Text key={e.id} style={styles.item}>
          #{e.id} {e.eventName} - {e.organizerName} - {e.ticketPrice.toLocaleString()} VND
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  item: { marginTop: 6 },
});