/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "wyxj5f7tfgl3b5r",
    "created": "2023-11-02 23:55:26.111Z",
    "updated": "2023-11-02 23:55:26.111Z",
    "name": "offer_candidates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wendtoub",
        "name": "data",
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
  const collection = dao.findCollectionByNameOrId("wyxj5f7tfgl3b5r");

  return dao.deleteCollection(collection);
})
