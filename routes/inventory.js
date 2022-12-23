const express = require("express");
const router = express.Router();

const dairy_controller = require("../controllers/dairyController");
const meat_controller = require("../controllers/meatController");
const produce_controller = require("../controllers/produceController");
const seafood_controller = require("../controllers/seafoodController");

/// HOME PAGE ///
router.get("/", dairy_controller.index);

/// DAIRY ROUTES ///
router.get("/dairy/create", dairy_controller.dairy_create_get);
router.post("/dairy/create", dairy_controller.dairy_create_post);
router.get("/dairy/:id/delete", dairy_controller.dairy_delete_get);
router.post("/dairy/:id/delete", dairy_controller.dairy_delete_post);
router.get("/dairy/:id/update", dairy_controller.dairy_update_get);
router.post("/dairy/:id/update", dairy_controller.dairy_update_post);
router.get("/dairy/:id", dairy_controller.dairy_detail);
router.get("/dairy", dairy_controller.dairy_list);

/// MEAT ROUTES ///
router.get("/meat/create", meat_controller.meat_create_get);
router.post("/meat/create", meat_controller.meat_create_post);
router.get("/meat/:id/delete", meat_controller.meat_delete_get);
router.post("/meat/:id/delete", meat_controller.meat_delete_post);
router.get("/meat/:id/update", meat_controller.meat_update_get);
router.post("/meat/:id/update", meat_controller.meat_update_post);
router.get("/meat/:id", meat_controller.meat_detail);
router.get("/meat", meat_controller.meat_list);

/// PRODUCE ROUTES ///
router.get("/produce/create", produce_controller.produce_create_get);
router.post(
  "/produce/create",
  produce_controller.produce_create_post
);
router.get(
  "/produce/:id/delete",
  produce_controller.produce_delete_get
);
router.post(
  "/produce/:id/delete",
  produce_controller.produce_delete_post
);
router.get(
  "/produce/:id/update",
  produce_controller.produce_update_get
);
router.post(
  "/produce/:id/update",
  produce_controller.produce_update_post
);
router.get("/produce/:id", produce_controller.produce_detail);
router.get("/produce", produce_controller.produce_list);

/// SEAFOOD ROUTES ///
router.get("/seafood/create", seafood_controller.seafood_create_get);
router.post(
  "/seafood/create",
  seafood_controller.seafood_create_post
);
router.get(
  "/seafood/:id/delete",
  seafood_controller.seafood_delete_get
);
router.post(
  "/seafood/:id/delete",
  seafood_controller.seafood_delete_post
);
router.get(
  "/seafood/:id/update",
  seafood_controller.seafood_update_get
);
router.post(
  "/seafood/:id/update",
  seafood_controller.seafood_update_post
);
router.get("/seafood/:id", seafood_controller.seafood_detail);
router.get("/seafood", seafood_controller.seafood_list);

module.exports = router;
