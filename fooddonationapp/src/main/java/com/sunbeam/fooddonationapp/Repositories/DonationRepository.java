package com.sunbeam.fooddonationapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.fooddonationapp.Models.Donation;


public interface DonationRepository extends JpaRepository<Donation,Long> {
}