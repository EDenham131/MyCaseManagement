({
    fetchData: function (cmp) {

       	var userId = cmp.get("v.userId");

        var action = cmp.get("c.getCases");
        action.setParams({ userId : userId });
        action.setCallback(this, function (results) {
            var state = results.getState();
            if (state === "SUCCESS") {
                var cases = results.getReturnValue();
                cases.forEach(function(item) {
                    item['URL'] = '/lightning/r/Case/' + item['Id'] + '/edit';
                });
                cmp.set("v.cases", cases);
            }
        });
        $A.enqueueAction(action);

    },
    editCase: function (cmp, row) {
        var rows = cmp.get("v.data");
        var rowIndex = rows.indexOf(row);

        
    },
        
    convertArrayOfObjectsToCSV : function(component, objectRecords){
        var csvStringResult, counter, keys, columnDivider, lineDivider;

        // check if "objectRecords" parameter is null, then return from function
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }

        // store ,[comma] in columnDivider variable for separate CSV values and
        // for start next line use '\n' [new line] in lineDivider variable
        columnDivider = ',';
        lineDivider =  '\n';

        // in the keys valirable store fields API Names as a key
        // this labels use in CSV file header
        keys = Object.keys(objectRecords[0]); // FIXME: If the first record has empty fields, then they won't appear in header.
        console.log(keys);

        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;

        for(var i=0; i < objectRecords.length; i++){
            counter = 0;

            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;

                // add , [comma] after every String value,. [except first]
                if(counter > 0){
                    csvStringResult += columnDivider;
                }

                csvStringResult += '"'+ objectRecords[i][skey]+'"';

                counter++;

            }

            csvStringResult += lineDivider;
        }

        return csvStringResult;
    }
});