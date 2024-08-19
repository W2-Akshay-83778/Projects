package com.sunbeam.fooddonationapp.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.fooddonationapp.Models.Recipient;
import com.sunbeam.fooddonationapp.Services.RecipientService;

import java.util.List;

@RestController
@RequestMapping("/recipients")
public class RecipientController {
    @Autowired
    private RecipientService recipientService;

    @GetMapping
    public List<Recipient> getAllRecipients() {
        return recipientService.getAllRecipients();
    }

    @GetMapping("/{id}")
    public Recipient getRecipientById(@PathVariable Long id) {
        return recipientService.getRecipientById(id);
    }

    @PostMapping
    public Recipient createRecipient(@RequestBody Recipient recipient) {
        return recipientService.saveRecipient(recipient);
    }

    @PutMapping("/{id}")
    public Recipient updateRecipient(@PathVariable Long id, @RequestBody Recipient recipient) {
        recipient.setRecipientID(id);
        return recipientService.saveRecipient(recipient);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipient(@PathVariable Long id) {
        recipientService.deleteRecipient(id);
    }
}
