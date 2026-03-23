--
-- Schema SQL para Supabase/PostgreSQL (entorno real)
-- Proyecto: SistemaHotelero
--

BEGIN;

CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  hotel_id TEXT NOT NULL REFERENCES hotels(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  room_number TEXT NOT NULL,
  beds JSONB NOT NULL,
  max_guests INTEGER NOT NULL CHECK (max_guests > 0),
  has_decoder BOOLEAN NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE', 'OCCUPIED', 'CLEANING_PENDING', 'DISABLED')),
  daily_cleaning_requested BOOLEAN NOT NULL DEFAULT FALSE,
  requires_cleaning BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_rooms_hotel_room_number UNIQUE (hotel_id, room_number)
);

CREATE TABLE IF NOT EXISTS guests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  document_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_guests_document_number UNIQUE (document_number)
);

CREATE TABLE IF NOT EXISTS stays (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES rooms(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  guest_id TEXT NOT NULL REFERENCES guests(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  check_in_date TIMESTAMPTZ NOT NULL,
  expected_check_out_date TIMESTAMPTZ NOT NULL,
  actual_check_out_date TIMESTAMPTZ,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
  price_per_night NUMERIC(12,2) NOT NULL CHECK (price_per_night > 0),
  discount NUMERIC(5,2) CHECK (discount IS NULL OR (discount >= 0 AND discount <= 100)),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT ck_stays_dates_order CHECK (expected_check_out_date > check_in_date)
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  stay_id TEXT NOT NULL REFERENCES stays(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  method TEXT NOT NULL CHECK (method IN ('CASH', 'CARD', 'TRANSFER')),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'FAILED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rooms_hotel_id ON rooms(hotel_id);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);

CREATE INDEX IF NOT EXISTS idx_stays_room_id ON stays(room_id);
CREATE INDEX IF NOT EXISTS idx_stays_guest_id ON stays(guest_id);
CREATE INDEX IF NOT EXISTS idx_stays_status ON stays(status);
CREATE INDEX IF NOT EXISTS idx_stays_check_in_date ON stays(check_in_date DESC);

CREATE INDEX IF NOT EXISTS idx_payments_stay_id ON payments(stay_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_hotels_updated_at ON hotels;
CREATE TRIGGER trg_hotels_updated_at
BEFORE UPDATE ON hotels
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_rooms_updated_at ON rooms;
CREATE TRIGGER trg_rooms_updated_at
BEFORE UPDATE ON rooms
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_guests_updated_at ON guests;
CREATE TRIGGER trg_guests_updated_at
BEFORE UPDATE ON guests
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_stays_updated_at ON stays;
CREATE TRIGGER trg_stays_updated_at
BEFORE UPDATE ON stays
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_payments_updated_at ON payments;
CREATE TRIGGER trg_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_admin_users_updated_at ON admin_users;
CREATE TRIGGER trg_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

COMMIT;
