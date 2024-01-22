import React,{useState,useEffect,useRef}from "react";
import { KeyboardAvoidingView, StyleSheet, Text,View,Keyboard,UIManager, Image,useColorScheme} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Button } from "@rneui/base";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import { Alert, Box, Center, CloseIcon, HStack, IconButton, NativeBaseProvider, VStack } from "native-base";
import firestore from '@react-native-firebase/firestore';
import {  Input, Item } from 'native-base';
import axios from "axios";


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

function Login() {
  const colorScheme = useColorScheme();
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        divider_line:"#fff",
        alert_message :'#750E21'
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        divider_line:"#C51605",
        alert_message :'#750E21'
      };
    }
  };

  const [value,setValue]=useState(null)  
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const mainContainerRef = useRef(null);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [confirmation,set_Confirmation]=useState()
  const [loading,set_loading]=useState(false)
  const [showAlert,set_showAlert]= useState(false)
  const [alert_message,set_Alertmessage]= useState('')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigator = useNavigation()


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setIsKeyboardActive(true);
        }
      );
  
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setIsKeyboardActive(false);
        }
      );

    // Load animation after the initial render
    const loadAnimation = async () => {
      setAnimationLoaded(true);
      mainContainerRef.current.slideInDown(2000); 
    };

    return () => {
        loadAnimation();
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
  }, []);

  const handleLogin = async () => {
    set_loading(true)
    if(email=="" || password==""){
      set_loading(false)
      set_showAlert(true)
      set_Alertmessage('Please Enter Email and Password')
    
    }
    else {
      try {
        const response = await axios.post('https://new-api-staging.rydeu.com/login', {
          email,
          password,
          type: "customer"
        });
        set_loading(false)
        // Handle the response as needed
        const user=response.data.data
        navigator.replace('Main',{user})
      } catch (error) {
        // Handle errors
        set_loading(false)
        console.error('Error:', error.message);
        set_showAlert(true)
        set_Alertmessage(error.message)
      }  
    }
  };
  


 
  return (
    <>
    <NativeBaseProvider>
    <KeyboardAvoidingView  behavior="height"
      style={{ flex: 1 }}>
    <Animatable.View
          ref={mainContainerRef}
          animation="slideInDown"
          duration={2000}
          style={styles.Main_container}
        >
        <StatusBar backgroundColor={getThemeStyles().backgroundColor} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        <View style={{ marginTop: -20,
                      height: "95%",
                      backgroundColor: getThemeStyles().backgroundColor,
                      alignItems: "center",
                      borderBottomLeftRadius: 40,
                      borderBottomRightRadius: 40,}}>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{fontSize: 40,fontWeight: "bold",marginBottom:10,color:getThemeStyles().color}}>Ry<Text style={{color:'#4964FF'}}>deu</Text></Text>
            <Text style={styles.Subheading}>
              By signing in, you are agreeing to our <Text style={{color:'#4964FF'}}>Terms and Privacy Policy</Text>
            </Text>
          </View>

          {showAlert&&<Alert  style={{width:"90%",marginTop:10}} status="info" colorScheme="info">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" style={{color:getThemeStyles().alert_message}}>
                  {alert_message}
                </Text>
            </HStack>
            <IconButton onPress={()=>{set_showAlert(false)}} variant="unstyled" _focus={{
              borderWidth: 0
              }} icon={<CloseIcon size="3" />} _icon={{
            color: "coolGray.600"
          }} />
          </HStack>
        </VStack>
          </Alert>}

         
            {true &&<> 
              {(!isKeyboardActive || !showAlert)&&<Text style={styles.Subheading_1}> 
                Embark on a journey with us! By unlocking the magic of sign-in, you're stepping into a world of endless possibilities.
              </Text>}
              <View style={{flexDirection:'row',margin:25,justifyContent:'space-evenly',alignItems:'center'}}>
                <View style={{flex:1}}>
                    <View style={{margin:10}}>
                    <Input
                      style={{margin:5,fontSize:15,color:getThemeStyles().color}}
                      placeholder="Email"
                      keyboardType="email-address"
                      onChangeText={(text) => setEmail(text)}
                      value={email}
                    />
                    </View>
                    
                    <View style={{margin:10}}>
                    <Input
                    style={{margin:5,fontSize:15,color:getThemeStyles().color}}
                      placeholder="Password"
                      secureTextEntry
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                    />
                    </View>
                    
                    <Button
                      buttonStyle={{ borderRadius:15,backgroundColor: "#4964FF",marginTop:10 }}
                      onPress={handleLogin}
                      loading={loading}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
                    </Button>
              </View>
            </View>
          </>
            }
          {!isKeyboardActive&& !showAlert &&<View style={styles.backgroundImage}>
              <Image
                source={colorScheme === 'dark'?require('../Assests/dark_banner_1.png'):require('../Assests/banner_1.png')}
                style={{width:isKeyboardActive ? 300:350,height:isKeyboardActive ? 250:300}}
              />
            </View>}
          
        </View>
        <View style={styles.footer}>
            <Text style={{color:'#fff'}}>Created by Rohan Goswami</Text>
        </View>
        </Animatable.View>
    </KeyboardAvoidingView>
    </NativeBaseProvider>
    </>
  );
}
export default Login;

const styles = StyleSheet.create({
  Main_container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#4964FF",
  },
  Subheading: {
    fontSize: 12,
    alignSelf: 'center',
    color: "#808080",
    marginTop: 5,
    width: 250,
    fontWeight: "400",
    flexShrink: 0,
    textAlign: 'center',
  },
  Subheading_1:{
    fontSize: 14,
    alignSelf: 'center',
    color: "#808080",
    marginTop: 15,
    width: 300,
    fontWeight: "400",
    flexShrink: 0,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: "#4964FF",
    height: "100%",
    alignItems: 'center',
    marginTop: 10,
  },
  backgroundImage: {
    bottom: 10,
  },
  Input_container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    color: '#000000',
  },
  TextInputStyle: {
    height: 40,
    borderWidth: 1,
    color: '#000000',
    width: "80%",
    paddingLeft: 10,
  },
  continueButton: {
    borderRadius: 15,
    marginTop: 25,
    backgroundColor: '#4964FF'
  },
  googleSignInButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  googleButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});




/**
 * email: "rydeu@email10p.org",
        password: "123456",
        type: "customer"
 * 
 * 
 */