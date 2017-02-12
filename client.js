window.onload = function(){
	
	app = {};
	
	
	
	var 
	input_tagName   = document.querySelector('#input_tagName'),
	input_innerHtml = document.querySelector('#input_innerHtml'),
	editElementCont = document.querySelector('#editElementCont'),
	layout          = document.querySelector('#layout');
	
	
	function editElement(elem){
		editElementCont.style.display = 'block';
		
		editElementCont.querySelector('.close').onclick = function(){
			editElementCont.style.display = 'none';
		}
		
		
		
		editElementCont.querySelector('.innerHtml').value = elem.innerHTML;
		editElementCont.querySelector('.src').value       = elem.src;
		
		
		editElementCont.querySelector('.sumbit_innerHtml').onclick = function(){
			elem.innerHTML = editElementCont.querySelector('.innerHtml').value;
		}
		editElementCont.querySelector('.sumbit_src').onclick = function(){
			elem.src = editElementCont.querySelector('.src').value;
		}
		
	}
	
	function createElement(targetElem, tagName, innerHtml){
		
		var tokId = 'id'+Date.now();
		
		var 
		newElem           = document.createElement(tagName);
		newElem.innerHTML = innerHtml;
		targetElem.appendChild(newElem);
		
		newElem.setAttribute('data-labelMaster', tokId);
		
		
		var xxx1 = document.createElement('div');
		var xxx2 = document.createElement('div');
		xxx1.setAttribute('data-labelSlave', tokId);
		xxx1.addEventListener('click', function(){
			var masterElem = document.querySelector('[data-labelMaster='+this.attributes['data-labelslave'].value+']');
			editElement(masterElem);
		}, false);
		xxx2.innerHTML = tagName;
		xxx1.appendChild(xxx2);
		document.querySelector('#labels').appendChild(xxx1);
		updateDataLabels();
	}
	
	function goCreate(){
		var 
		targetElem = layout,
		tagName    = input_tagName.value,
		innerHtml  = input_innerHtml.value;
		
		createElement(targetElem, tagName, innerHtml);
	}
	
	
	input_tagName.onkeydown = function(e){
		
		if(e.keyCode == 13){
			
			goCreate();
			
		}
	}
	
	input_innerHtml.onkeydown = function(e){
		
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
			if(b.tagName != 'INPUT' && /*cmdDown*/ b.parentElement.attributes['data-labelslave']){
				console.log('children');
				b = document.querySelector('[data-labelMaster='+b.parentElement.attributes['data-labelslave'].value+']');
				b.appendChild(a);
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
			//console.log('itself');
		}
		
		updateDataLabels();
		
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
	
	
	
	
	
	
	
	
}



function updateDataLabels(){
	var xxx = document.querySelectorAll('[data-labelSlave]');
	for(let i=0; i<xxx.length; i++){
		xxx[i].style.left = document.querySelector('[data-labelMaster='+xxx[i].attributes['data-labelslave'].value+']').offsetLeft+'px';
		xxx[i].style.top  = document.querySelector('[data-labelMaster='+xxx[i].attributes['data-labelslave'].value+']').offsetTop +'px';
	}
}