// Path: App.js (TicketBox - React Native)
import { ScrollView } from "react-native";
import EventSearchScreen from "./screens/EventSearchScreen";
import EventListScreen from "./screens/EventListScreen";
import EventDetailScreen from "./screens/EventDetailScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import BatchCreateEventsScreen from "./screens/BatchCreateEventsScreen";
import EventEditScreen from "./screens/EventEditScreen";
import BulkPriceScreen from "./screens/BulkPriceScreen";
import EventDeleteScreen from "./screens/EventDeleteScreen";

export default function App() {
  return (
    <ScrollView>
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
      <CreateEventScreen />
      <BatchCreateEventsScreen />
    </ScrollView>
  );
}
