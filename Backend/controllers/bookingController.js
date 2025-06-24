import Booking from "../models/Booking.js";
import Equipment from "../models/Equipment.js";

// 🔹 จองเวลาออกรอบ
export const bookSlot = async (req, res) => {
  try {
    const { 
      courseType, 
      date, 
      timeSlot, 
      players, 
      groupName, 
      caddy, 
      totalPrice, 
      golfCartQty = 0,
      golfBagQty = 0,
    } = req.body;

    const testUserId = "64a7e2f1234567890abcdef0";
    
    const cart = await Equipment.findOne({ name: "golfCart" });
    const bag = await Equipment.findOne({ name: "golfBag" });

    if (!cart || !bag) {
      return res.status(500).json({ message: "Equipment not found" });
    }

    if (cart.available < golfCartQty || bag.available < golfBagQty) {
      return res.status(400).json({ message: "Not enough equipment available" });
    }

    cart.available -= golfCartQty;
    bag.available -= golfBagQty;
    await cart.save();
    await bag.save();

    const booking = new Booking({
      user: testUserId,
      courseType,
      date,
      timeSlot,
      players,
      groupName,
      caddy,
      totalPrice,
      isPaid: false,
      golfCartQty,
      golfBagQty,
    });

    await booking.save();
    res.status(201).json({ message: "Booking Successful", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 ดึงรายการจองของผู้ใช้
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ตรวจสอบว่า user เป็นเจ้าของการจอง
    // if (booking.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: "Not authorized to update this booking" });
    // }

    // อัปเดตเฉพาะ timeSlot เท่านั้น
    if (req.body.timeSlot) {
      booking.timeSlot = req.body.timeSlot;
    } else {
      return res.status(400).json({ message: "Only 'timeSlot' can be updated" });
    }

    const updatedBooking = await booking.save();

    res.status(200).json({ message: "Booking time updated successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // ถ้าอยากลบเฉพาะเจ้าของ booking ให้เปิดเช็คนี้ไว้
    // if (booking.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: "Not authorized to delete this booking" });
    // }
  
    await booking.deleteOne();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const seedEquipment = async () => {
  try {
    // ล้างของเก่าทิ้งก่อน
    await Equipment.deleteMany();

    // เพิ่มอุปกรณ์ใหม่
    const result = await Equipment.insertMany([
      { name: "golfCart", total: 20, available: 20 },
      { name: "golfBag", total: 20, available: 20 },
    ]);

    console.log("✅ Equipment seeded:", result);
  } catch (error) {
    console.error("❌ Failed to seed equipment:", error.message);
    throw error;
  }
};

export const addEquipment = async (req, res) => {
  try {
    const { name, total } = req.body;
    if (!["golfCart", "golfBag"].includes(name)) {
      return res.status(400).json({ message: "Invalid equipment name" });
    }

    // เช็คว่ามีอุปกรณ์ชื่อนี้อยู่แล้วไหม
    const exist = await Equipment.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Equipment already exists" });
    }

    const newEquip = new Equipment({
      name,
      total,
      available: total,
    });
    await newEquip.save();
    res.status(201).json({ message: "Equipment added", equipment: newEquip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const { name, total } = req.body;
    const equipment = await Equipment.findOne({ name });
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    equipment.total = total;
    // ปรับ available ตาม total (เช่นถ้าลดจำนวนต้องระวังไม่ให้ available ติดลบ)
    if (equipment.available > total) {
      equipment.available = total;
    }

    await equipment.save();
    res.json({ message: "Equipment updated", equipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};