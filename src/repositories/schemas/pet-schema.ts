export const petModelSchema = {
  name: { type: 'string', filter: 'contains' },
  age: { type: 'number', filter: 'equals' },
  color: { type: 'string', filter: 'contains' },
  size: { type: 'enum', filter: 'equals' },
  species: { type: 'string', filter: 'equals' },
  org_id: { type: 'string', filter: 'equals' },

  city: { type: 'string', filter: 'equals' },
} as const

export type PetModelSchema = typeof petModelSchema
export type ValidPetFilterField = keyof PetModelSchema
