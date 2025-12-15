// ===== VARIÁVEIS GLOBAIS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scroll-progress');
const easterEgg = document.getElementById('easter-egg');

// ===== BARRA DE PROGRESSO DO SCROLL =====
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== MENU HAMBÚRGUER =====
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ===== SCROLL SUAVE =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Ajuste para altura do navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER - ANIMAÇÕES =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Para elementos fade-in genéricos
            if (entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observar outros elementos com fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// ===== LAZY LOAD IMAGENS =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== PARALLAX SUAVE NA HERO SECTION =====
const heroSection = document.querySelector('.hero-section');
const watermark = document.querySelector('.watermark');

function handleParallax() {
    const scrolled = window.pageYOffset;
    
    if (heroSection && scrolled < window.innerHeight) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        if (watermark) {
            watermark.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
        }
    }
}

// ===== EASTER EGG - DIGITE "FHX" =====
let typedSequence = '';
const secretCode = 'fhx';
let easterEggTimeout;

function handleKeyPress(e) {
    typedSequence += e.key.toLowerCase();
    
    // Manter apenas os últimos 3 caracteres
    if (typedSequence.length > secretCode.length) {
        typedSequence = typedSequence.slice(-secretCode.length);
    }
    
    // Verificar se digitou o código secreto
    if (typedSequence === secretCode) {
        showEasterEgg();
        typedSequence = ''; // Reset
    }
}

function showEasterEgg() {
    easterEgg.classList.add('active');
    
    // Adicionar efeitos sonoros simulados com vibração (se disponível)
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // Esconder após 3 segundos
    clearTimeout(easterEggTimeout);
    easterEggTimeout = setTimeout(() => {
        easterEgg.classList.remove('active');
    }, 3000);
}

// ===== EFEITO 3D NOS CARDS DE SOLUÇÕES (será aplicado dinamicamente) =====
function apply3DEffect() {
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in:not(.visible)');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('visible');
        }
    });
}

// ===== SMOOTH SCROLL POLYFILL PARA SAFARI =====
function smoothScrollPolyfill() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80;
                
                // Scroll suave
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMAÇÃO DOS BOTÕES FLUTUANTES =====
const floatingButtons = document.querySelectorAll('.float-btn');

floatingButtons.forEach((btn, index) => {
    // Adicionar delay na animação float
    btn.style.animationDelay = `${index * 0.5}s`;
    
    // Efeito de clique
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Iniciar animações
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION - DEBOUNCE =====
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== THROTTLE PARA SCROLL =====
function throttle(func, delay = 16) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', throttle(() => {
    updateScrollProgress();
    handleNavbarScroll();
    handleParallax();
    revealOnScroll();
}, 10));

hamburger.addEventListener('click', toggleMenu);

document.addEventListener('keypress', handleKeyPress);

// ===== PREVENIR ZOOM NO MOBILE (DUPLO CLIQUE) =====
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===== ADICIONAR CLASSES PARA DETECÇÃO DE MOBILE =====
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-device');
    }
}

// ===== CURSOR CUSTOMIZADO (OPCIONAL - DESKTOP) =====
function initCustomCursor() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Adicionar efeito hover em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .float-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// ===== ANALYTICS DE SCROLL (OPCIONAL) =====
function trackScrollDepth() {
    const scrollPercentage = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Marcos de scroll
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !window[`scrollMilestone${milestone}`]) {
            window[`scrollMilestone${milestone}`] = true;
            console.log(`Usuário rolou ${milestone}% da página`);
            // Aqui você pode enviar para Google Analytics ou outra ferramenta
        }
    });
}

// ===== ANIMAÇÃO DE DIGITAÇÃO NO TÍTULO (OPCIONAL) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== INICIALIZAÇÃO =====
function init() {
    detectDevice();
    smoothScrollPolyfill();
    updateScrollProgress();
    handleNavbarScroll();
    
    // Inicializar cursor customizado (opcional)
    // initCustomCursor();
    
    // Adicionar fade-in aos elementos
    const elementsToFade = document.querySelectorAll('.contact-method, .referral-box');
    elementsToFade.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== EXECUTAR QUANDO O DOM ESTIVER PRONTO =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== PREVENÇÃO DE ERROS =====
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.message);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

// ===== OTIMIZAÇÃO DE RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reajustar elementos se necessário
        if (hamburger.classList.contains('active') && window.innerWidth > 768) {
            toggleMenu();
        }
    }, 250);
});

// ===== CONSOLE ART (EASTER EGG ADICIONAL) =====
console.log('%c🔧 FHX Assistência Técnica', 'font-size: 30px; color: #00bfff; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 191, 255, 0.5);');
console.log('%cTecnologia funcionando do jeito certo 💻', 'font-size: 16px; color: #c0c0c0;');
console.log('%cCuritiba - PR', 'font-size: 12px; color: #888;');
console.log('%cDigite "fhx" em qualquer lugar da página para ver uma surpresa! 😉', 'font-size: 12px; color: #00bfff; font-style: italic;');

// ===== EXPORTAR FUNÇÕES (SE NECESSÁRIO) =====
window.FHX = {
    toggleMenu,
    showEasterEgg,
    updateScrollProgress
};

// ===== SEÇÃO DE SERVIÇOS ===== 

