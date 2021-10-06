public class ED_CaseController {
    
    @AuraEnabled
    public static List<Case> getCases(String userId) {

        List<Case> myCases = [Select Id, AccountId, Account.Name, CaseNumber, Origin, Reason, ContactId, Contact.Name, CreatedDate, Status FROM Case
                Where OwnerId = :userId ORDER BY Status ];
        system.debug(myCases);
        return myCases;
            }
}