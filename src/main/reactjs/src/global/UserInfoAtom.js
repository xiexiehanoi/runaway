import {atom, useRecoilState} from 'recoil';
import {useCallback} from "react";
import axios from "axios";

export const UserInfoAtom = atom({
  key: 'userInfo',
  default: {},
});

export const useFetchUserInfo = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);
  const token = window.localStorage.getItem('token');

  return useCallback(async () => {
    try {
      const request = {
        method: "GET",
        url: `${BACKEND_URL}/api/login/me`,
        headers: {
          Authorization: token
        }
      }
      const res = await axios(request);
      console.log(res.data);
      setUserInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [userInfo]);
}