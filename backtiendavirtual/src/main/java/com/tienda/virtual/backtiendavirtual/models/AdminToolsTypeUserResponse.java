package com.tienda.virtual.backtiendavirtual.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "username",
        "email",
        "isBussiness",
        "isAdmin"
})
public class AdminToolsTypeUserResponse {

    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email;

    @JsonProperty("isBussiness")
    private boolean isBussiness;

    @JsonProperty("isAdmin")
    private boolean isAdmin;

    @JsonProperty("isBlocked")
    private boolean isBlocked;

    public AdminToolsTypeUserResponse(String username, String email, boolean isBussiness, boolean isAdmin, boolean isBlocked) {
        this.username = username;
        this.email = email;
        this.isBussiness = isBussiness;
        this.isAdmin = isAdmin;
        this.isBlocked = isBlocked;
    }

    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    @JsonProperty("username")
    public void setUsername(String username) {
        this.username = username;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("isBussiness")
    public boolean getIsBussiness() {
        return isBussiness;
    }

    @JsonProperty("isBussiness")
    public void setIsBussiness(boolean isBussiness) {
        this.isBussiness = isBussiness;
    }

    @JsonProperty("isAdmin")
    public boolean getIsAdmin() {
        return isAdmin;
    }

    @JsonProperty("isAdmin")
    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    
    @JsonProperty("isBlocked")
    public boolean isBlocked() {
        return isBlocked;
    }
    
    @JsonProperty("isBlocked")
    public void setBlocked(boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

}