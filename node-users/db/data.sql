INSERT INTO user_profile (fName, lName, mi, email, phone) VALUES
('joe', 'smith', 'z', 'joe.z.smith@gmail.com', '6012224545');

INSERT INTO user_login (user_id, email, username, password, acctNo) VALUES
(1, 'joe.z.smith@gmail.com', 'jsmitty24', 'test1234' '1111111111');

INSERT INTO payment_info (user_id, cardNo, expMo, expYear, cvv) VALUES
(1,'2222333344445555', '04', 2027, 123);

INSERT INTO shipping_info (user_id, address, city, state, postalCode) VALUES
(1, '123 sesame street', 'jackson', 'MS', '39222')
