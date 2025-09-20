import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    if(email === '' || password === '' || confirmPassword === ''){
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin !!');
      return;
    }
    if(password !== confirmPassword){
      Alert.alert('Thông báo', 'Mật khẩu không khớp !!');
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        sendEmailVerification(userCredentials.user)
          .then(() => {
            console.log('Email xác thực đã được gửi')
          });
      })
      .catch(error => {
        if(error.code === 'auth/email-already-in-use'){
          Alert.alert('Thông báo', 'Email đã được sử dụng !!');
        }else if(error.code === 'auth/invalid-email'){
          Alert.alert('Thông báo', 'Địa chỉ email không hợp lệ !!');
        }else{
          Alert.alert('Thông báo', error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.BackgroundImage} source={{ uri: 'https://i.pinimg.com/736x/26/56/10/265610be95ef6eff79aba41ea09ab9d5.jpg'}}>
          <View style={styles.content}>
            <Text style={styles.title}>Đăng ký</Text>
            <View style={styles.InformationInput}>
              <TextInput
                style={styles.emailInput}
                placeholder="Nhập tên người dùng (Email)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.confirmPasswordInput}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                { isLoading ? (
                  <ActivityIndicator color="white"/>
                ) : (
                  <Text style={styles.buttonText}>Đăng ký</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Đã có tài khoản ? Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // màu nền toàn màn hình
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {     
    padding: 16,
    backgroundColor: 'rgba(96, 96, 99, 0.5)',
    padding: 15,
    height: 400,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  title: {
    color: '#00ffff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  InformationInput: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInput: {
    height: 50,
    width: 300,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  passwordInput: {
    height: 50,
    width: 300,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  confirmPasswordInput: {
    height: 50,
    width: 300,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'cyan',
    padding: 15,
    borderRadius: 50,
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: { 
    backgroundColor: '#A9A9A9',
  },
  linkText: {
    color: '#00ffff',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default RegisterScreen;