/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wyxj5f7tfgl3b5r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "66xkupyt",
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
  const collection = dao.findCollectionByNameOrId("wyxj5f7tfgl3b5r")

  // remove
  collection.schema.removeField("66xkupyt")

  return dao.saveCollection(collection)
})
