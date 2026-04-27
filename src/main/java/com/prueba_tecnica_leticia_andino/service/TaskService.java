package com.prueba_tecnica_leticia_andino.service;

import com.prueba_tecnica_leticia_andino.dto.TaskRequestDTO;
import com.prueba_tecnica_leticia_andino.dto.TaskResponseDTO;
import com.prueba_tecnica_leticia_andino.exception.ResourceNotFoundException;
import com.prueba_tecnica_leticia_andino.model.Category;
import com.prueba_tecnica_leticia_andino.model.Task;
import com.prueba_tecnica_leticia_andino.repository.CategoryRepository;
import com.prueba_tecnica_leticia_andino.repository.TaskRepository;
import com.prueba_tecnica_leticia_andino.response.ApiResponse;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {

  private final TaskRepository taskRepository;
  private final CategoryRepository categoryRepository;

  @Transactional
  public TaskResponseDTO createTask(TaskRequestDTO request) {
    Task task =
        Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .status(request.getStatus() != null ? request.getStatus() : "PENDING")
            .createdAt(Instant.now())
            .updatedAt(Instant.now())
            .build();

    if (request.getCategoryId() != null) {
      Category category =
          categoryRepository
              .findById(request.getCategoryId())
              .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
      task.setCategory(category);
    }

    return mapToResponse(taskRepository.save(task));
  }

  @Transactional
  public TaskResponseDTO createSubtask(Long parentId, TaskRequestDTO request) {
    Task parent =
        taskRepository
            .findById(parentId)
            .orElseThrow(() -> new ResourceNotFoundException("Tarea padre no encontrada"));

    Task subtask =
        Task.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .status(request.getStatus() != null ? request.getStatus() : "PENDING")
            .parent(parent)
            .createdAt(Instant.now())
            .updatedAt(Instant.now())
            .build();

    if (request.getCategoryId() != null) {
      Category category =
          categoryRepository
              .findById(request.getCategoryId())
              .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
      subtask.setCategory(category);
    }

    return mapToResponse(taskRepository.save(subtask));
  }

  public TaskResponseDTO getTaskById(Long id) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada"));
    return mapToResponse(task);
  }

  public ApiResponse<List<TaskResponseDTO>> getAllTasks(
      Integer page, Integer limit, String sortBy, String order, Long categoryId) {

    page = page != null ? page : 1;
    limit = limit != null ? limit : 10;
    sortBy = sortBy != null ? sortBy : "createdAt";
    order = order != null ? order : "desc";

    Sort.Direction direction =
        order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

    Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(direction, sortBy));

    Page<Task> taskPage;

    if (categoryId != null) {
      taskPage = taskRepository.findByParentIsNullAndCategoryId(categoryId, pageable);
    } else {
      taskPage = taskRepository.findByParentIsNull(pageable);
    }

    List<TaskResponseDTO> tasks =
        taskPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList());

    return ApiResponse.of(tasks, taskPage.getTotalElements(), page, limit);
  }

  public ApiResponse<List<TaskResponseDTO>> getSubtasks(
      Long parentId, Integer page, Integer limit, String sortBy, String order, Long categoryId) {

    taskRepository
        .findById(parentId)
        .orElseThrow(() -> new ResourceNotFoundException("Tarea padre no encontrada"));

    page = page != null ? page : 1;
    limit = limit != null ? limit : 10;
    sortBy = sortBy != null ? sortBy : "createdAt";
    order = order != null ? order : "desc";

    Sort.Direction direction =
        order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

    Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(direction, sortBy));

    Page<Task> subtasksPage =
        (categoryId != null)
            ? taskRepository.findByParentIdAndCategoryId(parentId, categoryId, pageable)
            : taskRepository.findByParentId(parentId, pageable);

    List<TaskResponseDTO> subtasks =
        subtasksPage.getContent().stream().map(this::mapToResponse).collect(Collectors.toList());

    return ApiResponse.of(subtasks, subtasksPage.getTotalElements(), page, limit);
  }

  @Transactional
  public TaskResponseDTO updateTask(Long id, TaskRequestDTO request) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada"));

    task.setTitle(request.getTitle());
    task.setDescription(request.getDescription());
    if (request.getStatus() != null) {
      task.setStatus(request.getStatus());
    }
    task.setUpdatedAt(Instant.now());

    if (request.getCategoryId() != null) {
      Category category =
          categoryRepository
              .findById(request.getCategoryId())
              .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
      task.setCategory(category);
    }

    return mapToResponse(taskRepository.save(task));
  }

  @Transactional
  public void deleteTask(Long id) {
    Task task =
        taskRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada"));
    taskRepository.delete(task);
  }

  private TaskResponseDTO mapToResponse(Task task) {
    return TaskResponseDTO.builder()
        .id(task.getId())
        .title(task.getTitle())
        .description(task.getDescription())
        .status(task.getStatus())
        .categoryId(task.getCategory() != null ? task.getCategory().getId() : null)
        .parentId(task.getParent() != null ? task.getParent().getId() : null)
        .createdAt(task.getCreatedAt())
        .updatedAt(task.getUpdatedAt())
        .build();
  }
}
