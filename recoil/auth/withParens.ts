import { selector } from 'recoil';
import authAtom from './authAtomState';

const exampleWithParens = selector({
  key: 'exampleWithParens',
  get: ({ get }) => `Adding parens - isLogin : (${get(authAtom).isLogin})`,
  // set: ({ get, set }, newValue) => {
  //   set(authAtom, newValue);
  // },
});

export default exampleWithParens;
