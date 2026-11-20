// Path: utils/httpStatus.ts (TicketBox - React Native)

// C04L01-03: CRUD Đầy Đủ Qua HTTP - Bốn Phương Thức Và Các Mã Trạng Thái 201, 204, 400, 404, 405, 415
// Dịch mã trạng thái HTTP thành thông báo dễ hiểu cho người dùng
export function describeStatus(status: number): string {
  if (status >= 200 && status < 300) return 'Thanh cong';
  if (status === 401) return 'Can dang nhap';
  if (status === 404) return 'Khong tim thay';
  if (status >= 400 && status < 500) return 'Loi tu phia client (yeu cau chua dung)';
  if (status >= 500) return 'Loi tu phia server';
  if (status >= 300) return 'Chuyen huong';
  return 'Thong tin';
}
