package com.prueba_tecnica_leticia_andino.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private Long categoryId;
    private Long parentId;
    private Instant createdAt;
    private Instant updatedAt;
}