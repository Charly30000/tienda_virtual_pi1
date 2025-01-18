package com.tienda.virtual.backtiendavirtual.models;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "message",
        "status",
        "error",
        "categories",
        "labels"
})
public class ProductInvalidCategoryLabelResponse extends GenericResponse {

    @JsonProperty("categories")
    private List<Category> categories;

    @JsonProperty("labels")
    private List<Label> labels;

    public ProductInvalidCategoryLabelResponse(String message, HttpStatus status, boolean error,
            List<Category> categories, List<Label> labels) {
        super(message, status, error);
        this.categories = categories;
        this.labels = labels;
    }

    @JsonProperty("categories")
    public List<Category> getCategories() {
        return categories;
    }

    @JsonProperty("categories")
    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    @JsonProperty("labels")
    public List<Label> getLabels() {
        return labels;
    }

    @JsonProperty("labels")
    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonPropertyOrder({
            "id",
            "name"
    })
    public static class Category {

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        public Category(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        @JsonProperty("id")
        public Long getId() {
            return id;
        }

        @JsonProperty("id")
        public void setId(Long id) {
            this.id = id;
        }

        @JsonProperty("name")
        public String getName() {
            return name;
        }

        @JsonProperty("name")
        public void setName(String name) {
            this.name = name;
        }

    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonPropertyOrder({
            "id",
            "name"
    })
    public static class Label {

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        public Label(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        @JsonProperty("id")
        public Long getId() {
            return id;
        }

        @JsonProperty("id")
        public void setId(Long id) {
            this.id = id;
        }

        @JsonProperty("name")
        public String getName() {
            return name;
        }

        @JsonProperty("name")
        public void setName(String name) {
            this.name = name;
        }

    }

}
