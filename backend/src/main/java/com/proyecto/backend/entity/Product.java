package com.proyecto.backend.entity;

import java.util.ArrayList;
import java.util.Collection;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private Long apiId;

    @ManyToMany(mappedBy = "products")
    @Fetch(FetchMode.JOIN)
    @JsonIgnore
    private Collection<User> users = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getApiId() {
        return apiId;
    }

    public void setApiId(Long apiId) {
        this.apiId = apiId;
    }

    public Collection<User> getUsers() {
        return users;
      }
    
      public void setUsers(Collection<User> users) {
        this.users = users;
      }
    
      public void addUser(User user) {
        this.users.add(user);
    }

    public void deleteUser(User user) {
        this.users.remove(user);
    }
}
