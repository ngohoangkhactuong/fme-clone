# FME — Frontend (Khoa Cơ Khí Chế Tạo Máy)

Phiên bản README này cung cấp hướng dẫn chi tiết để cài đặt, phát triển, debug, đóng gói và đóng góp cho frontend ứng dụng `qic-frontend` (dựa trên Vite, React + TypeScript, TailwindCSS). README viết bằng tiếng Việt để phù hợp với codebase hiện tại.

Mục lục

- Giới thiệu
- Yêu cầu môi trường
- Cài đặt & chạy local
- Lint, format, pre-commit
- Xây dựng & đóng gói (Docker)
- Triển khai (K8s)
- Kiến trúc mã nguồn & hướng dẫn điều hướng nhanh
- Tính năng mới: Báo cáo ca trực (Duty / Shift Report)
- Thao tác thường gặp & troubleshooting
- Quy tắc đóng góp
- Tài nguyên & ghi chú kỹ thuật

---

## Giới thiệu

Đây là frontend của website Khoa Cơ Khí Chế Tạo Máy — một SPA được triển khai bằng React (v19), TypeScript, Vite và TailwindCSS. Mục tiêu repository:

- Giao diện nhiều trang (Router) cho các trang chính: Trang chủ, Đăng ký ca trực và Báo cáo ca trực.
- Thành phần UI tái sử dụng (Header, Footer, Layout, Thẻ tin tức, v.v.)
- Các tiện ích như theme (dark/light), local draft autosave, upload ảnh preview.

## Yêu cầu môi trường

- Node.js 18+ (phiên bản khuyến nghị: 18.x LTS)
- Yarn (tested with Yarn v1)
- Trình duyệt hiện đại (Chrome, Safari, Firefox)

Lưu ý: dự án sử dụng TypeScript ~5.8 và Vite. Nếu hệ thống của bạn có nhiều phiên bản Node, hãy sử dụng `nvm` hoặc `volta`.

## Thiết lập ban đầu

1. Clone repository:

```bash
git clone <repo-url> fme-clone
cd fme-clone
```

2. Cài dependencies:

```bash
yarn install
```

3. Cấu hình Firebase (cho Google Authentication):

```bash
# Copy file env example
cp .env.example .env

# Chỉnh sửa .env và điền Firebase config của bạn
# Xem chi tiết trong FIREBASE_SETUP.md
```

**Lưu ý**: Xem file [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) để biết hướng dẫn chi tiết cấu hình Firebase và Google Authentication.

3. Môi trường phát triển

```bash
yarn dev
# Mở trình duyệt: http://localhost:5173
```

## Lệnh tiện ích

- `yarn dev` — khởi động dev server (Vite)
- `yarn build` — build sản phẩm (TypeScript compile + vite build)
- `yarn preview` — preview production build
- `yarn lint` — chạy ESLint (cấu hình dự án)
- `yarn format` — chạy Prettier (format code)

## Linting / Formatting / Commit hooks

- Prettier được cấu hình sẵn: `.prettierrc` (tailwind plugin included)
- ESLint cấu hình trong `eslint.config.js` với quy tắc TypeScript + React + a11y
- Husky + lint-staged đã bật pre-commit để format và lint các thay đổi trước khi commit

```bash
yarn format
yarn lint
```

## Docker & Production build

- Dockerfile có sẵn để build static assets và phục vụ bằng nginx:

```bash
# Build locally
yarn build
docker build -t qic-frontend:local .

# Chạy image
docker run -p 8080:8080 qic-frontend:local
```

## Kubernetes

- Các manifest mẫu nằm trong thư mục `k8s/`:

  - `cm.yml` — ConfigMap chứa nginx config
  - `app.yml` — Deployment + Service

- Trong CI pipeline (ví dụ `.gitlab-ci.yml`) thay thế `REPLACED_WITH_DOCKER_IMAGE_NAME` bằng tên image và áp dụng manifests.

## Kiến trúc mã nguồn (tổng quan)

Thư mục chính:

- `src/`
  - `main.tsx` — entry
  - `App.tsx` — routes + layout
  - `components/` — thành phần UI chung
    - `layout/` — `Header`, `Footer`, `MainLayout`, `Notification`
    - `common/` — `ThemeToggle`, `ImageUploader` (mới)
  - `views/` — các trang lớn
    - `Home/` — trang chủ và các component con
      - `components/` — `BannerCarousel`, `DigitalClock`, `ProgramList`, `NewSection`, `SideBar`, `DutyRegistrationForm`, `DutyRegistrationPage`, `DutyReportPage` (mới), `ReportSection` (mới)
  - `hooks/` — custom hooks
    - `useTheme.ts` — quản lý theme + localStorage
  - `dataSources/` — dữ liệu giả lập (banner, news, programs, menu)

Một số file quan trọng khác:

- `vite.config.ts` — cấu hình alias `@` → `src`
- `tsconfig.*` — setting TypeScript

## Chi tiết kỹ thuật

