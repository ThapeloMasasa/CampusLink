import { Image, ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthProps = {
    setIsLoggedIn: (value: boolean) => void;
  };
  export type RootStackParamList = {
    ConnectZone: undefined;
    SectionScreen: { groupName: string };
    GroupChat: {sectionName: string};
  };
  export type Message = {
    id: string;
    text: string;
    sender: 'me' | 'group';
    profile: string
  };
// types.ts

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  rating?: number;
  yaps : Yap[]
  posts : PostProps[]
  Deals : StudentDealCardProps[]
}
export type currentUser = {
  id: string;
  created_at: string;
  full_name: string;
  avatar_url: string;
  rating: number

}

export interface Yap {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}
export interface post {
  id: string;
  created_at: string;
  Header: string;
  content?: string;
  image?: string;
  likes: number;
  reactions: string[];
  owner: string;
}

export interface PostProps {
  title: string;
  content: string;
  image?: any;
  likes: number;
  reactions: any[]; 
  mypost: boolean;
  userId: string
}

export type deal = {
        price: string;
        image: ImageSourcePropType;
        message: string;
     }
export type StudentDealCardProps = {
  image: ImageSourcePropType;
  price: string;
  message: string;
};


export type localDeal = {
    store: string;
    image: ImageSourcePropType;
    storeLogo: ImageSourcePropType;
    price: string
    latitude: number
    longitude: number
  }

  export type MainStackParamList = {
    MainTabs: undefined; 
    ViewProfile: { userId: string };
    GroupChat: {sectionName: string}
    DirectMessageScreen: {username: string | undefined};
  };

  export interface DirectMessage {
    id: string;
    sender: 'me' | 'other';
    text: string;
  }
 export interface DirectMessageScreenProps {
    route: any;
  }
export type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'MainTabs'>;


export type ViewProfileRouteProp = RouteProp<MainStackParamList, 'ViewProfile'>;
export type DirectMessageProp = RouteProp<MainStackParamList, 'DirectMessageScreen'>;
export type ViewProfileNavigationProp = StackNavigationProp<MainStackParamList, 'ViewProfile'>;
export type GroupChatRouteProp = RouteProp<RootStackParamList, 'GroupChat'>;

export type ProfileIconProps = {
    userId: string;
  };

export type groupItem ={
    name: string;
    image: Image;
  }
  export type FlipSpaceTabParamList = {
    Students: undefined;
    Local: undefined;
  };

  export type GroupCardProps = {
    groupName: string;
    isOpen: boolean; 
    onPress: () => void;
    backgroundImage: any; 
  };
  
  export type AuthStackParamList = {
    LogIn: undefined;
    SignUp: undefined;
  };

  export type YapProps = {
    title: string;
    content: string;
    initialLikes?: number;
    initialReactions?: string[]; // List of reactions (e.g., emoji strings)
  }

  export type EmojiPickerProps = {
    onSelect: (emoji: string) => void;
    onClose: () => void;
    visible: boolean;
  };

  export type YapType = {
    owner: string | null;
    id: string;
    title: string;
    Content: string;
    createdAt: string; 
    yap: boolean;
    likes: number;
    score: number;
    reactions?: string[];
  };

  export type GlobalState = {
  isLoggedIn: boolean;
  currentUserId: string | null;
  currentProfile: currentUser | null;
  allPosts: post[];
  allYaps: YapType[];
  allProfiles: currentUser[] | null
};

export type Action =
  | { type: 'LOGIN'; payload: { isLoggedIn: boolean; currentUserId: string; currentProfile: currentUser | null } }
  | { type: 'LOGOUT' }
  | { type: 'SET_POSTS'; payload: post[] }
  | { type: 'SET_YAPS'; payload: YapType[] }
  | { type: 'REFRESH_POSTS'; payload: post[] }
  | { type: 'SET_PROFILES'; payload: currentUser [] | null }
  | { type: 'REFRESH_YAPS'; payload: YapType[] }
  | { type: 'RESTORE_STATE'; payload: {currentUserId: string, currentProfile:currentUser} };
  export type LeaderboardProps = {
    yaps: YapType[];
  };
  
  export type SectionName = 'General' | 'LeetCode' | 'Resumes' | 'Projects';
