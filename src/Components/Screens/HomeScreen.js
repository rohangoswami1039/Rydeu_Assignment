import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity,useColorScheme,SafeAreaView,Platform } from 'react-native';
import  AntDesign  from 'react-native-vector-icons/AntDesign'; 
import  Entypo  from 'react-native-vector-icons/Entypo'; 
import { Input} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const HomeScreen = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
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
  const user = route.params.user
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  
  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5, color: getThemeStyles().color }}>
            Ryd<Text style={{ color: '#4964FF' }}>eu </Text>
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: getThemeStyles().backgroundColor,
      },
      headerTintColor: getThemeStyles().backgroundColor,
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 15 }}>       
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
    <View style={styles.Date_Container}>
      <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: getThemeStyles().color }}>Name:</Text>
          <Text style={{ color: getThemeStyles().color }}>{user.user.account.firstName} {user.user.account.lastName}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: getThemeStyles().color }}>Email:</Text>
          <Text style={{ color: getThemeStyles().color }}>{user.user.email}</Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', color: getThemeStyles().color }}>Created At:</Text>
          <Text style={{ color: getThemeStyles().color }}>{user.user.createdAt}</Text>
        </View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Touch Me to Change the date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View
          style={{
            backgroundColor: getThemeStyles().backgroundColor,
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={{color:getThemeStyles().color}}>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
        </View>
      </TouchableOpacity>
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>

    </View>
  </SafeAreaView>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Date_Container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  
});

export default HomeScreen;

