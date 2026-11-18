// Path: screens/EventSearchScreen.tsx (TicketBox - React Native)
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

export default function EventSearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Event[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/events/search?keyword=${encodeURIComponent(keyword)}`
      );
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: Event[] = await response.json();
      setResults(data);   // data co the la mang rong, KHONG phai null
      setSearched(true);
    } catch (error) {
      Alert.alert('Tim kiem that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tim kiem su kien</Text>
      <TextInput style={styles.input} placeholder="Nhap tu khoa (vi du: jazz)"
        value={keyword} onChangeText={setKeyword} />
      <Button title="Tim" onPress={handleSearch} />

      {searched && results.length === 0 && (
        <Text style={styles.empty}>Khong co su kien phu hop</Text>
      )}
      {results.map((e) => (
        <Text key={e.id} style={styles.item}>
          #{e.id} {e.eventName} - {e.organizerName}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginBottom: 12 },
  empty: { marginTop: 16, color: 'crimson' },
  item: { marginTop: 6 },
});