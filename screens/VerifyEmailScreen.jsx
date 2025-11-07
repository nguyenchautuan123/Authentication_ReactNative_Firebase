import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { signOut } from "firebase/auth";

const VerifyEmailScreen = () => {
    const currentUser = auth.currentUser;

    const handleResendEmail = async () => {
        if(currentUser){
            try{
                await sendEmailVerification(currentUser);
                Alert.alert("Thông báo", "Xác thực Email đã được gửi lại. Hãy kiểm tra hộp thư của bạn.");
            }catch(error){
                Alert.alert("Lỗi", "Đã có lỗi xảy ra khi gửi lại email.");
                console.error(error);
            }
        }
    };

    const handleGoToLogin = async () => {
        try{
            await signOut(auth);
            // App.js sẽ tự động chuyển về màn hình Login
        }catch(error){
            console.log("Lỗi khi đăng xuất !!", error)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <Text>Xác thực Email</Text>
                <Text>Email được gửi xác thực: {currentUser.email}</Text>
                <Text>vui lòng nhấp vào đường dẫn để xác nhận tài khoản</Text>
                <TouchableOpacity style={styles.button} onPress={handleResendEmail}>
                    <Text style={styles.buttonText}>Gửi lại</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGoToLogin}>
                    <Text>Quay trở lại trang Đăng nhập</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // màu nền toàn màn hình
    },
    content: {
        flexGrow: 1,         // Đảm bảo ScrollView lấp đầy phần còn lại
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: 'cyan',
        padding: 15,
        borderRadius: 10,
        marginTop: 20, 
        width: '100%',
    },
    buttonText: {
        color: 'black', 
        fontSize: 18, 
        fontWeight: 'bold'
    },
});

export default VerifyEmailScreen;