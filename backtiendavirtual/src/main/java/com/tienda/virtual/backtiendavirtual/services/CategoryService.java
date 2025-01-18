package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Category;

public interface CategoryService {
    Optional<Category> findById(Long id);
    List<Category> findAllById(List<Long> ids);
}
