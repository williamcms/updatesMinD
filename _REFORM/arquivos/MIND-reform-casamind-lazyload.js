$(document).ready(function(){
	//LazyLoad
	var lazyLoad = (lazyLoad = () =>{
		$('.lazy').Lazy({
			scrollDirection: 'both',
			effect: 'fadeIn',
			visibleOnly: true,
			onError: function(e){
				console.log('error loading ' + e.data('src'));
			},
			afterLoad: function(e){
				e.addClass('lazyComplete');
			}
		});
	});
	var lazyOnPageLoad = (function(){
		lazyLoad();
	})();
	//Então espera alguns eventos para carregar imagens subsequentes
	//Maioria surgindo por meio de chamadas do ajax
	$(document).on('DOMNodeInserted scroll click swipe', function(){
		lazyLoad();
	});
});