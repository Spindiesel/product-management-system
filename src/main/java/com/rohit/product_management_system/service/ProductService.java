package com.rohit.product_management_system.service;

import com.rohit.product_management_system.entity.Product;
import com.rohit.product_management_system.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = repository.findById(id).orElse(null);

        if(product != null) {
            product.setProductName(updatedProduct.getProductName());
            product.setProductDescription(updatedProduct.getProductDescription());
            product.setProductCategory(updatedProduct.getProductCategory());
            product.setProductPrice(updatedProduct.getProductPrice());

            return repository.save(product);
        }

        return null;
    }
}
