import { z } from "zod";
const hasMinDigits = (value, minDigits) => {
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits.length >= minDigits;
};
export const uuidSchema = z.string().trim().uuid("El id debe ser un UUID valido.");
export const fullNameSchema = z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .max(120, "El nombre no debe superar los 120 caracteres.")
    .regex(/^[a-zA-ZÀ-ÿ\s'.-]+$/, "El nombre contiene caracteres no validos.");
export const documentNumberSchema = z
    .string()
    .trim()
    .min(5, "El documento debe tener al menos 5 caracteres.")
    .max(25, "El documento no debe superar los 25 caracteres.")
    .regex(/^[a-zA-Z0-9-]+$/, "El documento solo admite letras, numeros y guion.");
export const phoneSchema = z
    .string()
    .trim()
    .min(7, "El telefono debe tener al menos 7 caracteres.")
    .max(20, "El telefono no debe superar los 20 caracteres.")
    .regex(/^[0-9+()\-\s]+$/, "El telefono contiene caracteres no validos.")
    .refine((value) => hasMinDigits(value, 7), "El telefono debe tener al menos 7 digitos.");
export const hotelNameSchema = z
    .string()
    .trim()
    .min(2, "El nombre del hotel debe tener al menos 2 caracteres.")
    .max(120, "El nombre del hotel no debe superar los 120 caracteres.");
export const addressSchema = z
    .string()
    .trim()
    .min(5, "La direccion debe tener al menos 5 caracteres.")
    .max(180, "La direccion no debe superar los 180 caracteres.");
export const roomNumberSchema = z
    .string()
    .trim()
    .min(1, "El numero de habitacion es obligatorio.")
    .max(10, "El numero de habitacion no debe superar los 10 caracteres.")
    .regex(/^[a-zA-Z0-9-]+$/, "El numero de habitacion contiene caracteres no validos.");
export const bedsSchema = z
    .array(z.object({
    type: z.enum(["SINGLE", "DOUBLE", "QUEEN", "KING"]),
    quantity: z.number().int().positive().max(10)
}))
    .min(1, "Debe definir al menos un tipo de cama.");
export const maxGuestsSchema = z
    .number()
    .int("El maximo de huespedes debe ser un numero entero.")
    .min(1, "El maximo de huespedes debe ser al menos 1.")
    .max(20, "El maximo de huespedes no debe superar 20.");
export const positiveMoneySchema = z
    .number()
    .positive("El valor monetario debe ser mayor a cero.")
    .max(1000000000, "El valor monetario es demasiado alto.");
export const percentageSchema = z
    .number()
    .min(0, "El descuento no puede ser negativo.")
    .max(100, "El descuento no puede ser mayor a 100.");
export const isoDateToDateSchema = z
    .string()
    .trim()
    .min(1, "La fecha es obligatoria.")
    .refine((value) => !Number.isNaN(Date.parse(value)), "La fecha no es valida.")
    .transform((value) => new Date(value));
export const roomStatusSchema = z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "CLEANING_PENDING",
    "DISABLED"
]);
export const stayStatusSchema = z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]);
export const paymentMethodSchema = z.enum(["CASH", "CARD", "TRANSFER"]);
