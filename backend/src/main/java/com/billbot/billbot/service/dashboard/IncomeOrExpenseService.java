    package com.billbot.billbot.service.dashboard;
    
    import com.billbot.billbot.DTO.dashboard.AddIncomeExpenseReq;
    import com.billbot.billbot.DTO.dashboard.GetIncomeExpenseReq;
    import com.billbot.billbot.DTO.dashboard.GetIncomeExpenseRes;
    import com.billbot.billbot.entity.auth.User;
    import com.billbot.billbot.entity.dashboard.IncomeOrExpense;
    import com.billbot.billbot.repository.auth.UserRepository;
    import com.billbot.billbot.repository.dashboard.IncomeOrExpenseRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.domain.Sort;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.math.BigDecimal;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.util.ArrayList;
    import java.util.Date;
    import java.util.List;
    import java.util.UUID;
    
    @Service
    @RequiredArgsConstructor
    public class IncomeOrExpenseService {
        private final IncomeOrExpenseRepository incomeOrExpenseRepository;
        private final UserRepository userRepository;
        String uploadPath = "F:\\java\\ETrack\\ETrack\\ExpenseTracker\\backend\\uploads";
        @Transactional
        public boolean  addIncomeOrExpense(List<AddIncomeExpenseReq> entries,List<MultipartFile> receipts){
            if(entries == null || entries.isEmpty()){
                return false;
            }
            if(receipts == null){
                receipts = List.of();
            }
            if(!validateEntries((entries))){
                return false;
            }
            User user = userRepository.findById(entries.get(0).getUserId()).orElse(null);
            if(user == null){
                return false;
            }
            List<IncomeOrExpense> incomeOrExpenses = new ArrayList<>();
            for (AddIncomeExpenseReq item : entries) {
                IncomeOrExpense incomeOrExpense = new IncomeOrExpense();
                incomeOrExpense.setCategory(item.getCategory());
                incomeOrExpense.setAmount(new BigDecimal(item.getAmount()));
                incomeOrExpense.setDate(item.getDate());
                incomeOrExpense.setType(item.getType());
                incomeOrExpense.setRecurring(item.getRecurring());
                incomeOrExpense.setDescription(item.getDescription());
                incomeOrExpense.setUser(user);
                if(item.getReceiptIndex() != null){
                    int receiptIndex = item.getReceiptIndex();
                    if(receiptIndex < 0 || receiptIndex >= receipts.size()){
                        throw new IllegalArgumentException(
                                "Invalid receipt index"+ receiptIndex
                        );
                    }
                    MultipartFile receipt = receipts.get(receiptIndex);
                    if(receipt != null && !receipt.isEmpty()) {
                        try {
                            String fileName = saveReceipt(receipt);
                            incomeOrExpense.setReceiptUrl(fileName);
                        }catch (IOException ioException){
                            throw new RuntimeException(
                                    "Failed to save receipt",
                                    ioException
                            );
                        }
                    }
                }
                incomeOrExpenses.add(incomeOrExpense);
            }
            incomeOrExpenseRepository.saveAll(incomeOrExpenses);
            return true;
        }
        public GetIncomeExpenseRes getIncomeExpenseRes(GetIncomeExpenseReq getIncomeExpenseReq){
            User user = userRepository.findById(getIncomeExpenseReq.getId()).orElseThrow();
            Pageable pageable = PageRequest.of(
                    getIncomeExpenseReq.getCurrentPage(),
                    getIncomeExpenseReq.getPageSize(),
                    Sort.by("date").descending());
            Page<IncomeOrExpense> result = incomeOrExpenseRepository.findByUserIdAndDateBetween(
                    getIncomeExpenseReq.getId(),
                    getIncomeExpenseReq.getStartdate(),
                    getIncomeExpenseReq.getEndDate(),
                    pageable
            );
            List<GetIncomeExpenseRes.EachRow> rows = result.getContent().stream().map(item -> {
                GetIncomeExpenseRes.EachRow row = new GetIncomeExpenseRes.EachRow();
                row.setId(item.getId());
                row.setCategory(item.getCategory());
                row.setAmount(item.getAmount());
                row.setType(item.getType());
                row.setRecurring(item.getRecurring());
                row.setDescription(item.getDescription());
                    if (item.getReceiptUrl() != null) {
                        row.setReceiptUrl(
                                "/app/files/" + item.getReceiptUrl()
                        );
                    }
                        return row;
            }).toList();
            GetIncomeExpenseRes getIncomeExpenseRes = new GetIncomeExpenseRes();
            getIncomeExpenseRes.setIncomeAndExpense(rows);
            getIncomeExpenseRes.setCurrentPage(result.getNumber());
            getIncomeExpenseRes.setTotalPage(result.getTotalPages());
            return getIncomeExpenseRes;
        }
        private boolean validateEntries(List<AddIncomeExpenseReq> entries){
            return entries.stream().allMatch(item -> {
                if(item.getCategory() == null || item.getCategory().isBlank()){
                    return false;
                }
                if(item.getAmount() == null || item.getAmount().isBlank()){
                    return false;
                }
                try{
                    BigDecimal amount = new BigDecimal(item.getAmount());
                    if(amount.compareTo(BigDecimal.ZERO) <= 0){
                        return false;
                    }
                }catch (NumberFormatException exception){
                    return false;
                }
                if(item.getDate() == null){
                    return false;
                }
                if(item.getType() == null || (!item.getType().equalsIgnoreCase("income")
                        && !item.getType().equalsIgnoreCase("expense"))){
                    return false;
                }
                if(item.getRecurring() == null ||
                item.getRecurring().isBlank()){
                    return false;
                }
                return true;
            });
        }
        private String saveReceipt(MultipartFile file) throws IOException {
            Path uploadDir = Paths.get(uploadPath);
            if(!Files.exists(uploadDir)){
                Files.createDirectories(uploadDir);
            }
            String originalFileName = file.getOriginalFilename();
            String extension = "";
            if(originalFileName != null && originalFileName.contains(".")){
                extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String newFileName  = UUID.randomUUID()+extension;
            Path filePath = uploadDir.resolve(newFileName );
            Files.copy(file.getInputStream(), filePath);
            return newFileName;
        }
    }
