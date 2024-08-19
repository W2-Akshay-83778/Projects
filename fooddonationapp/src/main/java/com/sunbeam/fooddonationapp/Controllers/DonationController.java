package com.sunbeam.fooddonationapp.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.fooddonationapp.Models.Donation;
import com.sunbeam.fooddonationapp.Services.DonationService;

import java.util.List;

@RestController
@RequestMapping("/donations")
public class DonationController {
    @Autowired
    private DonationService donationService;

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @GetMapping("/{id}")
    public Donation getDonationById(@PathVariable Long id) {
        return donationService.getDonationById(id);
    }

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        return donationService.saveDonation(donation);
    }

    @PutMapping("/{id}")
    public Donation updateDonation(@PathVariable Long id, @RequestBody Donation donation) {
        donation.setDonationID(id);
        return donationService.saveDonation(donation);
    }

    @DeleteMapping("/{id}")
    public void deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }
}
