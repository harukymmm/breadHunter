export type StackParamList = {
  Start: undefined;
  QuizSelect: undefined;
  QuizDetail: { breadId: number };
  MapDefault: { breadId: number | null };
  NearBakery: { breadId: number | null };
  TakePhotoF: { breadId: number | null };
  BreadDetail: { breadId: number };
  TakePhotoL: { breadId: number };
  ResultCorrect: { breadId: number | null };
  ResultFalse: { breadId: number | null };
  ResultGiveUp: { breadId: number | null };
};