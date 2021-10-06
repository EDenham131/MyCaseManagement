({
	fetchAccountData : function(cmp) {
       	var userId = cmp.get("v.userId");

        var action = cmp.get("c.getAccounts");
        action.setParams({ userId : userId });
        action.setCallback(this, function (results) {
            var state = results.getState();
            if (state === "SUCCESS") {
                var accts = results.getReturnValue();
                
                accts.forEach(function(item) {
                    item.URL = '/lightning/r/Account/' + item['Id'] + '/view';
                });
                
                cmp.set("v.accts", accts);
            }
        });
        $A.enqueueAction(action);

	},
    
    setRowBGColor: function(cmp, acctId) {
        
        var accDisp = cmp.get("v.accts");
        var selectedRow = 0;
        
        for(let i = 0; i < accDisp.length;i++) {
            var row = accDisp[i];
            var acc = row.Id
            row.bgColorClass = acc === acctId ? "highlightRowClass" : "rowClass";
                    
              if (acc === acctId) {
                selectedRow = i;
            }
        }
        
        var cloneData = accDisp.slice(0, selectedRow);
        var moveToTop = accDisp.slice(selectedRow);
        accDisp = moveToTop.concat(cloneData);
        
        console.log(accDisp);
        cmp.set("v.accts", accDisp);

     }
})