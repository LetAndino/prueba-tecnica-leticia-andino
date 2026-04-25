package com.prueba_tecnica_leticia_andino.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRequestDTO {

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200, message = "El título no puede exceder los 200 caracteres")
    private String title;

    @Size(max = 1000, message = "La descripción no puede exceder los 1000 caracteres")
    private String description;

    @Pattern(regexp = "PENDING|IN_PROGRESS|CANCELLED|FINISHED|COMPLETED",
             message = "El estado debe ser PENDING, IN_PROGRESS, CANCELLED, FINISHED o COMPLETED")
    private String status;

    private Long categoryId;
}
