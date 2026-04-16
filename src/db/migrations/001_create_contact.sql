CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL
);

INSERT INTO contact (email, phone, address)
VALUES ('contact@example.com', '+1234567890', '123 Developer Lane');
