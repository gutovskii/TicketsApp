import { Migration } from '@mikro-orm/migrations';

export class Migration20230609000107 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `surname` varchar(255) not null, `fathername` varchar(255) not null, `nickname` varchar(255) not null, `email` varchar(255) not null, `birthday` datetime not null, `password_hash` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add unique `user_nickname_unique`(`nickname`);');
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);');

    this.addSql('create table `event` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `description` varchar(512) not null, `price` int not null, `max_people_count` int not null, `already_registered_count` int not null default 0, `place_name` varchar(255) not null, `place_link` varchar(255) not null, `status` enum(\'Not Started\', \'Started\', \'Stopped\', \'Ended\') not null default \'Not Started\', `start_date` varchar(255) not null, `end_date` varchar(255) not null, `author_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event` add index `event_author_id_index`(`author_id`);');

    this.addSql('create table `feedback` (`id` int unsigned not null auto_increment primary key, `text` varchar(512) not null, `event_id` int unsigned not null, `author_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `feedback` add index `feedback_event_id_index`(`event_id`);');
    this.addSql('alter table `feedback` add index `feedback_author_id_index`(`author_id`);');

    this.addSql('create table `event_registered_users` (`event_id` int unsigned not null, `user_id` int unsigned not null, primary key (`event_id`, `user_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `event_registered_users` add index `event_registered_users_event_id_index`(`event_id`);');
    this.addSql('alter table `event_registered_users` add index `event_registered_users_user_id_index`(`user_id`);');

    this.addSql('alter table `event` add constraint `event_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `feedback` add constraint `feedback_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade;');
    this.addSql('alter table `feedback` add constraint `feedback_author_id_foreign` foreign key (`author_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `event_registered_users` add constraint `event_registered_users_event_id_foreign` foreign key (`event_id`) references `event` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `event_registered_users` add constraint `event_registered_users_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `event` drop foreign key `event_author_id_foreign`;');

    this.addSql('alter table `feedback` drop foreign key `feedback_author_id_foreign`;');

    this.addSql('alter table `event_registered_users` drop foreign key `event_registered_users_user_id_foreign`;');

    this.addSql('alter table `feedback` drop foreign key `feedback_event_id_foreign`;');

    this.addSql('alter table `event_registered_users` drop foreign key `event_registered_users_event_id_foreign`;');

    this.addSql('drop table if exists `user`;');

    this.addSql('drop table if exists `event`;');

    this.addSql('drop table if exists `feedback`;');

    this.addSql('drop table if exists `event_registered_users`;');
  }

}
