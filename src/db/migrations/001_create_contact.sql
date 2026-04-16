CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL
);

INSERT INTO contact (email, phone, address)
VALUES ('federer.kristijan@gmail.com', '+1234567890', 'Saalestraße 39b, 12055 Berlin');
