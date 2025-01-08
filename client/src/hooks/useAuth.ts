import { useAppDispatch } from "@/store/hooks/hooks";
import { fetchUserSignin, fetchUserSignup } from "@/store/thunkActions";
import { UserType } from "@/types";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const signup = async (
    formData: Pick<UserType, 'email' | 'password' | 'username'>
  ) => {
    return await dispatch(fetchUserSignup(formData)).unwrap();
  };

  const signin = async (formData: Pick<UserType, 'email' | 'password'>) => {
    return await dispatch(fetchUserSignin(formData)).unwrap();
  };

  return {
    signup,
    signin,
  };
};
