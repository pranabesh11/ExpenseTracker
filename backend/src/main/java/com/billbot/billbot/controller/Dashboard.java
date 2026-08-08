package com.billbot.billbot.controller;

import com.billbot.billbot.DTO.ApiResponse;
import com.billbot.billbot.DTO.dashboard.AddIncomeExpenseReq;
import com.billbot.billbot.service.dashboard.IncomeOrExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("dashboard")
@RequiredArgsConstructor
public class Dashboard {
    private final IncomeOrExpenseService incomeOrExpense;
    @PostMapping(value  = "/addIncomeExpense", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Boolean>> addIncomeExpense(@Valid @RequestPart("data") List<AddIncomeExpenseReq> entries, @RequestPart(value = "receipts", required = false) List<MultipartFile> receipts) throws Exception{
        Boolean isCreated = incomeOrExpense.addIncomeOrExpense(entries, receipts);
        return ResponseEntity.ok( new ApiResponse<>(true, "Income Or Expense Added", isCreated));
    }
}
