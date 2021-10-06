({
    init : function(cmp, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        cmp.set("v.userId", userId);
        
        cmp.set('v.columns', [
            {label: 'Account', 
             fieldName: 'URL',
             type: 'url', 
             typeAttributes: { 
                 label: {
                     fieldName: 'Name'
                 },
                 target: '_self'
             },
             cellAttributes:{ 
                 class: { 
                     fieldName: 'bgColorClass' 
                 } 
             } 
            },
            { label: 'Industry', fieldName: 'Industry', type: 'text',
             cellAttributes:{ class: { fieldName: 'bgColorClass' } } },
            //{label: 'Account', fieldName: 'Name', type: 'text',
            // cellAttributes:{ class: { fieldName: 'bgColorClass' } } },
            { label: 'Phone', fieldName: 'Phone', type: 'text',
             cellAttributes:{ class: { fieldName: 'bgColorClass' } } }
        ]);
             
        helper.fetchAccountData(cmp); 
        
	},
    
    highlightAcct : function(cmp, event, helper) {
        var acctId = event.getParam("accountId");
       
        helper.setRowBGColor(cmp, acctId);
   
    }
})