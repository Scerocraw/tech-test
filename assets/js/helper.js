
var tableHelper = {

    /**
     * Contains the internalTable Selector
     */
    internalTableSelector: false,

    /**
     * Init Function - currently just for the internalTableSelector Set
     * @param tableSelector
     */
    init: function(tableSelector) {
        tableHelper.internalTableSelector = tableSelector;
    },

    /**
     * One table row on the bottom of the table
     */
    addTableRow: function() {
        // Add empty row - based on the current table structure
        $(tableHelper.internalTableSelector).append('<tr>' +
            '<td><input type="text" class="form-control" name="people[][firstname]" value=""/></td>' +
            '<td><input type="text" class="form-control" name="people[][surname]" value=""/></td>' +
            '<td class="options"><a class="deleteRow" href="#" title="Delete this row">Delete</a></td>' +
            '</tr>');

        // Re-register options
        tableHelper.registerOptionsToTable();
    },

    addTableRowModal: function(targetSelector) {
        // Add empty row - based on the current table structure
        $(targetSelector).append('<tr>' +
            '<td><input type="text" class="form-control" name="options[][label]" value=""/></td>' +
            '<td><input type="text" class="form-control" name="options[][name]" value=""/></td>' +
            '<td><select class="form-control" name="options[][type]">' +
            '<option value="text">Normal string</option>' +
            '<option value="email">String (E-Mail Format)</option>' +
            '<option value="numeric">Integer</option>' +
            '</select></td>' +
            '</tr>');

        // Re-register options
        tableHelper.registerOptionsToTableModal();
    },

    /**
     * Placeholder boolean for expanded options
     */
    tableExpanded: false,

    /**
     * Re-register all table row events
     */
    registerOptionsToTable: function() {
        // Only expand once
        if(!tableHelper.tableExpanded) {
            // Set on true because expand
            tableHelper.tableExpanded = true;

            // To add the option column
            $(tableHelper.internalTableSelector + " tr:first").append("<th>Options</th>");

            // And also add the options
            $(tableHelper.internalTableSelector + " tr:not(:first)").append('<td class="options"><a class="deleteRow" href="#" title="Delete this row">Delete</a></td>');
        }
        $('.deleteRow').on('click', function() {
            // Get the current clicked element
            var currentClicked = $(this);

            // Get the closest "parent" tr
            $(currentClicked).closest('tr').remove();
        });
    },

    /**
     * Placeholder boolean for expanded modal options
     */
    tableModalExpanded: false,

    /**
     * Re-register all table modal row events
     */
    registerOptionsToTableModal: function() {
        // Only expand once
        if(!tableHelper.tableModalExpanded) {
            // Set on true because expanded
            tableHelper.tableModalExpanded = true;

            // To add the option column
            $(".modalTable tr:first").append("<th>Options</th>");

            // And also add the options
            $(".modalTable tr:not(:first)").append('<td class="options"><a class="deleteRowModal" href="#" title="Delete this row">Delete</a></td>');
        }

        $('.deleteRowModal').on('click', function() {
            // Get the current clicked element
            var currentClicked = $(this);

            // Get the closest "parent" tr
            $(currentClicked).closest('tr').remove();
        });
    },

    /**
     * Returns the tableHeader JSON
     * @returns {*}
     */
    getTableHeader: function() {
        // Get the table header
        return $.ajax({
            url: '/listStructure',
            data: {
                format: 'json'
            },
            async: false, // Without that "async" option we wouldn't receive the content (the request is synchronous)
            dataType: 'json',
            success: function(dataHeader) {
                return dataHeader;
            },
            error: function() {

            }
        }).responseJSON;
    },

    /**
     * Returns the tableContent JSON
     * @returns {*}
     */
    getTableContent: function() {
        // Get the table content
        return $.ajax({
            url: '/listContent',
            data: {
                format: 'json'
            },
            async: false, // Without that "async" option we wouldn't receive the content (the request is synchronous)
            dataType: 'json',
            success: function(dataContent) {
                return dataContent;
            },
            error: function() {

            }
        }).responseJSON;
    },

    /**
     * This function fills the table with content
     */
    buildTable: function() {
        // Get the tableHeader
        var tableHeader = tableHelper.getTableHeader();
        // Check if the response is valid
        if(typeof tableHeader != "undefined") {
            // Iterate the tableHeader
            for(var tableHeaderCount in tableHeader) {
                // Add into tableHeader
                $(tableHelper.internalTableSelector + ' .tableHeader').append('<th>' + tableHeader[tableHeaderCount].label + '</th>');
            }

            // Get the tableContent
            var tableContent = tableHelper.getTableContent();

            // Check if the response is valid
            if(typeof tableContent != "undefined") {
                // Iterate the content as well
                for(var personCount in tableContent) {
                    $(tableHelper.internalTableSelector).append('<tr class="people-' + personCount + '"></tr>');
                    // Iterate the tableHeader
                    for(var tableHeaderCount in tableHeader) {
                        // Get the current HeadElement Name (firstname|surname) - the fields as standard property on the user
                        var currentHeadElement = tableHeader[tableHeaderCount].name;

                        // Get the current HeadElement Label for the placeholder input
                        var currentHeadLabel = tableHeader[tableHeaderCount].label;

                        // Get the current HeadElement Type (text|email|numeric)
                        var currentHeadType = tableHeader[tableHeaderCount].type;

                        // Get the value from the person
                        var value = tableContent[personCount][currentHeadElement];

                        // Check if is undefined
                        if(typeof value === "undefined") {
                            // Make it to an empty string
                            value = "";
                        }

                        // Iterate the content from the person
                        $(tableHelper.internalTableSelector + ' tr[class=people-' + personCount + ']').append(
                            '<td><input type="' + currentHeadType + '" class="form-control" name="people[][' + currentHeadElement + ']" placeholder="' + currentHeadLabel + '" value="' +  value + '"/></td>'
                        );
                    }
                }

                // Add options
                tableHelper.registerOptionsToTable();
            }
        }
    },

    /**
     * Function for filling the modal with content
     */
    generateModal: function() {
        // Clear the content
        $('.modal-tableStructure .modal-body').html('<table class="table modalTable table-bordered table-responsive"><tr><th>Field Label</th><th>Field Name</th><th>Field Type</th></tr></table>');

        // Get the tableHeader as current structure
        var tableHeader = tableHelper.getTableHeader();

        // Check if the response is valid
        if(typeof tableHeader != "undefined") {
            // Iterate the tableHeader
            for(var tableHeaderCount in tableHeader) {
                // Add into tableHeader
                $('.modal-tableStructure .modal-body table').append('<tr>' +
                    '<td><input type="text" name="options[][label]" class="form-control" value="' + tableHeader[tableHeaderCount].label + '"></td>' +
                    '<td><input type="text" name="options[][name]" class="form-control" value="' + tableHeader[tableHeaderCount].name + '"></td>' +
                    '<td><select class="form-control" name="options[][type]">' +
                    '<option value="text">Normal string</option>' +
                    '<option value="email">String (E-Mail Format)</option>' +
                    '<option value="numeric">Integer</option>' +
                    '</select></td>' +
                    '</tr>');
            }

            // Add options
            tableHelper.registerOptionsToTableModal();
        }

        // Launch the modal
        $('.modal-tableStructure').modal();
    }
};

// On ready stuff
$(document).ready(function() {

    // Init the tableHelper with the class selector from the table
    tableHelper.init('.people');

    // Build the table | May should move this into the init?
    tableHelper.buildTable();

    // Function to add one more row on the bottom
    $('.addTableRow').on('click', function() {
        tableHelper.addTableRow();
    });

    // Function to add one more row - but inside the modal table
    $('.addRowModal').on('click', function() {
        tableHelper.addTableRowModal('.modalTable');
    });

    // By clicking on "Edit table structure"
    $('.editTableStructure').on('click', function() {
        // Launch the modal for editing the table structure
        tableHelper.generateModal();
    });
});