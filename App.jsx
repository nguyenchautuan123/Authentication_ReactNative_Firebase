import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ActivityIndicator, View } from 'react-native';

import Main from './Main';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Lắng nghe sự thay đổi trạng thái xác thực của người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(initializing){
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);
  // Logic kiểm tra người dùng định kỳ (tùy chọn nhưng nên có)
  useEffect(() => {
    if(!user) return;
    const interval = setInterval(async () => {
      await user.reload();
      const freshUser = auth.currentUser;
      if(freshUser && freshUser.emailVerified !== user.emailVerified){
        setUser(freshUser);
      }
    }, 5000); // Kiểm tra mỗi 5 giây
    return () => clearInterval(interval);
  }, [user]);

  if (initializing) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
        </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Logic khi chưa đăng nhập
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Tạo tài khoản' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Quên mật khẩu' }} />
          </>
        ) : user.emailVerified ? (
          // Logic khi đã đăng nhập VÀ đã xác thực email
          <>
            <Stack.Screen name="Main" component={Main} options={{ title: 'Trang chính'}}/>
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }}/>
          </>
        ) : (
          // Logic khi đã đăng nhập NHƯNG chưa xác thực email
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
