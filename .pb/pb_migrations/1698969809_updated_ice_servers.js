/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxy08mue1g18z6p")

  // remove
  collection.schema.removeField("wec3bchf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ntpujgyx",
    "name": "url",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dxy08mue1g18z6p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wec3bchf",
    "name": "url",
    "type": "url",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("ntpujgyx")

  return dao.saveCollection(collection)
})
