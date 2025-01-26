package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.entities.Product;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    @Transactional
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product update(Long id, Product product) {
        product.setId(id);
        this.findById(id).orElseThrow();
        return productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAllPaged(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> searchByNamePaged(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findByUserPageable(User user, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByUser(user, pageable);
        List<Product> productsWithCategories = productRepository.fetchCategories(productsPage.getContent());
        productRepository.fetchLabels(productsWithCategories);
        return productsPage;
    }
}
