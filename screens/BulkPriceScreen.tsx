// Path: screens/BulkPriceScreen.tsx (TicketBox - React Native)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dung 10.0.2.2; iOS Simulator dung localhost
const API_BASE_URL = 'http://localhost:8080';

export default function BulkPriceScreen() {
  const [organizer, setOrganizer] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleBulkUpdate = async () => {
    try {
      const url =
        `${API_BASE_URL}/api/events/price` +
        `?organizer=${encodeURIComponent(organizer)}&newPrice=${Number(newPrice)}`;
      const response = await fetch(url, { method: 'PUT' });
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: { updatedRows: number } = await response.json();
      setMessage(
        data.updatedRows === 0
          ? 'Khong co su kien nao thuoc don vi nay'
          : `Da cap nhat gia ve cho ${data.updatedRows} su kien`
      );
    } catch (error) {
      Alert.alert('Cap nhat hang loat that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doi gia ve hang loat</Text>
      <TextInput style={styles.input} placeholder="Don vi to chuc (vi du: Code Academy)"
        value={organizer} onChangeText={setOrganizer} />
      <TextInput style={styles.input} placeholder="Gia ve moi (VND)" keyboardType="numeric"
        value={newPrice} onChangeText={setNewPrice} />
      <Button title="Cap nhat hang loat" onPress={handleBulkUpdate} />
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
