package com.fund.fundingmate.domain.payment.controller;

import com.fund.fundingmate.domain.payment.dto.PaymentDTO;
import com.fund.fundingmate.domain.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/payment/create")
    public ResponseEntity<String> createPayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            paymentService.createPayment(paymentDTO);
            return ResponseEntity.ok("Payment created successfully.");
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid user ID.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create payment.");
        }
    }

    @GetMapping("/payment/total-amount")
    public ResponseEntity<Map<Long, Integer>> getTotalPaymentAmounts(@RequestParam List<Long> rewardIds) {
        try {
            Map<Long, Integer> totalAmounts = paymentService.getTotalPaymentAmountsForRewards(rewardIds);
            return ResponseEntity.ok(totalAmounts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
