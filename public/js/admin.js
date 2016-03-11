$(function() {
  $('.del').click(function() {
    var id = $(this).data("id");

    $.ajax({
        type: 'DELETE',
        url: '/admin/list?id=' + id
      })
      .done(function(data) {
        if (data.result) {
          $('.item-id-' + id).remove();
        } else {
          alert(data.msg);
        }
      });

    // $.post("../admin/remove", {
    //   id: id
    // }, function(data) {
    //   if (data.result) {
    //     $('.item-id-' + id).remove();
    //   } else {
    //     alert(data.msg);
    //   }
    // });

  });
});