// Dados dos serviços de assistência técnica
const solutionsData = [
    {
        title: "Manutenção e Reparos",
        category: "Manutenção",
        description: "Correção de falhas, lentidão, travamentos e problemas de hardware ou software em notebooks e computadores.",
        icon: "🔧",
        tags: ["Notebooks", "Desktops", "Diagnóstico"]
    },
    {
        title: "Formatação e Sistemas",
        category: "Formatação",
        description: "Formatação completa, instalação e configuração de Windows, drivers e atualizações essenciais.",
        icon: "💿",
        tags: ["Windows", "Drivers", "Configuração"]
    },
    {
        title: "Upgrades de Computadores",
        category: "Upgrade",
        description: "Melhore o desempenho do seu PC com upgrades de memória, SSD, placa de vídeo e outros componentes.",
        icon: "⚡",
        tags: ["SSD", "RAM", "Placa de Vídeo"]
    },
    {
        title: "Upgrades de Notebooks",
        category: "Upgrade",
        description: "Atualização de hardware para deixar seu notebook mais rápido e eficiente, com análise de compatibilidade.",
        icon: "💻",
        tags: ["SSD", "RAM", "Compatibilidade"]
    },
    {
        title: "Montagem de PCs e PCs Gamers",
        category: "Montagem",
        description: "Montagem personalizada de computadores e PCs gamers de acordo com sua necessidade e orçamento.",
        icon: "🎮",
        tags: ["PC Gamer", "Personalizado", "Montagem"]
    },
    {
        title: "Instalação de Programas",
        category: "Software",
        description: "Instalação e configuração de programas, aplicativos, antivírus e softwares essenciais.",
        icon: "📦",
        tags: ["Programas", "Antivírus", "Office"]
    },
    {
        title: "Remoção de Vírus e Otimização",
        category: "Software",
        description: "Limpeza de vírus, malwares e ajustes para melhorar desempenho e segurança do sistema.",
        icon: "🛡️",
        tags: ["Vírus", "Malware", "Segurança"]
    },
    {
        title: "Troca de Peças",
        category: "Manutenção",
        description: "Substituição de HD/SSD, memória RAM, fontes, placas de vídeo, telas e outros componentes.",
        icon: "🔩",
        tags: ["Peças", "Substituição", "Componentes"]
    },
    {
        title: "Suporte Geral em Informática",
        category: "Suporte",
        description: "Configurações, diagnósticos, ajustes e soluções para problemas do dia a dia com tecnologia.",
        icon: "🖥️",
        tags: ["Suporte", "Configuração", "Ajustes"]
    }
];

// Variáveis globais
let currentFilter = 'todas';
let currentSearch = '';

// Elementos DOM
const solutionsGrid = document.getElementById('solutionsGrid');
const filterChips = document.querySelectorAll('.chip');
const searchInput = document.getElementById('searchInput');
const emptyState = document.getElementById('emptyState');

// Renderizar soluções
function renderSolutions(solutions) {
    if (!solutionsGrid) return;
    
    solutionsGrid.innerHTML = '';
    
    if (solutions.length === 0) {
        solutionsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    solutionsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    solutions.forEach((solution, index) => {
        const card = createSolutionCard(solution, index);
        solutionsGrid.appendChild(card);
    });
    
    // Animar cards com IntersectionObserver
    const cards = document.querySelectorAll('.solution-card');
    cards.forEach((card, idx) => {
        card.style.animationDelay = `${idx * 0.1}s`;
        observer.observe(card);
    });
    
    // Aplicar efeito 3D nos cards
    setTimeout(() => {
        apply3DEffect();
    }, 100);
}

// Criar card de serviço
function createSolutionCard(solution, index) {
    const card = document.createElement('div');
    card.className = 'solution-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Badges de tags
    const tagBadges = solution.tags
        .map(tag => `<span class="badge badge-tech">${tag}</span>`)
        .join('');
    
    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/5541991541757?text=Olá! Gostaria de solicitar o serviço de "${encodeURIComponent(solution.title)}".`;
    
    card.innerHTML = `
        <div class="card-icon">${solution.icon}</div>
        <div class="card-category">${solution.category}</div>
        <h3 class="card-title">${solution.title}</h3>
        <p class="card-description">${solution.description}</p>
        <div class="card-badges">
            ${tagBadges}
        </div>
        <a href="${whatsappUrl}" target="_blank" class="card-cta">
            Solicitar Serviço
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
        </a>
    `;
    
    return card;
}

// Filtrar por categoria
function filterByCategory(category) {
    currentFilter = category;
    applyFilters();
}

// Buscar soluções
function searchSolutions(query) {
    currentSearch = query.toLowerCase();
    applyFilters();
}

// Aplicar filtros
function applyFilters() {
    let filtered = solutionsData;
    
    // Filtro por categoria
    if (currentFilter !== 'todas') {
        filtered = filtered.filter(solution => solution.category === currentFilter);
    }
    
    // Filtro por busca
    if (currentSearch) {
        filtered = filtered.filter(solution => 
            solution.title.toLowerCase().includes(currentSearch) ||
            solution.description.toLowerCase().includes(currentSearch) ||
            solution.tags.some(tag => tag.toLowerCase().includes(currentSearch))
        );
    }
    
    renderSolutions(filtered);
}

// Event listeners para filtros
if (filterChips) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remover active de todos
            filterChips.forEach(c => c.classList.remove('active'));
            
            // Adicionar active ao clicado
            chip.classList.add('active');
            
            // Filtrar
            const category = chip.dataset.category;
            filterByCategory(category);
        });
    });
}

// Event listener para busca (com debounce)
let searchTimeout;
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchSolutions(e.target.value);
        }, 200);
    });
}

// Inicializar seção de soluções
function initSolutions() {
    if (solutionsGrid) {
        renderSolutions(solutionsData);
    }
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolutions);
} else {
    initSolutions();
}

