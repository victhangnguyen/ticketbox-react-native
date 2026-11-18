import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Interface TypeScript anh xa dung cau truc Entity Event ben Backend
interface Event {
  id: number;
  eventName: string;
  organizerName: string;
  ticketPrice: number;
}

export default function EventPreviewScreen() {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Goi API den endpoint tam thoi /api/events/sample
    fetch('http://localhost:8080/api/events/sample')
      .then((res) => res.json())
      .then((data: Event) => setEvent(data))
      .catch((err) => console.error('Loi khi goi API:', err));
  }, []);

  if (!event) {
    return <ActivityIndicator style={styles.container} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName}</Text>
      <Text>To chuc boi: {event.organizerName}</Text>
      <Text>Gia ve: {event.ticketPrice.toLocaleString()} VND</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
});
