import { PetRepository } from '@/repositories/pet-repository'
import { Pet, PetSize } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name?: string | null
  color?: string | null
  age?: number | null
  imageUrl?: string | null
  species: string
  orgId: string
  size: PetSize
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private repository: PetRepository) {}

  async execute({
    age,
    color,
    imageUrl,
    name,
    orgId,
    size,
    species,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.repository.create({
      org_id: orgId,
      size,
      species,
      age,
      color,
      name,
      image_url: imageUrl,
    })

    return {
      pet,
    }
  }
}
