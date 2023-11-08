/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dxy08mue1g18z6p",
    "created": "2023-11-03 00:02:58.396Z",
    "updated": "2023-11-03 00:02:58.396Z",
    "name": "ice_servers",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("dxy08mue1g18z6p");

  return dao.deleteCollection(collection);
})
