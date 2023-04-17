const { PrismaClient, Prisma } = require(".prisma/client");
const { slot, vehicle, ticked } = new PrismaClient();
const prisma = new PrismaClient();

const lodash = require("lodash");

// Get All slots
exports.getAll = async (req, res) => {
  console.log("start api");
  const slotList = await slot.findMany({});
  if (slotList.length) {
    return res.json({ failed: false, msg: "Ok", data: slotList });
  }
  res.json({ failed: true, msg: "data not found", data: null });
};

// Get category By Id
exports.getByVtId = async (req, res) => {
  if (req.params.id) {
    const foundedSlotsList = await slot.findMany({
      where: {
        vehicle_type_id: +req.params.id,
        available: 1,
      },
      include: {
        floor: true,
      },
    });
    if (foundedSlotsList) {
      let newtab = [];
      foundedSlotsList.forEach((x) => {
        if (newtab.findIndex((w) => w.id == x.floorID) == -1) {
          newtab.push(x.floor);
        }
      });
      newtab.forEach((x) => {
        x.slots = foundedSlotsList.filter(
          (slot) => slot.floorID == x.id
        ).length;
      });
      return res.json({
        failed: false,
        msg: "free_slot_vehicle_type",
        data: newtab,
      });
    }
    return res.json({
      failed: true,
      msg: "no slots found with type_vehile_id :" + req.params.id,
      data: null,
    });
  }
  res.json({
    failed: true,
    msg: "invalid type of params or is require",
    data: null,
  });
};

exports.reservation = async (req, res) => {
  if (req.params.id) {
    const foundedVehicle = await vehicle.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    const foundedSlotsList = await slot.findMany({
      where: {
        vehicle_type_id: foundedVehicle.vehicle_type_id,
        available: 1,
      },
      include: {
        floor: true,
      },
    });
    if (foundedSlotsList) {
      let AvailableSlot = getFirstAvailableSlot(foundedSlotsList);
      //update available slot by id available to 0
      slotupdated = await prisma.slot.update({
        where: {
          id: AvailableSlot.id,
        },
        data: {
          available: 0,
        },
      });
      console.log("slot is updated");
      //create a ticket
      const ticked = await prisma.ticked.create({
        data: {
          code: "Ticket" + req.params.id,
          start_time: new Date(),
          end_time: new Date(), // must entred like params
          slot_id: AvailableSlot.id,
          vehicle_id: parseInt(req.params.id),
        },
      });

      return res.json({
        failed: false,
        msg: "your ticket is",
        data: ticked,
      });
    }
    return res.json({
      failed: true,
      msg: "some error is wrong with  :" + req.params.id,
      data: null,
    });
  }
  return res.json({
    failed: true,
    msg: "no category is founded with id :" + req.params.id,
    data: null,
  });
};

exports.getFirstAvailableSlotApi = async (req, res) => {
  const foundedSlotsList = await slot.findMany({
    where: {
      available: 1,
    },
    include: {
      floor: true,
    },
  });
  if (foundedSlotsList) {
    let AvailableSlot = getFirstAvailableSlot(foundedSlotsList);
    return res.json({
      failed: false,
      msg: "First Available Slot",
      data: AvailableSlot,
    });
  }
  return res.json({
    failed: true,
    msg: "No Available Slot Please try Later :" + req.params.id,
    data: null,
  });
};

getFirstAvailableSlot = (slotList) => {
  let minflorNumber = Math.min(...slotList.map((x) => x.floor.number));
  let minFlorId = slotList
    .map((x) => x.floor)
    .find((y) => y.number == minflorNumber).id;
  let minSlotNumber = Math.min(
    ...slotList.filter((x) => x.floorID == minFlorId).map((slot) => slot.number)
  );
  let minSlot = slotList.find((s) => s.number == minSlotNumber);
  return minSlot;
};

exports.unpark = async (req, res) => {
  const Tiket = await ticked.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  const unparked = await prisma.slot.update({
    where: {
      id: parseInt(Tiket.slot_id),
    },
    data: {
      available: 1,
    },
  });
  if (unparked) {
    return res.json({
      failed: false,
      msg: "Vehicle unparked ",
      data: unparked,
    });
  }
  return res.json({
    failed: true,
    msg: "some probleme wrong with unpark this vehicle",
    data: null,
  });
};
