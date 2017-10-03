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
    let firstFlag = 0;
    let firstKey = '';
    for (let key in amenStor) {
      if (firstFlag === 0) {
        firstKey = key;
        amenStr += amenStor[key];
        firstFlag = 1;
      } else if (firstFlag === 1) {
        if (key === firstKey) {
          continue;
        }
        amenStr += ', ' + amenStor[key];
      }
    }
    $('.amenities h4').text(amenStr);
  });

  searchPlaces();

  statusAPI();

  $('section button').click(function () {
    const amenIDs = [];
    for (let item in amenStor) {
      amenIDs.push(item);
      searchPlaces(amenIDs);
    }
  });
});

// search places
function searchPlaces () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      for (let obj of data) {
        $('.places').append('<article><div class="title"><h2>' + obj['name'] + '</h2> <div class="price_by_night">' + obj['price_by_night'] + '</div></div> <div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria hidden="true"></i><br />' + obj['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria hidden="true"></i><br />' + obj['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + obj['number_bathrooms'] + ' Bathroom</div></div><div class="description"><br />' + obj['description'] + '</div></article>');
      }
    },
    error: function (e) {
      console.log('Failed response');
    }
  });
}

// refactor of check API status for Task 3
function statusAPI () {
  $.getJSON('http://localhost:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
}
