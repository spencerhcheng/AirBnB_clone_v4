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
    let amenStr = "";
    let first_flag = 0;
    let first_key = "";
    for (key in amenStor) {
	if (first_flag === 0) {
		first_key = key;
		amenStr += amenStor[key];
		first_flag = 1;
	}
	else if (first_flag === 1) {
		if (key === first_key) {
			continue;
		}
		amenStr += ", " + amenStor[key];
	}
    }
	if (amenStr.length > 30) {
		amenStr = amenStr.slice(0, 27);
		amenStr += "...";
	}
	console.log(amenStr);

//    $.each(amenStor, function (key, value) {
      $('.amenities h4').text(amenStr);
  });
});
