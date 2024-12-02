document.addEventListener("scroll", () => {
    const nav = document.querySelector(".navPadding"); // استهداف الـ nav
    const navBar = document.querySelector(".navBar"); // استهداف الـ navBar
    const navBarHeight = navBar.offsetHeight; // ارتفاع الـ navBar بالكامل

    if (window.scrollY > navBarHeight) {
        navBar.style.transform = `translateY(-${nav.offsetHeight}px)`; // حرك navBar بمقدار ارتفاع nav
    } else {
        navBar.style.transform = "translateY(0)"; // أعده لمكانه الطبيعي
    }
});