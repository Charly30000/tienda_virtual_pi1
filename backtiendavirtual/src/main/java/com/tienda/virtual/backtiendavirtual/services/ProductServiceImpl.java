package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired(required = false)
    private ProductRepository repository;
    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return (List<Product>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return repository.save(product);
    }

    @Override
    @Transactional
    public Optional<Product> update(Long id, Product product) {
        Optional<Product> productOptional = repository.findById(product.getId());
        if (productOptional.isPresent()) {
            Product prodDB = productOptional.orElseThrow();
            prodDB.setName(product.getName());
            prodDB.setDescription(product.getDescription());
            prodDB.setPrice(product.getPrice());
            return Optional.of(repository.save(prodDB));
        }
        return productOptional;
    }

    @Override
    @Transactional
    public Optional<Product> delete(Product product) {
        Optional<Product> productOptional = repository.findById(product.getId());
        productOptional.ifPresent(prodDB -> {
            repository.delete(product);
        });
        return productOptional;
    }
}
