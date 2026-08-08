package com.billbot.billbot.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddIncomeExpenseReq {
    private Long userId;
    private String category;
    private String amount;
    private Date date;
    private String type;
    private String recurring;
    private String description;
    private MultipartFile receipt;
    private Integer receiptIndex;
}
