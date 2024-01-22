import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import Account_screen from './Screens/Account_screen';
import { View, Text, useColorScheme} from 'react-native';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'native-base';
import Search from './Screens/Search';

const TabIconWithLottie = ({ focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        source={require('../Assests/Icons/Search.json')}
        autoPlay
        loop={focused}
        style={{ width: 30, height: 30  }}
      />
      {focused}
    </View>
  );
};

const TabIconWithLottie_Account = ({ focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LottieView
        source={require('../Assests/Icons/Account.json')}
        autoPlay
        loop={focused}
        style={{ width: 30, height: 30 }}
      />
      {focused}
    </View>
  );
};

const TabIconWithLottie_Home = ({ focused }) => {
  return (
    <View style={{ alignItems: 'center',justifyContent: 'center' }}>
      <LottieView
        source={require('../Assests/Icons/home.json')}
        autoPlay
        loop={focused}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
};

const Main = ({ route }) => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const { user } = route.params;
  console.log("Main User :",user)
  
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        divider_line:"#fff",
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        divider_line:"#C51605",
      };
    }
  };
  return (
    <>
       <StatusBar backgroundColor={getThemeStyles().backgroundColor} barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
    <View style={{ flex: 1,backgroundColor: getThemeStyles().backgroundColor }}>
      
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle :[{
            backgroundColor: '#4964FF' ,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 50,
          }],
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              return <TabIconWithLottie_Home focused={focused} />;
            } 
            else if (route.name === 'Discover') {
              return <TabIconWithLottie focused={focused} />;
            } 
            else if (route.name === 'Account') {
              return <TabIconWithLottie_Account focused={focused}/>
            }
          },
        })}

      >
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{ user }}/>
        <Tab.Screen name="Discover" component={Search} />
        <Tab.Screen name="Account" component={Account_screen} />
      </Tab.Navigator>
    </View>
    </>);
};

export default Main;
