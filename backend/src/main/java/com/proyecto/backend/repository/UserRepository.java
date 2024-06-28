package com.proyecto.backend.repository;

import com.proyecto.backend.entity.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByNameAndPassword(String name, String password);
    Optional<User> findByName(String name);
    Optional<User> getUserById(Long id);
}