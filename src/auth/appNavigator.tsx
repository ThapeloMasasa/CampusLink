import AuthNavigator from './AuthNavigator';
import MainNavigator from '../navigation/MainNavigator';
import AuthNavigatorInitial from './AuthNavigatorInitial';
import { useGlobalContext } from '../contexts/GlobalContext';

export default function AppNavigator({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  const { state } = useGlobalContext();

  if (state.isLoggedIn) return <MainNavigator />;
  if (isFirstLaunch) return <AuthNavigatorInitial />;
  return <AuthNavigator />;
}
