import axiosInstance from '../axiosInstance';

interface UserDay {
  id: number;
  userId: number;
  dayId: number;
  isCompleted: boolean;
  plannedOn: string | null;
  Day: {
    id: number;
    name: string;
    planId: number;
    Exercises: Array<{
      id: number;
      name: string;
      description: string;
    }>;
    Plan: {
      name: string;
    };
  };
}

export const userDaysService = {
  getCalendarDays: async (userId: number, startDate: string, endDate: string) => {
    const { data } = await axiosInstance.get<{ [key: string]: UserDay[] }>(
      `/api/userdays/user/${userId}/calendar?startDate=${startDate}&endDate=${endDate}`
    );
    return data;
  },

  getDayTrainings: async (userId: number, date: string) => {
    const { data } = await axiosInstance.get<UserDay[]>(
      `/api/userdays/user/${userId}/date/${date}`
    );
    
    return data;
  },

  getUnplannedDays: async (userId: number) => {
    const { data } = await axiosInstance.get<UserDay[]>(
      `/api/userdays/unplanned/${userId}`
    );
    return data;
  },

  updatePlannedDate: async (userDayId: number, plannedOn: string) => {
    const { data } = await axiosInstance.patch<UserDay>(
      `/api/userdays/plan/${userDayId}`,
      { plannedOn }
    );
    return data;
  },

  updateCompletion: async (userDayId: number, isCompleted: boolean) => {
    const { data } = await axiosInstance.patch<UserDay>(
      `/api/userdays/${userDayId}`,
      { isCompleted }
    );
    return data;
  },
};
