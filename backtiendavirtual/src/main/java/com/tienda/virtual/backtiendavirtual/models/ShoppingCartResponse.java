package com.tienda.virtual.backtiendavirtual.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.Valid;

/**
 * Clase preparada de respuesta de la ShoppingCart
 * Estos serán los datos que responda el servidor
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "date",
        "products"
})
public class ShoppingCartResponse {

    @JsonProperty("date")
    private String date;
    @JsonProperty("products")
    @Valid
    private List<Product> products;

    public ShoppingCartResponse(String date, @Valid List<Product> products) {
        this.date = date;
        this.products = products;
    }

    @JsonProperty("date")
    public String getDate() {
        return date;
    }

    @JsonProperty("date")
    public void setDate(String date) {
        this.date = date;
    }

    @JsonProperty("products")
    public List<Product> getProducts() {
        return products;
    }

    @JsonProperty("products")
    public void setProducts(List<Product> products) {
        this.products = products;
    }

    // Clase estática pública para ser accesible externamente
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonPropertyOrder({
            "id",
            "name",
            "image",
            "price",
            "quantity",
            "sold",
            "total_available",
            "isBlocked"
    })
    public static class Product {

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("image")
        private String image;

        @JsonProperty("price")
        private Double price;

        @JsonProperty("quantity")
        private Integer quantity;

        @JsonProperty("sold")
        private Integer sold;

        @JsonProperty("total_available")
        private Integer totalAvailable;

        @JsonProperty("isBlocked")
        private boolean isBlocked;

        public Product(Long id, String name, String image, Double price, Integer quantity, Integer sold,
                Integer totalAvailable, boolean isBlocked) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.price = price;
            this.quantity = quantity;
            this.sold = sold;
            this.totalAvailable = totalAvailable;
            this.isBlocked = isBlocked;
        }

        @JsonProperty("image")
        public String getImage() {
            return image;
        }

        @JsonProperty("image")
        public void setImage(String image) {
            this.image = image;
        }

        @JsonProperty("sold")
        public Integer getSold() {
            return sold;
        }

        @JsonProperty("sold")
        public void setSold(Integer sold) {
            this.sold = sold;
        }

        @JsonProperty("quantity")
        public Integer getQuantity() {
            return quantity;
        }

        @JsonProperty("quantity")
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        @JsonProperty("price")
        public Double getPrice() {
            return price;
        }

        @JsonProperty("price")
        public void setPrice(Double price) {
            this.price = price;
        }

        @JsonProperty("name")
        public String getName() {
            return name;
        }

        @JsonProperty("name")
        public void setName(String name) {
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

        @JsonProperty("total_available")
        public Integer getTotalAvailable() {
            return totalAvailable;
        }

        @JsonProperty("total_available")
        public void setTotalAvailable(Integer totalAvailable) {
            this.totalAvailable = totalAvailable;
        }

        @JsonProperty("isBlocked")
        public boolean getIsBlocked() {
            return isBlocked;
        }

        @JsonProperty("isBlocked")
        public void setIsBlocked(boolean isBlocked) {
            this.isBlocked = isBlocked;
        }
    }
}
