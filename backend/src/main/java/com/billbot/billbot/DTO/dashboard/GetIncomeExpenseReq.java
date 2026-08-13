package com.billbot.billbot.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class GetIncomeExpenseReq {
    private Long id;
    private Date startdate;
    private Date endDate;
    private int currentPage;
    private int pageSize;
}
