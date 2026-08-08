package com.billbot.billbot.repository.dashboard;

import com.billbot.billbot.entity.dashboard.IncomeOrExpense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeOrExpenseRepository extends JpaRepository<IncomeOrExpense,Long> {
}
