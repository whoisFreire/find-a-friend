import { env } from '@/env'
import { OrgRepository } from '@/repositories/org-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcrypt'

interface CreateOrgUseCaseRequest {
  address: string
  phone: string
  city: string
  email: string
  password: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private repository: OrgRepository) {}

  async execute({
    address,
    phone,
    city,
    email,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.repository.create({
      address,
      phone,
      city,
      email,
      password_hash: await hash(password, env.ENCRYPT_SALT),
    })

    return {
      org,
    }
  }
}
