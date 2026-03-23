import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";
import { DashboardController } from "../controllers/dashboard-controller.js";
import { HotelController } from "../controllers/hotel-controller.js";
import { RoomController } from "../controllers/room-controller.js";
import { GuestController } from "../controllers/guest-controller.js";
import { StayController } from "../controllers/stay-controller.js";
import { PaymentController } from "../controllers/payment-controller.js";
import { requireAuth } from "../../auth/auth-middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

interface RoutesDependencies {
  authController: AuthController;
  dashboardController: DashboardController;
  hotelController: HotelController;
  roomController: RoomController;
  guestController: GuestController;
  stayController: StayController;
  paymentController: PaymentController;
}

export const buildRoutes = (deps: RoutesDependencies) => {
  const router = Router();

  router.post("/auth/login", asyncHandler(deps.authController.login));

  router.use(requireAuth);

  router.get("/dashboard/summary", asyncHandler(deps.dashboardController.summary));

  router.get("/hotels", asyncHandler(deps.hotelController.list));
  router.post("/hotels", asyncHandler(deps.hotelController.create));
  router.get("/hotels/:id", asyncHandler(deps.hotelController.getById));
  router.put("/hotels/:id", asyncHandler(deps.hotelController.update));
  router.post("/hotels/:id/activate", asyncHandler(deps.hotelController.activate));
  router.post("/hotels/:id/deactivate", asyncHandler(deps.hotelController.deactivate));

  router.get("/rooms", asyncHandler(deps.roomController.list));
  router.get("/rooms/available", asyncHandler(deps.roomController.listAvailable));
  router.get("/rooms/cleaning-pending", asyncHandler(deps.roomController.listCleaningPending));
  router.get("/rooms/occupied", asyncHandler(deps.roomController.listOccupied));
  router.get("/rooms/:id", asyncHandler(deps.roomController.getById));
  router.post("/rooms", asyncHandler(deps.roomController.create));
  router.put("/rooms/:id", asyncHandler(deps.roomController.update));
  router.post("/rooms/:id/disable", asyncHandler(deps.roomController.disable));
  router.post("/rooms/:id/enable", asyncHandler(deps.roomController.enable));
  router.post("/rooms/:id/request-cleaning", asyncHandler(deps.roomController.requestCleaning));
  router.post("/rooms/:id/cancel-cleaning", asyncHandler(deps.roomController.cancelCleaning));
  router.post("/rooms/:id/mark-clean", asyncHandler(deps.roomController.markAsClean));

  router.get("/guests", asyncHandler(deps.guestController.list));
  router.get("/guests/:id", asyncHandler(deps.guestController.getById));
  router.post("/guests", asyncHandler(deps.guestController.create));
  router.put("/guests/:id", asyncHandler(deps.guestController.update));

  router.get("/stays", asyncHandler(deps.stayController.list));
  router.get("/stays/active", asyncHandler(deps.stayController.listActive));
  router.get("/stays/:id", asyncHandler(deps.stayController.getById));
  router.post("/stays", asyncHandler(deps.stayController.create));
  router.put("/stays/:id/dates", asyncHandler(deps.stayController.updateDates));
  router.post("/stays/:id/complete", asyncHandler(deps.stayController.complete));
  router.post("/stays/:id/cancel", asyncHandler(deps.stayController.cancel));

  router.get("/payments", asyncHandler(deps.paymentController.list));
  router.get("/payments/:id", asyncHandler(deps.paymentController.getById));
  router.get("/payments/stay/:stayId", asyncHandler(deps.paymentController.listByStay));
  router.post("/payments", asyncHandler(deps.paymentController.register));
  router.post("/payments/:id/mark-paid", asyncHandler(deps.paymentController.markAsPaid));
  router.post("/payments/:id/mark-failed", asyncHandler(deps.paymentController.markAsFailed));

  return router;
};
