({
	init : function(cmp, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        cmp.set("v.userId", userId);
        
        cmp.set('v.columns', [
            {label: 'Contact Name', 
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
            {label: 'Phone', fieldName: 'Phone', type: 'text',
             cellAttributes:{ class: { fieldName: 'bgColorClass' }}},
            {label: 'Mobile', fieldName: 'MobilePhone', type: 'text',
             cellAttributes:{ class: { fieldName: 'bgColorClass' }}}
            

        ]);
             
        helper.fetchContactData(cmp); 
	},
    
    highlightContact : function(cmp, event, helper) {
        var contactId = event.getParam("contactId");
        console.log(contactId);
        helper.setRowBGColor(cmp, contactId);
        
    }    

 
})