package com.billbot.billbot.config;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvConfig {
    public static void load(){
        Dotenv dotenv = Dotenv.configure()
                .directory("F:/java/ETrack/ETrack/ExpenseTracker/backend")
                .filename(".env")
                .load();
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("USER_NAME", dotenv.get("USER_NAME"));
        System.setProperty("PASSWORD",dotenv.get("PASSWORD"));
        System.setProperty("JWT_SECRET",dotenv.get("JWT_SECRET"));
        System.setProperty("FRONT_END_CORS", dotenv.get("FRONT_END_CORS"));
        System.setProperty("EMAIL_USERNAME",dotenv.get("EMAIL_USERNAME"));
        System.setProperty("EMAIL_PASSWORD", dotenv.get(("EMAIL_PASSWORD")));
        System.setProperty("SENDER_NAME",dotenv.get("SENDER_NAME"));
    }
}
