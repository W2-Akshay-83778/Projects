package com.sunbeam.fooddonationapp.Models;


import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Recipient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipientID;
    
    @ManyToOne
    @JoinColumn(name = "userID")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "donationID")
    private Donation donation;
    
    private int quantityReceived;
    private LocalDateTime receivedDate = LocalDateTime.now();
   
   
    public Long getRecipientID() {
        return recipientID;
    }
    public void setRecipientID(Long recipientID) {
        this.recipientID = recipientID;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Donation getDonation() {
        return donation;
    }
    public void setDonation(Donation donation) {
        this.donation = donation;
    }
    public int getQuantityReceived() {
        return quantityReceived;
    }
    public void setQuantityReceived(int quantityReceived) {
        this.quantityReceived = quantityReceived;
    }
    public LocalDateTime getReceivedDate() {
        return receivedDate;
    }
    public void setReceivedDate(LocalDateTime receivedDate) {
        this.receivedDate = receivedDate;
    }

   
    
}
