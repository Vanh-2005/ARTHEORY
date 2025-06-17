import React, { useEffect, useState, memo } from "react";

function Header() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (e, dropdownId) => {
        if (dropdownId === 'sub') {
            e.preventDefault();
            e.stopPropagation();
        }
        setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    };

    // Sửa lại hàm handleLinkClick
       const handleLinkClick = (e, target) => {
        e.preventDefault();
        if (target) {
            const element = document.querySelector(target);
            if (element) {
                const offset = 90;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
        document.body.classList.remove('mobile-nav-active');
    };

    useEffect(() => {
        const handleProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleProgress);
        handleProgress();

        return () => window.removeEventListener('scroll', handleProgress);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            setScrolled(scrollPosition > 50);

            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sửa lại hàm toggleMobileMenu
    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);

        const header = document.getElementById('header');
        const navmenu = document.getElementById('navmenu');

        // Luôn đảm bảo header hiển thị và có position fixed
        if (header) {
            header.style.position = 'fixed';
            header.style.width = '100%';
            header.style.display = 'block'; // Luôn hiển thị header
            header.style.top = '0'; // Đảm bảo header ở trên cùng
        }

        if (newState) {
            // Mở menu
            document.body.style.overflow = 'hidden';
            document.body.classList.add('mobile-nav-active');
            if (header) {
                header.style.zIndex = '9999';
            }
            if (navmenu) {
                navmenu.style.display = 'block';
                navmenu.style.visibility = 'visible';
                navmenu.style.opacity = '1';
            }
        } else {
            // Đóng menu 
            document.body.style.overflow = 'auto';
            document.body.classList.remove('mobile-nav-active');
            if (header) {
                header.style.zIndex = '997';
            }
            if (navmenu) {
                navmenu.style.visibility = 'hidden';
                navmenu.style.opacity = '0';
                // Delay ẩn display để animation fade out hoạt động
                setTimeout(() => {
                    if (!isMobileMenuOpen) { // Kiểm tra lại trạng thái
                        navmenu.style.display = 'none';
                    }
                }, 300);
            }
        }
    };

    // Thêm cleanup effect
    useEffect(() => {
        return () => {
            // Reset lại các style khi component unmount
            document.body.style.overflow = 'auto';
            document.body.classList.remove('mobile-nav-active');
            const header = document.getElementById('header');
            if (header) {
                header.style.display = 'block';
                header.style.position = 'fixed';
                header.style.width = '100%';
                header.style.top = '0';
            }
        };
    }, []);

    return (
        <>
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
            <header id="header" className={`header d-flex align-items-center fixed-top ${scrolled ? 'header-scrolled' : ''}`}>
                <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
                        <h1 className="sitename">ARTHEORY</h1>
                    </a>

                    <i
                        className={`mobile-nav-toggle d-xl-none bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}
                        onClick={toggleMobileMenu}
                    />

                    <nav id="navmenu" className={`navmenu ${isMobileMenuOpen ? 'mobile-nav-active' : ''}`}>
                        <ul>
                            <li><a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className={activeSection === 'hero' ? 'active' : ''}>Trang chủ</a></li>
                            <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className={activeSection === 'about' ? 'active' : ''}>Giới thiệu</a></li>
                            <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className={activeSection === 'services' ? 'active' : ''}>Quy trình</a></li>
                            <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Tác phẩm</a></li>
                            <li><a href="#tools" onClick={(e) => handleLinkClick(e, '#tools')} className={activeSection === 'tools' ? 'active' : ''}>Công cụ</a></li>
                            <li className="dropdown">
                                <a
                                    href="#pricing"
                                    onClick={(e) => {
                                        handleLinkClick(e, '#pricing');
                                        toggleDropdown(e, 'main');
                                    }}
                                    className={`${activeSection === 'pricing' ? 'active' : ''} ${activeDropdown === 'main' ? 'dropdown-active' : ''}`}
                                >
                                    <span>Khác</span>
                                    <i className={`bi bi-chevron-down ${activeDropdown === 'main' ? 'active' : ''}`} />
                                </a>
                                <ul className={activeDropdown === 'main' ? 'dropdown-active' : ''}>
                                    <li><a href="#pricing" onClick={(e) => handleLinkClick(e, '#pricing')}>Cấp Độ Thành Thạo</a></li>
                                    <li className="dropdown">
                                        <a
                                            href="#"
                                            onClick={(e) => toggleDropdown(e, 'sub')}
                                            className={activeDropdown === 'sub' ? 'dropdown-active' : ''}
                                        >
                                            <span>Danh mục phụ</span>
                                            <i className={`bi bi-chevron-down ${activeDropdown === 'sub' ? 'active' : ''}`} />
                                        </a>
                                        <ul className={activeDropdown === 'sub' ? 'dropdown-active' : ''}>
                                            <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Phong cách Anime</a></li>
                                            <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Concept Art</a></li>
                                            <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Digital Painting</a></li>
                                            <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Character Design</a></li>
                                            <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Matte Painting</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Blog nghệ thuật</a></li>
                                    <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Câu chuyện nghệ sĩ</a></li>
                                    <li><a href="#" onClick={(e) => handleLinkClick(e, null)}>Cộng đồng sáng tạo</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className={activeSection === 'contact' ? 'active' : ''}>Liên hệ</a></li>
                        </ul>
                    </nav>

                    <a className="btn-getstarted" href="#about" onClick={(e) => handleLinkClick(e, '#about')}>Khám phá ngay</a>
                </div>
            </header>
        </>
    );
}

export default memo(Header);