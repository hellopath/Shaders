var DisplayUtil = (function() {

	function DisplayUtil() {
	}

	DisplayUtil.removeAllChildren = function(holder) {
		if (holder instanceof THREE.Object3D) {
			for (var i = 0, lgth = holder.children.length, child; i < lgth; ++i) {
				child = holder.children[i];

				if (child instanceof THREE.Mesh) {
					holder.remove(child);
					--i;
				}
			}
		}
	};

	DisplayUtil.arrayToShape = function(array) {
		var points = [];
		for (var i = 0, length = array.length; i < length; i = i + 2) {
			points.push(new THREE.Vector2(array[i], array[i+1]));
		}
		return new THREE.Shape(points);
	}

	DisplayUtil.generateTerrainHeight = function(width, height, max, iterations){
		var size = width * height, 
			data = new Float32Array( size ),
			perlin = new Math2.ImprovedNoise(), 
			quality = 1, z = Math.random() * max,
			i,
			j,
			x,
			y;
		for ( i = 0; i < size; i ++ ) {
			data[ i ] = 0;
		}
		for ( j = 0; j < iterations; j ++ ) {
			for ( i = 0; i < size; i ++ ) {
				x = i % width, y = ~~ ( i / width );
				data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
			}
			quality *= 5;
		}
		return data;
	}

	return DisplayUtil;
})();


