import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    movieId: schema.number([rules.exists({table: 'movies', column: 'id'})]),
    content: schema.string({ trim: true }),
    wasQuotedId: schema.number.optional()
  })
  
  public messages: CustomMessages = {}
}
