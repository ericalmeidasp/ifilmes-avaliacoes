import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'quotes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('has_quoted_id')
        .unsigned()
        .references('comments.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('was_quoted_id')
        .unsigned()
        .references('comments.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
