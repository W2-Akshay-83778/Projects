package com.sunbeam.fooddonationapp.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.fooddonationapp.Models.Recipient;
import com.sunbeam.fooddonationapp.Repositories.RecipientRepository;

@Service
public class RecipientService {
    @Autowired
    private RecipientRepository recipientRepository;

    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }

    public Recipient getRecipientById(Long id) {
        return recipientRepository.findById(id).orElse(null);
    }

    public Recipient saveRecipient(Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    public void deleteRecipient(Long id) {
        recipientRepository.deleteById(id);
    }
}
