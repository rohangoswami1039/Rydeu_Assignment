import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icons from react-native-vector-icons
import { Avatar } from 'native-base';
import CustomHeader from './Components/Header';

export default function Chat_screen(props) {
  console.log(props)
  Chat_screen.navigationOptions = {
    header: () => <CustomHeader />, // Use your custom header component here
  };
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulated async loading of messages
    setTimeout(() => {
      const loadedMessages = [
        {
          _id: 1,
          text: 'hello ',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://via.placeholder.com/150',
          },
        },
      ];
      setMessages(loadedMessages);
      setIsLoading(false);
    }, 1000); // Simulated delay for loading messages
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Phone Icon */}
        <TouchableOpacity onPress={() => handlePhoneCall()}>
          <Icon name="phone" size={24} color="green" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {/* Video Call Icon */}
        <TouchableOpacity onPress={() => handleVideoCall()}>
          <Icon name="video-camera" size={24} color="red" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {/* User Avatar */}
        <TouchableOpacity onPress={() => handleUserProfile()}>
          <Avatar
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with user avatar URL
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </TouchableOpacity>
      </View>
      {/* Other header components or user details */}
    </View>
  );

  const handlePhoneCall = () => {
    // Logic for handling phone call
  };

  const handleVideoCall = () => {
    // Logic for handling video call
  };

  const handleUserProfile = () => {
    // Logic for handling user profile
  };

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {renderHeader()}
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={{
              _id: 1,
            }}
            listViewProps={{
              initialNumToRender: 10,
              maxToRenderPerBatch: 5,
              windowSize: 10,
            }}
          />
          {/* Custom message input bar */}
          {/* Implement your custom message input bar here */}
        </View>
      )}
    </>
  );
}
