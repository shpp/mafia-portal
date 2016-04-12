var Request = {
    object: {},
    searchQuery: '',
    toObject: function() {
        this.object = {};
        var pairs = location.search.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            this.object[pair[0]] = pair[1];
        }

        return this.object;
    },
    prepareSearchQuery: function() {
        this.searchQuery = location.pathname + '?' + jQuery.param(this.object);
    },
    updateSearchQuery: function() {
        history.pushState(null, null, this.searchQuery);
    }
};