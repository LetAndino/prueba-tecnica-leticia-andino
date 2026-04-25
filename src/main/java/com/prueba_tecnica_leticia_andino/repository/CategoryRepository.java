package com.prueba_tecnica_leticia_andino.service;

import com.prueba_tecnica_leticia_andino.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}