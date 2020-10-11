import create from "zustand";

interface KurbObject {
  position: number[];
  id: number;
}

export default create((set) => ({
  objects: {
    cones: [],
  },
  addObject: (newObject: KurbObject, objectType: string) =>
    set((state) => ({
      ...state,
      objects: {
        // @ts-ignore
        ...state.objects,
        [objectType]: [...state.objects[type], newObject],
      },
    })),
}));
