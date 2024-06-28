package com.proyecto.backend.controller;

import com.proyecto.backend.entity.User;
import com.proyecto.backend.entity.Product;
import com.proyecto.backend.service.UserService;
import com.proyecto.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getUser(@RequestParam String name, @RequestParam String password) {
        Optional<User> user = userService.getUserByNameAndPassword(name, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User user) {
        Optional<User> userExit = userService.getUserByName(user.getName());
        if(userExit.isPresent()){
            return ResponseEntity.status(404).body("Este usuario ya existe");
        }else{
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(201).body(savedUser);
        }
    }

    @PostMapping("/{userId}/product/{productId}")
    public ResponseEntity<?> addProductToUser(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<User> optionalUser = userService.getUserById(userId);
        Optional<Product> optionalProduct = productService.getProductByApiId(productId);

        if(!optionalUser.isPresent()){
            return ResponseEntity.status(404).body("Este usuario ya existe");
        }else{
            User user = optionalUser.get();
            if(optionalProduct.isPresent()){
                Product product = optionalProduct.get();
                user.addProduct(product);
                User savedUser = userService.saveUser(user);
                return ResponseEntity.status(201).body(savedUser);
            }else{
                Product product = new Product();
                product.setApiId(productId);
                productService.saveProduct(product);
                user.addProduct(product);
                User savedUser = userService.saveUser(user);
                return ResponseEntity.status(201).body(savedUser);
            }
        }
    }

    @DeleteMapping("/{userId}/product/{productId}")
    public ResponseEntity<?> removeProductFromUser(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<User> optionalUser = userService.getUserById(userId);
        Optional<Product> optionalProduct = productService.getProductByApiId(productId);
        
        if(!optionalUser.isPresent()){
            return ResponseEntity.status(404).body("Este usuario ya existe");
        }else{
            User user = optionalUser.get();
            Product product = optionalProduct.get();
            user.removeProduct(product);
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(201).body(savedUser);
        }
    }

    @GetMapping("/{userId}/product/{productId}/exists")
    public ResponseEntity<?> isProductInUser(@PathVariable Long userId, @PathVariable Long productId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        } else {
            User user = optionalUser.get();
            boolean exists = user.getProducts().stream()
                .anyMatch(product -> product.getApiId().equals(productId));
            return ResponseEntity.ok(exists);
        }
    }
}