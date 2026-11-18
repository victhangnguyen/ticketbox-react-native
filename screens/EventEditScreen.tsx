// Path: screens/EventEditScreen.tsx (TicketBox - React Native)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = 'http://localhost:8080';

interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
}

export default function EventEditScreen() {
  const [idText, setIdText] = useState('');
  const [eventName, setEventName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [message, setMessage] = useState('');

  // Buoc 1: nap thong tin hien tai cua su kien vao form
  const handleLoad = async () => {
    try {
      setMessage('');
      const response = await fetch(`${API_BASE_URL}/api/events/${idText}`);
      if (response.status === 404) {
        setMessage(`Khong tim thay su kien co ma ${idText}`);
        return;
      }
      const data: Event = await response.json();
      setEventName(data.eventName);
      setOrganizerName(data.organizerName);
      setTicketPrice(String(data.ticketPrice));
    } catch (error) {
      Alert.alert('Tai su kien that bai', String(error));
    }
  };

  // Buoc 2: gui thong tin da sua bang PUT
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/${idText}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, organizerName, ticketPrice: Number(ticketPrice) }),
      });
      if (response.status === 404) {
        setMessage(`Khong tim thay su kien co ma ${idText}`);
        return;
      }
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: Event = await response.json();
      setMessage(`Da luu: #${data.id} ${data.eventName} - ${data.ticketPrice.toLocaleString()} VND`);
    } catch (error) {
      Alert.alert('Luu that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chinh sua su kien</Text>
      <TextInput style={styles.input} placeholder="Ma su kien (id)" keyboardType="numeric"
        value={idText} onChangeText={setIdText} />
      <Button title="Tai thong tin" onPress={handleLoad} />

      <TextInput style={styles.input} placeholder="Ten su kien"
        value={eventName} onChangeText={setEventName} />
      <TextInput style={styles.input} placeholder="Don vi to chuc"
        value={organizerName} onChangeText={setOrganizerName} />
      <TextInput style={styles.input} placeholder="Gia ve (VND)" keyboardType="numeric"
        value={ticketPrice} onChangeText={setTicketPrice} />
      <Button title="Luu" onPress={handleSave} />

      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginVertical: 8 },
  message: { marginTop: 16, fontWeight: 'bold' },
});
