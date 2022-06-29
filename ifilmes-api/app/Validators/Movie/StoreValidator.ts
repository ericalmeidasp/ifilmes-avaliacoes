import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    movieId: schema.number([rules.exists({table: 'movies', column: 'id'})]),
    value: schema.number([rules.range(0,10)])
  })
  
  public messages: CustomMessages = {}
}
