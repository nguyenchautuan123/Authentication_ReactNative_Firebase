import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import LoginScreen from "./LoginScreen";

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        // --- Các bước kiểm tra đầu vào ---
        if(!currentPassword || !newPassword || !confirmPassword){
            Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin !");
            return;
        }
        if(newPassword !== confirmPassword){
            Alert.alert("Thông báo", "Mật khẩu mới không khớp !");
            return;
        }
        if(newPassword === currentPassword){
            Alert.alert("Thông báo", "Mật khẩu mới không được trùng với mật khẩu hiện tại !");
            return;
        }
        if(newPassword.length < 6){
            Alert.alert("Thông báo", "Mật khẩu mới phải có ít nhất 6 kí tự !");
            return;
        }

        setIsLoading(true);

        const user = auth.currentUser;
        if(!user || !user.email){
            Alert.alert("Thông báo", "Không tìm thấy thông tin người dùng !");
            setIsLoading(false);
            return;
        }

        // --- Bắt đầu quá trình đổi mật khẩu ---
        try{
            // 1. Xác thực lại người dùng với mật khẩu hiện tại
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // 2. Nếu xác thực thành công, cập nhật mật khẩu mới
            await updatePassword(user, newPassword);

            Alert.alert("Thông báo", "Đổi mật khẩu thành công !", [
                { text: "Ok", onPress: () => navigation.goBack() }
            ]);
        }catch (error){
            console.log(error);
            if(error.code === 'auth/wrong-password'){
                Alert.alert("Thông báo", "Mật khẩu hiện tại không chính xác.");
            }else{
                Alert.alert("Thông báo", "Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        }finally{
            setIsLoading(false);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView styles={styles.content}>
                <Text style={styles.title}>Đổi Mật Khẩu</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu hiện tại"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu mới"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Xác nhận mật khẩu mới"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleChangePassword}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white"/>
                    ) : (
                        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
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
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    input: { height: 50, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom: 15, 
        paddingHorizontal: 15, 
        borderRadius: 10, 
        backgroundColor: 'white', 
    },
    button: { 
        backgroundColor: 'cyan', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 10, 

    },
    buttonDisabled: { 
        backgroundColor: '#A9A9A9', 
    },
    buttonText: { 
        color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;
