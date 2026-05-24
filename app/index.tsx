import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

export default function IndexScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.canvas }}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}
