// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Thêm cấu hình Firebase của bạn từ console vào đây
const firebaseConfig = {
    apiKey: "AIzaSyAX8F5qMH-KBfcdsBnFUWcr12Dwu14Ca_A",
    authDomain: "authapp-c77d7.firebaseapp.com",
    projectId: "authapp-c77d7",
    storageBucket: "authapp-c77d7.firebasestorage.app",
    messagingSenderId: "376257942063",
    appId: "1:376257942063:web:dfede3c1aaac3a9edb6cda",
    measurementId: "G-FNM183LP6W"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);  

// Khởi tạo Firebase Authentication và export để sử dụng ở nơi khác
export const auth = getAuth(app);