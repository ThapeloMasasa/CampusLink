import { Image, ImageSourcePropType } from 'react-native';


export type AuthProps = {
    setIsLoggedIn: (value: boolean) => void;
  };
  export type RootStackParamList = {
    ConnectZone: undefined;
    Section: { groupName: string };
  };
  export type Message = {
    id: string;
    text: string;
    sender: 'me' | 'group';
  };

  export 
  type PostProps = {
      title: string;
      content: string;
      image?: ImageSourcePropType;
      likes: string;
      shares: string;
    };
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
    id: string;
    title: string;
    content: string;
    createdAt: string;   // ISO string
    likes: number;
    score: number;
    reactions?: string[];
  };
  export type LeaderboardProps = {
    yaps: YapType[];
  };
  
  export type SectionName = 'General' | 'LeetCode' | 'Resumes' | 'Projects';
