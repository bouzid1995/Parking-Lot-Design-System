const router = require("express").Router();
const slotController = require("../controllers/slot.controller");

// Get All slots
router.get("/slots", slotController.getAll);
// Get free slot Perfloor By vehicle_type ID
router.get("/free_slot_vehicle_type/:id", slotController.getByVtId);
// Get reservation and ticket By vehicle ID
router.get("/reservation/:id", slotController.reservation);
// Get first free slot near slot
router.get("/first_free_slot/", slotController.getFirstAvailableSlotApi);
// Get umpark by tiket id
router.get("/umpark/:id", slotController.unpark);

module.exports = router;
