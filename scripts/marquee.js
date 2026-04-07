document.addEventListener("DOMContentLoaded", function () {
	const projectsGrid = document.querySelector("#projects .projects-grid");
	if (!projectsGrid) return;

	const cards = Array.from(projectsGrid.querySelectorAll(".project-card"));
	if (cards.length === 0) return;

	projectsGrid.classList.add("project-marquee");

	const track = document.createElement("div");
	track.className = "project-marquee-track";

	const group = document.createElement("div");
	group.className = "project-marquee-group";

	cards.forEach((card) => {
		group.appendChild(card);
	});

	const clone = group.cloneNode(true);

	track.appendChild(group);
	track.appendChild(clone);

	projectsGrid.innerHTML = "";
	projectsGrid.appendChild(track);

	function applyMarqueeSize() {
		const groupWidth = group.scrollWidth;
		if (!groupWidth) return;

		const pxPerSecond = window.innerWidth <= 768 ? 40 : 55;
		const duration = groupWidth / pxPerSecond;

		track.style.setProperty("--group-width", `${groupWidth}px`);
		track.style.setProperty("--marquee-duration", `${duration}s`);
	}

	applyMarqueeSize();

	let resizeTimer = null;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(applyMarqueeSize, 150);
	});

	projectsGrid.addEventListener("mouseenter", function () {
		track.style.animationPlayState = "paused";
	});

	projectsGrid.addEventListener("mouseleave", function () {
		track.style.animationPlayState = "running";
	});
});