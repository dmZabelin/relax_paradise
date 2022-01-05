(() => {
// Global var
	const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
	
// Title H1 animated
	let textWrapper = document.querySelector(".offer__title");
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class=\"letter\">$&</span>");

	anime.timeline({loop: false})
	.add({
		targets: ".offer__title .letter",
		opacity: [0,1],
		easing: "easeInOutQuad",
		duration: 100,
		delay: (el, i) => 50 * (i+1)
	})
// *Smooth scrolling
	const anchors = document.querySelectorAll("a.scroll");

	for (let anchor of anchors) {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const blockID = anchor.getAttribute("href").substr(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
// Services tabs
	const tabsLink = document.querySelectorAll(".list-tabs__btn");
	const tabsContent = document.querySelectorAll(".services__tab-content");
	for(let tab of tabsLink) {
		tab.addEventListener("click", function() {
			document.querySelector("button.active").classList.remove("active");
			for(let item of tabsContent) {
				item.style.display = "none";
			}
			this.classList.add("active");
			let dataId = this.getAttribute("data-id");
			document.getElementById(dataId).style.display = "block";
		});
	}

	// Humburger and call menu
	const burger = document.querySelector("#burger");
	const menu = document.querySelector(".mobile-menu");
	const menuLink = document.querySelectorAll(".mobile-menu__item-link");

	function removeClasses() {
		burger.classList.remove("mh_active");
		menu.classList.remove("show");
		document.body.classList.remove("hidden");
	}

	burger.addEventListener("click", function(e) {
		e.preventDefault();
		this.classList.toggle("mh_active");
		menu.classList.toggle("show");
		if (window.matchMedia("(max-width: 577px)").matches) {
			document.body.classList.toggle("hidden");
		}
	});

	if (window.matchMedia("(min-width: 768px)").matches) {
		window.addEventListener("scroll", function() {
			burger.hidden = (window.scrollY < 900);
			if(burger.hasAttribute("hidden")) {
				removeClasses();
			}
		});
	}

	menuLink.forEach(item => {
		item.addEventListener("click", function(){
			removeClasses();
		});
	});

	// InputMask
	const inputMask = () => {
		const selector = document.querySelector("input[type=\"tel\"]");

	}

	//!* Popap-callback (Create, open, close, remove)
	const formAction = document.querySelector(".action__form");
	formValidate(formAction);

	const btnsPopapCall = document.querySelectorAll(".popap-call");
	const btnsPopapClose = document.querySelectorAll(".popap-close");
	const modal = document.querySelector(".modal");
	const modalContent = document.querySelector(".modal__content");

	const createPopapForm = (formTitle = "Обратный звонок") => {
		const form = document.createElement("form");
		const fieldset = document.createElement("fieldset");
		const legend = document.createElement("legend");
		const title = document.createElement("h3");
		const descr = document.createElement("p");
		const wrapper = document.createElement("div");
		const inputName = document.createElement("input");
		const inputTel = document.createElement("input");
		const button = document.createElement("button");
		const inputNameWrapper = document.createElement("span");
		const inputTelWrapper = document.createElement("span");

		form.classList.add("modal__form");
		descr.classList.add("form__descr");
		descr.textContent = "Заполните поля ниже и мы обязательно свяжемся с вами";
		title.classList.add("form__title");
		title.innerHTML = formTitle;
		legend.innerHTML = formTitle;
		wrapper.classList.add("form__wrapper");
		setAttributes(inputName, {"type": "text", "name": "name", "placeholder": "Как к вам обращаться?", "class": "form-control", "data-validate-field": "name"});
		setAttributes(inputTel, {"type": "tel", "name": "tel", "placeholder": "+380 (__) ___ __ __", "class": "form-control", "data-validate-field": "tel", "data-validate-rules": "phone"});
		form.setAttribute("action", "mailer.php");
		button.classList.add("btn", "form__btn", "btn-primary");
		button.textContent = "Отправить";

		inputNameWrapper.append(inputName);
		inputTelWrapper.append(inputTel);
		wrapper.append(inputNameWrapper, inputTelWrapper, button);
		fieldset.append(legend, descr, wrapper);
		form.append(title, fieldset);

		modalContent.append(form);

		function setAttributes(el, options) {
			Object.keys(options).forEach(function(attr) {
				el.setAttribute(attr, options[attr]);
			})
		}
		return form;
	}
	
	for( const btn of btnsPopapCall ) {
		btn.addEventListener("click", function() {
			document.body.classList.add("hidden");
			document.body.style.paddingRight = paddingOffset;
			modal.style.display = "flex";
			const title = btn.getAttribute("data-title");
			let form = createPopapForm(title);
			closePopap(form);
			formValidate(form);
		});
	}

	function closePopap(form) {
		for( const btn of btnsPopapClose ) {
			btn.addEventListener("click", deleteForm);
			function deleteForm () {
				modalContent.classList.add("zoomOutUp");
				setTimeout(() => {
					document.body.classList.remove("hidden");
					document.body.style.paddingRight = '0';
					modal.style.display = "none";
					modalContent.classList.remove("zoomOutUp");
					form.remove();
				}, 1200);
				btnsPopapClose.forEach(btn => {
					btn.removeEventListener("click", deleteForm);
				});
			};
		}
	}

	function formValidate (form) {
		let classForm = form.className;
		const selectorName = form.querySelector("input[type=\"text\"]");
		const selector = form.querySelector("input[type=\"tel\"]");
		const im = new Inputmask("+380 (99) 999 99 99");
		im.mask(selector);
		const url = form.getAttribute("action");

		new window.JustValidate("."+classForm, {
			rules: {
				tel: {
					required: true,
					function: () => {
						const phone = selector.inputmask.unmaskedvalue();
						return Number(phone) && phone.length === 9;
					}
				},
				name: {
					required: true,
					minLength: 1,
					maxLength: 20,
					function: () => {
						let regex = /^[a-zA-Zа-яА-ЯёЁ"][a-zA-Z-а-яА-ЯёЁ" ]+[a-zA-Zа-яА-ЯёЁ"]?$/;
						return regex.test(selectorName.value);
					}
				}
			},
			messages: {
				name: {
					required: "Все поля обязательны",
					minLength: "Мало букв в имени",
					maxLength: "Много букв в имени",
					function: "Введите верное имя"
				},
				tel: {
					required: "Все поля обязательны",
					function: "Введите верный номер"
				}
			},
			submitHandler: function (form, values, ajax) {
				ajax({
					url: url,
					method: "POST",
					data: values,
					async: true,
					callback: () => {
						form.innerHTML = "<p class=\"form__tnx\"><span>Сообщение отправлено!</p>";
					}
				});
			},
			invalidFormCallback: function (errors) {
				console.log(errors);
			},
		});
	}

// Popap-info
	const btnPopapInfoArr = document.querySelectorAll("button.slider-main__btn");
	const modalInfo = document.querySelector(".modal-info");
	const modalInfoContent = document.querySelector(".modal-info__content");

	for( let btnPopap of btnPopapInfoArr) {
		btnPopap.addEventListener("click", function() {
			document.body.classList.add("hidden");
			document.body.style.paddingRight = paddingOffset;
			modalInfo.style.display = "flex";
			let data = this.getAttribute("data-info");
			const content = document.getElementById(data);
			content.style.display = "block";
			closeModal(content);
		})
	}

	function closeModal(elem) {
		for( const btn of btnsPopapClose ) {
			btn.addEventListener("click", closePopap);
			function closePopap () {
				modalInfoContent.classList.add("fadeOutUpBig");
				setTimeout(() => {
					document.body.classList.remove("hidden");
					document.body.style.paddingRight = '0';
					modalInfo.style.display = "none";
					elem.style.display = "none";
					modalInfoContent.classList.remove("fadeOutUpBig");
				}, 500);
			};
		}
	}
	// Offer type text description
	let options = {
		stringsElement: "#typed-strings",
		typeSpeed: 50,
		backSpeed: 10,
		backDelay: 5000,
		startDelay: 0,
		showCursor : false,
		loop: true,
	};
	new Typed("#typed", options);
})();
