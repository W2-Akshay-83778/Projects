package com.sunbeam.fooddonationapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.fooddonationapp.Models.Recipient;


public interface RecipientRepository extends JpaRepository<Recipient, Long> {
}
