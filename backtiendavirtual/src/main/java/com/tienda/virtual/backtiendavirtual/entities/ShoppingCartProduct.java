package com.tienda.virtual.backtiendavirtual.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "shopping_cart_products")
public class ShoppingCartProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id", nullable = false)
    @JsonIgnoreProperties({"shoppingCartProducts", "handler", "hibernateLazyInitializer"})
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonIgnoreProperties({"shoppingCartProducts", "handler", "hibernateLazyInitializer"})
    private Product product;

    @Column(nullable = false, name = "quantity")
    @NotNull
    @Min(value = 0)
    @Max(value = 2147483647)
    private Integer quantity;

    public ShoppingCartProduct() {}

    public ShoppingCartProduct(ShoppingCart shoppingCart, Product product, @NotNull @Min(0) @Max(value = 2147483647) Integer quantity) {
        this.shoppingCart = shoppingCart;
        this.product = product;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((shoppingCart == null) ? 0 : shoppingCart.hashCode());
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ShoppingCartProduct other = (ShoppingCartProduct) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (shoppingCart == null) {
            if (other.shoppingCart != null)
                return false;
        } else if (!shoppingCart.equals(other.shoppingCart))
            return false;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (!product.equals(other.product))
            return false;
        return true;
    }
    
}