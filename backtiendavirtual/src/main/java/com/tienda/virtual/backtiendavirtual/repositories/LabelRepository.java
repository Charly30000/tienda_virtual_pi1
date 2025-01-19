package com.tienda.virtual.backtiendavirtual.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tienda.virtual.backtiendavirtual.entities.Label;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {
    List<Label> findAllByOrderByNameAsc();
}
