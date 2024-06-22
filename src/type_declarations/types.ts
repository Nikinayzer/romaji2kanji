export enum APP_MODE {
  R2K = "R2K",
  K2R = "K2R",
}

export enum STATE {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export enum ROLE {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}

export enum TAB {
  USERS = "users",
  WORDS = "words",
  //WORDS_SUGGESTIONS = "words_suggestions",
  REPORTS = "reports",
}

export interface Word {
  id: number;
  english: string;
  kana: string;
  kanji: string;
  isKatakana: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface WordProgress {
  username: string;
  word: Word;
  tries: number;
  successful: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface User {
  id: number;
  username: string;
  role: ROLE;
  registeredAt: Date;
  updatedAt: Date;
  createdWords: Word[];
  wordProgresses: WordProgress[];
  reports: Report[];
  followers: Follower[];
  followingUsers: Follower[];
}

export interface Follower {
  followed: string;
  following: string;
  createdAt?: Date;
}

export interface Report {
  id: number;
  reportedWordId: number;
  reportedWord: string;
  inputValue: string;
  appMode: APP_MODE;
  variant: string;
  notes: string | null;
  createdAt: Date;
  state: STATE;
}

export interface UserData {
  id: number;
  username: string;
  role: ROLE;
  registeredAt: Date;
  updatedAt: Date;
  createdWords: Word[];
  wordProgresses: {
    username: string;
    word: Word;
    tries: number;
    successful: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
  reports: Report[];
  followers: {
    followed: string;
    following: string;
    createdAt: Date;
  }[];
  followingUsers: {
    followed: string;
    following: string;
    createdAt: Date;
  }[];
}
export interface ReportRequest {
  reportedWordId: number;
  reportedWord: string;
  inputValue: string;
  appMode: string;
  variant: string;
  notes: string | null;
}

export interface Symbol {
  kana: string;
  roumaji: string;
  type: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}