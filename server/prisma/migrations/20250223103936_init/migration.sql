-- CreateTable
CREATE TABLE `Member` (
    `mem_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mem_name` VARCHAR(191) NOT NULL,
    `mem_phone` VARCHAR(191) NULL,
    `mem_email` VARCHAR(191) NULL,

    PRIMARY KEY (`mem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membership` (
    `membership_id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Membership_member_id_key`(`member_id`),
    PRIMARY KEY (`membership_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collection` (
    `collection_id` INTEGER NOT NULL AUTO_INCREMENT,
    `collection_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`collection_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(191) NOT NULL,
    `sub_cat_name` VARCHAR(191) NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_name` VARCHAR(191) NOT NULL,
    `book_cat_id` INTEGER NOT NULL,
    `book_collection_id` INTEGER NOT NULL,
    `book_launch_date` DATETIME(3) NOT NULL,
    `book_publisher` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issuance` (
    `issuance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `issuance_date` DATETIME(3) NOT NULL,
    `issuance_member` INTEGER NOT NULL,
    `issued_by` VARCHAR(191) NOT NULL,
    `target_return_date` DATETIME(3) NOT NULL,
    `issuance_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`issuance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Membership` ADD CONSTRAINT `Membership_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`mem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_cat_id_fkey` FOREIGN KEY (`book_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_collection_id_fkey` FOREIGN KEY (`book_collection_id`) REFERENCES `Collection`(`collection_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issuance` ADD CONSTRAINT `Issuance_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issuance` ADD CONSTRAINT `Issuance_issuance_member_fkey` FOREIGN KEY (`issuance_member`) REFERENCES `Member`(`mem_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
