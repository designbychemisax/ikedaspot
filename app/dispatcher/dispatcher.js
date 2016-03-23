var Dispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var dispatcher = assign(new Dispatcher(), {
    handleViewAction : function (action) {
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    },
    handleAPIAction : function (action) {
        this.dispatch({
            source : 'API_ACTION',
            action : action
        });
    }
});

module.exports = dispatcher;