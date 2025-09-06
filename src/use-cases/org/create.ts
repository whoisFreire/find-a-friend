import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  address: string
  phone: string
  cityId: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private repository: OrgRepository) {}

  async execute({
    address,
    phone,
    cityId,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.repository.create({
      address,
      phone,
      city_id: cityId,
    })

    return {
      org,
    }
  }
}
