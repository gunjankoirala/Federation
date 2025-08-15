CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255),
	`password` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
