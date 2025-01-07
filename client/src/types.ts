export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  weight: number;
  height: number;
};

export type Exercise = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercises = Exercise[];

export type Plan = {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Plans = Plan[];
