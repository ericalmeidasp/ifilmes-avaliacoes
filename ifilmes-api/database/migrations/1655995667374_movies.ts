import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('imdb_id').unique().notNullable()
      table.string('title').notNullable()
      table.string('year')
      table.string('poster')
      table.string('type')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
