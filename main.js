$(function() {
	console.log("asd");
	// 查询类别选择
	! function() {
		if (document.body.onclick !== undefined) {
			$('#dropdown-menu > a').on('click', function(event) {
				alert("click");
			})
		} else if (document.body.ontouchstart !== undefined) {
			$('#dropdown-menu > a').on('touchstart', function(event) {
				alert("touch");
			})
		}
	}()
});