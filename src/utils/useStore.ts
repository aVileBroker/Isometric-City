import create from "zustand";

export enum ObjectLayerType {
  kinetic = "kinetic",
  static = "static",
}

export enum ObjectType {
  cone = "cone",
  foodTruck = "foodTruck",
  tables = "tables",
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
  tutorialOpen: boolean;
  setTutorialState: (newState: boolean) => void;
  currentObjectTypeMode?: ObjectType;
  setObjectTypeMode: (objectType?: ObjectType) => void;
  objects: ObjectTypeList;
  removeAllObjects: () => void;
  addObject: (newObject: KurbObject, objectLayer: ObjectLayerType) => void;

  truckHonkAudio: HTMLAudioElement;
  truckAudio: HTMLAudioElement;
  plasticAudio: HTMLAudioElement;
  creationAudio: HTMLAudioElement;
};

export default create<ObjectStore>((set, get) => ({
  tutorialOpen: true,
  setTutorialState: (newState: boolean) =>
    set(
      (state: ObjectStore): ObjectStore => ({
        ...state,
        tutorialOpen: newState,
      })
    ),

  currentObjectTypeMode: undefined,
  setObjectTypeMode: (objectType?: ObjectType) =>
    set(
      (state: ObjectStore): ObjectStore => ({
        ...state,
        currentObjectTypeMode: objectType,
      })
    ),

  objects: {
    kinetic: [],
    static: [],
  },
  removeAllObjects: () => {
    const audio = get().creationAudio;

    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play();

    set(
      (state: ObjectStore): ObjectStore => ({
        ...state,
        objects: {
          kinetic: [],
          static: [],
        },
      })
    );
  },
  addObject: (newObject, objectLayer) => {
    const audio = get().creationAudio;

    audio.currentTime = 0;
    audio.volume = 0.75;
    audio.play();

    set(
      (state: ObjectStore): ObjectStore => ({
        ...state,
        objects: {
          ...state.objects,
          [objectLayer]: [...state.objects[objectLayer], newObject],
        },
      })
    );
  },

  truckHonkAudio: new Audio("/audio/food-truck-honk.mp3"),
  truckAudio: new Audio("/audio/food-truck.mp3"),
  plasticAudio: new Audio("/audio/plastic-collision-mixed.mp3"),
  creationAudio: new Audio("/audio/object-creation.mp3"),
}));
