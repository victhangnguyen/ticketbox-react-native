// Path: App.js (TicketBox - React Native)
import { ScrollView } from "react-native";
import HttpInspectorScreen from "./screens/HttpInspectorScreen";
import EventListScreen from "./screens/EventListScreen";
import EventSearchScreen from "./screens/EventSearchScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import EventEditScreen from "./screens/EventEditScreen";
import BulkPriceScreen from "./screens/BulkPriceScreen";
import EventDeleteScreen from "./screens/EventDeleteScreen";
import BulkDeleteScreen from "./screens/BulkDeleteScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import BatchCreateEventsScreen from "./screens/BatchCreateEventsScreen";

export default function App() {
  return (
    <ScrollView>
      {/* C04L01-01: Đọc Từng Phần Của Một Yêu Cầu Và Phản Hồi GET Bằng REST Client */}
      <HttpInspectorScreen />
      {/* C03L07-02 Danh Sách Sự Kiện Và Lọc Theo Nhà Tổ Chức Trên Ứng Dụng React Native */}
      <EventListScreen />
      {/* C03L07-03 Tìm Kiếm Sự Kiện Theo Từ Khóa Bằng LIKE Và OR */}
      <EventSearchScreen />
      <EventDetailScreen />
      {/* C03L08-02 Chỉnh Sửa Sự Kiện Từ Ứng Dụng React Native Qua PUT /api/events/{id} */}
      <EventEditScreen />
      {/* C03L08-03 Đổi Giá Vé Hàng Loạt Theo Nhà Tổ Chức Bằng JPQL UPDATE */}
      <BulkPriceScreen />
      {/* C03L09-02 Xóa Sự Kiện Từ Ứng Dụng React Native Qua DELETE /api/events/{id} */}
      <EventDeleteScreen />
      {/* C03L09-03 Xóa Hàng Loạt Sự Kiện Theo Nhà Tổ Chức Bằng JPQL DELETE */}
      <BulkDeleteScreen />
      <CreateEventScreen />
      <BatchCreateEventsScreen />
    </ScrollView>
  );
}
