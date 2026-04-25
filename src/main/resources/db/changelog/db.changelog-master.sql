--liquibase formatted sql

--changeset leti:1
--comment: se crea la tabla de categorias
CREATE TABLE categories (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(100) NOT NULL UNIQUE,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--changeset leti:2
--comment: se crea la tabla de tasks
CREATE TABLE tasks (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(200) NOT NULL,
                       description TEXT,
                       status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                       category_id BIGINT NULL,
                       parent_id BIGINT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                       INDEX idx_parent_id (parent_id),
                       INDEX idx_parent_created (parent_id, created_at),
                       INDEX idx_category_created (category_id, created_at),

                       CONSTRAINT fk_tasks_parent
                           FOREIGN KEY (parent_id)
                               REFERENCES tasks(id)
                               ON DELETE CASCADE,

                       CONSTRAINT fk_tasks_category
                           FOREIGN KEY (category_id)
                               REFERENCES categories(id)
                               ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--changeset leti:3
--comment: se insertan las categorias iniciales
INSERT INTO categories (name) VALUES
                                  ('Trabajo'),
                                  ('Personal'),
                                  ('Estudio'),
                                  ('Salud'),
                                  ('Finanzas')
    ON DUPLICATE KEY UPDATE name = name;
--changeset leti:4
--comment: se modifica el campo status para usar ENUM y se agregan los nuevos estados
ALTER TABLE tasks
    MODIFY status ENUM('PENDING', 'IN_PROGRESS', 'CANCELLED', 'FINISHED')
    NOT NULL DEFAULT 'PENDING';