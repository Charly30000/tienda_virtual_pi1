package com.tienda.virtual.backtiendavirtual.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tienda.virtual.backtiendavirtual.entities.Category;

@Repository
public interface CategoryRespository extends CrudRepository<Category, Long> {

}
