// Trim 함수 ##################################################
// Ex) str = "    테 스트   ".trim(); => str = "테 스트";
String.prototype.trim = function() {
	return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,'');
}

// 문자열 공백제거 함수 ##################################################
// Ex) str = "    테 스   트   ".stripspace(); => str = "테스트";
String.prototype.stripspace = function() {
	return this.replace(/ /g, '');
}

// 전체 문자열 바꾸기 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.replaceAll = function(a, b) {
	var s = this;
	if (navigator.userAgent.toLowerCase().indexOf('msie') != -1)
		return s.replace(new RegExp(a, 'gi'), b);
	else
		return s.split(a).join(b);
}

// 숫자변환 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.toNumeric = function() {
	var s = this;
	s = (typeof s == 'undefined' ? '0' : s.toString().replace(/,/g, ''));
	if (isNaN(s) || s.replace(/ /g, '') == '') return 0;
	else	return parseFloat(s);
}

//문자 채우기 함수 ##################################################
//ex) str = "9".pad('0', 2); => str = "90";
//			str = "9".pad('0', -2); => str = "09";
String.prototype.pad = function(n, size) {
	var ns = n.repeat(Math.abs(size));
	if (size > 0) {
		return (this + ns).slice(0, size);
	} else if (size < 0) {
		return (ns + this).slice(size);
	} else {
		return s;
	}
}





// 키 관련 함수 ##################################################
function blockKey(e) {
	var e = window.event || e;
	if (window.event) {
		e.returnValue = false;
	}
	else {
		if (e.which != 8) e.preventDefault(); // 8 : Back Space
	}
}

function blockEnter(e) {
	var e = window.event || e;
	if (window.event) {
		if (e.keyCode == 13) e.returnValue = false;
	}
	else {
		if (e.which == 13) e.preventDefault();
	}
}

function blockNotNumber(e) {
	var e = window.event || e;
	if (window.event) {
		if (e.keyCode < 48 || e.keyCode > 57) e.returnValue = false;
	}
	else {
		if (e.which != 8 && (e.which < 48 || e.which > 57)) e.preventDefault(); // 8 : Back Space
	}
}

function onEnter(e, callBack) {
	var e = window.event || e;
	var keyCode = (window.event ? e.keyCode : e.which);
	if (keyCode == 13) {
		if (window.event) {
			e.returnValue = false;
		}
		else {
			e.preventDefault();
		}
		callBack();
	}
}





// 팝업 ##################################################
function openPopup(theURL, winName, width, height, remFeatures) {
	var features = '';
	if (typeof winName == 'undefined') winName = '';
	if (typeof width != 'undefined') features += (features ? ',' : '')+'width='+width;
	if (typeof height != 'undefined') features += (features ? ',' : '')+'height='+height;
	if (typeof remFeatures != 'undefined') features += (features ? ',' : '')+remFeatures;
	if (features.indexOf('status') < 0) features += ',status=yes';
	if (features.indexOf('scrollbars') < 0) features += ',scrollbars=no';

	var popup = window.open(theURL, winName, features);
	popup.focus();

	return popup;
}

// 팝업 - 팝업창 화면중앙 오픈 ##################################################
function openPopupCenter(theURL, winName, width, height, remFeatures) {
	var left = (screen.width/2) - (width/2);
	var top = (screen.availHeight/2) - (height/2);
	var features = 'left='+left+',top='+top+',width='+width+',height='+height;
	if (typeof winName == 'undefined') winName = '';
	if (typeof remFeatures != 'undefined') features += ','+remFeatures;
	if (features.indexOf('status') < 0) features += ',status=yes';
	if (features.indexOf('scrollbars') < 0) features += ',scrollbars=no';

	var popup = window.open(theURL, winName, features);
	popup.focus();

	return popup;
}

// 페이지 이동 ##################################################
function gotoUrl(url) {
	if (url.stripspace() != '') {
		location.href = url;
	}
}





// 공백 확인 ##################################################
function isEmpty(obj) {
	return (obj.value.stripspace()=='' ? true : false);
}

