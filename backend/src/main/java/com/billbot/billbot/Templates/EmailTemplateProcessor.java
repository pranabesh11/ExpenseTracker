package com.billbot.billbot.Templates;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class EmailTemplateProcessor {
    private final SpringTemplateEngine templateEngine;
    public String process(String template, Map<String, Object> variables){
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(template, context);
    }
}
