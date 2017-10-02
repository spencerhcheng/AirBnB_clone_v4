$(function () {
  const amenStor = {};
  $('LI INPUT[type=checkbox').change(function (event) {
    let amenId = $(this).attr('data-id');
    let amenName = $(this).attr('data-name');
    if (this.checked) {
      amenStor[amenId] = amenName;
    } else {
      delete amenStor[amenId];
    }
    let amenStr = '';
    let first_flag = 0;
    let first_key = '';
    for (key in amenStor) {
      if (first_flag === 0) {
        first_key = key;
        amenStr += amenStor[key];
        first_flag = 1;
      }	else if (first_flag === 1) {
        if (key === first_key) {
          continue;
        }
        amenStr += ', ' + amenStor[key];
      }
    }
    if (amenStr.length > 30) {
      amenStr = amenStr.slice(0, 29);
      amenStr += '...';
    }
    $('.amenities h4').text(amenStr);
  });
});

$(function () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      $('#api_status').addClass('available');
    },
    error: function (e) {
      $('#api_status').removeClass('available');
    }
  });
});
