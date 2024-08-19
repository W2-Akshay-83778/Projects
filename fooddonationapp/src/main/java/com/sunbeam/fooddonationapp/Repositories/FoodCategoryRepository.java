package com.sunbeam.fooddonationapp.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sunbeam.fooddonationapp.Models.FoodCategory;


public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {
}