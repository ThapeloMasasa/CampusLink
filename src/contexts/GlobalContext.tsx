import React, {useEffect, useContext, useReducer, ReactNode, createContext} from "react";
import { post, YapType,Profile, GlobalState,Action } from "../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState: GlobalState = {
  isLoggedIn: false,
  currentUserId: null,
  currentProfile: null,
  allPosts: [],
  allYaps: [],
};

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        currentUserId: action.payload.userId,
        currentProfile: action.payload.profile,
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_POSTS':
    case 'REFRESH_POSTS':
      return { ...state, allPosts: action.payload };
    case 'SET_YAPS':
    case 'REFRESH_YAPS':
      return { ...state, allYaps: action.payload };
    default:
      return state;
  }
}


const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load persisted state
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('globalState');
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOGIN', payload: { userId: parsed.currentUserId, profile: parsed.currentProfile } });
        dispatch({ type: 'SET_POSTS', payload: parsed.allPosts });
        dispatch({ type: 'SET_YAPS', payload: parsed.allYaps });
      }
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    AsyncStorage.setItem('globalState', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);

// --- Custom hooks
export const useUserPosts = () => {
  const { state } = useGlobalContext();
  return state.allPosts.filter((p) => p.owner === state.currentUserId);
};

export const useUserYaps = () => {
  const { state } = useGlobalContext();
  return state.allYaps.filter((y) => y.owner === state.currentUserId);
};