// 배열 확인 ##################################################
function isArray(obj) {
	try {
		return /^\s?function Array()/.test(obj.constructor.toString());
	}
	catch(e) {
		return false;
	}
}

// 숫자 확인 ##################################################
function isNumeric(value) {
	var compare = value;
	if (isNaN(compare) || value.replace(/ /g, '') == '') compare = '0';
	return (value==compare ? true : false);
}

// 날자 확인 ################################################## checkDate
function isDate(value){
	var arr = value.split('-');
	if (arr.length != 3 ) return false;

	var year = arr[0];
	var month = arr[1];
	var day = arr[2];
	var date = new Date(year+'/'+month+'/'+day+' 8:0:0');

	if (isNaN(date)) return false;

	return ((date.getFullYear().toString() == year) && (date.getMonth() == parseInt(month, 10) - 1) && (date.getDate() == parseInt(day, 10)) ? true : false);
}

// 영문 포함 확인 ##################################################
function isExistEng(value) {
	return /[a-zA-Z]/.test(value);
}

// 숫자 포함 확인 ##################################################
function isExistNum(value) {
	return /[0-9]/.test(value);
}

// 한글 포함 확인 ##################################################
function isExistKor(value) {
	return /[ㄱ-ㅎ가-힣]/.test(value);
}





// 체크박스 전체선택 ##################################################
function checkCbAll(cbList, checked) {
	if (cbList) {
		if (typeof(cbList.length) == 'undefined') {
			if (!cbList.disabled) cbList.checked = checked;
		}
		else {
			for (var i=0; i<cbList.length; i++) {
				if (cbList[i].type.toUpperCase() == 'CHECKBOX') {
					if (cbList[i].value.stripspace() != '' && !cbList[i].disabled) {
						cbList[i].checked = checked;
					}
				}
			}
		}
	}
}

// Radio(CheckBox) 설정값 가져오기 ##################################################
function getRadio(obj) {
	var value = '';

	if (obj) {
		if (typeof(obj.length) == 'undefined') {
			if (obj.checked) {
				value = obj.value;
			}
		}
		else {
			for (var i=0; i<obj.length; i++) {
				if (obj[i].checked) {
					value = obj[i].value;
					break;
				}
			}
		}
	}
	return value;
}

// Radio 설정하기 ##################################################
function setRadio(obj, value) {
	if (obj) {
		if (typeof(obj.length) == 'undefined') {
			if (obj.value == value) {
				obj.checked = true;
			}
		}
		else {
			for (var i=0; i<obj.length; i++) {
				if (obj[i].value == value) {
					obj[i].checked = true;
					break;
				}
			}
		}
	}
}

// Radio Disabled 설정하기 ##################################################
function setRadioDisabled(obj, value, disabled) {
	if (obj) {
		if (typeof(obj.length) == 'undefined') {
			if (obj.value == value) {
				obj.disabled = disabled;
			}
		}
		else {
			for (var i=0; i<obj.length; i++) {
				if (obj[i].value == value) {
					obj[i].disabled = disabled;
					break;
				}
			}
		}
	}
}

// Form Disabled 전체 설정하기 ##################################################
function setRadioDisabledAll(obj, disabled) {
	var i;

	if (obj) {
		if (typeof(obj.length) == 'undefined') {
			obj.disabled = disabled;
		}
		else {
			for (var i=0; i<obj.length; i++) {
				obj[i].disabled = disabled;
			}
		}
	}
}

// Select 설정값 가져오기 ##################################################
function getSelect(obj) {
	var value = '';
	var idx = obj.selectedIndex;

	if (idx >= 0){
		value = obj.options[idx].value;
	}

	return value;
}

// Select Index 가져오기 ##################################################
function getSelectIndex(obj, value) {
	var index = -1;

	var nodes = obj.childNodes;
	for (var i=0; i<nodes.length; i++) {
		if (nodes[i].value.toString() == value.toString()) {
			index = i;
			break;
		}
	}

	return index;
}

