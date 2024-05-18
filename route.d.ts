export type StackParamList = {
  Start: undefined;
  QuizSelect: undefined;
  Camera: undefined;
  Map: { breadId: number | null };
  Map2: undefined;
  TakePhotoF: { breadId: number | null, photoUri: string };
  PhotoCheck: { breadId: number | null, photoUri: string };
  BreadDetail: { breadId: number };
  ResultCorrect: undefined;
  ResultFalse: undefined;
  ResultGiveUp: undefined;
};