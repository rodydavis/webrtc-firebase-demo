/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "pi0mxvc87vshk90",
    "created": "2023-11-02 23:54:36.135Z",
    "updated": "2023-11-02 23:54:36.135Z",
    "name": "calls",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2oxq6ypk",
        "name": "offer",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pi0mxvc87vshk90");

  return dao.deleteCollection(collection);
})
