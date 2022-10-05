/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  try {
      await knex.schema.createTable('metadataTable', table => {
        table.increments();
        table.string('collection_id', 20).notNullable().index();
        table.integer('token_id').notNullable();
        table.string('name', 50).notNullable();
        table.text('description').notNullable();
        table.jsonb('attributes').notNullable(); // JSONB string
        table.text('image').nullable();
        table.text('image_data').nullable();
        table.text('external_url').nullable();
        table.string('background_color').nullable();
        table.text('animation_url').nullable();
        table.text('youtube_url').nullable();
        table.unique(['collection_id', 'token_id']);
        table.timestamps();
      });
  } catch (error) {
    console.log("Migration error:");
    console.error(error);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('metadataTable');
};
