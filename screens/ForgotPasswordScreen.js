import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = () => {
        if (email === '') {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ email của bạn.");
            return;
        }

        setIsLoading(true);
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert(
                    "Kiểm tra Email của bạn",
                    "Nếu tài khoản tồn tại, một đường link để đặt lại mật khẩu đã được gửi đến email của bạn.",
                    [{ text: "OK", onPress: () => navigation.navigate('Login') }]
                );
            })
            .catch(error => {
                console.error(error);
                // Vẫn hiển thị thông báo chung để tăng cường bảo mật
                Alert.alert(
                    "Thông báo",
                    "Tài khoản không đúng hoặc không tồn tại !",
                    [{ text: "OK", onPress: () => navigation.navigate('Login') }]
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Quên mật khẩu</Text>
                <Text style={styles.subtitle}>
                    Hãy nhập Email mà bạn đã đăng ký tài khoản, ứng dụng sẽ cho bạn một đường dẫn hãy ấn vào để tạo mật khẩu mới
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập Email của bạn"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleResetPassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white"/>
                    ) : (
                        <Text style={styles.buttonText}>Gửi link</Text>
                    )}
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
    title: {
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16, 
        textAlign: 'center', 
        olor: 'gray', 
        marginBottom: 30,
    },
    input: {
        height: 50, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 20, 
        paddingHorizontal: 15, 
        borderRadius: 50, 
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'cyan', 
        padding: 15, 
        borderRadius: 50, 
        alignItems: 'center', 
        height: 55, 
        justifyContent: 'center',
    },
    buttonDisabled: { 
        backgroundColor: '#FFE082' 
    },
    buttonText: { 
        color: 'black', 
        fontSize: 16, 
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;