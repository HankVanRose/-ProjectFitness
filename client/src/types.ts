export type UserType = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  weight?: number;
  height?: number;
  password?: string;
  gender?: string;
  points?: number;
  age?: number;
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
  description: string;
  equipment: string;
  difficulty: string;
  image: string;
};

export type UserResponseType = {
  user: UserType;
  accessToken: string;
};
export type PlansType = PlanType[];
