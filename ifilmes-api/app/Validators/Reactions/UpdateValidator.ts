import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { reactionsTypes } from 'App/Utils'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    commentId: schema.number([rules.exists({table: 'comments', column: 'id'})]),
    type: schema.enum(reactionsTypes),
  })
  
  public messages: CustomMessages = {}
}
