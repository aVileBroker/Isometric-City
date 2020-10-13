import create from "zustand";

export enum ObjectLayerType {
  kinetic,
  static,
}

export enum ObjectType {
  cone,
  foodTruck,
}

export type KurbObject = {
  position: number[];
  rotation?: number[];
  type: ObjectType;
  id: number | string;
};

export type ObjectTypeList = {
  [K in ObjectLayerType]: KurbObject[];
};

export type ObjectStore = {
  objects: ObjectTypeList;
  addObject: (newObject: KurbObject, objectType: ObjectLayerType) => void;
};

export default create<ObjectStore>((set) => ({
  objects: {
    kinetic: [
      {
        position: [
          Math.random() * 10,
          Math.random() * 20 + 5,
          Math.random() * 30 - 15,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        type: ObjectType.cone,
        id: 0,
      },
    ],
    static: [
      {
        position: [
          Math.random() * 10,
          Math.random() * 20 + 5,
          Math.random() * 30 - 15,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        type: ObjectType.cone,
        id: 1,
      },
    ],
  },
  addObject: (newObject: KurbObject, objectType: ObjectLayerType) =>
    set((state) => ({
      ...state,
      objects: {
        // @ts-ignore
        ...state.objects,
        [objectType]: [...state.objects[type], newObject],
      },
    })),
}));
