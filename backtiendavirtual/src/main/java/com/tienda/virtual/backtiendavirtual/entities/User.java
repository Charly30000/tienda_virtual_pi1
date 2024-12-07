package com.tienda.virtual.backtiendavirtual.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, max = 50)
    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "email", nullable = false, unique = true, length = 300)
    @NotBlank
    @Size(min = 3, max = 300)
    @Email
    private String email;

    @Column(name = "password", nullable = false, length = 60)
    @NotBlank
    @Size(min = 8, max = 60)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "enabled", nullable = false)
	private boolean enabled;

    @Transient
    @JsonProperty("isBussiness")
    private Boolean isBussiness;
    
    @Transient
    @JsonProperty("isAdmin")
    private Boolean isAdmin;

    @JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
    @ManyToMany
    @JoinTable(
        name = "users_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"),
        uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "role_id"}) }
    )
    private List<Role> roles;

    public User() {
        if (this.roles == null) {
            roles = new ArrayList<>();
        }
    }

    public User(@NotBlank @Size(min = 3, max = 50) String username, @NotBlank @Size(min = 3, max = 300) String email,
            @NotBlank @Size(min = 8, max = 60) String password, boolean enabled, List<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.roles = roles;
        if (this.roles == null) {
            roles = new ArrayList<>();
        }
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Boolean getIsAdmin() {
        return isAdmin == null ? false : isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean getIsBussiness() {
        return isBussiness == null ? false : isBussiness;
    }

    public void setIsBussiness(Boolean isBussiness) {
        this.isBussiness = isBussiness;
    }

    @PrePersist
    public void prePersist() {
        boolean hasRoleAdmin = getRoles().stream().anyMatch(role -> ConstantsRoles.ROLE_ADMIN.equals(role.getName()));
        boolean hasRoleBussiness = getRoles().stream().anyMatch(role -> ConstantsRoles.ROLE_BUSSINESS.equals(role.getName()));
        setIsAdmin(hasRoleAdmin);
        setIsBussiness(hasRoleBussiness);
        this.enabled = true;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((username == null) ? 0 : username.hashCode());
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
        User other = (User) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (username == null) {
            if (other.username != null)
                return false;
        } else if (!username.equals(other.username))
            return false;
        return true;
    }

}









// @JsonManagedReference
// @OneToMany(mappedBy = "userOwner", cascade = CascadeType.ALL)
// private Set<Product> products = new HashSet<>();

// @JsonManagedReference
// @OneToMany(mappedBy = "userOwner", cascade = CascadeType.ALL)
// private Set<ShoppingCart> shoppingCarts = new HashSet<>();