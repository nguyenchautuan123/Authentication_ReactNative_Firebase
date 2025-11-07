import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
    const navigation = useNavigation(); // Khởi tạo navigation
    const [isLoggingOut, setIsLoggingOut] = useState(false); // State riêng cho nút đăng xuất giống isLoading

    const performLogout = () => {
      setIsLoggingOut(true);
      signOut(auth)
        .catch(error => {
          console.error(error);
          Alert.alert("Error", "Logout failed. Please try again.");
          setIsLoggingOut(false);
        });
    };

    const handleSignOut = () => {
      if(isLoggingOut){
        return;
      }
      Alert.alert(
        "Confirm Loggout",
        "Are you sure you want to log out ?",
        [
          {
            text: "Cancel",
            style: 'cancel',
          },
          {
            text: "Log out",
            onPress: performLogout,
          },
        ]
      );
    };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text>User: {auth.currentUser?.email}</Text>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.logoutButton, isLoggingOut && styles.buttonDisabled]}
          onPress={handleSignOut}
          disabled={isLoggingOut}
        >
            {isLoggingOut ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Đăng xuất</Text>
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
  text1: {
    fontSize: 30,
  },
  changePasswordButton: {
    backgroundColor: 'cyan', 
    paddingVertical: 15, 
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutButton: { 
    backgroundColor: 'cyan', 
    paddingVertical: 15, 
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  }
});

export default SettingScreen;