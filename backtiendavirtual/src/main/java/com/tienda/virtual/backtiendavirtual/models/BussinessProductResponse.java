package com.tienda.virtual.backtiendavirtual.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "id",
        "name",
        "description",
        "image",
        "price",
        "quantity",
        "sold",
        "productOwner",
        "isBlocked",
        "categories",
        "labels"
})
public class BussinessProductResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("image")
    private String image;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("sold")
    private Integer sold;

    @JsonProperty("productOwner")
    private String productOwner;

    @JsonProperty("isBlocked")
    private boolean isBlocked;

    @JsonProperty("categories")
    private List<Category> categories;

    @JsonProperty("labels")
    private List<Label> labels;

    public BussinessProductResponse(Long id, String name, String description, String image, Double price,
            Integer quantity, Integer sold, String productOwner, boolean isBlocked, List<Category> categories,
            List<Label> labels) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.sold = sold;
        this.productOwner = productOwner;
        this.isBlocked = isBlocked;
        this.categories = categories;
        this.labels = labels;
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

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("image")
    public String getImage() {
        return image;
    }

    @JsonProperty("image")
    public void setImage(String image) {
        this.image = image;
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

    @JsonProperty("sold")
    public Integer getSold() {
        return sold;
    }

    @JsonProperty("sold")
    public void setSold(Integer sold) {
        this.sold = sold;
    }

    @JsonProperty("productOwner")
    public String getProductOwner() {
        return productOwner;
    }

    @JsonProperty("productOwner")
    public void setProductOwner(String productOwner) {
        this.productOwner = productOwner;
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

    @JsonProperty("isBlocked")
    public boolean getIsBlocked() {
        return isBlocked;
    }

    @JsonProperty("isBlocked")
    public void setIsBlocked(boolean isBlocked) {
        this.isBlocked = isBlocked;
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