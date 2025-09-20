import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ScrollView, TouchableOpacity, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  
  const handleLogin = () => {
    if(email !== '' && password !== ''){
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Đăng nhập thành công !!');
        })
        .catch(error => {
          console.log('Mã lỗi: ', error.code); // In ra mã lỗi để kiểm tra

          switch(error.code){
            case 'auth/user-not-found':
              Alert.alert('Thông báo', 'Tên người dùng sai hoặc không tồn tại !!');
              break;
            case 'auth/wrong-password':
              Alert.alert('Thông báo', 'Mật khẩu không chính xác !!');
              break;
            case 'auth/invalid-credential':
              Alert.alert('Thông báo', 'Tên người dùng hoặc mật khẩu không chính xác !!');
              break;
            case 'auth/invalid-email':
              Alert.alert('Thông báo', 'Email không hợp lệ !!');
              break;
            default:
              Alert.alert('Thông báo', 'Lỗi đăng nhập !!');
              break;
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }else{
      Alert.alert('Thông báo','Vui lòng nhập đầy đủ thông tin !!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.BackgroundImage} source={{ uri: 'https://i.pinimg.com/736x/26/56/10/265610be95ef6eff79aba41ea09ab9d5.jpg'}}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>
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
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white"/>
            ) : (
              <Text style={styles.buttonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Chưa có tài khoản ? Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkText}>Quên mật khẩu</Text>
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
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    backgroundColor: 'rgba(96, 96, 99, 0.5)',
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

export default LoginScreen;