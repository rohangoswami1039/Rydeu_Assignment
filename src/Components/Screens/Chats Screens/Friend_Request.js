import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"


export default function Friend_Request({navigation}) {
  const [requests,setFriendRequests] = useState()
  
  useEffect(()=>{
    const subscriber = firestore()
                        .collection('Users')
                        .doc(auth().currentUser.uid)
                        .collection('Requests')
                        .onSnapshot((onSnapshot)=>{
                          let requestsData = [];
                          onSnapshot.forEach((document) => {
                            const { Sent_time, uid,} = document.data();
                            requestsData.push({ Sent_time, uid, key: document.id });
                          });
                          setFriendRequests(requestsData);
                        })
    return () => subscriber;
  },[])
  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate(); 
    return dateObject.toLocaleString(); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.uid}</Text>
      <Text>{item.message}</Text>
      <Text>Sent Time: {formatTimestamp(item.Sent_time)}</Text>
    </View>
  );

  console.log(requests)
  return (
    <View style={styles.container}>
      <Text>Friend Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginVertical: 10,
  },
})