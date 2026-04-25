--liquibase formatted sql

--changeset leti:1
--comment: se crea la tabla de tasks
CREATE TABLE tasks (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(200) NOT NULL,
                       description TEXT,
                       status VARCHAR(20) DEFAULT 'PENDING',
                       category_id BIGINT,
                       parent_id BIGINT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                       INDEX idx_parent_id (parent_id),
                       INDEX idx_parent_created (parent_id, created_at),

                       CONSTRAINT fk_tasks_parent
                           FOREIGN KEY (parent_id)
                               REFERENCES tasks(id)
                               ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
