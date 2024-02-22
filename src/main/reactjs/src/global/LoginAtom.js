import {atom} from 'recoil';

export const LoginAtom = atom({
  key: 'isLogin',
  default: !(localStorage.getItem('token') === null),
});


// export const UserInfoAtom = atom({
//   key: 'userInfo',
//   default: {},
// });
//
// export const



