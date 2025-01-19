package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Category;
import com.tienda.virtual.backtiendavirtual.repositories.CategoryRespository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRespository categoryRespository;

    @Override
    @Transactional(readOnly = true)
    public Optional<Category> findById(Long id) {
        return categoryRespository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> findAllById(List<Long> ids) {
        return (List<Category>) categoryRespository.findAllById(ids);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> findAll() {
        return (List<Category>) categoryRespository.findAllByOrderByNameAsc();
    }
}