// Select Optgroup 추가 ##################################################
function addSelectGroup(obj, text) {
	var optgroup = document.createElement('optgroup');
	optgroup.label = text;
	obj.appendChild(optgroup);
	return optgroup;
}

// Select Option 추가 ##################################################
function addSelectOption(obj, text, value) {
	if (typeof (value) == 'undefined') value = '';

	var option = document.createElement('option');
	option.innerHTML = text;
	option.value = value;
	obj.appendChild(option);
	return option;
}

// Select Option 삭제 ##################################################
function removeSelectOption(obj, index) {
	obj.remove(index);
}

// Select Option 전체삭제 ##################################################
function removeSelectOptionAll(obj) {
	var nodes = obj.childNodes;
	for (var i=nodes.length-1; i>=0; i--) {
		obj.removeChild(nodes[i]);
	}
}

// Input 추가 ##################################################
function addInput(f, type, name, value) {
	var input = document.createElement('input');
	input.type = type;
	input.name = name;
	input.value = value;
	f.appendChild(input);
}

// Input 제거 ##################################################
function removeInput(f, type, name, target) {
	var index = 0;
	if (typeof (target) == 'undefined') target = -1;

	var inputs = f.getElementsByTagName('input');
	if (inputs) {
		for (var i=inputs.length-1; i>=0; i--) {
			if (inputs[i].type == type && inputs[i].name == name) ++index;
		}
		for (var i=inputs.length-1; i>=0; i--) {
			if (inputs[i].type == type && inputs[i].name == name) {
				--index;
				if (target < 0) f.removeChild(inputs[i]);
				else if (index == target) {
					f.removeChild(inputs[i]);
					break;
				}
			}
		}
	}
}

// 입력 문자길이 확인후 다음항목으로 포커스 옮기기 ##################################################
function goNextFocus(obj, limit, next) {
	if (obj.value.stripspace().length >= limit){
		next.focus();
	}
}





// 영문/숫자 혼용 확인 ##################################################
function checkMixEngNum(value) {
	return (isExistEng(value) && isExistNum(value) ? true : false);
}

// 특수문자 확인 ##################################################
function checkSpecialChar(value) {
	var schr = '`~!@#$%^&*_+=|\\[]{}:;,<.>/?\'"';
	for (var i=0; i<schr.length; i++) {
		if (value.indexOf(schr.substr(i, 1)) != -1) return true;
	}
	return false;
}

// 텍스트 길이 확인 (일반) ##################################################
function checkTextLen(obj, limit) {
	if (obj.value.length > limit){
		alert('1~'+limit+'자까지 입력이 가능합니다.');
		obj.value = obj.value.substring(0, limit);
		obj.focus();
		return false;
	}
	return true;
}

// 텍스트 길이 확인 (Byte) ##################################################
function checkTextLenByte(obj, limit) {
	var bytes = 0;
	var value = obj.value;

	for (var i=0; i<value.length; i++) {
		++bytes;
		if ((value.charCodeAt(i) < 0) || (value.charCodeAt(i) > 127)) ++bytes;

		if (bytes > limit) {
			alert('1~'+(limit / 2)+'자의 한글, 또는 2~'+limit+'자의 영문, 숫자, 문장기호로 입력이 가능합니다.');
			obj.value = value.substring(0, i);
			obj.focus();
			return false;
		}
	}
	return true;
}

// 텍스트 Byte 길이 가져오기 ##################################################
function getTextByte(value) {
	var bytes = 0;

	for (var i=0; i<value.length; i++) {
		if (escape(value.charAt(i)).length >= 4) {
			bytes += 2;
		}
		else if (escape(value.charAt(i)) != '%0D') {
			++bytes;
		}
	}

	return bytes;
}

// 한글 분리 ##################################################
function splitKor(chr) {
	var kors = new Array();
	kors[0] = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'; // 19 초성
	kors[1] = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'; //21 중성
	kors[2] = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'; //28 종성

	var result = new Array();
	
	for (var i=0; i<chr.length; i++) {
		var ca = chr.charCodeAt(i);
		var hc1 = ca - 0xAC00;
		var hc2 = hc1 % 588;

		var chc = new Array();
		chc[0] = parseInt(hc1 / 588); // 초
		chc[1] = parseInt(hc2 / 28); // 중
		chc[2] = hc2 % 28; // 종

		for (var s=0; s<chc.length; s++) {
			result.push(kors[s].charAt(chc[s]).replace(/ /g, ''));
		}
	}
	return result;
}

