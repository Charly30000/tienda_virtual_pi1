package com.tienda.virtual.backtiendavirtual.models;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ProductFiltersParamsRequest {

    public static final String ORDER_ASCENDENT = "asc";
    public static final String ORDER_DESCENDENT = "desc";

    @Min(value = 1)
    private Integer page = 1;

    @Pattern(regexp = "^(asc|desc|)$", message = "debe ser 'asc', 'desc' o vacío")
    private String order = ORDER_ASCENDENT;

    @Pattern(regexp = "^(asc|desc|)$", message = "debe ser 'asc', 'desc' o vacío")
    private String price = "";
    
    @Size(max = 250)
    private String name = "";

    public Integer getPage() {
        return page;
    }
    public void setPage(Integer page) {
        this.page = page;
    }
    public String getOrder() {
        return order;
    }
    public void setOrder(String order) {
        this.order = order;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
}
