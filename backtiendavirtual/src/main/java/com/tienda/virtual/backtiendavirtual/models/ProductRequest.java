package com.tienda.virtual.backtiendavirtual.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "name",
        "description",
        "price",
        "quantity",
        "categories",
        "labels"
})
public class ProductRequest {

    @JsonProperty("name")
    @Size(max = 250)
    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @JsonProperty("description")
    @Size(max = 3000)
    @NotBlank
    @NotEmpty
    @NotNull
    private String description;

    @JsonProperty("price")
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "9000000000000.0")
    private Double price;

    @JsonProperty("quantity")
    @Min(value = 1)
    @Max(value = 2147483647)
    @NotNull
    private Integer quantity;

    @JsonProperty("categories")
    @Valid
    @NotNull
    @NotEmpty
    private List<Category> categories;

    @JsonProperty("labels")
    @Valid
    @NotNull
    @NotEmpty
    private List<Label> labels;

    public ProductRequest() {
    }

    public ProductRequest(String name, String description, Double price, Integer quantity, List<Category> categories,
            List<Label> labels) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.categories = categories;
        this.labels = labels;
    }

    @JsonProperty("name")
    public String getName() {
        return name;
    }

    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("price")
    public Double getPrice() {
        return price;
    }

    @JsonProperty("price")
    public void setPrice(Double price) {
        this.price = price;
    }

    @JsonProperty("quantity")
    public Integer getQuantity() {
        return quantity;
    }

    @JsonProperty("quantity")
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
        @NotNull
        private Long id;

        @JsonProperty("name")
        @Size(max = 100)
        @NotBlank
        @NotEmpty
        @NotNull
        private String name;

        public Category() {
        }

        public Category(Long id, String name) {
            super();
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
        @NotNull
        private Long id;

        @JsonProperty("name")
        @Size(max = 50)
        @NotBlank
        @NotEmpty
        @NotNull
        private String name;

        public Label() {
        }

        public Label(Long id, String name) {
            super();
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