// 한글 조사 판별 ##################################################
function getPostChar(value, p1, p2) { // 은/는, 이/가, 을/를, 과/와
	if (!value) return;
	var a = splitKor(value[value.length-1]);
	return (a[a.length-1].trim()?p1:p2);
}

//파일명 확인 ##################################################
function checkFileName(obj) {
	var result = false;

	if (obj.value.stripspace() != '') {
		var fidx = obj.value.lastIndexOf('\\')+1;
		var filename = obj.value.substr(fidx, obj.value.length);
		result = isExistKor(filename);
	}

	if (result) {
		alert('파일명을 반드시 영문 또는 숫자로 해주세요.');
		obj.focus();
		return false;
	}
	return true;
}

// 파일 확장자 ##################################################
function getFileExt(value) {
	if (value != '') {
		var fidx = value.lastIndexOf('\\')+1;
		var filename = value.substr(fidx, value.length);
		var eidx = filename.lastIndexOf('.')+1;

		return filename.substr(eidx, filename.length);
	}
}

// 파일확장자 확인 ##################################################
function checkFileExt(obj, exts, errMsg) {
	var arrExt = exts.toLowerCase().split(',');
	var result = false;

	if (obj.value.stripspace() != '') {
		var ext = getFileExt(obj.value).toLowerCase();

		for (var i=0; i<arrExt.length; i++) {
			if (arrExt[i].trim() == ext) result = true;
		}
	}

	if (!result) {
		alert(errMsg);
		obj.focus();
		return false;
	}
	return true;
}



// 내림 ##################################################
// num: 대상 숫자, p: 대상 자리수
function setFloor(num, p) {
	if (!p) p = 0;
	return Math.floor(num * Math.pow(10, p)) / Math.pow(10, p);
}

// 반올림 ##################################################
// num: 대상 숫자, p: 대상 자리수
function setRound(num, p) {
	if (!p) p = 0;
	return Math.round(num * Math.pow(10, p)) / Math.pow(10, p);
}

// 올림 ##################################################
// num: 대상 숫자, p: 대상 자리수
function setCeil(num, p) {
	if (!p) p = 0;
	return Math.ceil(num * Math.pow(10, p)) / Math.pow(10, p);
}

// 숫자 문자열에서 문자열 제거 ##################################################
function stripCharFromNum(value, dec) {
	var result = '';
	for (var i=0; i<value.length; i++) {
		var chr = value.charAt(i);
		switch (chr) {
			case '-':
				if (i == 0) result += '-';
			break;
			case '.':
				if (dec && result.indexOf('.') < 0) result += '.';
			break;
			default:
				if ('1234567890'.indexOf(chr) > -1) result += chr;
		}
	}
	return result;
}

// 콤마(,) 제거 ##################################################
function stripComma(num) {
    return num.replace(/,/g, '');
}

// 숫자 3자리수마다 콤마(,) 찍기 ##################################################
function formatComma(num, p) {
	if (!p) p = 0;  //소숫점 이하 자리수
	var re = /(-?\d+)(\d{3}[,.])/;

	var nums = num.toString().toNumeric().toString().split('.');
	nums[0] += '.';

    while (re.test(nums[0])) {
        nums[0] = nums[0].replace(re, '$1,$2');
    }

	if (nums.length > 1) {
		if (nums[1].length > p) {
			nums[1] = nums[1].substr(0, p);
		}
		return nums.join('');
	}
	else return nums[0].split('.')[0];
}

// 강제 소수점 이하 0채우기 ##################################################
// num: 대상 숫자, p: 출력을 원하는 소수점자리수
function setRoundZero(num, p) {
	var nums = stripComma(num.toString()).split('.');

	if (nums.length <= 1) {
		num = nums[0]+'.';
		for (var i=0; i<p; i++) {
			num += '0';
		}
	}
	else num = setRound(num, p);

	return num;
}

