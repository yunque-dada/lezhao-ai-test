// 乐造AI - 公共组件
// 2026-03-12 更新

// 1. 导航栏组件
const headerHTML = `
<header class="header">
    <div class="logo">🎓 乐造AI</div>
    <nav class="nav">
        <a href="index.html">首页</a>
        <a href="courses.html">课程体系</a>
        <a href="scratch.html">Scratch</a>
        <a href="#contact">联系我们</a>
    </nav>
    <button class="dark-mode-toggle" onclick="toggleDarkMode()" title="切换明暗模式">
        🌙
    </button>
</header>
`;

// 2. 底部组件
const footerHTML = `
<footer class="footer">
    <div class="footer-content">
        <p>📍 河源市源城区 | 📞 联系方式请咨询</p>
        <p>© 2026 乐造AI科技教育中心 | 让每个孩子成为创造者</p>
    </div>
</footer>
`;

// 3. 暗色模式
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateToggleButton(isDark);
}

function updateToggleButton(isDark) {
    const btn = document.querySelector('.dark-mode-toggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function initDarkMode() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
        document.body.classList.add('dark-mode');
        updateToggleButton(true);
    }
}

// 4. 加载动画
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}

// 5. 滚动动画
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .course-card, .work-card').forEach(el => {
        observer.observe(el);
    });
}

// 6. 表单验证
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const required = form.querySelectorAll('[required]');
    let valid = true;
    
    required.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            valid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return valid;
}

// 7. 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initScrollAnimation();
    initSmoothScroll();
    hideLoader();
});
