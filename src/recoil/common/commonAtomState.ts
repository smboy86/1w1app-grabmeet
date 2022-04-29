import { atom } from 'recoil';

const commonAtomState = atom({
  key: 'commonAtomState',
  default: {
    isMainLoading: true,
  },
});

export default commonAtomState;
