export type AuthProps = {
    setIsLoggedIn: (value: boolean) => void;
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
    reactions?: string[]; // optional array of emoji strings
  };
  export type LeaderboardProps = {
    yaps: YapType[];
  };
  