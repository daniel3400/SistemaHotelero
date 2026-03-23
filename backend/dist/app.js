import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { buildContainer } from "./infrastructure/hooks/container.js";
import { buildRoutes } from "./infrastructure/http/routes/index.js";
import { AppError } from "./shared/errors/app-error.js";
import { AuthController } from "./infrastructure/http/controllers/auth-controller.js";
import { DashboardController } from "./infrastructure/http/controllers/dashboard-controller.js";
import { HotelController } from "./infrastructure/http/controllers/hotel-controller.js";
import { RoomController } from "./infrastructure/http/controllers/room-controller.js";
import { GuestController } from "./infrastructure/http/controllers/guest-controller.js";
import { StayController } from "./infrastructure/http/controllers/stay-controller.js";
import { PaymentController } from "./infrastructure/http/controllers/payment-controller.js";
export const buildApp = () => {
    const app = express();
    const container = buildContainer();
    const authController = new AuthController(container.repositories.userRepository);
    const dashboardController = new DashboardController(container.repositories.roomRepository, container.repositories.stayRepository, container.repositories.paymentRepository);
    const hotelController = new HotelController(container.commands.createHotel, container.commands.updateHotelInfo, container.commands.activateHotel, container.commands.deactivateHotel, container.queries.getHotelInfo, container.queries.listHotels);
    const roomController = new RoomController(container.commands.createRoom, container.commands.updateRoomInfo, container.commands.disableRoom, container.commands.enableRoom, container.commands.requestDailyCleaning, container.commands.cancelDailyCleaning, container.commands.markRoomAsClean, container.queries.getRoomDetails, container.queries.listRooms, container.queries.getAvailableRooms, container.queries.getRoomsPendingCleaning, container.queries.getOccupiedRooms);
    const guestController = new GuestController(container.commands.createGuest, container.commands.updateGuestInfo, container.queries.listGuests, container.queries.getGuestDetails);
    const stayController = new StayController(container.commands.createStay, container.commands.updateStayDates, container.commands.completeStay, container.commands.cancelStay, container.queries.getActiveStays, container.queries.getStayDetails, container.queries.listStays);
    const paymentController = new PaymentController(container.commands.registerPayment, container.queries.getPaymentsByStay, container.queries.listPayments, container.queries.getPaymentDetails, container.commands.markPaymentAsPaid, container.commands.markPaymentAsFailed);
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/api", buildRoutes({
        authController,
        dashboardController,
        hotelController,
        roomController,
        guestController,
        stayController,
        paymentController
    }));
    app.use((err, _req, res, _next) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }
        if (err.name === "ZodError") {
            return res.status(400).json({ message: "Datos invalidos.", details: err.message });
        }
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor." });
    });
    return { app, container };
};
