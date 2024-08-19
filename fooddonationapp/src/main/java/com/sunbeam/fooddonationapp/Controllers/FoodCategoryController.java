package com.sunbeam.fooddonationapp.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.fooddonationapp.Models.FoodCategory;
import com.sunbeam.fooddonationapp.Services.FoodCategoryService;

import java.util.List;

@RestController
@RequestMapping("/foodcategories")
public class FoodCategoryController {
    @Autowired
    private FoodCategoryService foodCategoryService;

    @GetMapping
    public List<FoodCategory> getAllFoodCategories() {
        return foodCategoryService.getAllFoodCategories();
    }

    @GetMapping("/{id}")
    public FoodCategory getFoodCategoryById(@PathVariable Long id) {
        return foodCategoryService.getFoodCategoryById(id);
    }

    @PostMapping
    public FoodCategory createFoodCategory(@RequestBody FoodCategory foodCategory) {
        return foodCategoryService.saveFoodCategory(foodCategory);
    }

    @PutMapping("/{id}")
    public FoodCategory updateFoodCategory(@PathVariable Long id, @RequestBody FoodCategory foodCategory) {
        foodCategory.setCategoryID(id);
        return foodCategoryService.saveFoodCategory(foodCategory);
    }

    @DeleteMapping("/{id}")
    public void deleteFoodCategory(@PathVariable Long id) {
        foodCategoryService.deleteFoodCategory(id);
    }
}

