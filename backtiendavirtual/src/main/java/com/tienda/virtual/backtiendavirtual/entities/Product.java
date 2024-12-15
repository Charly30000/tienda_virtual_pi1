package com.tienda.virtual.backtiendavirtual.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "name")
    @Size(max = 250)
    @NotBlank
    @NotEmpty
    @NotNull
    private String name;

    @Column(nullable = false, name = "description")
    @Size(max = 3000)
    @NotBlank
    @NotEmpty
    @NotNull
    private String description;

    @Column(nullable = false, name = "is_blocked")
    @JsonProperty(namespace = "isBlocked", value = "isBlocked")
    private boolean blocked;

    @Column(nullable = false, name = "image")
    private String image;

    @Column(nullable = false, name = "price")
    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    @DecimalMax(value = "9000000000000.0")
    private Double price;

    @Column(nullable = false, name = "quantity")
    @Min(value = 1)
    @Max(value = 2147483647)
    @NotNull
    private Integer quantity;

    @Column(nullable = false, name = "sold")
    @Max(value = 2147483647)
    private Integer sold;

    @ManyToOne
    @JoinColumn(name = "user_owner_id", nullable = false)
    @JsonIgnoreProperties({"products", "handler", "hibernateLazyInitializer"})
    private User user;

    @ManyToMany
    @JoinTable(
        name = "product_categories",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @JsonIgnoreProperties({"products", "handler", "hibernateLazyInitializer"})
    private List<Category> categories;

    @ManyToMany
    @JoinTable(
        name = "product_labels",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "label_id")
    )
    @JsonIgnoreProperties({"products", "handler", "hibernateLazyInitializer"})
    private List<Label> labels;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"product", "handler", "hibernateLazyInitializer"})
    private List<ShoppingCartProduct> shoppingCartProducts;

    public Product() {
        this.categories = new ArrayList<>();
        this.labels = new ArrayList<>();
        this.shoppingCartProducts = new ArrayList<>();
    }

    public Product(@Size(max = 250) @NotBlank @NotEmpty @NotNull String name,
            @Size(max = 3000) @NotBlank @NotEmpty @NotNull String description, boolean blocked, String image,
            @NotNull @DecimalMin(value = "0.0", inclusive = true) @DecimalMax("9000000000000.0") Double price,
            @Min(1) @Max(2147483647) @NotNull Integer quantity, @Max(2147483647) Integer sold, User user,
            List<Category> categories, List<Label> labels) {
        this.name = name;
        this.description = description;
        this.blocked = blocked;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.sold = sold;
        this.user = user;
        this.categories = categories;
        this.labels = labels;
        this.categories = new ArrayList<>();
        this.labels = new ArrayList<>();
        this.shoppingCartProducts = new ArrayList<>();
    }

    @PrePersist
    public void prePersist() {
        this.sold = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isBlocked() {
        return blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getSold() {
        return sold;
    }

    public void setSold(Integer sold) {
        this.sold = sold;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Label> getLabels() {
        return labels;
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }

    public List<ShoppingCartProduct> getShoppingCartProducts() {
        return shoppingCartProducts;
    }

    public void setShoppingCartProducts(List<ShoppingCartProduct> shoppingCartProducts) {
        this.shoppingCartProducts = shoppingCartProducts;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((user == null) ? 0 : user.hashCode());
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
        Product other = (Product) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (user == null) {
            if (other.user != null)
                return false;
        } else if (!user.equals(other.user))
            return false;
        return true;
    }
    
}
