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

    /**
     * Obtenemos los Productos del usuario paginados
     * En este metodo además obtenemos las categorias y labels propias del producto
     * en cuestion
     * (mandamos la lista de productos que tiene el usuario para obtener unicamente
     * sus respectivas categorias y labels), consiguiendo asi minimizar la cantidad
     * de consultas
     * que realizamos a la BBDD
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Product> findByUserPageable(User user, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByUser(user, pageable);
        // Cargar categorías
        List<Product> productsWithCategories = productRepository.fetchCategories(productsPage.getContent());
        // Cargar etiquetas
        productRepository.fetchLabels(productsWithCategories);
        return productsPage;
    }

    /**
     * Obtenemos los Productos paginados que contengan el name
     * En este metodo además obtenemos las categorias y labels propias del producto
     * en cuestion
     * (mandamos la lista de productos que tiene el usuario para obtener unicamente
     * sus respectivas categorias y labels), consiguiendo asi minimizar la cantidad
     * de consultas
     * que realizamos a la BBDD
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Product> findByNamePageable(String name, Pageable pageable) {
        Page<Product> productsPage = productRepository.findByNameContainingIgnoreCase(name, pageable);
        // Cargar categorías
        List<Product> productsWithCategories = productRepository.fetchCategories(productsPage.getContent());
        // Cargar etiquetas
        productRepository.fetchLabels(productsWithCategories);
        return productsPage;
    }
}
