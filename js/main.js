/* global */
let bgMode = "yes";

/* local storge */
/* -color storage */
let ColorStorage = localStorage.getItem("color-option");
if (ColorStorage !== null) {
	document.documentElement.style.setProperty("--color-one", ColorStorage);
	document.querySelectorAll(".colors-list li").forEach((element) => {
		element.classList.remove("active");
		if (element.dataset.color === ColorStorage) {
			element.classList.add("active");
		}
	});
}
/* -bg storage */
let BgStorageOption = localStorage.getItem("BgStorageOption");
if (BgStorageOption !== null) {
	if (BgStorageOption === "yes") {
		bgMode = "yes";
	} else {
		bgMode = "no";
	}

	document.querySelectorAll(".background-option span").forEach((element) => {
		element.classList.remove("active");
	});
	if (BgStorageOption === "yes") {
		document
			.querySelector(".background-option .yes")
			.classList.add("active");
	} else {
		document
			.querySelector(".background-option .no")
			.classList.add("active");
	}
}
/* bullets */
let bulletsOption = localStorage.getItem("bullets-options");
if (bulletsOption !== null) {
	document.querySelectorAll(".bullets-option span").forEach((span) => {
		span.classList.remove("active");
	});
	if (bulletsOption === "block") {
		document.querySelector(".nav-bullets").style.display = "block";
		document
			.querySelector(".bullets-option span.yes")
			.classList.add("active");
	} else {
		document.querySelector(".nav-bullets").style.display = "none";
		document
			.querySelector(".bullets-option span.no")
			.classList.add("active");
	}
}

/* Setting */
let ToggleSetting = document.querySelector(".toggle-setting .fa-gear");
let Setting = document.querySelector(".setting");

ToggleSetting.onclick = function () {
	this.classList.toggle("fa-spin");
	Setting.classList.toggle("open");
};

/* site colores option*/
const ColorLi = document.querySelectorAll(".colors-list li");
ColorLi.forEach((li) => {
	li.addEventListener("click", (e) => {
		/* change color var el "--color-one"  */
		document.documentElement.style.setProperty(
			"--color-one",
			e.target.dataset.color
		);
		/* add al color to local storge */
		localStorage.setItem("color-option", e.target.dataset.color);
		/* remove all active class from all children */
		e.target.parentElement
			.querySelectorAll(".active")
			.forEach((element) => {
				element.classList.remove("active");
			});
		/* add active class to the clic el */
		e.target.classList.add("active");
	});
});

/* site background option */
let headerAreaBg = document.querySelector(".header-area");
let bgArray = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"];
let bgInterval;

const BGoption = document.querySelectorAll(".background-option span");

function randomImgs() {
	if (bgMode == "yes") {
		bgInterval = setInterval(() => {
			let randomNum = Math.floor(Math.random() * bgArray.length);
			headerAreaBg.style.backgroundImage =
				'url("img/' + bgArray[randomNum] + '")';
		}, 4000);
	}
}
randomImgs();
BGoption.forEach((span) => {
	span.addEventListener("click", (e) => {
		handelactive(e);
		/* if click on yes start and if no stop */
		if (e.target.dataset.bg === "yes") {
			bgMode = "yes";
			randomImgs();
			localStorage.setItem("BgStorageOption", "yes");
		} else {
			bgMode = "no";
			clearInterval(bgInterval);
			localStorage.setItem("BgStorageOption", "no");
		}
	});
});
/* bullets options */
let mySpanBullets = document.querySelectorAll(".bullets-option span");
let myBullets = document.querySelector(".nav-bullets");

mySpanBullets.forEach((span) => {
	span.addEventListener("click", (e) => {
		if (span.dataset.dis === "yes") {
			myBullets.style.display = "block";
			localStorage.setItem("bullets-options", "block");
		} else {
			myBullets.style.display = "none";
			localStorage.setItem("bullets-options", "none");
		}
		handelactive(e);
	});
});

/* Skils area */
let ourskils = document.querySelector(".skils-area");
window.onscroll = () => {
	let SkilsOfTop = ourskils.offsetTop;
	let SkilsHight = ourskils.offsetHeight;
	let WindowH = this.innerHeight;
	let WindowScrolTop = this.pageYOffset;

	if (WindowScrolTop > SkilsOfTop + SkilsHight - WindowH - 300) {
		let AllSkils = document.querySelectorAll(".skil-box .s-progress span");
		AllSkils.forEach((skill) => {
			skill.style.width = skill.dataset.progres;
		});
	}
};

/* gallary area */
let MyGallary = document.querySelectorAll(".gallary-area .images-box img");
MyGallary.forEach((img) => {
	img.addEventListener("click", (e) => {
		/* create over lay and append in body */
		let overlay = document.createElement("div");
		overlay.className = "popup-overlay";
		document.body.appendChild(overlay);

		/* create box for img on overlay */
		let popupBox = document.createElement("div");
		popupBox.className = "popup-box";

		if (img.alt !== null) {
			let AltElm = document.createElement("h3");
			let AltText = document.createTextNode(img.alt);

			AltElm.appendChild(AltText);
			popupBox.appendChild(AltElm);
		}

		/* img */
		let popupImg = document.createElement("img");
		popupImg.src = img.src;

		/* add img to popo box */
		popupBox.appendChild(popupImg);
		document.body.appendChild(popupBox);

		/* close btn */
		let CloseBtn = document.createElement("span");
		let CloseText = document.createTextNode("x");

		CloseBtn.appendChild(CloseText);

		CloseBtn.className = "close-btn";

		popupBox.appendChild(CloseBtn);
	});
});
document.addEventListener("click", (e) => {
	if (e.target.className == "close-btn") {
		document.querySelector(".popup-box").remove();
		document.querySelector(".popup-overlay").remove();
	}
});

/* nav Bullets */
const allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach((bullet) => {
	bullet.addEventListener("click", (e) => {
		document.querySelector(e.target.dataset.section).scrollIntoView({
			behavior: "smooth",
		});
	});
});
/* nav link */
const allLinks = document.querySelectorAll(".links a");

allLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		document.querySelector(e.target.dataset.section).scrollIntoView({
			behavior: "smooth",
		});
	});
});

/* functions */
function handelactive(e) {
	/* remove all active class from all children */
	e.target.parentElement.querySelectorAll(".active").forEach((element) => {
		element.classList.remove("active");
	});
	/* add active class to the clic el */
	e.target.classList.add("active");
}
