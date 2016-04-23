$(document).ready(function () {
    loadDataByAjax(location.pathname);

    $('#search').change(function(){
        var searchPhrase = $(this).val().trim();

        Request.toObject();
        if (searchPhrase) {
            Request.object.search = searchPhrase;
        } else {
            Request.deleteSearchParam('search');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
    });

    $('.title-sort').click(function(){
        var self = $(this);

        var order = '';
        if (self.data('order') == 'asc') {
            order = 'desc';
            self.children().text('arrow_drop_up');
        } else {
            order = 'asc';
            self.children().text('arrow_drop_down');
        }
        self.data('order', order);

        Request.toObject();
        Request.object.orderBy =  self.data('order-by');
        Request.object.order = order;

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
    });

    $('#hide_guest').change(function () {
        var self = $(this);

        Request.toObject();
        if (self.is(':checked')) {
            Request.object.hide_guest = 1;
        } else {
            Request.deleteSearchParam('hide_guest');
        }

        Request.prepareSearchQuery();
        Request.updateSearchQuery();
        loadDataByAjax(Request.searchQuery);
    });


});
