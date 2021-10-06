({
	fetchContactData : function(cmp) {
       	var userId = cmp.get("v.userId");

        var action = cmp.get("c.getContacts");
        action.setParams({ userId : userId });
        action.setCallback(this, function (results) {
			var state = results.getState();
            if (state === "SUCCESS") {
                
                 var contacts = results.getReturnValue();
                
                contacts.forEach(function(item) {
                    item.URL = '/lightning/r/Contact/' + item['Id'] + '/view';
                });
                

            	cmp.set("v.contacts", contacts);
            }
        });
        $A.enqueueAction(action);

	},
    
    setRowBGColor: function(cmp, contactId) {
        
        var conDisp = cmp.get("v.contacts");
        var selectedRow = 0;
        
        for(let i = 0; i < conDisp.length;i++) {
            var row = conDisp[i];
            var conId = row.Id
            row.bgColorClass = conId === contactId ? "highlightRowClass" : "rowClass";
            if (conId === contactId) {
                selectedRow = i;
            }
            
        }

        var cloneData = conDisp.slice(0, selectedRow);
        var moveToTop = conDisp.slice(selectedRow);
        conDisp = moveToTop.concat(cloneData);
        
        console.log(conDisp);
        cmp.set("v.contacts", conDisp);

     }
    

})