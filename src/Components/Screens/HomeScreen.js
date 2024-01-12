import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity,useColorScheme,SafeAreaView } from 'react-native';
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 
import  Entypo  from 'react-native-vector-icons/Entypo'; 
import { Avatar, Input} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CryptoJS from 'react-native-crypto-js';

const screenWidth = Dimensions.get('window').width;
const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [showMenu, setShowMenu] = useState(false);
  const btnRef = useRef();
  const navigator = useNavigation()

  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        divider_line: '#fff',
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#191D23',
        divider_line: '#C51605',
      };
    }
  };
  
  const demoData = [
    { id: '1', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', imageUrl: 'https://via.placeholder.com/150' },
  ];
  const chatData = [
    {
      id: '1',
      imageUrl: 'https://via.placeholder.com/150',
      name: 'John Doe',
      lastMessage: 'Hey there!',
      unreadCount: 2,
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/150',
      name: 'Jane Smith',
      lastMessage: 'How are you?',
      unreadCount: 0,
    },
  ];



  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5, color: getThemeStyles().color }}>
            Wish<Text style={{ color: '#4964FF' }}>pers</Text>
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: getThemeStyles().backgroundColor,
      },
      headerTintColor: getThemeStyles().backgroundColor,
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>
          <TouchableOpacity onPress={() => { console.log('Search') }}>
            <Entypo name="magnifying-glass" size={24} color={getThemeStyles().color} style={{ marginRight: 20 }} />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <AntDesign name="ellipsis1" size={24} color={getThemeStyles().color} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, colorScheme]);

  
  return (

      <SafeAreaView style={[styles.container, { backgroundColor: getThemeStyles().backgroundColor }]}>
        
    <View style={{ alignItems: "center",flexDirection:'row',marginTop:5,margin:10}}>
        <View style={{alignItems:'center',justifyContent:"center"}}>
          <View>  
          <TouchableOpacity>
            <Entypo name="magnifying-glass" size={25} color={getThemeStyles().color} style={{margin:5,marginRight:6}}  />
          </TouchableOpacity>
          </View>
        
        </View> 

        <View style={{flex:1}}>
        <Input style={{borderWidth:0,fontSize: 16,color:getThemeStyles().color}} variant={'rounded'} placeholder="Search"  />
        </View>
    </View>
      
      <View style={styles.chatContainer}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigator.navigate('Chat_screen', { chatId: item.id })}>
            <View style={styles.chatItem}>
              <View style={styles.avatarContainer}>
                <Avatar size={'md'} source={{ uri: item.imageUrl }} />
              </View>
              <View style={styles.chatInfo}>
                <View style={styles.nameAndUnread}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  {item.unreadCount > 0 && (
                    <View style={styles.unreadCount}>
                      <Text style={styles.unreadText}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  chatContent: {
    paddingBottom: 100, 
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  nameAndUnread: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  unreadCount: {
    backgroundColor: '#4964FF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
  lastMessage: {
    color: '#555',
  },
});

export default HomeScreen;


/**
 * 
 *         <Text style={{fontSize:16,marginLeft:15,fontWeight:"bold",color:getThemeStyles().color}}>Status</Text>

 * 
 * <View style={{ height: '10%', flexDirection: 'row', alignItems: 'center' }}>
        <FlatList
          horizontal
          data={demoData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigator.navigate('Stories_screen', { chatId: item.id })}>
            <View style={{ marginLeft: 10 }}>
              <View style={{ backgroundColor: "#4964FF", height: 55, width: 55, justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                <Avatar size={'md'} source={{ uri: item.imageUrl }} />
              </View>
            </View>
          </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}/>
      </View>
 * 
 * 
 * 
 */