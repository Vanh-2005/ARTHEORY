import React, { useEffect } from "react";

function Home() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Config cho showcase slider (1 slide)
            const showcaseSlider = document.querySelector('#showcase .init-swiper');
            if (showcaseSlider) {
                new window.Swiper(showcaseSlider, {
                    loop: true,
                    speed: 800,
                    slidesPerView: 1,
                    effect: "fade",
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            }

            if (typeof window !== 'undefined' && window.Isotope) {
                // Đợi DOM load xong
                setTimeout(() => {
                    const iso = new window.Isotope('.isotope-container', {
                        itemSelector: '.portfolio-item',
                        layoutMode: 'masonry',
                        masonry: {
                            columnWidth: '.portfolio-item'
                        }
                    });

                    // Xử lý filter portfolio
                    const filterBtns = document.querySelectorAll('.portfolio-filters li');
                    filterBtns.forEach(btn => {
                        btn.addEventListener('click', () => {
                            // Xóa active class từ tất cả buttons
                            filterBtns.forEach(el => el.classList.remove('filter-active'));

                            // Thêm active class vào button được click
                            btn.classList.add('filter-active');

                            // Lấy giá trị filter
                            const filterValue = btn.getAttribute('data-filter');

                            // Filter items
                            iso.arrange({
                                filter: filterValue
                            });
                        });
                    });

                    // Clean up function
                    return () => {
                        filterBtns.forEach(btn => {
                            btn.removeEventListener('click');
                        });
                        if (iso) iso.destroy();
                    };
                }, 500);
            }
            // Config cho testimonial slider (2 slides)
            const testimonialSlider = document.querySelector('.testimonial-section .init-swiper');
            if (testimonialSlider) {
                new window.Swiper(testimonialSlider, {
                    loop: true,
                    speed: 800,
                    slidesPerView: 2,
                    spaceBetween: 20,
                    grabCursor: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: '.slider-next',
                        prevEl: '.slider-prev'
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 1
                        },
                        768: {
                            slidesPerView: 2
                        }
                    }
                });
            }
        }
        // ...existing code...

        // Xử lý FAQ 
        // Thay thế phần xử lý FAQ hiện tại bằng đoạn code sau trong useEffect
        const handleFaqClick = (event) => {
            const item = event.currentTarget;
            const content = item.querySelector('.faq-content');
            const toggle = item.querySelector('.faq-toggle');

            // Toggle active state
            item.classList.toggle('faq-active');
            toggle.classList.toggle('active');

            // Toggle content height
            if (item.classList.contains('faq-active')) {
                content.style.display = 'block';
                content.style.maxHeight = 'none';

                const actualHeight = content.scrollHeight;

                requestAnimationFrame(() => {
                    content.style.maxHeight = actualHeight + "px";
                });
            } else {
                content.style.maxHeight = "0px";
                content.addEventListener('transitionend', function handler() {
                    if (!item.classList.contains('faq-active')) {
                        content.style.display = 'none';
                    }
                    content.removeEventListener('transitionend', handler);
                });
            }
        };

        // Thêm event listeners cho FAQ items
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', handleFaqClick);
        });

        // Cleanup function
        return () => {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.removeEventListener('click', handleFaqClick);
            });
        };

        // Khởi tạo Isotope cho portfolio
        if (typeof window !== 'undefined' && window.Isotope) {
            const iso = new window.Isotope('.isotope-container', {
                itemSelector: '.isotope-item',
                layoutMode: 'masonry'
            });

            // Xử lý filter portfolio
            const filterBtns = document.querySelectorAll('.portfolio-filters li');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filterValue = btn.getAttribute('data-filter');
                    iso.arrange({ filter: filterValue });
                    filterBtns.forEach(el => el.classList.remove('filter-active'));
                    btn.classList.add('filter-active');
                });
            });
        }

    }, []);

    // Empty dependency array means this runs once on mount
    return (
        <>
            <main className="main">
                <section id="hero" className="hero section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 content-col" data-aos="fade-up">
                                <div className="content">
                                    <div className="agency-name">
                                        <h5>NGHỆ THUẬT THỊ GIÁC</h5>
                                    </div>
                                    <div className="main-heading">
                                        <h1>SÁNG TẠO<br />KHÔNG GIỚI HẠN</h1>
                                    </div>
                                    <div className="divider" />
                                    <div className="description">
                                        <p>Chào mừng đến với bộ sưu tập nghệ thuật số độc đáo, nơi hội tụ những tác phẩm đỉnh cao từ những nghệ sĩ tài năng trên khắp thế giới.
                                            Trang web này là không gian trưng bày trực tuyến, giới thiệu đa dạng các phong cách nghệ thuật số từ digital painting, concept art,
                                            đến character design và matte painting. Khám phá hành trình sáng tạo và cảm nhận vẻ đẹp của nghệ thuật kỹ thuật số hiện đại.</p>
                                    </div>
                                    <div className="cta-button">
                                        <a href="#services" className="btn">
                                            <span>KHÁM PHÁ KỸ THUẬT</span>
                                            <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5" data-aos="zoom-out">
                                <div className="visual-content">
                                    <div className="fluid-shape">
                                        <img src="assets/img/abstract/Ps.png" alt="Hình dạng trừu tượng" className="fluid-img" />
                                    </div>
                                    <div className="stats-card">
                                        <div className="stats-number">
                                            <h2>2K+</h2>
                                        </div>
                                        <div className="stats-label">
                                            <p>Tác phẩm nghệ thuật số chất lượng</p>
                                        </div>
                                        <div className="stats-arrow">
                                            <a href="#portfolio"><i className="bi bi-arrow-up-right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" className="about section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Giới thiệu</h2>
                        <div><span>Khám phá</span> <span className="description-title">Về DIGITALART</span></div>
                    </div>
                    <div className="container">
                        <div className="row gx-5 align-items-center">
                            <div className="col-lg-6" data-aos="fade-right" data-aos-delay={200}>
                                <div className="about-image position-relative">
                                    <img src="assets/img/about/WLOP1.jpg" className="img-fluid rounded-4 shadow-sm" alt="Tác phẩm nghệ thuật số" loading="lazy" />
                                    <div className="experience-badge">
                                        <span className="years">19+</span>
                                        <span className="text">Công Cụ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-4 mt-lg-0" data-aos="fade-left" data-aos-delay={300}>
                                <div className="about-content">
                                    <h2>TRANH KỸ THUẬT SỐ LÀ GÌ</h2>
                                    <p className="lead">
                                        Tranh kỹ thuật số (Digital Art) là hình thức nghệ thuật sử dụng công nghệ số và phần mềm chuyên dụng để sáng tạo.
                                        Khác với hội họa truyền thống, nghệ sĩ số vẽ trực tiếp trên máy tính hoặc tablet với các công cụ như bút vẽ điện tử,
                                        cho phép chỉnh sửa linh hoạt và tạo hiệu ứng đặc biệt mà không thể thực hiện được bằng phương pháp truyền thống.
                                    </p>
                                    <div className="row g-4 mt-3">
                                        <div className="col-md-6" data-aos="zoom-in" data-aos-delay={400}>
                                            <div className="feature-item">
                                                <i className="bi bi-palette-fill" />
                                                <h5>Tùy Biến Linh Hoạt</h5>
                                                <p>Dễ dàng điều chỉnh màu sắc, kích thước, và bố cục. Có thể thử nghiệm nhiều phong cách và hiệu ứng khác nhau trên cùng một tác phẩm.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6" data-aos="zoom-in" data-aos-delay={450}>
                                            <div className="feature-item">
                                                <i className="bi bi-brush-fill" />
                                                <h5>Công Cụ Chuyên Nghiệp</h5>
                                                <p>Hỗ trợ nhiều tính năng cao cấp như layer, blend modes, và brushes tùy chỉnh, giúp tạo ra các tác phẩm chất lượng cao.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#portfolio" className="btn btn-primary mt-4">Xem Bộ Sưu Tập</a>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-section mt-5 pt-5" data-aos="fade-up" data-aos-delay={100}>
                            <div className="row">
                                <div className="col-lg-4" data-aos="fade-right" data-aos-delay={200}>
                                    <div className="testimonial-intro">
                                        <h3>Khơi Dậy Sáng Tạo</h3>
                                        <p>Khám phá các ý tưởng nghệ thuật số độc đáo, từ những thế giới viễn tưởng đầy mê hoặc đến những khung
                                            cảnh hiện đại sống động, được tạo nên bởi vô vàn ý tưởng.</p>
                                        <div className="swiper-nav-buttons mt-4">
                                            <button className="slider-prev"><i className="bi bi-arrow-left" /></button>
                                            <button className="slider-next"><i className="bi bi-arrow-right" /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8" data-aos="fade-left" data-aos-delay={300}>
                                    <div className="testimonial-slider swiper init-swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="testimonial-item">
                                                    <div className="inspiration-icon mb-3">
                                                        <i className="bi bi-buildings" />
                                                    </div>
                                                    <h4>Thành Phố Viễn Tưởng</h4>
                                                    <p>Tái hiện những đô thị tương lai với kiến trúc độc đáo, ánh sáng neon rực rỡ, và không gian số
                                                        sống động, mang đậm phong cách Cyberpunk.</p>
                                                    <div className="concept-tags mt-4">
                                                        <span className="tag">Cyberpunk</span>
                                                        <span className="tag">Futuristic Art</span>
                                                        <span className="tag">Digital Painting</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="testimonial-item">
                                                    <div className="inspiration-icon mb-3">
                                                        <i className="bi bi-cpu" />
                                                    </div>
                                                    <h4>Công Nghệ Tương Lai</h4>
                                                    <p>Khám phá sự giao thoa giữa con người và trí tuệ nhân tạo qua các thiết kế nhân vật robot tinh
                                                        xảo và không gian số hiện đại.</p>
                                                    <div className="concept-tags mt-4">
                                                        <span className="tag">AI Art</span>
                                                        <span className="tag">Cybernetic Design</span>
                                                        <span className="tag">Tech Aesthetic</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="testimonial-item">
                                                    <div className="inspiration-icon mb-3">
                                                        <i className="bi bi-stars" />
                                                    </div>
                                                    <h4>Vũ Trụ Kỳ Bí</h4>
                                                    <p>Chinh phục không gian với các tác phẩm số khắc họa hành tinh lạ, trạm không gian, và những nền
                                                        văn minh ngoài hành tinh đầy mê hoặc.</p>
                                                    <div className="concept-tags mt-4">
                                                        <span className="tag">Space Art</span>
                                                        <span className="tag">Cosmic Design</span>
                                                        <span className="tag">Sci-Fi Illustration</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="testimonial-item">
                                                    <div className="inspiration-icon mb-3">
                                                        <i className="bi bi-globe" />
                                                    </div>
                                                    <h4>Thế Giới Số</h4>
                                                    <p>Hòa mình vào không gian số, nơi thực tại và ảo ảnh hòa quyện, được thể hiện qua các tác phẩm
                                                        nghệ thuật kỹ thuật số đầy sáng tạo.</p>
                                                    <div className="concept-tags mt-4">
                                                        <span className="tag">Metaverse Art</span>
                                                        <span className="tag">Virtual Reality</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="services" className="services section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Quy Trình Sáng Tạo</h2>
                        <div><span>Từ</span> <span className="description-title">Ý tưởng đến nghệ thuật hoàn chỉnh</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="service-header">
                            <div className="row align-items-center">
                                <div className="col-lg-8 col-md-12">
                                    <div className="service-intro">
                                        <h2 className="service-heading">
                                            <div>Kiến tạo</div>
                                            <div><span>Nghệ thuật chuyên nghiệp</span></div>
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="service-summary">
                                        <p>Chúng tôi cung cấp quy trình sáng tạo chuyên nghiệp, từ ý tưởng ban đầu đến tác phẩm nghệ thuật số
                                            hoàn chỉnh, đảm bảo đáp ứng mọi yêu cầu của khách hàng.</p>
                                        <a href="services.html" className="service-btn">
                                            Tìm hiểu thêm
                                            <i className="bi bi-arrow-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-lightbulb" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Khơi nguồn <span>ý tưởng</span>
                                        </a>
                                    </h3>
                                    <p>Trao đổi chi tiết với khách hàng để phát triển ý tưởng sáng tạo, xác định phong cách và mục tiêu của
                                        tác phẩm nghệ thuật số.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-pencil-square" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Phác thảo <span>sơ bộ</span>
                                        </a>
                                    </h3>
                                    <p>Tạo bản phác thảo kỹ thuật số ban đầu, định hình bố cục và cấu trúc tổng thể của tác phẩm nghệ thuật
                                        số.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-palette" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Tô màu <span>và ánh sáng</span>
                                        </a>
                                    </h3>
                                    <p>Áp dụng bảng màu phù hợp và kỹ thuật ánh sáng số để tạo chiều sâu, cảm xúc và sức sống cho tác phẩm.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-brush" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Tinh chỉnh <span>chi tiết</span>
                                        </a>
                                    </h3>
                                    <p>Thêm họa tiết, kết cấu và các chi tiết tinh xảo để nâng cao tính thẩm mỹ và độ chân thực của tác phẩm
                                        số.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-magic" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Hiệu ứng <span>nâng cao</span>
                                        </a>
                                    </h3>
                                    <p>Ứng dụng các hiệu ứng kỹ thuật số như motion blur, particle effects để tạo điểm nhấn và sức hút cho tác
                                        phẩm.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="service-card position-relative z-1">
                                    <div className="service-icon">
                                        <i className="bi bi-check-circle" />
                                    </div>
                                    <a href="service-details.html" className="card-action d-flex align-items-center justify-content-center rounded-circle">
                                        <i className="bi bi-arrow-up-right" />
                                    </a>
                                    <h3>
                                        <a href="service-details.html">
                                            Hoàn thiện <span>tác phẩm</span>
                                        </a>
                                    </h3>
                                    <p>Kiểm tra kỹ lưỡng, tinh chỉnh cuối cùng và xuất file chất lượng cao ở định dạng phù hợp với yêu cầu của
                                        khách hàng.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="steps" className="steps section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Các Giai Đoạn Sáng Tạo</h2>
                        <div><span>Hành trình</span> <span className="description-title">Tạo nên nghệ thuật số</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="steps-wrapper">
                            <div className="step-item" data-aos="fade-right" data-aos-delay={200}>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <i className="bi bi-chat-square-text" />
                                    </div>
                                    <div className="step-info">
                                        <span className="step-number">Giai đoạn 01</span>
                                        <h3>Thảo luận ý tưởng</h3>
                                        <p>Trao đổi với khách hàng để hiểu rõ ý tưởng, phong cách nghệ thuật và mục tiêu sử dụng, đảm bảo định
                                            hướng sáng tạo chính xác.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="step-item" data-aos="fade-left" data-aos-delay={300}>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <i className="bi bi-pencil-square" />
                                    </div>
                                    <div className="step-info">
                                        <span className="step-number">Giai đoạn 02</span>
                                        <h3>Phác thảo bố cục</h3>
                                        <p>Sử dụng các công cụ như Photoshop hoặc Procreate để tạo bản phác thảo số, định hình bố cục và tỷ lệ
                                            của tác phẩm.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="step-item" data-aos="fade-right" data-aos-delay={400}>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <i className="bi bi-palette" />
                                    </div>
                                    <div className="step-info">
                                        <span className="step-number">Giai đoạn 03</span>
                                        <h3>Tô màu và chi tiết</h3>
                                        <p>Áp dụng kỹ thuật digital painting với bảng vẽ Wacom, sử dụng layer blending và texture để tạo chiều
                                            sâu và cảm xúc.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="step-item" data-aos="fade-left" data-aos-delay={500}>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <i className="bi bi-stars" />
                                    </div>
                                    <div className="step-info">
                                        <span className="step-number">Giai đoạn 04</span>
                                        <h3>Hoàn thiện và xuất file</h3>
                                        <p>Tinh chỉnh ánh sáng, màu sắc và chi tiết cuối cùng, xuất file ở định dạng như PSD, PNG, hoặc JPEG với
                                            độ phân giải cao.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="call-to-action" className="call-to-action section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="advertise-1 d-flex flex-column flex-lg-row gap-4 align-items-center position-relative">
                            <div className="content-left flex-grow-1" data-aos="fade-right" data-aos-delay={200}>
                                <span className="badge text-uppercase mb-2">Khám Phá Ngay!</span>
                                <h2>Sáng Tạo Không Giới Hạn</h2>
                                <p className="my-4">
                                    Khám phá thế giới nghệ thuật số đa dạng từ digital painting, concept art đến character design
                                    và matte painting. Trang web này là không gian trưng bày trực tuyến với những tác phẩm
                                    độc đáo từ vô vàn phong cách khác nhau.
                                </p>
                                <div className="features d-flex flex-wrap gap-3 mb-4">
                                    <div className="feature-item">
                                        <i className="bi bi-palette-fill" />
                                        <span>Tiết Kiệm Chi Phí</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="bi bi-tools" />
                                        <span>Tăng Tính Sáng Tạo</span>
                                    </div>
                                    <div className="feature-item">
                                        <i className="bi bi-file-earmark-image" />
                                        <span>Mở Rộng Cơ Hội</span>
                                    </div>
                                </div>
                                <div className="cta-buttons d-flex flex-wrap gap-3">
                                    <a href="#services" className="btn btn-primary">Khám Phá Kỹ Thuật</a>
                                    <a href="#portfolio" className="btn btn-outline">Xem Bộ Sưu Tập</a>
                                </div>
                            </div>
                            <div className="content-right position-relative" data-aos="fade-left" data-aos-delay={300}>
                                <img src="assets/img/misc/WLOP7.jpg" alt="Nghệ thuật số sáng tạo" className="img-fluid rounded-4" />
                                <div className="floating-card">
                                    <div className="card-icon">
                                        <i className="bi bi-award" />
                                    </div>
                                    <div className="card-content">
                                        <span className="stats-number">2K+</span>
                                        <span className="stats-text">Ý Tưởng Độc Đáo </span>
                                    </div>
                                </div>
                            </div>
                            <div className="decoration">
                                <div className="circle-1" />
                                <div className="circle-2" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="showcase" className="testimonials section light-background">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Ấn Phẩm Tiêu Biểu</h2>
                        <div><span>Khám phá</span> <span className="description-title">Nghệ thuật số nổi bật</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="testimonials-slider swiper init-swiper">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h2>LINH HỒN RỪNG SÂU</h2>
                                                <p>Tác phẩm minh họa kỹ thuật số mang phong cách Fantasy, kết hợp yếu tố semi-realistic, tái hiện
                                                    một thế giới huyền bí với rừng cây ma mị.</p>
                                                <p>Được tạo bằng Photoshop và Wacom, sử dụng hơn 50 layer và 70 giờ làm việc để hoàn thiện từng chi
                                                    tiết tinh xảo.</p>
                                                <div className="artwork-info d-flex align-items-center">
                                                    <div className="info-content">
                                                        <span className="technique">Digital Painting</span>
                                                        <span className="resolution">4K Resolution</span>
                                                        <span className="software">Photoshop CC</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 d-none d-lg-block">
                                                <div className="featured-img-wrapper">
                                                    <img src="assets/img/art/WLOP15.jpg" className="featured-img" alt="Linh Hồn Rừng Sâu" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h2>THÀNH PHỐ NEON</h2>
                                                <p>Concept art về một đô thị viễn tưởng theo phong cách Cyberpunk, sử dụng kỹ thuật matte painting
                                                    và phối cảnh số để tạo không gian sống động.</p>
                                                <p>Tác phẩm được thực hiện bằng Procreate và Photoshop, tập trung vào ánh sáng neon và chi tiết kiến
                                                    trúc tương lai.</p>
                                                <div className="artwork-info d-flex align-items-center">
                                                    <div className="info-content">
                                                        <span className="technique">Concept Art</span>
                                                        <span className="resolution">8K Resolution</span>
                                                        <span className="software">Procreate + Photoshop</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 d-none d-lg-block">
                                                <div className="featured-img-wrapper">
                                                    <img src="assets/img/art/WLOP5.jpg" className="featured-img" alt="Thành Phố Neon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <h2>CHIẾN BINH BĂNG GIÁ</h2>
                                                <p>Minh họa nhân vật mang phong cách Anime kết hợp realistic, khắc họa một nữ chiến binh trong khung
                                                    cảnh tuyết lạnh giá, với chi tiết ánh kim và vải sống động.</p>
                                                <p>Sử dụng Clip Studio Paint với các brush tùy chỉnh để tạo hiệu ứng chất liệu và ánh sáng chân
                                                    thực.</p>
                                                <div className="artwork-info d-flex align-items-center">
                                                    <div className="info-content">
                                                        <span className="technique">Character Design</span>
                                                        <span className="resolution">4K Resolution</span>
                                                        <span className="software">Clip Studio Paint</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 d-none d-lg-block">
                                                <div className="featured-img-wrapper">
                                                    <img src="assets/img/art/WLOP11.jpg" className="featured-img" alt="Chiến Binh Băng Giá" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-navigation w-100 d-flex align-items-center justify-content-center">
                                <div className="swiper-button-prev" />
                                <div className="swiper-button-next" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="portfolio" className="portfolio section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Tác Phẩm</h2>
                        <div><span>Bộ sưu tập</span> <span className="description-title">nghệ thuật</span></div>
                    </div>
                    <div className="container-fluid" data-aos="fade-up" data-aos-delay={100}>
                        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                            <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay={200}>
                                <li data-filter="*" className="filter-active">
                                    <i className="bi bi-grid-3x3" /> Tất cả tác phẩm
                                </li>
                                <li data-filter=".filter-ui">
                                    <i className="bi bi-brush" /> Phong cách cổ điển
                                </li>
                                <li data-filter=".filter-development">
                                    <i className="bi bi-stars" /> Vũ trụ viễn tưởng
                                </li>
                                <li data-filter=".filter-photography">
                                    <i className="bi bi-droplet" /> Cảm xúc u sầu
                                </li>
                                <li data-filter=".filter-marketing">
                                    <i className="bi bi-shield" /> Nữ chiến binh
                                </li>
                            </ul>
                            <div className="row g-4 isotope-container" data-aos="fade-up" data-aos-delay={300}>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP1.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">NỮ HOÀNG CỔ ĐIỂN</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP1.jpg" className="glightbox" data-gallery="portfolio-gallery-ui" data-glightbox="title: NỮ HOÀNG CỔ ĐIỂN; description: Tác phẩm nghệ thuật số mang phong cách cổ điển.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-development">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP4.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">THIÊN HÀ RỰC RỠ</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP4.jpg" className="glightbox" data-gallery="portfolio-gallery-development" data-glightbox="title: THIÊN HÀ RỰC RỠ; description: Tác phẩm nghệ thuật số phong cách viễn tưởng.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-photography">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP8.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">GIỌT SƯƠNG U BUỒN</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP8.jpg" className="glightbox" data-gallery="portfolio-gallery-photography" data-glightbox="title: GIỌT SƯƠNG U BUỒN; description: Tác phẩm nghệ thuật số mang cảm xúc sâu lắng.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-marketing">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP13.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">NỮ CHIẾN BINH HUYỀN THOẠI</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP13.jpg" className="glightbox" data-gallery="portfolio-gallery-marketing" data-glightbox="title: NỮ CHIẾN BINH HUYỀN THOẠI; description: Tác phẩm nghệ thuật số phong cách chiến binh.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-ui">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP3.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">NỮ HOÀNG CỔ ĐIỂN</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP3.jpg" className="glightbox" data-gallery="portfolio-gallery-ui" data-glightbox="title: NỮ HOÀNG CỔ ĐIỂN; description: Tác phẩm nghệ thuật số mang phong cách cổ điển.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-development">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP4.1.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">THIÊN HÀ RỰC RỠ</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP4.1.jpg" className="glightbox" data-gallery="portfolio-gallery-development" data-glightbox="title: THIÊN HÀ RỰC RỠ; description: Tác phẩm nghệ thuật số phong cách viễn tưởng.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-photography">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP9.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">GIỌT SƯƠNG U BUỒN</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP9.jpg" className="glightbox" data-gallery="portfolio-gallery-photography" data-glightbox="title: GIỌT SƯƠNG U BUỒN; description: Tác phẩm nghệ thuật số mang cảm xúc sâu lắng.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item isotope-item filter-marketing">
                                    <article className="portfolio-entry">
                                        <figure className="entry-image">
                                            <img src="assets/img/portfolio/WLOP14.jpg" className="img-fluid" alt loading="lazy" />
                                            <div className="entry-overlay">
                                                <div className="overlay-content">
                                                    <div className="entry-meta">DIGITAL ART</div>
                                                    <h3 className="entry-title">NỮ CHIẾN BINH HUYỀN THOẠI</h3>
                                                    <div className="entry-links">
                                                        <a href="assets/img/portfolio/WLOP14.jpg" className="glightbox" data-gallery="portfolio-gallery-marketing" data-glightbox="title: NỮ CHIẾN BINH HUYỀN THOẠI; description: Tác phẩm nghệ thuật số phong cách chiến binh.">
                                                            <i className="bi bi-arrows-angle-expand" />
                                                        </a>
                                                        <a href="portfolio-details.html">
                                                            <i className="bi bi-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="tools" className="team section light-background">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Công Cụ Sáng Tạo</h2>
                        <div><span>Các</span> <span className="description-title">Phần mềm tạo nên nghệ thuật số</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row gy-4">
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/photoshop.jpg" className="img-fluid" alt="Adobe Photoshop" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Adobe Photoshop</h4>
                                        <span>Phần mềm chỉnh sửa và vẽ kỹ thuật số</span>
                                        <p>Công cụ hàng đầu cho digital painting, hỗ trợ hệ thống layer phức tạp, brush tùy chỉnh và hiệu ứng
                                            ánh sáng đa dạng.</p>
                                        <div className="social">
                                            <a href="https://www.adobe.com/products/photoshop.html"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/clipstudio.jpg" className="img-fluid" alt="Clip Studio Paint" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Clip Studio Paint</h4>
                                        <span>Phần mềm vẽ manga và minh họa</span>
                                        <p>Tối ưu cho vẽ truyện tranh và minh họa, với bộ brush phong phú và công cụ hỗ trợ animation chuyên
                                            nghiệp.</p>
                                        <div className="social">
                                            <a href="https://www.clipstudio.net/"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/procreate.jpg" className="img-fluid" alt="Procreate" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Procreate</h4>
                                        <span>Ứng dụng vẽ trên iPad</span>
                                        <p>Giao diện thân thiện, hỗ trợ Apple Pencil, lý tưởng cho vẽ phác thảo và minh họa mọi lúc mọi nơi.</p>
                                        <div className="social">
                                            <a href="https://procreate.art/"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/a.png" className="img-fluid" alt="Adobe Illustrator" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Adobe Illustrator</h4>
                                        <span>Phần mềm thiết kế vector</span>
                                        <p>Công cụ lý tưởng cho thiết kế vector, tạo minh họa sắc nét với độ phân giải không giới hạn, phù hợp
                                            cho logo và đồ họa số.</p>
                                        <div className="social">
                                            <a href="https://www.adobe.com/products/illustrator.html"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={500}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/paintstorm.jpg" className="img-fluid" alt="Paintstorm Studio" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Paintstorm Studio</h4>
                                        <span>Phần mềm vẽ kỹ thuật số</span>
                                        <p>Tập trung vào trải nghiệm vẽ tự nhiên với hệ thống brush linh hoạt và các công cụ blending độc đáo.
                                        </p>
                                        <div className="social">
                                            <a href="http://www.paintstormstudio.com/"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={600}>
                                <div className="team-member d-flex">
                                    <div className="member-img">
                                        <img src="assets/img/tools/corel.jpg" className="img-fluid" alt="Corel Painter" loading="lazy" />
                                    </div>
                                    <div className="member-info flex-grow-1">
                                        <h4>Corel Painter</h4>
                                        <span>Phần mềm mô phỏng hội họa truyền thống</span>
                                        <p>Mô phỏng chân thực các chất liệu như sơn dầu, màu nước, mang đến trải nghiệm vẽ kỹ thuật số gần gũi
                                            với hội họa truyền thống.</p>
                                        <div className="social">
                                            <a href="https://www.painterartist.com/"><i className="bi bi-link" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="pricing" className="pricing section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Cấp Độ Thành Thạo Nghệ Thuật</h2>
                        <div><span>Từ cơ bản</span> <span className="description-title">đến chuyên nghiệp</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row gy-4">
                            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={200}>
                                <div className="pricing-card">
                                    <div className="plan-header">
                                        <div className="plan-icon">
                                            <i className="bi bi-brush" />
                                        </div>
                                        <h3>Cơ Bản</h3>
                                        <p>Tác phẩm nghệ thuật số đơn giản</p>
                                    </div>
                                    <div className="plan-pricing">
                                        <div className="price">
                                            <span className="currency">$</span>
                                            <span className="amount">0,38</span>
                                            <span className="period">/tháng</span>
                                        </div>
                                    </div>
                                    <div className="plan-features">
                                        <ul>
                                            <li><i className="bi bi-check-circle-fill" /> Sử dụng công cụ vẽ cơ bản</li>
                                            <li><i className="bi bi-check-circle-fill" /> Phác thảo và màu sắc đơn giản</li>
                                            <li><i className="bi bi-check-circle-fill" /> Hiệu ứng ánh sáng cơ bản</li>
                                            <li className="disabled"><i className="bi bi-x-circle-fill" /> Kỹ thuật phối cảnh phức tạp</li>
                                            <li className="disabled"><i className="bi bi-x-circle-fill" /> Chi tiết hóa nhân vật hoặc cảnh vật</li>
                                        </ul>
                                    </div>
                                    <div className="plan-cta">
                                        <a href="#" className="btn-plan">Tìm hiểu thêm</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={300}>
                                <div className="pricing-card popular">
                                    <div className="popular-tag">Nâng cao</div>
                                    <div className="plan-header">
                                        <div className="plan-icon">
                                            <i className="bi bi-palette" />
                                        </div>
                                        <h3>Nâng Cao</h3>
                                        <p>Tác phẩm với độ chi tiết và sáng tạo cao hơn</p>
                                    </div>
                                    <div className="plan-pricing">
                                        <div className="price">
                                            <span className="currency">$</span>
                                            <span className="amount">1,9</span>
                                            <span className="period">/tháng</span>
                                        </div>
                                    </div>
                                    <div className="plan-features">
                                        <ul>
                                            <li><i className="bi bi-check-circle-fill" /> Sử dụng công cụ vẽ trung cấp</li>
                                            <li><i className="bi bi-check-circle-fill" /> Kỹ thuật phối cảnh cơ bản</li>
                                            <li><i className="bi bi-check-circle-fill" /> Hiệu ứng ánh sáng và bóng động</li>
                                            <li><i className="bi bi-check-circle-fill" /> Thiết kế nhân vật hoặc cảnh vật chi tiết</li>
                                            <li className="disabled"><i className="bi bi-x-circle-fill" /> Tích hợp hiệu ứng động phức tạp</li>
                                        </ul>
                                    </div>
                                    <div className="plan-cta">
                                        <a href="#" className="btn-plan">Tìm hiểu thêm</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={400}>
                                <div className="pricing-card">
                                    <div className="plan-header">
                                        <div className="plan-icon">
                                            <i className="bi bi-star" />
                                        </div>
                                        <h3>Chuyên Nghiệp</h3>
                                        <p>Tác phẩm nghệ thuật số đỉnh cao cho dự án</p>
                                    </div>
                                    <div className="plan-pricing">
                                        <div className="price">
                                            <span className="currency">$</span>
                                            <span className="amount">3,8</span>
                                            <span className="period">/tháng</span>
                                        </div>
                                    </div>
                                    <div className="plan-features">
                                        <ul>
                                            <li><i className="bi bi-check-circle-fill" /> Thành thạo mọi công cụ vẽ</li>
                                            <li><i className="bi bi-check-circle-fill" /> Kỹ thuật phối cảnh nâng cao</li>
                                            <li><i className="bi bi-check-circle-fill" /> Tích hợp hiệu ứng động và 3D</li>
                                            <li><i className="bi bi-check-circle-fill" /> Thiết kế nhân vật và cảnh vật phức tạp</li>
                                            <li><i className="bi bi-check-circle-fill" /> Tối ưu cho các dự án thương mại</li>
                                        </ul>
                                    </div>
                                    <div className="plan-cta">
                                        <a href="#" className="btn-plan">Tìm hiểu thêm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="faq-9 faq section" id="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5" data-aos="fade-up">
                                <h2 className="faq-title">Vấn Đề Thường Gặp</h2>
                                <p className="faq-description">Tổng hợp các vấn đề phổ biến trong quá trình sáng tạo nghệ thuật số và cách khắc
                                    phục hiệu quả.</p>
                                {/* Keep original SVG arrow */}
                                <div className="faq-arrow d-none d-lg-block" data-aos="fade-up" data-aos-delay={200}>
                                    <svg className="faq-arrow" width={200} height={211} viewBox="0 0 200 211" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Keep original path data */}
                                        <path d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <div className="col-lg-7" data-aos="fade-up" data-aos-delay={300}>
                                <div className="faq-container">
                                    <div className="faq-item faq-active">
                                        <h3>Làm thế nào để khắc phục vấn đề về màu sắc trong digital painting?</h3>
                                        <div className="faq-content">
                                            <p>Để cải thiện màu sắc, hãy nghiên cứu color theory, sử dụng color picker thông minh, và làm việc với
                                                color palette có sẵn. Điều chỉnh các thông số như Hue/Saturation và làm việc trên nhiều layer để dễ
                                                dàng chỉnh sửa.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                    <div className="faq-item">
                                        <h3>Làm sao để tạo texture tự nhiên trong tranh kỹ thuật số?</h3>
                                        <div className="faq-content">
                                            <p>Kết hợp sử dụng các brush có texture, áp dụng layer modes khác nhau, và thêm noise một cách có chọn
                                                lọc. Việc này giúp tác phẩm có độ chân thực và đặc tính vật liệu rõ ràng hơn.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                    <div className="faq-item">
                                        <h3>Cách xử lý vấn đề về tỷ lệ và góc nhìn phối cảnh?</h3>
                                        <div className="faq-content">
                                            <p>Sử dụng công cụ perspective grid, tham khảo ảnh tham chiếu, và thực hành vẽ từ nhiều góc nhìn khác
                                                nhau. Đặc biệt chú ý đến vanishing points và horizon line.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                    <div className="faq-item">
                                        <h3>Làm thế nào để tạo hiệu ứng ánh sáng chân thực?</h3>
                                        <div className="faq-content">
                                            <p>Nghiên cứu về nguồn sáng, sử dụng các layer blend mode như Overlay hoặc Soft Light, và tạo độ tương
                                                phản thích hợp. Chú ý đến ambient light và reflected light.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                    <div className="faq-item">
                                        <h3>Cách khắc phục hiện tượng pixelated trong tranh số?</h3>
                                        <div className="faq-content">
                                            <p>Làm việc với canvas kích thước lớn (300 DPI trở lên), sử dụng công cụ vector khi cần thiết, và áp
                                                dụng các kỹ thuật anti-aliasing phù hợp.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                    <div className="faq-item">
                                        <h3>Giải quyết vấn đề về độ mượt của nét vẽ?</h3>
                                        <div className="faq-content">
                                            <p>Điều chỉnh stabilizer trong brush settings, sử dụng tablet với độ nhạy phù hợp, và thực hành các
                                                bài tập về stroke control thường xuyên.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="contact" className="contact section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Liên Hệ</h2>
                        <div><span>Kết nối</span> <span className="description-title">Để sáng tạo</span></div>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row gy-4 mb-5">
                            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
                                <div className="contact-info-box">
                                    <div className="icon-box">
                                        <i className="bi bi-geo-alt" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Địa chỉ</h4>
                                        <p>1842 Đường Lê Lợi, Quận 1, TP. Bắc Ninh, Việt Nam</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                                <div className="contact-info-box">
                                    <div className="icon-box">
                                        <i className="bi bi-envelope" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Email</h4>
                                        <p>info@digitalartviet.com</p>
                                        <p>support@digitalartviet.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={300}>
                                <div className="contact-info-box">
                                    <div className="icon-box">
                                        <i className="bi bi-headset" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Giờ làm việc</h4>
                                        <p>Thứ Hai - Thứ Sáu: 9:00 - 18:00</p>
                                        <p>Thứ Bảy: 9:00 - 16:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-section" data-aos="fade-up" data-aos-delay={200}>
                        <iframe
                            src="https://www.google.com/maps?q=Trường+Cao+đẳng+Lý+Thái+Tổ,+220+Nguyễn+Văn+Cừ,+Võ+Cường,+Bắc+Ninh&z=17&output=embed"
                            width="100%"
                            height={500}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div className="container form-container-overlap">
                        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay={300}>
                            <div className="col-lg-10">
                                <div className="contact-form-wrapper">
                                    <h2 className="text-center mb-4">Liên hệ để bắt đầu dự án nghệ thuật số</h2>
                                    <form action="forms/contact.php" method="post" className="php-email-form">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-person" />
                                                        <input type="text" className="form-control" name="name" placeholder="Họ và tên" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-envelope" />
                                                        <input type="email" className="form-control" name="email" placeholder="Địa chỉ email" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-text-left" />
                                                        <input type="text" className="form-control" name="subject" placeholder="Chủ đề" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <div className="input-with-icon">
                                                        <i className="bi bi-chat-dots message-icon" />
                                                        <textarea className="form-control" name="message" placeholder="Mô tả ý tưởng hoặc yêu cầu của bạn..." style={{ height: 180 }} required defaultValue={""} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="loading">Đang tải</div>
                                                <div className="error-message" />
                                                <div className="sent-message">Tin nhắn của bạn đã được gửi. Cảm ơn!</div>
                                            </div>
                                            <div className="col-12 text-center">
                                                <button type="submit" className="btn btn-primary btn-submit">GỬI YÊU CẦU</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </>
    );

}
export default Home;  