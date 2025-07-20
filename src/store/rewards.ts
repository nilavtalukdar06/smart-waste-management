import { create } from "zustand";

interface IRewards {
  rewards: number;
  setInitialRewards: (reward: number) => void;
  setRewards: (reward: number) => void;
}

const useRewards = create<IRewards>((set) => ({
  rewards: 5,
  setInitialRewards: (reward: number) => set((state) => ({ rewards: reward })),
  setRewards: (reward: number) =>
    set((state) => ({ rewards: state.rewards + reward })),
}));

export default useRewards;
