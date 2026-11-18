// Path: screens/CreateEventScreen.tsx (TicketBox - React Native)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dung 10.0.2.2 de tro ve may host; iOS Simulator dung localhost
const API_BASE_URL = 'http://localhost:8080';

interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
}

export default function CreateEventScreen() {
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [savedEvent, setSavedEvent] = useState<Event | null>(null);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          organizerName,
          ticketPrice: Number(ticketPrice),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }

      const data: Event = await response.json();
      setSavedEvent(data); // data.id la id that do MySQL sinh ra
    } catch (error) {
      Alert.alert('Luu su kien that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tao su kien moi</Text>
      <TextInput style={styles.input} placeholder="Ten su kien"
        value={eventName} onChangeText={setEventName} />
      <TextInput style={styles.input} placeholder="Don vi to chuc"
        value={organizerName} onChangeText={setOrganizerName} />
      <TextInput style={styles.input} placeholder="Gia ve (VND)"
        keyboardType="numeric" value={ticketPrice} onChangeText={setTicketPrice} />
      <Button title="Luu su kien" onPress={handleSave} />

      {savedEvent && (
        <Text style={styles.result}>
          Da luu! id = {savedEvent.id} - {savedEvent.eventName}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginBottom: 12 },
  result: { marginTop: 16, fontWeight: 'bold' },
});