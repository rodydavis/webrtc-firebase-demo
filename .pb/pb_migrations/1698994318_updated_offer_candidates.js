/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wyxj5f7tfgl3b5r")

  collection.listRule = "@request.auth.id != ''"
  collection.viewRule = "@request.auth.id != ''"
  collection.createRule = "@request.auth.id != ''"
  collection.updateRule = "@request.auth.id != ''"
  collection.deleteRule = "@request.auth.id != ''"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wyxj5f7tfgl3b5r")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
