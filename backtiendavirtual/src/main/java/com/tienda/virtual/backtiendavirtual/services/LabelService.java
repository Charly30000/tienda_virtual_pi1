package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Label;

public interface LabelService {
    Optional<Label> findById(Long id);

    List<Label> findAllById(List<Long> ids);

    List<Label> findAll();
}
