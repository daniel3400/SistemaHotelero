CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  hotel_id TEXT NOT NULL REFERENCES hotels(id),
  room_number TEXT NOT NULL,
  beds JSONB NOT NULL,
  max_guests INTEGER NOT NULL,
  has_decoder BOOLEAN NOT NULL,
  status TEXT NOT NULL,
  daily_cleaning_requested BOOLEAN NOT NULL,
  requires_cleaning BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS guests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  document_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS stays (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES rooms(id),
  guest_id TEXT NOT NULL REFERENCES guests(id),
  check_in_date TIMESTAMP NOT NULL,
  expected_check_out_date TIMESTAMP NOT NULL,
  actual_check_out_date TIMESTAMP,
  number_of_guests INTEGER NOT NULL,
  price_per_night NUMERIC NOT NULL,
  discount NUMERIC,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  stay_id TEXT NOT NULL REFERENCES stays(id),
  amount NUMERIC NOT NULL,
  method TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);
