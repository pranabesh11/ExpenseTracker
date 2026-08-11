package com.billbot.billbot.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetIncomeExpenseRes {
    private long id;
    private String category;
    private BigDecimal amount;
    private String type;
    private String recurring;
    private String description;
    private byte[] receiptUrl;
}
