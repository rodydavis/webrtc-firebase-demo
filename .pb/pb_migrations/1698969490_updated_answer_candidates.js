/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nn5du5yuo2qfigj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jye8ycvi",
    "name": "call_id",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "pi0mxvc87vshk90",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nn5du5yuo2qfigj")

  // remove
  collection.schema.removeField("jye8ycvi")

  return dao.saveCollection(collection)
})
