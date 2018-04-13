document.addEventListener('DOMContentLoaded', function(){
	const HexInput = document.getElementById("HexInput");
	const AllCards = document.getElementById("AllCards");
	// localStorage.clear();
	for (var i = 0; i < localStorage.length; i++) { 
		key = localStorage.key(i);
		favorites = localStorage.getItem(key);
		add_html(key,favorites,localStorage.length-i);
		// console.log(key + " = " + favorites);
	}

});

function add_click(){
	try {
		src = HexInput.value;
		if((!/\W/g.test(src))&&(src.length==3 || src.length==6)){
			src="#"+src;
			if(localStorage.getItem(src)==null)
			{
				var favorites = "";
				localStorage.setItem(src, favorites);
				add_html(src, favorites,0.5);
				HexInput.value="";
			}
			else
				alert("Цвет уже добавлен");
		}
		else
			alert('Введите 3 или 6 HEX символов');
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Превышен лимит');
		}
	}
}

function add_html(key,favorites,i){
	html ="";
	html+='<div id="'+key+'" class="cards__item cards__item_animate ';
	if(favorites){
		html+='cards__item_favorites';
	}
	html+='"><div style="background:'+key+';" class="cards__item__color"></div>'+key+
	'<span onclick="star_click(this)" class="cards__item__star"></span>\
	<span onclick="del_click(this)" class="cards__item__rubbish"></span></div>';
	AllCards.insertAdjacentHTML('afterBegin',html);
	setTimeout(function() {document.getElementById(key).classList.remove('cards__item_animate');}, 500*i);
}

function star_click(el){
	localStorage[el.parentNode.id]= !localStorage.getItem(el.parentNode.id) ? "true" : "";
	el.parentNode.classList.toggle('cards__item_favorites');
}

function del_click(el){
	if(confirm("Вы точно хотите удалить "+el.parentNode.id+"?")){
		localStorage.removeItem(el.parentNode.id);
		el.parentNode.classList.add('cards__item_animate','cards__item_delete');
		setTimeout(function() {AllCards.removeChild(el.parentNode);}, 1000);
	}
}
