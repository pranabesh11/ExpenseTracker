package com.billbot.billbot.repository.dashboard;

import com.billbot.billbot.entity.dashboard.IncomeOrExpense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface IncomeOrExpenseRepository extends JpaRepository<IncomeOrExpense,Long> {
    Page<IncomeOrExpense> findByUserIdAndDateBetween(
            Long  userId,
            Date startDate,
            Date endDate,
            Pageable pageable
    );
}
