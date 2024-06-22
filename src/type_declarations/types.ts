// export interface Word {
//   img: string;
//   mean: string;
//   jp: {
//     wd: string;
//     kj: string;
//     isKatakana: boolean;
//   };
//   category: string;
// }

export enum Status {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  PENDING = "Pending",
}

export enum Role {
  ADMIN = "Admin",
  USER = "User",
}
export enum Tab {
  USERS = "users",
  WORDS = "words",
  WORDS_SUGGESTIONS = "words_suggestions",
  REPORTS = "reports",
}
export interface Word {
  id: number;
  english: string;
  kana: string;
  kanji: string;
  isKatakana: boolean;
}
export interface User{
  id: number;
  username: string;
  role: Role;
  updatedAt: Date;
  createdAt: Date

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