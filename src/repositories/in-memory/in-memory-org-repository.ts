import { Prisma, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrgRepository } from '../org-repository'

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = []
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      address: data.address,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      city: data.city,
    }

    this.items.push(org)
    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findManyByCity(city: string) {
    const orgs = this.items.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase(),
    )

    if (!orgs) {
      return null
    }
    return orgs
  }
}
