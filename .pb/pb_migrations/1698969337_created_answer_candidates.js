/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nn5du5yuo2qfigj",
    "created": "2023-11-02 23:55:37.597Z",
    "updated": "2023-11-02 23:55:37.597Z",
    "name": "answer_candidates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uyzsmh5d",
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
  const collection = dao.findCollectionByNameOrId("nn5du5yuo2qfigj");

  return dao.deleteCollection(collection);
})
