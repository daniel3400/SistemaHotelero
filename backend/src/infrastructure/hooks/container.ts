import { createPool } from "../persistence/connection.js";
import { HotelPgRepository } from "../persistence/repositories/hotel-pg-repository.js";
import { RoomPgRepository } from "../persistence/repositories/room-pg-repository.js";
import { GuestPgRepository } from "../persistence/repositories/guest-pg-repository.js";
import { StayPgRepository } from "../persistence/repositories/stay-pg-repository.js";
import { PaymentPgRepository } from "../persistence/repositories/payment-pg-repository.js";
import { UserPgRepository } from "../persistence/repositories/user-pg-repository.js";
import { CreateHotel } from "../../application/commands/hotel/create-hotel.js";
import { UpdateHotelInfo } from "../../application/commands/hotel/update-hotel-info.js";
import { ActivateHotel } from "../../application/commands/hotel/activate-hotel.js";
import { DeactivateHotel } from "../../application/commands/hotel/deactivate-hotel.js";
import { CreateRoom } from "../../application/commands/room/create-room.js";
import { UpdateRoomInfo } from "../../application/commands/room/update-room-info.js";
import { DisableRoom } from "../../application/commands/room/disable-room.js";
import { EnableRoom } from "../../application/commands/room/enable-room.js";
import { RequestDailyCleaning } from "../../application/commands/room/request-daily-cleaning.js";
import { CancelDailyCleaning } from "../../application/commands/room/cancel-daily-cleaning.js";
import { MarkRoomAsClean } from "../../application/commands/room/mark-room-as-clean.js";
import { CreateGuest } from "../../application/commands/guest/create-guest.js";
import { UpdateGuestInfo } from "../../application/commands/guest/update-guest-info.js";
import { CreateStay } from "../../application/commands/stay/create-stay.js";
import { UpdateStayDates } from "../../application/commands/stay/update-stay-dates.js";
import { CompleteStay } from "../../application/commands/stay/complete-stay.js";
import { CancelStay } from "../../application/commands/stay/cancel-stay.js";
import { MarkPaymentAsFailed } from "../../application/commands/payment/mark-payment-as-failed.js";
import { MarkPaymentAsPaid } from "../../application/commands/payment/mark-payment-as-paid.js";
import { RegisterPayment } from "../../application/commands/payment/register-payment.js";
import { GetHotelInfo } from "../../application/queries/hotel/get-hotel-info.js";
import { ListHotels } from "../../application/queries/hotel/list-hotels.js";
import { GetGuestDetails } from "../../application/queries/guest/get-guest-details.js";
import { ListRooms } from "../../application/queries/room/list-rooms.js";
import { GetRoomDetails } from "../../application/queries/room/get-room-details.js";
import { GetAvailableRooms } from "../../application/queries/room/get-available-rooms.js";
import { GetRoomsPendingCleaning } from "../../application/queries/room/get-rooms-pending-cleaning.js";
import { GetOccupiedRooms } from "../../application/queries/room/get-occupied-rooms.js";
import { GetActiveStays } from "../../application/queries/stay/get-active-stays.js";
import { GetStayDetails } from "../../application/queries/stay/get-stay-details.js";
import { ListStays } from "../../application/queries/stay/list-stays.js";
import { GetPaymentDetails } from "../../application/queries/payment/get-payment-details.js";
import { GetPaymentsByStay } from "../../application/queries/payment/get-payments-by-stay.js";
import { ListPayments } from "../../application/queries/payment/list-payments.js";
import { ListGuests } from "../../application/queries/guest/list-guests.js";

export const buildContainer = () => {
  const pool = createPool();

  const hotelRepository = new HotelPgRepository(pool);
  const roomRepository = new RoomPgRepository(pool);
  const guestRepository = new GuestPgRepository(pool);
  const stayRepository = new StayPgRepository(pool);
  const paymentRepository = new PaymentPgRepository(pool);
  const userRepository = new UserPgRepository(pool);

  return {
    pool,
    repositories: {
      hotelRepository,
      roomRepository,
      guestRepository,
      stayRepository,
      paymentRepository,
      userRepository
    },
    commands: {
      createHotel: new CreateHotel(hotelRepository),
      updateHotelInfo: new UpdateHotelInfo(hotelRepository),
      activateHotel: new ActivateHotel(hotelRepository),
      deactivateHotel: new DeactivateHotel(hotelRepository),
      createRoom: new CreateRoom(roomRepository, hotelRepository),
      updateRoomInfo: new UpdateRoomInfo(roomRepository),
      disableRoom: new DisableRoom(roomRepository),
      enableRoom: new EnableRoom(roomRepository),
      requestDailyCleaning: new RequestDailyCleaning(roomRepository),
      cancelDailyCleaning: new CancelDailyCleaning(roomRepository),
      markRoomAsClean: new MarkRoomAsClean(roomRepository),
      createGuest: new CreateGuest(guestRepository),
      updateGuestInfo: new UpdateGuestInfo(guestRepository),
      createStay: new CreateStay(stayRepository, roomRepository, guestRepository),
      updateStayDates: new UpdateStayDates(stayRepository),
      completeStay: new CompleteStay(stayRepository, roomRepository),
      cancelStay: new CancelStay(stayRepository, roomRepository),
      registerPayment: new RegisterPayment(paymentRepository, stayRepository),
      markPaymentAsPaid: new MarkPaymentAsPaid(paymentRepository),
      markPaymentAsFailed: new MarkPaymentAsFailed(paymentRepository)
    },
    queries: {
      getHotelInfo: new GetHotelInfo(hotelRepository),
      listHotels: new ListHotels(hotelRepository),
      getGuestDetails: new GetGuestDetails(guestRepository),
      listRooms: new ListRooms(roomRepository),
      getRoomDetails: new GetRoomDetails(roomRepository),
      getAvailableRooms: new GetAvailableRooms(roomRepository),
      getRoomsPendingCleaning: new GetRoomsPendingCleaning(roomRepository),
      getOccupiedRooms: new GetOccupiedRooms(roomRepository),
      getActiveStays: new GetActiveStays(stayRepository),
      getStayDetails: new GetStayDetails(stayRepository),
      listStays: new ListStays(stayRepository),
      getPaymentDetails: new GetPaymentDetails(paymentRepository),
      getPaymentsByStay: new GetPaymentsByStay(paymentRepository),
      listPayments: new ListPayments(paymentRepository),
      listGuests: new ListGuests(guestRepository)
    }
  };
};
