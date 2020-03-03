import {
  ICharacter,
  ICreateCharacter,
  IRace,
  ICharClass,
  IBackground,
  IDataSources,
  ILevelSpecific,
} from './interfaces'

const resolvers = {
  Mutation: {
    createCharacter: (
      _: any,
      {
        name,
        raceID,
        subraceID,
        charClassID,
        backgroundID,
        abilityScores,
        skills,
        items,
        maxHP,
        HP,
        startingGp
      }: ICreateCharacter,
      { dataSources }: { dataSources: IDataSources }
    ) =>
      dataSources.characterAPI.createCharacter({
        name,
        raceID,
        subraceID,
        charClassID,
        backgroundID,
        abilityScores,
        skills,
        items,
        maxHP,
        HP,
        startingGp
      }),
    deleteCharacter: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.deleteByID({ ID }),
  },

  Query: {
    characters: (
      _: any,
      __: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getAll(),
    character: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getByID({ ID }),
    races: (_: any, __: any, { dataSources }: { dataSources: IDataSources }) =>
      dataSources.raceAPI.getAll(),
    race: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getByID({ ID }),
    raceTraits: (
      _: any,
      { raceID }: { raceID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getTraits({ ID: raceID }),
    spells: (_: any, __: any, { dataSources }: { dataSources: IDataSources }) =>
      dataSources.spellAPI.getAll(),
    spell: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.spellAPI.getByID({ ID }),
    backgrounds: (
      _: any,
      __: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.backgroundAPI.getAll(),
    background: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.backgroundAPI.getByID({ ID }),
    charClasses: (
      _: any,
      __: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getAll(),
    charClass: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getByID({ ID }),
    skills: (_: any, __: any, { dataSources }: { dataSources: IDataSources }) =>
      dataSources.skillAPI.getAll(),
    customItems: (
      _: any,
      __: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.itemAPI.getCustomItems(),
    armor: (_: any, __: any, { dataSources }: { dataSources: IDataSources }) =>
      dataSources.itemAPI.getArmor(),
    weapons: (
      _: any,
      { filter }: { filter?: { skillType?: string; rangeType?: string } },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.itemAPI.getWeapons(filter),
    gearPacks: (
      _: any,
      __: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.itemAPI.getGearPacks(),
    gearPack: (
      _: any,
      { ID }: { ID: string },
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.itemAPI.getGearPack({ ID }),
  },

  CharClass: {
    features: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getFeatures({ ID: CharClass.ID }),
    skills: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getSkills({ ID: CharClass.ID }),
    levelSpecifics: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getLevelSpecifics({ ID: CharClass.ID }),
  },

  CharacterClass: {
    features: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getFeatures({ ID: CharClass.ID }),
    skills: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getSkills({ ID: CharClass.ID }),
    levelSpecifics: (
      CharClass: ICharClass,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.charClassAPI.getLevelSpecifics({ ID: CharClass.ID }),
  },

  LevelSpecific: {
    features: (
      LevelSpecific: ILevelSpecific,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) =>
      dataSources.charClassAPI.getLevelFeatures({
        charClassID: LevelSpecific.classID,
        classLevel: LevelSpecific.classLevel,
      }),
  },

  Character: {
    race: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getRace({ ID: Character.ID }),
    subrace: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) =>
      dataSources.characterAPI.getSubrace({
        ID: Character.ID,
      }),
    charClass: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getCharClass({ ID: Character.ID }),
    background: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) =>
      dataSources.characterAPI.getBackground({
        ID: Character.ID,
      }),
    skills: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getSkills({ ID: Character.ID }),
    weapons: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getWeapons({ ID: Character.ID }),
    armor: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getArmor({ ID: Character.ID }),
    customItems: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getCustomItems({ ID: Character.ID }),
    adventuringGear: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getAdventuringGear({ ID: Character.ID }),
    tools: (
      Character: ICharacter,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.characterAPI.getTools({ ID: Character.ID }),
  },

  Race: {
    subraces: (
      Race: IRace,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getSubraces({ ID: Race.ID }),
    traits: (
      Race: IRace,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getTraits({ ID: Race.ID }),
    skills: (
      Race: IRace,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getSkills({ ID: Race.ID }),
  },

  Subrace: {
    traits: (
      Subrace: IRace,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.raceAPI.getTraits({ ID: Subrace.ID }),
  },

  Background: {
    features: (
      Background: IBackground,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.backgroundAPI.getFeatures({ ID: Background.ID }),
    skills: (
      Background: IBackground,
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.backgroundAPI.getSkills({ ID: Background.ID }),
  },

  GearPack: {
    items: (
      GearPack: { ID: string; name: string },
      _: any,
      { dataSources }: { dataSources: IDataSources }
    ) => dataSources.itemAPI.getGearPackItems({ ID: GearPack.ID }),
  },

  GearPackItem: {
    __resolveType(obj: any) {
      switch (obj.type) {
        case 'CustomItem':
          return 'GearPackCustomItem'
        case 'AdventuringGear':
          return 'GearPackAdventuringGear'
        case 'Tool':
          return 'GearPackTool'
      }
    },
  },
}

export default resolvers
