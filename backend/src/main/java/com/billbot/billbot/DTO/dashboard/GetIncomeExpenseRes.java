package com.billbot.billbot.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetIncomeExpenseRes {
    private List<EachRow> incomeAndExpense;
    private int currentPage;
    private int totalPage;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EachRow{
        private long id;
        private String category;
        private BigDecimal amount;
        private String type;
        private String recurring;
        private String description;
        private String receiptUrl;
    }
}
