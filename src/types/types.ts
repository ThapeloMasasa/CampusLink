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
