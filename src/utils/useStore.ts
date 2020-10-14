import create from "zustand";

export enum ObjectLayerType {
  kinetic = "kinetic",
  static = "static",
}

export enum ObjectType {
  cone = "cone",
  foodTruck = "foodTruck",
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
  currentObjectTypeMode?: ObjectType;
  setObjectTypeMode: (objectType?: ObjectType) => void;
  objects: ObjectTypeList;
  addObject: (newObject: KurbObject, objectLayer: ObjectLayerType) => void;
};

export default create<ObjectStore>((set) => ({
  currentObjectTypeMode: ObjectType.cone,
  setObjectTypeMode: (objectType?: ObjectType) =>
    set((state) => ({
      ...state,
      currentObjectTypeMode: objectType,
    })),

  objects: {
    kinetic: [],
    static: [],
  },
  addObject: (newObject: KurbObject, objectLayer: ObjectLayerType) =>
    set((state) => ({
      ...state,
      objects: {
        ...state.objects,
        [objectLayer]: [...state.objects[objectLayer], newObject],
      },
    })),
}));
