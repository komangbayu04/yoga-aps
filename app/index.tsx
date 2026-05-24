import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';

export default function IndexScreen() {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#FF0000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 24 }}>LOADING...</Text>
      </View>
      <Redirect href="/(onboarding)/step-name" />
    </>
  );
}
