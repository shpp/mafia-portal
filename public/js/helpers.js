var Request = {
    object: {},
    searchQuery: '',
    toObject: function() {
        this.object = {};

        if (!location.search) {
            return;
        }

        var self = this;
        var pairs = location.search.substring(1).split('&');
        pairs.forEach(function(element){
            var pair = element.split('=');
            self.object[pair[0]] = pair[1];
        });

        return this.object;
    },
    prepareSearchQuery: function() {
        this.searchQuery = jQuery.isEmptyObject(this.object)
                            ? location.pathname
                            : location.pathname + '?' + jQuery.param(this.object);
    },
    updateSearchQuery: function() {
        history.pushState(null, null, this.searchQuery);
    },
    deleteSearchParam: function (param) {
        delete this.object[param];
    }
};