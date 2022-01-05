
	// *Google map
	function initMap() {
		let element = document.getElementById('map');
		let options;

		if (window.matchMedia("(max-width: 577px)").matches) {
			options = {
				zoom: 17,
				center: { lat:46.467131823200035, lng:30.74669520807203 }
			};
		} else {
			options = {
				zoom: 17,
				center: { lat:46.46683348906257, lng:30.744161853893615 }
			};
		}
		new google.maps.Marker( {
			position:  { lat:46.467131823200035, lng:30.74669520807203 },
			map: new google.maps.Map(element, options),
			animation: google.maps.Animation.BOUNCE,
			icon: '../dist/assets/img/marker.png'
		});
	}