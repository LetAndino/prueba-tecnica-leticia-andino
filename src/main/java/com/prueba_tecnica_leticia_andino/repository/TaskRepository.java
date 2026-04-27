package com.prueba_tecnica_leticia_andino.repository;

import com.prueba_tecnica_leticia_andino.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

  // Tareas raíz (sin padre)
  Page<Task> findByParentIsNull(Pageable pageable);

  // Subtareas de una tarea padre
  Page<Task> findByParentId(Long parentId, Pageable pageable);

  // Buscar por categoría
  Page<Task> findByCategoryId(Long categoryId, Pageable pageable);

  // Subtareas de una tarea padre filtradas por categoría
  Page<Task> findByParentIdAndCategoryId(Long parentId, Long categoryId, Pageable pageable);

  // Tarea raíz por categoría
  Page<Task> findByParentIsNullAndCategoryId(Long categoryId, Pageable pageable);
}
