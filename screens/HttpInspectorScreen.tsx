// Path: screens/HttpInspectorScreen.tsx (TicketBox - React Native)
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { describeStatus } from "../utils/httpStatus";

// Android Emulator dùng 10.0.2.2; iOS Simulator dùng localhost
const API_BASE_URL = "http://localhost:8080";

interface InspectResult {
  status: number;
  contentType: string;
  body: string;
}

export default function HttpInspectorScreen() {
  const [path, setPath] = useState("/api/events/1");
  const [result, setResult] = useState<InspectResult | null>(null);

  // Gửi GET và hiển thị đúng ba thứ cần quan sát: mã trạng thái, Content-Type, body
  const handleSend = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`);
      const body = await response.text(); // đọc dạng văn bản để xem nguyên văn phản hồi
      setResult({
        status: response.status,
        contentType: response.headers.get("content-type") ?? "(khong co)",
        body,
      });
    } catch (error) {
      Alert.alert("Gui yeu cau that bai", String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kiem tra phan hoi HTTP</Text>
      <TextInput
        style={styles.input}
        value={path}
        onChangeText={setPath}
        autoCapitalize="none"
        placeholder="/api/events/1"
      />
      <Button title="Gui GET" onPress={handleSend} />

      {result && (
        <View style={styles.result}>
          {/* // C04L01-03: CRUD Đầy Đủ Qua HTTP - Bốn Phương Thức Và Các Mã Trạng Thái 201, 204, 400, 404, 405, 415 */}
          {/* <Text>Status: {result.status}</Text> */}
          <Text>
            Status: {result.status} ({describeStatus(result.status)})
          </Text>
          <Text>Content-Type: {result.contentType}</Text>
          {/* <Text style={styles.body}>{result.body}</Text> */}
          <Text style={styles.body}>{result.body === "" ? "(trong)" : result.body}</Text>
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
  body: { marginTop: 8, fontFamily: "Courier" },
});
