package com.prueba_tecnica_leticia_andino.controller;

import com.prueba_tecnica_leticia_andino.dto.TaskRequestDTO;
import com.prueba_tecnica_leticia_andino.dto.TaskResponseDTO;
import com.prueba_tecnica_leticia_andino.exception.ResourceNotFoundException;
import com.prueba_tecnica_leticia_andino.response.ApiResponse;
import com.prueba_tecnica_leticia_andino.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  // POST /tasks - Crear tarea
  @PostMapping
  public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO request) {
    TaskResponseDTO task = taskService.createTask(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(task);
  }

  // GET /tasks - Listar tareas (solo raíz)
  @GetMapping
  public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getAllTasks(
      @RequestParam(required = false) Integer page,
      @RequestParam(required = false) Integer limit,
      @RequestParam(required = false) String sortBy,
      @RequestParam(required = false) String order,
      @RequestParam(required = false) Long categoryId) {

    ApiResponse<List<TaskResponseDTO>> response =
        taskService.getAllTasks(page, limit, sortBy, order, categoryId);
    return ResponseEntity.ok(response);
  }

  // GET /tasks/:id - Obtener tarea por ID
  @GetMapping("/{id}")
  public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
    return ResponseEntity.ok(taskService.getTaskById(id));
  }

  // PUT /tasks/:id - Actualizar tarea
  @PutMapping("/{id}")
  public ResponseEntity<TaskResponseDTO> updateTask(
      @PathVariable Long id, @Valid @RequestBody TaskRequestDTO request) {
    return ResponseEntity.ok(taskService.updateTask(id, request));
  }

  // DELETE /tasks/:id - Eliminar tarea
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }

  // POST /tasks/:id/subtasks - Crear subtarea
  @PostMapping("/{id}/subtasks")
  public ResponseEntity<TaskResponseDTO> createSubtask(
      @PathVariable("id") Long parentId, @Valid @RequestBody TaskRequestDTO request) {
    TaskResponseDTO subtask = taskService.createSubtask(parentId, request);
    return ResponseEntity.status(HttpStatus.CREATED).body(subtask);
  }

  // GET /tasks/:id/subtasks - Listar subtareas
  @GetMapping("/{id}/subtasks")
  public ResponseEntity<ApiResponse<List<TaskResponseDTO>>> getSubtasks(
      @PathVariable("id") Long parentId,
      @RequestParam(required = false) Integer page,
      @RequestParam(required = false) Integer limit,
      @RequestParam(required = false) String sortBy,
      @RequestParam(required = false) String order,
      @RequestParam(required = false) Long categoryId) {

    ApiResponse<List<TaskResponseDTO>> response =
        taskService.getSubtasks(parentId, page, limit, sortBy, order, categoryId);
    return ResponseEntity.ok(response);
  }

  // GET /tasks/:id/subtasks/:subtaskId - Obtener subtarea por ID
  @GetMapping("/{id}/subtasks/{subtaskId}")
  public ResponseEntity<TaskResponseDTO> getSubtaskById(
      @PathVariable("id") Long parentId, @PathVariable("subtaskId") Long subtaskId) {
    TaskResponseDTO subtask = taskService.getTaskById(subtaskId);
    if (!parentId.equals(subtask.getParentId())) {
      throw new ResourceNotFoundException("Subtarea no encontrada");
    }
    return ResponseEntity.ok(subtask);
  }

  // PUT /tasks/:id/subtasks/:subtaskId - Actualizar subtarea
  @PutMapping("/{id}/subtasks/{subtaskId}")
  public ResponseEntity<TaskResponseDTO> updateSubtask(
      @PathVariable("id") Long parentId,
      @PathVariable("subtaskId") Long subtaskId,
      @Valid @RequestBody TaskRequestDTO request) {
    TaskResponseDTO existing = taskService.getTaskById(subtaskId);
    if (!parentId.equals(existing.getParentId())) {
      throw new ResourceNotFoundException("Subtarea no encontrada");
    }
    return ResponseEntity.ok(taskService.updateTask(subtaskId, request));
  }

  // DELETE /tasks/:id/subtasks/:subtaskId - Eliminar subtarea
  @DeleteMapping("/{id}/subtasks/{subtaskId}")
  public ResponseEntity<Void> deleteSubtask(
      @PathVariable("id") Long parentId, @PathVariable("subtaskId") Long subtaskId) {
    TaskResponseDTO subtask = taskService.getTaskById(subtaskId);
    if (!parentId.equals(subtask.getParentId())) {
      throw new ResourceNotFoundException("Subtarea no encontrada");
    }
    taskService.deleteTask(subtaskId);
    return ResponseEntity.noContent().build();
  }
}
