document.addEventListener("scroll", () => {
    const nav = document.querySelector(".navPadding"); // استهداف الـ nav
    const navBar = document.querySelector(".navBar"); // استهداف الـ navBar
    const navBarHeight = navBar.offsetHeight; // ارتفاع الـ navBar بالكامل
    const list = document.querySelector(".listWidth"); // استهداف العنصر list

    // ارتفاع الـ nav
    const navHeight = nav.offsetHeight;

    // تحديث متغير الـ CSS --nav-height
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);

    // تحقق إذا كان المستخدم تجاوز الـ navBar
    if (window.scrollY > navBarHeight) {
        // تحريك الـ navBar
        navBar.style.transform = `translateY(-${navHeight}px)`;
        list.classList.add("mHeight"); // أضف الكلاس لزيادة الطول
    } else {
        // إعادة الـ navBar لمكانه الطبيعي
        navBar.style.transform = "translateY(0)";
        list.classList.remove("mHeight"); // أزل الكلاس عند العودة لأعلى
    }
});

// استهداف العناصر
const listIcon = document.querySelector(".listIcon");
const menuIcon = document.querySelector(".fa-bars-staggered");
const list = document.querySelector(".listWidth");
const closeIcon = document.createElement("i");
const body = document.body;

// إعداد أيقونة الإغلاق
closeIcon.classList.add("fa-solid", "fa-x", "transition");
closeIcon.style.cursor = "pointer";
closeIcon.style.display = "none";
listIcon.appendChild(closeIcon);

listIcon.classList.remove("listShadow");

// فتح القائمة
listIcon.addEventListener("click", (e) => {
    // console.log("تم الضغط على أيقونة القائمة");
    if (!list.classList.contains("open")) {
        list.classList.add("open");
        list.style.display = "block";
        menuIcon.style.display = "none";
        closeIcon.style.display = "flex";
        body.classList.add("no-scroll");
        listIcon.classList.add("listShadow");
        // console.log("القائمة مفتوحة");
        e.stopPropagation(); // منع الحدث من الانتقال إلى الأعلى
    }
});

// غلق القائمة عند الضغط على أيقونة X
closeIcon.addEventListener("click", (e) => {
    // console.log("تم الضغط على أيقونة الإغلاق");
    if (list.classList.contains("open")) {
        list.classList.remove("open");
        list.style.display = "none";
        menuIcon.style.display = "flex";
        closeIcon.style.display = "none";
        body.classList.remove("no-scroll");
        listIcon.classList.remove("listShadow");
        e.stopPropagation(); // منع الحدث من الانتقال إلى الأعلى
    }
});

listIcon.addEventListener("click", (e) => {
    if (!list.classList.contains("open")) {
        list.classList.add("open");
        list.style.display = "block";
        menuIcon.style.display = "none";
        closeIcon.style.display = "flex";
        body.classList.add("no-scroll");
        listIcon.classList.add("listShadow");

        // عندما يتم فتح القائمة، نضيف حدث الضغط على ::before لإغلاق القائمة
        listIcon.style.pointerEvents = "auto"; // التأكد من أن pointer-events مفعلة

        // منع التمرير عند فتح القائمة
        e.stopPropagation();
    }
});

// إغلاق القائمة عند الضغط على الـ ::before
document.addEventListener("click", (e) => {
    // التحقق إذا كان الضغط على الـ listIcon الذي يحتوي على listShadow
    if (listIcon.classList.contains("listShadow") && !list.contains(e.target) && !listIcon.contains(e.target)) {
        // أغلق القائمة مباشرة عندما يتم الضغط على الـ ::before
        list.classList.remove("open");
        list.style.display = "none";
        menuIcon.style.display = "flex";
        closeIcon.style.display = "none";
        body.classList.remove("no-scroll");
        listIcon.classList.remove("listShadow");
    }
});



function updateDynamicHeights() {
    const viewportHeight = window.innerHeight; // الارتفاع المتاح في الشاشة
    const nav = document.querySelector(".navBar"); // استهداف الـ nav
    const navHeight = nav ? nav.offsetHeight : 0; // ارتفاع الـ nav (بار الكروم إذا كان ظاهرًا)

    // فحص إذا كان شريط البحث في الكروم ظاهرًا (الارتفاع يقل عندما يظهر شريط البحث)
    const hasAddressBar = (window.outerHeight - window.innerHeight) > 100;

    // إذا كان شريط البحث ظاهرًا، نخصم ارتفاعه
    const effectiveHeight = hasAddressBar ? viewportHeight - 56 : viewportHeight; // تعديل للارتفاع بناءً على حالة ظهور شريط البحث

    // تحديث قيم CSS ديناميكيًا
    document.documentElement.style.setProperty('--nav-height', `${navHeight}px`); // تعيين ارتفاع الـ nav
    document.documentElement.style.setProperty('--effective-height', `${effectiveHeight}px`); // تعيين الارتفاع الفعلي
}

// تحديث القيم عند تغيير الحجم أو التمرير
window.addEventListener('resize', updateDynamicHeights);
window.addEventListener('orientationchange', updateDynamicHeights);

// استدعاء أولي لتطبيق القيم
updateDynamicHeights();

