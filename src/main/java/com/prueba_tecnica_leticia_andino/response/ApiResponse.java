package com.prueba_tecnica_leticia_andino.response;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    private T data;
    private Meta meta;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Meta {
        private Long total;
        private Integer page;
        private Integer totalPages;
    }

    public static <T> ApiResponse<T> of(T data, Long total, Integer page, Integer limit) {
        int totalPages = (int) Math.ceil((double) total / limit);
        return ApiResponse.<T>builder()
                .data(data)
                .meta(Meta.builder()
                        .total(total)
                        .page(page)
                        .totalPages(totalPages)
                        .build())
                .build();
    }
}