"use server";

import { randomUUID } from "node:crypto";

const doctor_id_one = "1234";
const doctor_id_two = "2341";

const date_id_one = "3412";
const date_id_two = "4123";

const user_id = "2345";

const reservation_id = "3452";

const start_time_one = new Date();
start_time_one.setHours(12);
start_time_one.setMinutes(0);
start_time_one.setSeconds(0);
start_time_one.setMilliseconds(0);

const end_time_one = new Date();
end_time_one.setHours(13);
end_time_one.setMinutes(0);
end_time_one.setSeconds(0);
end_time_one.setMilliseconds(0);

const start_time_two = new Date();
start_time_two.setHours(13);
start_time_two.setMinutes(0);
start_time_two.setSeconds(0);
start_time_two.setMilliseconds(0);

const end_time_two = new Date();
end_time_two.setHours(14);
end_time_two.setMinutes(0);
end_time_two.setSeconds(0);
end_time_two.setMilliseconds(0);

const doctors = [
  {
    id: doctor_id_one,
    name: "Lic. Raquel Castillo",
    job: "Therapist",
    address: "Centro Médico, Polanco",
  },
  {
    id: doctor_id_two,
    name: "Lic. Eduardo Raffta",
    job: "Psychologist",
    address: "La Quebrada 207, Benito Juárez",
  },
];

type Doctor = typeof doctors;

const slots = [
  {
    id: date_id_one,
    doctor_id: doctor_id_one,
    start_time: start_time_one,
    end_time: end_time_one,
    reserved: false,
    job: "Therapist",
  },
  {
    id: date_id_two,
    doctor_id: doctor_id_two,
    start_time: start_time_two,
    end_time: start_time_two,
    reserved: true,
    job: "Psychologist",
  },
];

type Slots = typeof slots;

const reservations = [
  {
    id: reservation_id,
    user_id,
    slot_id: date_id_two,
    start_time: start_time_one,
    end_time: end_time_one,
    job: "Psychologist",
    address: "La Quebrada 207, Benito Juárez",
    name: "Lic. Eduardo Raffta",
  },
];

type Reservations = typeof reservations;

const users = [
  {
    id: user_id,
    name: "Armando Rueda",
    email: "armandonarcizoruedaperez@gmail.com",
  },
];

type Users = typeof users;

export const getSlots = async (): Promise<Slots> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(slots);
    }, 1000);
  });
};

export const addReservation = async (slotId: string): Promise<Slots> => {
  return new Promise((res, reject) => {
    const slot = slots.find((slot) => slot.id === slotId);
    const doctor = doctors.find((doctor) => slot?.doctor_id == doctor.id);
    if (slot && doctor) {
      slot.reserved = true;
      reservations.push({
        id: randomUUID(),
        user_id: "2345",
        slot_id: slot.id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        name: doctor.name,
        address: doctor.address,
        job: doctor.job,
      });
      setTimeout(() => {
        res([...slots]);
      }, 1000);
    } else {
      reject(new Error("Not found."));
    }
  });
};

export const getUser = async (): Promise<Users[0]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(users[0]);
    }, 1000);
  });
};

export const getReservations = async (
  userId: string
): Promise<Reservations> => {
  return new Promise((res) => {
    const result = reservations.filter(
      (reservation) => reservation.user_id === userId
    );
    setTimeout(() => {
      res(result);
    }, 1000);
  });
};

export const getDoctors = async (
  job?: string,
  from?: number
): Promise<Doctor> => {
  let result = doctors;
  if (job && !from) {
    result = result.filter((doctor) => doctor.job === job);
  } else if (!job && from) {
    const availableSlots = slots.filter((slot) => {
      return slot.start_time.getTime() > from && !slot.reserved;
    });
    const set = new Set<string>();
    for (const slot of availableSlots) {
      set.add(slot.doctor_id);
    }
    result = [];
    for (const doctor_id of set) {
      const doctor = doctors.find((doctor) => {
        return doctor.id == doctor_id;
      });
      if (doctor) {
        result.push(doctor);
      }
    }
  } else if (job && from) {
    const availableSlots = slots.filter((slot) => {
      return (
        slot.start_time.getTime() > from && job === slot.job && !slot.reserved
      );
    });
    const set = new Set<string>();
    for (const slot of availableSlots) {
      set.add(slot.doctor_id);
    }
    result = [];
    for (const doctor_id of set) {
      const doctor = doctors.find((doctor) => {
        return doctor.id == doctor_id;
      });
      if (doctor) {
        result.push(doctor);
      }
    }
  }
  return new Promise((res) => {
    setTimeout(() => {
      res(result);
    }, 1000);
  });
};
