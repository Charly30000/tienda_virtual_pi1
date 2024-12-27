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
        "products"
})
public class ShoppingCartInvalidBuyResponse extends GenericResponse {

    @JsonProperty("products")
    List<InvalidProducts> products;

    public ShoppingCartInvalidBuyResponse(String message, HttpStatus status, boolean error,
            List<InvalidProducts> products) {
        super(message, status, error);
        this.products = products;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonPropertyOrder({
            "id",
            "name",
            "productOwner",
            "isBlocked",
            "available",
            "requested"
    })
    public static class InvalidProducts {

        @JsonProperty("id")
        private Long id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("productOwner")
        private String productOwner;

        @JsonProperty("isBlocked")
        private boolean isBlocked;

        @JsonProperty("available")
        private Integer available;

        @JsonProperty("requested")
        private Integer requested;

        public InvalidProducts(Long id, String name, String productOwner, boolean isBlocked, Integer available,
                Integer requested) {
            this.id = id;
            this.name = name;
            this.productOwner = productOwner;
            this.isBlocked = isBlocked;
            this.available = available;
            this.requested = requested;
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

        @JsonProperty("productOwner")
        public String getProductOwner() {
            return productOwner;
        }

        @JsonProperty("productOwner")
        public void setProductOwner(String productOwner) {
            this.productOwner = productOwner;
        }

        @JsonProperty("isBlocked")
        public boolean getIsBlocked() {
            return isBlocked;
        }

        @JsonProperty("isBlocked")
        public void setIsBlocked(boolean isBlocked) {
            this.isBlocked = isBlocked;
        }

        @JsonProperty("available")
        public Integer getAvailable() {
            return available;
        }

        @JsonProperty("available")
        public void setAvailable(Integer available) {
            this.available = available;
        }

        @JsonProperty("requested")
        public Integer getRequested() {
            return requested;
        }

        @JsonProperty("requested")
        public void setRequested(Integer requested) {
            this.requested = requested;
        }
    }
}
