import { PetRepository } from '@/repositories/pet-repository'
import { Pet, PetSize } from '@prisma/client'

interface RegisterPetUseCaseRequest {
  name?: string
  color?: string
  age?: number
  imageUrl?: string
  species: string
  orgId: string
  size: PetSize
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private repository: PetRepository) {}

  async execute({
    age,
    color,
    imageUrl,
    name,
    orgId,
    size,
    species,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
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
