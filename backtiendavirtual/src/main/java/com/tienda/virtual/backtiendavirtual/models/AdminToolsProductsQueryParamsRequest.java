package com.tienda.virtual.backtiendavirtual.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public class AdminToolsProductsQueryParamsRequest {

    @Min(value = 1)
    private Integer page = 1;

    @Size(max = 50)
    private String name = "";

    // Getters y Setters
    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
