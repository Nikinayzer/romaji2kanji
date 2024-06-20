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
export interface Word {
  id: number;
  english: string;
  kana: string;
  kanji: string;
  isKatakana: boolean;
}

export interface Symbol {
  kana: string;
  roumaji: string;
  type: string;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}