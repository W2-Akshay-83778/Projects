package com.sunbeam.fooddonationapp.Models;




import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationID;
    
    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "categoryID")
    private FoodCategory category;
    
    private String donationDescription;
    private int quantity;
    private String unit;
    private LocalDateTime donationDate = LocalDateTime.now();
    
    
    public Long getDonationID() {
        return donationID;
    }
    public void setDonationID(Long donationID) {
        this.donationID = donationID;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public FoodCategory getCategory() {
        return category;
    }
    public void setCategory(FoodCategory category) {
        this.category = category;
    }
    public String getDonationDescription() {
        return donationDescription;
    }
    public void setDonationDescription(String donationDescription) {
        this.donationDescription = donationDescription;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }
    public LocalDateTime getDonationDate() {
        return donationDate;
    }
    public void setDonationDate(LocalDateTime donationDate) {
        this.donationDate = donationDate;
    }



}
