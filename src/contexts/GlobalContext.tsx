import React, {useEffect, useContext, useReducer, ReactNode, createContext} from "react";
import { GlobalState,Action } from "../types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState: GlobalState = {
  isLoggedIn: false,
  currentUserId: null,
  currentProfile: null,
  allPosts: [],
  allYaps: [],
  allProfiles: []
};

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        currentUserId: action.payload.currentUserId,
        currentProfile: action.payload.currentProfile,
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_POSTS':
    case 'REFRESH_POSTS':
      return { ...state, allPosts: action.payload };
    case 'SET_YAPS':
    case 'REFRESH_YAPS':
      return { ...state, allYaps: action.payload };
    case 'RESTORE_STATE':
            return {
                ...state,
                currentUserId: action.payload.currentUserId,
                currentProfile: action.payload.currentProfile,
            };

    case 'SET_PROFILES':
      return { ...state, allProfiles: action.payload };
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

  useEffect(() => {
  const loadPersistedState = async () => {
    try {
      const stored = await AsyncStorage.getItem('globalState');
      if (stored) {
        const parsed = JSON.parse(stored);

       if (parsed && typeof parsed === 'object') {
  if (parsed.currentUserId && parsed.currentProfile) {
    dispatch({
      type: 'RESTORE_STATE',
      payload: {
        currentUserId: parsed.currentUserId,
        currentProfile: parsed.currentProfile,
      },
    });
  }}


        if (parsed?.allPosts) dispatch({ type: 'SET_POSTS', payload: parsed.allPosts });
        if (parsed?.allYaps) dispatch({ type: 'SET_YAPS', payload: parsed.allYaps });
        if (parsed?.allProfiles) dispatch({ type: 'SET_PROFILES', payload: parsed.allProfiles }); 
      }
    } catch (e) {
      console.warn('Failed to load global state:', e);
    }
  };

  loadPersistedState(); // async function called inside useEffect
}, []);

  // Persist on change
 useEffect(() => {
  // Persist everything except isLoggedIn
  const { isLoggedIn, ...persistedState } = state;
  AsyncStorage.setItem('globalState', JSON.stringify(persistedState));
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




