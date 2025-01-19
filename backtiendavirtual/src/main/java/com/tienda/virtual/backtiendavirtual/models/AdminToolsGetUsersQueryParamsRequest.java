package com.tienda.virtual.backtiendavirtual.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class AdminToolsGetUsersQueryParamsRequest {

    @Min(value = 1)
    private Integer page = 1;

    @Size(max = 50)
    private String username = "";

    // Getters y Setters
    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
