/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pi0mxvc87vshk90")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aclt5u1q",
    "name": "answer",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pi0mxvc87vshk90")

  // remove
  collection.schema.removeField("aclt5u1q")

  return dao.saveCollection(collection)
})
