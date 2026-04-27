package com.prueba_tecnica_leticia_andino.model;

@lombok.Getter
@lombok.Setter
@lombok.Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "tasks")
public class Task {
  @jakarta.persistence.Id
  @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
  @jakarta.persistence.Column(name = "id", nullable = false)
  private java.lang.Long id;

  @jakarta.validation.constraints.Size(max = 200)
  @jakarta.validation.constraints.NotNull
  @jakarta.persistence.Column(name = "title", nullable = false, length = 200)
  private java.lang.String title;

  @jakarta.persistence.Column(name = "description", columnDefinition = "TEXT")
  private java.lang.String description;

  @jakarta.validation.constraints.Size(max = 20)
  @jakarta.validation.constraints.NotNull
  @org.hibernate.annotations.ColumnDefault("'PENDING'")
  @jakarta.persistence.Column(name = "status", nullable = false, length = 20)
  private java.lang.String status;

  @jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
  @org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.SET_NULL)
  @jakarta.persistence.JoinColumn(name = "category_id")
  private com.prueba_tecnica_leticia_andino.model.Category category;

  @jakarta.persistence.ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
  @org.hibernate.annotations.OnDelete(action = org.hibernate.annotations.OnDeleteAction.CASCADE)
  @jakarta.persistence.JoinColumn(name = "parent_id")
  private com.prueba_tecnica_leticia_andino.model.Task parent;

  @org.hibernate.annotations.ColumnDefault("CURRENT_TIMESTAMP")
  @jakarta.persistence.Column(name = "created_at")
  private java.time.Instant createdAt;

  @org.hibernate.annotations.ColumnDefault("CURRENT_TIMESTAMP")
  @jakarta.persistence.Column(name = "updated_at")
  private java.time.Instant updatedAt;
}
