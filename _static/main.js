$(document).ready(function () {
  var table = $('table.datatable').DataTable({
    paging: false,
    ordering: true,
    order: [[0, 'asc']],
    searching: true,
    responsive: true,
    autoWidth: false
  });

  // Tag filter event handler
  $('#tag-filter').on('change', function () {
    var selectedTag = $(this).val();
    if (selectedTag) {
      table.column(2).search(selectedTag).draw();
    } else {
      table.column(2).search('').draw();
    }
  });

  // Tag filter event handler
  $('#tag-list li').on('click', function () {
    var selectedTag = $(this).data('value');
    if (selectedTag) {
      table.column(2).search(selectedTag).draw();
    } else {
      table.column(2).search('').draw();
    }

    // Optionally, highlight the selected item
    $('#tag-list li').removeClass('selected');
    $(this).addClass('selected');
  });
});
