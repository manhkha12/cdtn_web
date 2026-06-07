// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// VUI LÒNG THAY THẾ CÁC GIÁ TRỊ DƯỚI ĐÂY BẰNG CẤU HÌNH TỪ FIREBASE CONSOLE CỦA BẠN
const firebaseConfig = {
  apiKey: "AIzaSyCqHeln2qr7wWkW9p7GxlG4qdnZ_EKGRlY",
  authDomain: "student-app-f030f.firebaseapp.com",
  projectId: "student-app-f030f",
  storageBucket: "student-app-f030f.firebasestorage.app",
  messagingSenderId: "612670232735",
  appId: "1:612670232735:android:7bd8af7926be9f855ceaaa",
  measurementId: "G-R0QYW095C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// VAPID KEY từ Firebase Console -> Project Settings -> Cloud Messaging -> Web configuration
export const VAPID_KEY = "BJqKYvxc_qR5muj7lXYIMEo2z1JI9KMLimQcjcDTlFBYY71KC90sSLN7Kyvam3C1ypNl_zJI32r9IuwO3ncm5Nw";
