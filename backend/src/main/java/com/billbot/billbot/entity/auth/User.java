package com.billbot.billbot.entity.auth;

import com.billbot.billbot.entity.chat.ConversationMember;
import com.billbot.billbot.entity.chat.Message;
import com.billbot.billbot.entity.dashboard.IncomeOrExpense;
import com.billbot.billbot.entity.settings.Settings;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    @Column(nullable = false)
    private boolean verified;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Settings> settings;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<IncomeOrExpense> incomeOrExpenses;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ConversationMember> conversations = new ArrayList<>();
    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages = new ArrayList<>();
}