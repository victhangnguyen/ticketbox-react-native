// Path: screens/EchoScreen.tsx (TicketBox - React Native)
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

// Android Emulator dùng 10.0.2.2; iOS Simulator dùng localhost
const API_BASE_URL = 'http://localhost:8080';

interface EchoResponse {
  echo: string;
  length: number;
}

// C04L02-03: Nhận Yêu Cầu POST Có Body JSON — Vì Sao Trình Duyệt Không Đủ
export default function EchoScreen() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<EchoResponse | null>(null);

  // Gửi POST kèm body JSON và header Content-Type: application/json
  const handleSend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/test/echo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`Server tra ve ma loi ${response.status}`);
      }
      const data: EchoResponse = await response.json();
      setResult(data);
    } catch (error) {
      Alert.alert('Gui POST that bai', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kiem tra duong truyen (POST)</Text>
      <TextInput style={styles.input} placeholder="Nhap thong diep"
        value={message} onChangeText={setMessage} />
      <Button title="Gui POST" onPress={handleSend} />
      {result && (
        <Text style={styles.result}>
          Backend tra lai: "{result.echo}" ({result.length} ky tu)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10, marginBottom: 12 },
  result: { marginTop: 16, fontWeight: 'bold' },
});
