export type UserType = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  weight?: string;
  height?: string;
  password?: string;
  gender?: string;
  points?: number;
  age?: number;
  goal?: string;
};

export type ExerciseType = {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  shortMuscleGroup: string;
  longMuscleGroup: string;
  calories: string;
  type: string;
  points: string;
  equipment: string;
  image: string;
  muscleImage: string;
};

export type ExercisesType = ExerciseType[];

export type PlanType = {
  id: number;
  name: string;
  shortDescription: string;
  equipment: string;
  difficulty: string;
  image: string;
  slogan: string;
  numOfTrainings: number;
  longDescription: string;
  weeksDescription: string;
  
};

export type SessionType = {
  userId: number;
  planId: number;
  isCompleted: boolean;
  Plan?: {
    name: string,
    image: string,
  }
};

export type UserResponseType = {
  user: UserType;
  success: boolean;
  accessToken: string;
};
export type PlansType = PlanType[];

export type DayExercise = {
  planId: number;
  points: number;
  Exercises: ExercisesType;
};
