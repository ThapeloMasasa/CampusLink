import { Image, ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export type AuthProps = {
    setIsLoggedIn: (value: boolean) => void;
  };
  export type RootStackParamList = {
    ConnectZone: undefined;
    SectionScreen: { group: groupItem,};
    GroupChat: {section: string, groupName: string, admin: string};
  };
  export type Message = {
    id: string;
    content: string;
    sender_id: string;
    receiver_id: string| null;
    is_group: boolean;
    group_id: string| null 
    created_at: string
  };


export type myday = {
  owner: string;
  image: string;
  created_at: string;
}
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
  linkedIn_url: string | undefined
  insta_url: string | undefined

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
export type YikYakStyleYapProps = {
  content: string;
  likes: number;
  onLike: () => void;
  onDislike: () => void;
  commentCount: number;
  timestamp: string; 
  distance: string;  // optional
};

export interface PostProps {
  title: string;
  content: string;
  image?: any;
  likes: number;
  reactions: any[]; 
  mypost: boolean;
  userId: string | null
  createdAt: string
}

export type deal = {
        price: string;
        image: ImageSourcePropType;
        message: string;
     }
export type StudentDealCardProps = {
  image: ImageSourcePropType;
  price: string;
  instructions: string;
  userId: string;
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
    ViewProfile: { userId: string | null };
    GroupChat: {sections: string[]| null}
    DirectMessageScreen: {username: string | undefined};
    InboxScreen: { userId: string | null };
  };

  export interface DirectMessage {
    id: string
    sender: string | null;
    content: string;
  }
 export interface DirectMessageScreenProps {
    route: any;
  }
 export type SectionScreenProps = StackScreenProps<RootStackParamList, 'SectionScreen'>;
export type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'MainTabs'>;
export type ViewProfileRouteProp = RouteProp<MainStackParamList, 'ViewProfile'>;
export type DirectMessageProp = RouteProp<MainStackParamList, 'DirectMessageScreen'>;
export type ViewProfileNavigationProp = StackNavigationProp<MainStackParamList, 'ViewProfile'>;
export type GroupChatRouteProp = RouteProp<RootStackParamList, 'GroupChat'>;
export type InboxScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'InboxScreen'>;

export type ProfileIconProps = {
    userId: string | null;
  };

export type groupItem ={
    name: string;
    image: Image;
    sections: string[]
    has_sections: boolean
    admin: string
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
    Content: string;
    image : string;
    has_image: boolean;
    created_at: string; 
    yap: boolean;
    likes: number;
    score: number;
    reactions?: string[];
    header: string
  };

  export type GlobalState = {
  isLoggedIn: boolean;
  currentUserId: string | null;
  currentProfile: currentUser | null;
  allPosts: post[];
  allYaps: YapType[];
  allProfiles: currentUser[] | null
  allMydays: myday[][];
  allMessages: Message[] | null;
};
export type AvatarProps = {
  uri: string;
  size: number;
  rounded: number;
};
export type DMPreview = {
  id: string;
  name: string;
  latestMessage: string;
  timestamp: string;
  profileImage: string;
};
export type Action =
  | { type: 'LOGIN'; payload: { isLoggedIn: boolean; currentUserId: string; currentProfile: currentUser | null } }
  | { type: 'LOGOUT' }
  | { type: 'SET_POSTS'; payload: post[] }
  | { type: 'SET_MESSAGES'; payload: Message[]| null }
  | { type: 'SET_MYDAYS'; payload: myday[][] }
  | { type: 'SET_YAPS'; payload: YapType[] }
  | { type: 'REFRESH_POSTS'; payload: post[] }
  | { type: 'SET_PROFILES'; payload: currentUser [] | null }
  | { type: 'REFRESH_YAPS'; payload: YapType[] }
  | { type: 'RESTORE_STATE'; payload: {currentUserId: string, currentProfile:currentUser} };
  export type LeaderboardProps = {
    yaps: YapType[];
  };
  
  export type SectionName = 'General' | 'LeetCode' | 'Resumes' | 'Projects';