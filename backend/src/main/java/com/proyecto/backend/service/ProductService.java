package com.proyecto.backend.service;

import com.proyecto.backend.entity.Product;
import com.proyecto.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Optional<Product> getProductByApiId(Long apiId) {
        return productRepository.findByApiId(apiId);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
