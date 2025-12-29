# Hướng dẫn cấu hình Firebase cho Google Authentication

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" hoặc chọn project hiện có
3. Đặt tên project (ví dụ: "fme-clone")
4. Làm theo các bước để tạo project

## Bước 2: Kích hoạt Google Authentication

1. Trong Firebase Console, chọn project của bạn
2. Vào menu bên trái, chọn **Authentication**
3. Click tab **Sign-in method**
4. Tìm "Google" trong danh sách providers
5. Click "Google" và bật **Enable**
6. Nhập Project public-facing name và Support email
7. Click **Save**

## Bước 3: Đăng ký Web App

1. Trong Firebase Console, vào **Project Settings** (icon bánh răng)
2. Scroll xuống phần "Your apps"
3. Click icon **Web** (`</>`)
4. Đặt nickname cho app (ví dụ: "FME Web")
5. Click **Register app**

## Bước 4: Lấy Firebase Configuration

Sau khi đăng ký, bạn sẽ thấy Firebase configuration như sau:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Bước 5: Cấu hình Environment Variables

1. Tạo file `.env` trong thư mục root của project:

```bash
cp .env.example .env
```

2. Mở file `.env` và điền các giá trị từ Firebase configuration:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Bước 6: Cấu hình Authorized Domains

1. Trong Firebase Console, vào **Authentication** > **Settings** > **Authorized domains**
2. Thêm các domain sau:
   - `localhost` (cho development)
   - Domain production của bạn (ví dụ: `yourdomain.com`)

## Bước 7: Khởi động lại Development Server

```bash
yarn dev
```

## Kiểm tra

1. Truy cập trang đăng nhập: `http://localhost:5173/auth/signin`
2. Click nút "Đăng nhập bằng Google"
3. Chọn tài khoản Google
4. Nếu thành công, bạn sẽ được chuyển về trang trước đó

## Lưu ý

- **KHÔNG commit file `.env`** vào Git (đã có trong `.gitignore`)
- Chỉ sử dụng `.env.example` làm template
- Trong production, set environment variables qua hosting platform (Vercel, Netlify, etc.)

## Troubleshooting

### Lỗi: "auth/unauthorized-domain"

- Thêm domain của bạn vào Authorized domains trong Firebase Console

### Lỗi: "auth/popup-blocked"

- Trình duyệt đang chặn popup
- Cho phép popup cho domain này

### Lỗi: Firebase config không load

- Kiểm tra file `.env` có đúng format không
- Restart dev server sau khi thay đổi `.env`
- Environment variables trong Vite phải bắt đầu với `VITE_`
