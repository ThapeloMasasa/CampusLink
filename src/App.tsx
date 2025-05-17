import AppNavigator from './auth/appNavigator';
import { GlobalProvider } from './contexts/GlobalContext';
export default function App() {

  return (<GlobalProvider>
              <AppNavigator/>
          </GlobalProvider>
)
}


