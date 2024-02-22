import {atom} from 'recoil';

export const LoginAtom = atom({
  key: 'isLogin',
  default: !(localStorage.getItem('token') === null),
});
