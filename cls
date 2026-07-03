[1mdiff --git a/backend/pom.xml b/backend/pom.xml[m
[1mindex b29838e..9a02bc3 100644[m
[1m--- a/backend/pom.xml[m
[1m+++ b/backend/pom.xml[m
[36m@@ -82,6 +82,10 @@[m
 			<artifactId>dotenv-java</artifactId>[m
 			<version>3.0.0</version>[m
 		</dependency>[m
[32m+[m		[32m<dependency>[m
[32m+[m			[32m<groupId>org.springframework.boot</groupId>[m
[32m+[m			[32m<artifactId>spring-boot-starter-mail</artifactId>[m
[32m+[m		[32m</dependency>[m
 	</dependencies>[m
 [m
 	<build>[m
[1mdiff --git a/backend/src/main/java/com/billbot/billbot/config/AppConfig.java b/backend/src/main/java/com/billbot/billbot/config/AppConfig.java[m
[1mindex 1486172..aa779c5 100644[m
[1m--- a/backend/src/main/java/com/billbot/billbot/config/AppConfig.java[m
[1m+++ b/backend/src/main/java/com/billbot/billbot/config/AppConfig.java[m
[36m@@ -2,10 +2,12 @@[m [mpackage com.billbot.billbot.config;[m
 [m
 import org.springframework.context.annotation.Bean;[m
 import org.springframework.context.annotation.Configuration;[m
[32m+[m[32mimport org.springframework.scheduling.annotation.EnableAsync;[m
 import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;[m
 import org.springframework.security.crypto.password.PasswordEncoder;[m
 [m
 @Configuration[m
[32m+[m[32m@EnableAsync[m
 public class AppConfig {[m
     @Bean[m
     public PasswordEncoder passwordEncoder(){[m
[1mdiff --git a/backend/src/main/java/com/billbot/billbot/config/EnvConfig.java b/backend/src/main/java/com/billbot/billbot/config/EnvConfig.java[m
[1mindex edb9fb0..7981241 100644[m
[1m--- a/backend/src/main/java/com/billbot/billbot/config/EnvConfig.java[m
[1m+++ b/backend/src/main/java/com/billbot/billbot/config/EnvConfig.java[m
[36m@@ -13,5 +13,8 @@[m [mpublic class EnvConfig {[m
         System.setProperty("PASSWORD",dotenv.get("PASSWORD"));[m
         System.setProperty("JWT_SECRET",dotenv.get("JWT_SECRET"));[m
         System.setProperty("FRONT_END_CORS", dotenv.get("FRONT_END_CORS"));[m
[32m+[m[32m        System.setProperty("EMAIL_USERNAME",dotenv.get("EMAIL_USERNAME"));[m
[32m+[m[32m        System.setProperty("EMAIL_PASSWORD", dotenv.get(("EMAIL_PASSWORD")));[m
[32m+[m[32m        System.setProperty("SENDER_NAME",dotenv.get("SENDER_NAME"));[m
     }[m
 }[m
[1mdiff --git a/backend/src/main/resources/application.properties b/backend/src/main/resources/application.properties[m
[1mindex 5b11fd9..99b470f 100644[m
[1m--- a/backend/src/main/resources/application.properties[m
[1m+++ b/backend/src/main/resources/application.properties[m
[36m@@ -5,4 +5,10 @@[m [mspring.datasource.password= ${PASSWORD}[m
 spring.jpa.hibernate.ddl-auto=update[m
 spring.jpa.show-sql=true[m
 spring.jpa.properties.hibernate.format_sql=true[m
[31m-jwt.secret = ${JWT_SECRET}[m
\ No newline at end of file[m
[32m+[m[32mjwt.secret = ${JWT_SECRET}[m
[32m+[m[32mspring.mail.host=smtp.gmail.com[m
[32m+[m[32mspring.mail.port=587[m
[32m+[m[32mspring.mail.username=${EMAIL_USERNAME}[m
[32m+[m[32mspring.mail.password=${EMAIL_PASSWORD}[m
[32m+[m[32mspring.mail.properties.mail.smtp.auth=true[m
[32m+[m[32mspring.mail.properties.mail.smtp.starttls.enable=true[m
\ No newline at end of file[m
