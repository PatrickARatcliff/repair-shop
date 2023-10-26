drop database if exists repair_shop_test;
create database repair_shop_test;

use repair_shop_test;

create table `user` (
    user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    enabled bit not null default(1)
);

create table `role` (
    role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table user_role (
    user_id int not null,
    role_id int not null,
    constraint pk_user_role
        primary key (user_id, role_id),
    constraint fk_user_role_user_id
        foreign key (user_id)
        references `user`(user_id),
	constraint fk_user_role_role_id
        foreign key (role_id)
        references `role`(role_id)
);

create table customer (
    customer_id int primary key auto_increment,
    first_name varchar(25) not null,
    last_name varchar(25) not null,
    customer_phone varchar(25) not null,
    customer_email varchar(50) not null,
    important boolean not null default(0)
);

create table vehicle (
	vehicle_id int primary key auto_increment,
    vehicle_make varchar(25),
    vehicle_model varchar(25) ,
    vehicle_year int default(0),
	customer_id int not null,
    constraint fk_customer_customer_id
        foreign key (customer_id)
        references customer(customer_id)
);

create table appointment (
	appointment_id int primary key auto_increment,
    appointment_date date not null,
	vehicle_id int not null,
    constraint fk_vehicle_vehicle_id
        foreign key (vehicle_id)
        references vehicle(vehicle_id),
	user_id int,
    constraint fk_user_user_id
        foreign key (user_id)
        references `user`(user_id)
);


delimiter //
create procedure set_known_good_state()
begin
	delete from user_role;
    delete from `role`;
    alter table `role` auto_increment = 1;
    delete from appointment;
    alter table appointment auto_increment = 1;
	delete from `user`;
    alter table `user` auto_increment = 1;
    delete from vehicle;
    alter table vehicle auto_increment = 1;
	delete from customer;
    alter table customer auto_increment = 1;

insert into `role` (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into `user` (username, password_hash, enabled)
    values
    ('user@one.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('user@two.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('user@three.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into user_role
    values
    (1, 2),
    (2, 1),
    (3, 1);
    
insert into customer (first_name, last_name, customer_phone, customer_email, important)
	values
    ('Customer', 'One', '111-111-1111', 'customer@one.com', 0),
    ('Customer', 'Two', '222-222-2222', 'customer@two.com', 1),
    ('Customer', 'Three', '333-333-3333', 'customer@three.com', 0);
    
insert into vehicle (vehicle_make, vehicle_model, vehicle_year, customer_id)
    values
    ('Toyota', 'Camry', 2020, 1),
    ('Ford', 'F-150', 2018, 2),
    ('Honda', 'Civic', 2019, 3);

insert into appointment (appointment_date, vehicle_id, user_id)
values
    ('2023-10-20', 1, 1),
    ('2023-10-23', 2, 2),
    ('2023-10-26', 3, 1),
    ('2023-10-28', 1, 2);

end //
delimiter ;