import { Redirect } from 'expo-router';
import { useUserStore } from '../store/useUserStore';

export default function IndexScreen() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(onboarding)/step-name'} />;
}
