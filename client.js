window.onload = function(){
	
	app = {};
	
	var xType = ['tagName', 'id', 'className', 'innerHTML', 'value', 'src', 'href'];
	
	
	var 
	input_tagName   = document.querySelector('#input_tagName'),
	editElementCont = document.querySelector('#editElementCont'),
	layout          = document.querySelector('#layout');
	
	
	
	
	for(let i=0; i<xType.length; i++){
		if(xType[i] == 'innerHTML'){
			editElementCont.innerHTML +=
			'<div>'+
				'<textarea class="'+xType[i]+'" placeholder="'+xType[i]+'"></textarea>'+
				'<button class="sumbit_'+xType[i]+'">'+xType[i]+'</button>'+
			'</div>';
		}else{
			editElementCont.innerHTML +=
			'<div>'+
				'<input class="'+xType[i]+'" type="text" placeholder="'+xType[i]+'">'+
				'<button class="sumbit_'+xType[i]+'" '+((i==0)?'disabled':'')+'>'+xType[i]+'</button>'+
			'</div>';
		}
	}
	
	editElementCont.innerHTML +=
	'<div>'+
		'<button class="close">close</button>'+
		'<button class="delete">delete</button>'+
	'</div>';
	
	
	
	
	
	
	
	
	
	
	
	function editElement(slaveElem){
		var masterElem = document.querySelector('[data-labelmaster='+slaveElem.attributes['data-labelslave'].value+']');
		
		editElementCont.style.display = 'block';
		
		editElementCont.querySelector('.close').onclick = function(){
			editElementCont.style.display = 'none';
		}
		
		editElementCont.querySelector('.delete').onclick = function(){
			let array = masterElem.querySelectorAll('[data-labelmaster]');
			//console.log(array);
			for(let i=0; i<array.length; i++){
				masterChildValue = array[i].attributes['data-labelmaster'].value;
				slaveChildValue  = document.querySelector('[data-labelslave='+masterChildValue+']');
				slaveChildValue.remove();
			}
			
			slaveElem.remove();
			masterElem.remove();
		}
		
		
		
		for(let i=0; i<xType.length; i++){
			editElementCont.querySelector('.'+xType[i]).value = masterElem[xType[i]];
			
			editElementCont.querySelector('.sumbit_'+xType[i]).onclick = function(){
				masterElem[xType[i]] = editElementCont.querySelector('.'+xType[i]).value;
				//updateDataLabels();
			}
		}
		
	}
	
	function createElement(targetElem, tagName){
		
		var tokId = 'id'+Date.now();
		
		var 
		newElem = document.createElement(tagName);
		if(/^(ul|ol)$/i.test(tagName)){
			newElem.innerHTML = 'XXX';
		}
		else if(/^(li|div|h1|h2|h3|h4|h5|h6|p|b|strong|span|i|small|article|aside|footer|header|main|nav|section)$/i.test(tagName)){
			newElem.innerHTML = 'XXX';
		}
		else if(/^(a)$/i.test(tagName)){
			newElem.href      = 'XXX';
			newElem.innerHTML = 'XXX';
		}
		newElem.setAttribute('data-labelmaster', tokId);
		targetElem.appendChild(newElem);
		
		
		var xxx1 = document.createElement('div');
		var xxx2 = document.createElement('div');
		xxx1.setAttribute('data-labelslave', tokId);
		xxx1.addEventListener('click', function(){
			editElement(this);
		}, false);
		xxx2.innerHTML = newElem.tagName;
		xxx1.appendChild(xxx2);
		document.querySelector('#labels').appendChild(xxx1);
		//updateDataLabels();
	}
	
	function goCreate(){
		var 
		targetElem = layout,
		tagName    = input_tagName.value;
		
		createElement(targetElem, tagName);
	}
	
	
	input_tagName.onkeydown = function(e){
		
		if(e.keyCode == 13){
			
			goCreate();
			
		}
	}
	
	
	
	
	
	
	
	var 
	targetEnter = false,
	targetLeave = false,
	targetCurr  = false,
	targetDest  = false,
	cmdDown     = false;
	
	
	document.onmouseover = function(e){
		targetEnter = e.target;
		targetEnter.style.boxShadow = '0 0 0 1px #009fff';
	}
	
	document.onmouseout = function(e){
		targetLeave = e.target;
		targetLeave.style.boxShadow = '';
	}
	
	document.onmousedown = function(e){
		targetCurr = e.target;
		//targetCurr.style.boxShadow = '0 0 0 1px black';
	}
	
	document.onmouseup = function(e){
		targetDest = e.target;
		//targetDest.style.boxShadow = '0 0 0 1px green';
		
		
		
		
		/*var generateQuerySelector = function(el) {
		      if (el.tagName.toLowerCase() == "html")
		          return "HTML";
		      var str = el.tagName;
		      str += (el.id != "") ? "#" + el.id : "";
		      if (el.className) {
		          var classes = el.className.split(/\s/);
		          for (var i = 0; i < classes.length; i++) {
		              str += "." + classes[i]
		          }
		      }
		      return generateQuerySelector(el.parentNode) + " > " + str;
		}*/
		//var a = generateQuerySelector(targetCurr);
		//var b = generateQuerySelector(targetDest);
		var a = targetCurr;
		var b = targetDest;
		
		//console.log(a, '- - - - - -', b);
		
		
		if(a != b){
			if(!a.parentElement.attributes['data-labelslave']){
				
				if(/*cmdDown*/ b.parentElement.attributes['data-labelslave']){
					var bMaster = document.querySelector('[data-labelmaster='+b.parentElement.attributes['data-labelslave'].value+']');
					if(!/^input$/i.test(bMaster.tagName)){
						console.log('children');
						b = bMaster;
						b.appendChild(a);
					}else{
						console.log('input');
					}
				}
				else if(b == document.documentElement){
					console.log('html');
				}
				else if(b == document.body){
					console.log('body');
				}
				else if(b.id == 'layout'){
					console.log('layout');
				}
				else{
					b.parentNode.insertBefore(a, b);
				}
				
				
			}else{
				console.log('slave');
			}
		}else{
			//console.log('itself');
		}
		
		//updateDataLabels();
		
	}
	
	document.ondragstart = function(e){
		e.preventDefault();
		//console.log('drag');
	}
	
	document.onkeydown = function(e){
		if(e.keyCode == 91){
			cmdDown = true;
		}
	}
	
	document.onkeyup = function(e){
		if(e.keyCode == 91){
			cmdDown = false;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
// select the target node
var target = document.getElementById('layout');
 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    //console.log(mutation.type);
    updateDataLabels()
  });    
});
 
// configuration of the observer:
var config = {
	attributes: true,
	childList: true,
	characterData: true,
	subtree: true
};
 
// pass in the target node, as well as the observer options
observer.observe(target, config);
 
// later, you can stop observing
//observer.disconnect();
	
	
	
	
	
	
	
}



function updateDataLabels(){
	var xxx = document.querySelectorAll('[data-labelslave]');
	for(let i=0; i<xxx.length; i++){
		xxx[i].style.left = document.querySelector('[data-labelmaster='+xxx[i].attributes['data-labelslave'].value+']').offsetLeft+'px';
		xxx[i].style.top  = document.querySelector('[data-labelmaster='+xxx[i].attributes['data-labelslave'].value+']').offsetTop +'px';
	}
}


function outputHTML(){
	var html = document.querySelector('#layout').innerHTML;
	console.log(html.replace(/ data-labelmaster="id[0-9]+"/g, ''));
}



