// 소수점 이하 자리수 확인 ##################################################
// num: 대상 숫자, p: 희망 소수점 이하자리수
function checkRound(num, p) {
	var nums = num.toString().toNumeric().toString().split('.');
	if (nums.length > 1 && nums[1].length > p) return false;
	else return true;
}

// 숫자 문자열에서 '0' 시작문자 제거 ##################################################
function removePreZero(num) {
	if (num == '0') return num;

	for (var i=0; i<num.length; i++) {
		if (num.substr(i,1) != '0') break;
	}

	return num.substr(i, num.length-i);
}

// 숫자(INT)입력 확인 ##################################################
function onlyInt(obj) {
	if (obj.disabled) return false;

	var num = obj.value.stripspace();
	if (num == '') return false;

	if (!/^-?[\d]+$/.test(num)) {
		num = stripCharFromNum(num, 0);
		obj.blur(); obj.focus();
	}
	num = stripCharFromNum(num, 0);

	obj.value = num;
}

// 숫자(FLOAT)입력 확인 ##################################################
function onlyFloat(obj, p) {
	if (obj.disabled) return false;
	if (!p) p = 0;  //소숫점 이하 자리수

	var num = obj.value.stripspace();
	if (num == '') return false;

	if (!/^-?[\d\.]+$/.test(num)) {
		num = stripCharFromNum(num, 1);
		obj.blur(); obj.focus();
	}
	var nums = stripCharFromNum(num, 1).split('.');

	obj.value = (nums.length>1 ? nums[0]+'.'+(p ? nums[1].substr(0, p) : nums[1]) : nums[0]);
}

// 통화형태로 변환 ##################################################
function toCurrency(obj) {
	if (obj.disabled) return false;

	var num = obj.value.stripspace();
	if (num == '') return false;

	if (!/^-?[\d]+$/.test(stripComma(num))) {
		num = stripCharFromNum(num, 0);
		obj.blur(); obj.focus();
	}

	obj.value = formatComma(removePreZero(stripCharFromNum(stripComma(num), 0)));
}

//월 마지막 일자 구하기 ##################################################
function getLastDay(year, month) {
	return ((new Date(parseInt(year, 10), parseInt(month, 10), 0)).getDate() || 0);
}



//다음 우편번호 ##################################################
//param(postid:우편번호 ID,addrid:주소ID , detailAddrid:상세주소ID)
function openZipcode(postid,addrid,detailAddrid) {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var fullAddr = ''; // 최종 주소 변수
          var extraAddr = ''; // 조합형 주소 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              fullAddr = data.roadAddress;

          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              fullAddr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
          if(data.userSelectedType === 'R'){
              //법정동명이 있을 경우 추가한다.
              if(data.bname !== ''){
                  extraAddr += data.bname;
              }
              // 건물명이 있을 경우 추가한다.
              if(data.buildingName !== ''){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
              fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
          }

          //상세주소 초기화
          document.getElementById(detailAddrid).value="";

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById(postid).value = data.zonecode; //5자리 새우편번호 사용
          document.getElementById(addrid).value = fullAddr;

          // 커서를 상세주소 필드로 이동한다.
          document.getElementById(detailAddrid).focus();
      }
  }).open();
}




function closeDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
	document.getElementById('layer').style.display = 'none';
}
 
function openZipcode_iframe(postid,addrid,detailAddrid) {
	var element_layer = document.getElementById('layer');
    new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = data.address; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수

            // 기본 주소가 도로명 타입일때 조합한다.
            if(data.addressType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }


          //상세주소 초기화
            document.getElementById(detailAddrid).value="";
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById(postid).value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById(addrid).value = fullAddr;
            //document.getElementById(detailAddrid).value = data.addressEnglish;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById(detailAddrid).focus();
            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_layer.style.display = 'none';
        },
        width : '100%',
        height : '100%'
    }).embed(element_layer);

    // iframe을 넣은 element를 보이게 한다.
    element_layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    initLayerPosition2();
}

