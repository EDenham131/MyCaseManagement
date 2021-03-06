({
    init : function(cmp, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        cmp.set("v.userId", userId);
        
        var actions = [
            { label: 'Edit', name: 'edit' }
        ];
        
        cmp.set('v.columns', [
            {label: 'Case Number', fieldName: 'CaseNumber', type: 'text' },
            {label: 'Open Date', fieldName: 'CreatedDate', type: 'date'},
            {label: 'Origin', fieldName: 'Origin', type: 'text'},
            {label: 'Reason', fieldName: 'Reason', type: 'text'},
            {label: 'Status', fieldName: 'Status', type: 'text'},
            {label: 'Action', type: 'button', typeAttributes: { label: 'Edit Case' }}
        ]);
        
        helper.fetchData(cmp);
        
        
        
    },
    

    selectRow: function(cmp, event) {
        var selectedRows = event.getParam('selectedRows');
		
        // Send the Account Id to the Account component
        var acctIdEvent = $A.get("e.c:ED_SendAccountId");
        acctIdEvent.setParams({
            "accountId" : selectedRows[0].AccountId });
        acctIdEvent.fire();
        
        // Send the Contact Id to the Contact component
        var conIdEvent = $A.get("e.c:ED_SendContactId");
        conIdEvent.setParams({
            "contactId" : selectedRows[0].ContactId });
        conIdEvent.fire();

    },
        
    downloadCasesToCsv : function(component, event, helper){
        // get the case list 
        var myCases = component.get("v.cases");

        // call the helper function which "return" the CSV data as a String
        var csv = helper.convertArrayOfObjectsToCSV(component, myCases);
        if (csv == null){return;}

        // ####--code for create a temp. <a> html tag [link tag] for download the CSV file--####
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self'; //
        hiddenElement.download = 'MyCases.csv';  
        document.body.appendChild(hiddenElement); // Required for FireFox browser
        hiddenElement.click(); // using click() js function to download csv file
    },

    editCase : function(cmp, event, helper) {

        var row = event.getParam('row');
        
        var editRecordEvent = $A.get("e.force:editRecord");
        
        editRecordEvent.setParams({
        
        "recordId": row.Id
        
        });

        editRecordEvent.fire();

    },

    handleSuccess : function (cmp, event, helper) {

        // Refresh the view
        // after data is updated
        $A.get('e.force:refreshView').fire();


    }
})