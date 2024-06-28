package com.proyecto.backend.repository;

import com.proyecto.backend.entity.Product;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface ProductRepository extends CrudRepository<Product, Long>{
    Optional<Product> findByApiId(Long apiId);
}
