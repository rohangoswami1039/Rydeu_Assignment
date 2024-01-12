import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// CustomHeader component for React Navigation
const CustomHeader = () => {
  const navigation = useNavigation();

  // Function to handle button press or navigation
  const handleProfilePress = () => {
    // Navigate to the profile screen or perform an action
    // Example: navigation.navigate('Profile');
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60, backgroundColor: '#f0f0f0' }}>
      {/* Left side of the header */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* Add your left header icon or text here */}
        <Text>Back</Text>
      </TouchableOpacity>

      {/* Center of the header */}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chat Screen</Text>

      {/* Right side of the header */}
      <TouchableOpacity onPress={() => handleProfilePress()}>
        {/* Add your right header icon or avatar here */}
        <Image
          source={{ uri: 'https://via.placeholder.com/30' }} // Replace with user avatar URL
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
