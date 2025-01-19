package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.entities.Label;
import com.tienda.virtual.backtiendavirtual.repositories.LabelRepository;

@Service
public class LabelServiceImpl implements LabelService {

    @Autowired
    private LabelRepository labelRepository;

    @Override
    @Transactional(readOnly = true)
    public Optional<Label> findById(Long id) {
        return labelRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Label> findAllById(List<Long> ids) {
        return (List<Label>) labelRepository.findAllById(ids);
    }

}