- Ngôn ngữ: TypeScript strict
- Styling: TailwindCSS (cấu hình sẵn, plugin tailwind-merge trong devDeps)
- Icons: lucide-react
- Router: react-router-dom v7

## Tính năng mới: Báo cáo ca trực (Duty / Shift Report)

Trang báo cáo ca trực được thêm vào nhằm cho phép nhân viên/sinh viên ghi lại báo cáo trong hoặc sau ca trực. Tính năng đã được triển khai theo các tiêu chuẩn sau:

- Route: `/bao-cao-ca-truc`
- Component chính: `src/views/Home/components/DutyReportPage.tsx`
- Các phần chính:

  - Tổng quan (title, status)
  - Chi tiết (summary, tasks, incidents)

## Tính năng: Đăng nhập với Google (Google Authentication)

Ứng dụng hỗ trợ đăng nhập bằng tài khoản Google thông qua Firebase Authentication:

### Các tính năng chính:

- **Đăng nhập truyền thống**: Email/password với định dạng HCMUTE (`mssv@student.hcmute.edu.vn`)
- **Đăng nhập Google**: Sử dụng popup Google OAuth
- **Tự động tạo tài khoản**: Khi đăng nhập Google lần đầu, hệ thống tự động tạo tài khoản
- **Đồng bộ avatar**: Avatar từ Google được tự động cập nhật
- **Phân quyền**: Tài khoản được tự động phân quyền admin nếu studentId là `23146053`

### Files liên quan:

- `src/config/firebase.ts` — Cấu hình Firebase
- `src/hooks/useAuth.tsx` — Authentication logic với Google sign-in
- `src/views/Auth/SignIn.tsx` — UI đăng nhập với nút Google
- `FIREBASE_SETUP.md` — Hướng dẫn chi tiết cấu hình

### Cách sử dụng:

1. Cấu hình Firebase theo hướng dẫn trong `FIREBASE_SETUP.md`
2. Truy cập `/auth/signin`
3. Click nút "Đăng nhập bằng Google"
4. Chọn tài khoản Google
5. Hệ thống tự động tạo/cập nhật tài khoản và đăng nhập

- Thời gian (date, startTime, endTime)
- Ảnh đính kèm (ImageUploader: upload, thumbnail, full view, remove)
- Ghi chú bổ sung

- Behaviour & UX:
  - Hỗ trợ lưu nháp tự động (localStorage key: `dutyReportDraft:v1`) — autosave mỗi 3s khi ở trạng thái draft
  - Lưu nháp thủ công và gửi (submit). `submit` hiện mô phỏng (setTimeout) — thay bằng API call thật khi backend sẵn sàng
  - Hình ảnh đính kèm dùng Object URLs để preview; khi unmount sẽ revoke để tránh memory leak

## Hướng dẫn developer — mở rộng & tích hợp backend

- Gửi báo cáo lên backend: thay logic giả lập trong `DutyReportPage` bằng API call `fetch`/`axios`.
- Tải ảnh lên server: hiện tại `ImageUploader` dùng object URLs để preview; để upload, gửi File object (FormData) trong `handleFiles` và lưu response URL.
- Xác thực/Authorization: hiện chưa tích hợp; thêm hook/service auth nếu cần.

## Thao tác thường gặp & troubleshooting

- Trang trắng (white page) khi `yarn dev`:

  1.  Kiểm tra console của dev server và browser console.
  2.  Chạy `yarn lint` để thấy lỗi ESLint/TS có thể chặn build.
  3.  Chạy `yarn format` để format code, sau đó `yarn dev`.

- Lỗi liên quan đến TypeScript:

  - Chạy `tsc -p tsconfig.app.json` để kiểm tra biên dịch.

- Nếu hình ảnh preview không hiển thị hoặc leak:
  - Đảm bảo `URL.revokeObjectURL` được gọi khi image bị xóa hoặc component unmount.

## Quy tắc đóng góp

- Fork → tạo branch `feat/xxx` hoặc `fix/xxx` theo chuẩn
- Chạy `yarn format` và `yarn lint` trước khi commit
- Viết mô tả PR rõ ràng, link issue (nếu có)

Ví dụ commit hook (đã có sẵn):

```bash
# pre-commit sẽ chạy lint-staged
git add .
git commit -m "feat(report): add duty report page"
```

## Gợi ý mở rộng (ý tưởng)

- Thực hiện upload ảnh kèm với progress, xử lý errors
- Thêm modal preview với zoom/pan cho ảnh lớn
- Thêm history / versioning báo cáo
- Tích hợp notifications server-side (webhooks, email)

## Liên hệ & tài nguyên

- Người liên hệ nội bộ: đội frontend Khoa Cơ Khí
- Tài liệu tham khảo: Vite, React, TailwindCSS, lucide-react, react-router

---

Cảm ơn bạn đã duy trì dự án này — nếu bạn cần README bằng tiếng Anh hoặc bổ sung phần API contract / Swagger mock, tôi có thể thêm vào.

# Fme
