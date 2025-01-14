$(document).ready(function () {
  var table = $('table.datatable').DataTable({
    paging: false,
    ordering: true,
    order: [[0, 'asc']],
    searching: true,
    responsive: true,
    autoWidth: false,
    columns: [{ width: '5%' }, { width: '55%' }, { width: '40%' }]
  });


  // Reset the select element to its default value on page load
  $('#label-list').val('');

  $('#label-list').on('change', function () {
    var selectedValue = $(this).val();
    if (selectedValue) {
      table.column(2).search(selectedValue).draw();
    } else {
      table.column(2).search('').draw();
    }
  });

});

