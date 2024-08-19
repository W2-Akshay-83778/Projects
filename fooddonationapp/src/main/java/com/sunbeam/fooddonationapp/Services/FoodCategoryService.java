package com.sunbeam.fooddonationapp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.fooddonationapp.Models.FoodCategory;
import com.sunbeam.fooddonationapp.Repositories.FoodCategoryRepository;

@Service
public class FoodCategoryService {
    @Autowired
    private FoodCategoryRepository foodCategoryRepository;

    public List<FoodCategory> getAllFoodCategories() {
        return foodCategoryRepository.findAll();
    }

    public FoodCategory getFoodCategoryById(Long id) {
        return foodCategoryRepository.findById(id).orElse(null);
    }

    public FoodCategory saveFoodCategory(FoodCategory foodCategory) {
        return foodCategoryRepository.save(foodCategory);
    }

    public void deleteFoodCategory(Long id) {
        foodCategoryRepository.deleteById(id);
    }
}