// 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
// resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
// 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
function initLayerPosition2(){
    var width = 320; //우편번호서비스가 들어갈 element의 width
    var height = 400; //우편번호서비스가 들어갈 element의 height
    var borderWidth = 5; //샘플에서 사용하는 border의 두께
	var scrollTop = document.body.scrollTop; //by gaessamzie

    // 위에서 선언한 값들을 실제 element에 넣는다.
    document.getElementById('layer').style.width = width + 'px';
    document.getElementById('layer').style.height = height + 'px';
    document.getElementById('layer').style.border = borderWidth + 'px solid';
    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
    document.getElementById('layer').style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
    //document.getElementById('layer').style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';

	//document.getElementById('layer').style.top = scrollTop + (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';  //by gaessamzie
    document.getElementById('layer').style.top = scrollTop + 'px';  //by gaessamzie
}


//먼가가 존재하는지 여부
//existy(null) => false
//existy(undefined) => false
//existy({}.notHere) => false
//existy(function(){})()) => false
//existy(0) => true
//existy(false) => true
function existy(x) {
	return x != null;
}

//참인지 여부
//truthy(false) => false
//truthy(undefined) => false
//truthy(0) => true
//truthy('') => true
function truthy(x) {
	return (x !== false) && existy(x);
}

//관심리스트
function addWish(gno) {
	var f = document.Frm;

	$.laybox.ajax({
		type: "POST",
		dataType: "json",
		url: "../../mypage/wish_act_ajax.do",
		data: { mode: "ADD", gno: gno},
		error: function (request, status, error) {
			alert(request.responseText)
		},
		success: function (data) {
			if (data.result.code == 9) {
				gotoLogin();
				return false;
			}
			else if (data.result.code > 0) {
				alert(data.result.msg);
				return false;
			}
		}
	}, {
		type: 'ajax',
		source: '/mw/common/ajax/wish_ajax.do',
		borderSize: 0,
		canvasPadding: 0,
		canvasBgColor: null,
		close: false
	});
}	

function addCart(pgno,pstock) {
	if ( arguments.length == 4 ) {
		var ea = arguments[2];		// 수량
		var buyqty = arguments[3];	// 주문단위
		actCart("ADD",pgno,pstock,ea,buyqty);
	} else {
		actCart("ADD",pgno,pstock);
	}
}

function actCart(mode,pgno,pstock) {
	var f = document.Frm;
	var gno = pgno;
	var stock = Number(pstock);
	var totalEa = 1;
	var buyQty = 1;
	if ( arguments.length == 5 ) {
		totalEa = Number(arguments[3]);	// 수량
		buyQty = Number(arguments[4]);	// 주문단위
	}

	if (stock == 0) {
		alert("품절된 상품입니다.");
		return false;
	}
	else if (stock > -1 && stock < totalEa) { // -1 : 무제한
		alert("준비된 재고수량보다 많이 신청하였습니다.(1)\n남은 수량 : "+stock+" 개");
		return false;
	}

	if ( buyQty > 1 ) {
		if ( totalEa % buyQty > 0 ) {
			alert ( "수량입력은 주문단위로 가능합니다.");
			$(this).closest(".etcBox").find("input").focus();
			return false;
		}
	}
	
	var params = "mode="+mode+"&gno="+gno;

	params += "&cea="+totalEa;

	$.laybox.ajax({
		type: "POST",
		dataType: "json",
		url: "../order/cart_act_ajax.do",
		data: params,
		error: function (request, status, error) {
			alert(request.responseText)
		},
		success: function (data) {
			if (data.result.code > 0) {
				alert(data.result.msg);
				return false;
			}
			if (mode == "DIRECT") {
				location.href = "/mw/order/order.do?direct=1";
				return false;
			}
			//alert("장바구니에 상품이 담겼습니다");
			
		}
	}, {
		type: 'ajax',
		source: '../common/ajax/cart_ajax.do',
		borderSize: 0,
		canvasPadding: 0,
		canvasBgColor: null,
		close: false
	});
}
