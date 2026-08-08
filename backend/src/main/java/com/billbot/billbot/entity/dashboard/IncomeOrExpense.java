package com.billbot.billbot.entity.dashboard;

import com.billbot.billbot.entity.auth.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "IncomeOrExpense")

public class IncomeOrExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String category;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String type;

    private String recurring;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String receiptUrl;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
