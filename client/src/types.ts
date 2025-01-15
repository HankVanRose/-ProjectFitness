export type UserType = {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  weight?: string;
  height?: string;
  password?: string;
  gender?: string;
  points: number;
  age?: number;
  goal?: string;
  calories?: number;
};

export type ExerciseType = {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  shortMuscleGroup: string;
  longMuscleGroup: string;
  calories: number;
  type: string;
  points: number;
  equipment: string;
  image: string;
  muscleImage: string;
};

export type ExercisesType = ExerciseType[];

export type PlanType = {
  id?: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  equipment: string;
  difficulty: string;
  image: string;
  slogan: string;
  numOfTrainings: number;
  weeksDescription?: string;
  UserDays: UserDayType[];
};

export type SessionType = {
  userId: number;
  planId: number;
  isCompleted: boolean;
  Plan?: {
    name: string;
    image: string;
    numOfTrainings?: number;
  };
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
  calories?: number;
  description?: string;
  title?: string;
  type?: string;
  target?: string;
  rounds?: number;
  Exercises: ExercisesType;
};

export type UserDayType = {
  userId: number;
  dayId: number;
  isCompleted: boolean;
};

export type ProgressStateType = {
  userDays: UserDayType[];
  sessions: SessionType[];
};
