import { View, Text,useColorScheme,TextInput,ActivityIndicator} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import  Entypo  from 'react-native-vector-icons/Entypo'; 
import { StyleSheet } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { Avatar, Badge, Button, FlatList, Input, VStack } from 'native-base';
import SearchInput, { createFilter } from 'react-native-search-filter';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

export default function SettingsScreen({navigation}) {
  const [user_contacts, set_user_contacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [Created_user,set_Created_user]=useState()
  const [commonNumbers, setCommonNumbers] = useState([]);
  const [sentContact,set_sentContact]=useState([])
  const Navigator = useNavigation()

  const colorScheme = useColorScheme();
  const getThemeStyles = () => {
    if (colorScheme === 'dark') {
      return {
        backgroundColor: '#191D23',
        color: '#ffffff',
        secondary_text:'#ced4da'        
      };
    } else {
      return {
        backgroundColor: '#ffffff',
        color: '#000000',
        secondary_text:'#4a4e69'
      };
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5, color: getThemeStyles().color }}>
            Disc<Text style={{ color: '#4964FF' }}>over</Text>
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: getThemeStyles().backgroundColor,
      },
      headerTintColor: getThemeStyles().backgroundColor,
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 30 }}>
          <TouchableOpacity onPress={()=>{Navigator.push('Request');}}>
          <VStack>
             <Badge 
                colorScheme="danger" rounded="full" mb={-2} mr={-3}  variant="solid" alignSelf="flex-end" _text={{
                fontSize: 10}}>
                  1
              </Badge>
              <FontAwesome5 name="user-friends" size={20} color={getThemeStyles().color} />
          </VStack> 
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, colorScheme]);


  useEffect(()=>{
    get_permission()
  },[])

  


  const get_permission = ()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'Wishpers would like to view your contacts.',
      buttonPositive: 'Continue',
  })
      .then((res) => {
        setLoadingContacts(true)
        console.log('Permission: ', res);
        Contacts.getAll()
        .then(async (contacts) => {
          const users_ref = firestore().collection('Users')
          const responseCollection = await users_ref.get();
          const phoneNumbers = responseCollection.docs.map((doc) => ({phone:doc.data().phone,uid:doc.data().uid}));
          const formattedPhoneNumbers = phoneNumbers.map((phoneNumber) => ({phone:phoneNumber.phone.substring(3),uid:phoneNumber.uid})); 
          set_Created_user(formattedPhoneNumbers)
          const formattedContacts = contacts
            .filter((contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0)
            .map((contact) => ({
              name: contact.displayName,
              Phone: formatPhoneNumber(contact.phoneNumbers[0]?.number || ''),
            }))
            .filter((contact) => contact.Phone.length >= 10); 
          set_user_contacts(formattedContacts);
          setLoadingContacts(false);
        })
        .catch((e) => {
          console.log(e);
          setLoadingContacts(false);
        });
      })
      .catch((error) => {
          console.error('Permission error: ', error);
      });
  }
  const formatPhoneNumber = (phoneNumber) => {
    const cleanedNumber = phoneNumber.replace(/\D/g, ''); 
    let formattedNumber = cleanedNumber;
    if (cleanedNumber.length > 10) {
      let reversed= formattedNumber.split('').reverse().join('')
      if(reversed.length === 10){
        formattedNumber = reversed.split('').reverse().join('')
      }
      else if (reversed.length ===12){
        slicedNumber = reversed.slice(0,-2)
        formattedNumber = slicedNumber.split('').reverse().join('')
      }
    }     
    return formattedNumber;
  };

  const KEYS_TO_FILTERS = ['name', 'Phone'];
  const memoizedFilteredContacts = React.useMemo(() => {
    return user_contacts.filter(createFilter(searchQuery, KEYS_TO_FILTERS));
  }, [user_contacts, searchQuery]);


  useEffect(() => {
    const commonNumbersArray = user_contacts
    .filter(contact => {
      const formattedContactPhone = formatPhoneNumber(contact.Phone);
      return Created_user.some(user => user.phone === formattedContactPhone);
    })
    .map(commonContact => {
      const formattedCommonContactPhone = formatPhoneNumber(commonContact.Phone);
      const matchedUser = Created_user.find(user => user.phone === formattedCommonContactPhone);
      return { ...commonContact, uid: matchedUser ? matchedUser.uid : null };
    });
  setCommonNumbers(commonNumbersArray);
  }, [user_contacts, Created_user]);
  
  useEffect(()=>{
    if(commonNumbers ==null){
      console.log('Empty')
    }else {
      console.log('Not Empty')
    }
  },[commonNumbers])
  commonNumbers.forEach((contact)=>{
    console.log(contact)
  })

  const handle_Request= async(uid)=>{
    const RequestRef = firestore().collection("Users").doc(uid).collection("Requests")
    const SentRef = firestore().collection("Users").doc(uid).collection("Sent").doc(uid)
    
      SentRef.set({
        uid:uid,
        Sent_time:firestore.FieldValue.serverTimestamp()
      }).then(async (e)=>{
        await RequestRef.add({
          uid:auth().currentUser.uid,
          Sent_time:firestore.FieldValue.serverTimestamp()
        }).then((e)=>{
          console.log("Request has been sent ")
        }).catch((e)=>{
          console.log(e)
        })
      }).catch((e)=>{
        console.log(e)
      })
  }
  const handle_Invite = ()=>{
    console.log("Friend Invite Button")
  }





  const MemoizedRenderItem = React.memo(({ item, sectionTitle }) => {
    return (
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {sectionTitle === 'Wishpers Contacts' && (
              <Avatar source={{ uri: 'https://via.placeholder.com/150' }} size={'md'} />
            )}
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: getThemeStyles().secondary_text }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: getThemeStyles().secondary_text }}>{item.Phone}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
           {item?.uid !== auth().currentUser.uid && <Button onPress={sectionTitle === 'Wishpers Contacts'? ()=>{handle_Request(item.uid)} : handle_Invite} 
                    variant={sectionTitle === 'Wishpers Contacts' ? 'solid' : 'link'} style={{ backgroundColor: sectionTitle === 'Wishpers Contacts' ? '#4964FF' : '' }}>
              <Text style={{ color: sectionTitle === 'Wishpers Contacts' ? '#fff' : '#4964FF' }}>
                {sectionTitle === 'Wishpers Contacts' ? 'Send Request' : 'Invite'}
              </Text>
            </Button>}
          </View>
        </View>
      </View>
    );
  });
 
  return (
    <View style={{ flex: 1, backgroundColor: getThemeStyles().backgroundColor }}>
    <View style={{justifyContent:'space-between',alignItems: "center",flexDirection:'row',marginTop:15,margin:10}}>
      <View style={{flex:1,flexDirection:'row'}}>
      <Input
        style={{borderWidth:0,fontSize: 16,color:getThemeStyles().color}}
        variant={'rounded'}
        placeholder="Search by name or phone..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      </View>
      <View>
      <TouchableOpacity style={{marginLeft:10}} onPress={() => setSearchQuery('')}>
        <AntDesign name="closecircle" size={25} color="gray" />
      </TouchableOpacity>
      </View>
    </View>
    <View style={{justifyContent:'space-between'}}>
   {loadingContacts ?
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} color={'#4964FF'}/>
    </View> 
   :
   <FlatList
  data={[
    { data: commonNumbers, title: 'Wishpers Contacts' },
    { data: memoizedFilteredContacts, title: 'Invite on Wishpers' }
  ]}
  renderItem={({ item }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: getThemeStyles().color, paddingHorizontal: 20, marginBottom: 10 }}>
        {item.title}
      </Text>
      <FlatList
        data={item.data.map(contact => ({ ...contact, title: item.title }))}
        renderItem={({ item }) => <MemoizedRenderItem item={item} sectionTitle={item.title} />}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={10} // Set initialNumToRender for better performance
        maxToRenderPerBatch={10} // Set maxToRenderPerBatch for improved efficiency
        windowSize={5} // Adjust windowSize for rendering optimization
        removeClippedSubviews={true} // Use removeClippedSubviews for memory optimization
      />
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>}
      </View>
  </View>
  )
}
const styles = StyleSheet.create({
  container:{
  
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginTop:20,
    
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  contactItem: {
    
  },
  contactName: {
   
  },
  contactPhone: {
    
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
