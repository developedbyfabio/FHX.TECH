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
console.log('%c🚀 FHX.TECH', 'font-size: 30px; color: #00bfff; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 191, 255, 0.5);');
console.log('%cPowered by AI 🤖', 'font-size: 16px; color: #c0c0c0;');
console.log('%cDesenvolvido por Fábio Henrique de Almeida Lemes', 'font-size: 12px; color: #888;');
console.log('%cDigite "fhx" em qualquer lugar da página para ver uma surpresa! 😉', 'font-size: 12px; color: #00bfff; font-style: italic;');

// ===== EXPORTAR FUNÇÕES (SE NECESSÁRIO) =====
window.FHX = {
    toggleMenu,
    showEasterEgg,
    updateScrollProgress
};

// ===== SEÇÃO DE SOLUÇÕES ===== 

// Dados das soluções
const solutionsData = [
    // --- CASES REAIS ---
    {
        title: "Sistema de Orçamentos & Aprovações (Workflow)",
        category: "Finanças & Compras",
        description: "Criação e aprovação de orçamentos por níveis personalizados por usuário, trilha de auditoria completa e histórico até o setor de compras. Admin para usuários, fornecedores e filiais.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "PHP", "MySQL", "Linux"],
        isRealCase: true
    },
    {
        title: "Hub Corporativo & Observabilidade de TI",
        category: "TI & Infra",
        description: "Portal centralizador dos sistemas/links da empresa com permissões por perfil e painel para monitorar servidores e serviços usados pela TI e desenvolvimento.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "PHP", "Nginx", "Linux"],
        isRealCase: true
    },
    // --- IDEIAS DE SOLUÇÕES QUE PODEMOS CONSTRUIR ---
    {
        title: "Dashboard Executivo Unificado (BI)",
        category: "BI & Analytics",
        description: "Uma visão única de vendas, custos, estoque e financeiro com gráficos, metas e alertas. Adeus planilhas dispersas.",
        runOn: ["Servidor", "Cloud"],
        tech: ["ETL", "PostgreSQL", "Metabase/Redash", "Python"]
    },
    {
        title: "Gestão de Compras & Estoque com Previsão",
        category: "Finanças & Compras",
        description: "Requisição → aprovação → pedido → recebimento → estoque, com previsão de demanda e reposição automática.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "PostgreSQL", "Jobs", "Forecasting"]
    },
    {
        title: "CRM Enxuto com IA para PMEs",
        category: "Vendas & Marketing",
        description: "Pipeline de vendas, follow-up automático, priorização de leads e templates inteligentes de contato.",
        runOn: ["Cloud", "Servidor"],
        tech: ["Laravel", "Redis", "Jobs", "NLP"]
    },
    {
        title: "Assistente de Atendimento Interno (Chatbot)",
        category: "Atendimento & Suporte",
        description: "Base de conhecimento + chatbot para dúvidas frequentes de colaboradores e clientes internos.",
        runOn: ["Intranet", "Cloud"],
        tech: ["NLP", "Vectors", "Laravel", "API Integrations"]
    },
    {
        title: "Gestão de Projetos & Kanban Operacional",
        category: "Operações",
        description: "Quadros, sprints, apontamento de horas e indicadores de produtividade por equipe e centro de custo.",
        runOn: ["Servidor", "Cloud"],
        tech: ["Laravel", "Vue/React", "PostgreSQL"]
    },
    {
        title: "Manutenção Preventiva & OEE (Chão de Fábrica)",
        category: "Operações",
        description: "Controle de ativos, calendário de manutenção, OEE e alarmes para paradas não programadas.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "MQTT/IoT opcional", "Timeseries DB"]
    },
    {
        title: "Help Desk + SLA + Base de Conhecimento",
        category: "Atendimento & Suporte",
        description: "Abertura de chamados, fluxos de aprovação, SLAs, categorias e artigos de solução.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "MySQL", "Email/LDAP SSO"]
    },
    {
        title: "RH: Recrutamento, Onboarding & Treinamentos",
        category: "RH & Pessoas",
        description: "Vagas, etapas de seleção, checklists de integração e trilhas de capacitação com certificados.",
        runOn: ["Cloud", "Servidor"],
        tech: ["Laravel", "Storage", "Jobs"]
    },
    {
        title: "Portal do Cliente B2B",
        category: "Vendas & Marketing",
        description: "Área autenticada para pedidos, 2ª via, histórico e abertura de solicitações.",
        runOn: ["Cloud", "Servidor"],
        tech: ["Laravel", "API", "Cache"]
    },
    {
        title: "Roteirização & Logística de Entregas",
        category: "Logística & Frota",
        description: "Roteiros otimizados, janelas de entrega e acompanhamento em tempo real.",
        runOn: ["Cloud"],
        tech: ["Maps API", "Optimization", "Laravel"]
    },
    {
        title: "Frota: Manutenção, Abastecimento & Custos",
        category: "Logística & Frota",
        description: "Registros de manutenção, abastecimentos, alertas e indicadores por veículo.",
        runOn: ["Servidor"],
        tech: ["Laravel", "PostgreSQL"]
    },
    {
        title: "Financeiro Enxuto (Contas, Fluxo & Centro de Custos)",
        category: "Finanças & Compras",
        description: "Contas a pagar/receber, conciliação por extrato e painéis por centro de custo.",
        runOn: ["Servidor", "Cloud"],
        tech: ["Laravel", "Importação OFX/CSV"]
    },
    {
        title: "Gestão de Contratos & Assinaturas",
        category: "Governança & Compliance",
        description: "Cadastro, vencimentos, alertas e fluxo de renovação/assinatura digital.",
        runOn: ["Cloud", "Servidor"],
        tech: ["Laravel", "Storage", "Assinatura Digital"]
    },
    {
        title: "Qualidade: Checklists & Não-Conformidades",
        category: "Operações",
        description: "Auditorias móveis, plano de ação, responsáveis e trilha de evidências.",
        runOn: ["Intranet", "Servidor"],
        tech: ["Laravel", "PWA", "Camera Upload"]
    },
    {
        title: "Agendamento de Serviços & Field Service",
        category: "Atendimento & Suporte",
        description: "Agenda de técnicos, ordens de serviço e relatórios com fotos e assinaturas.",
        runOn: ["Cloud"],
        tech: ["Laravel", "PWA", "Maps API"]
    },
    {
        title: "Documentos, Políticas & Treinamentos (LMS leve)",
        category: "Governança & Compliance",
        description: "Repositório de documentos, versões, aceite de políticas e cursos rápidos.",
        runOn: ["Servidor", "Cloud"],
        tech: ["Laravel", "Storage", "Jobs"]
    },
    {
        title: "Integrações & Robôs de Rotina (RPA leve)",
        category: "TI & Infra",
        description: "Jobs automáticos para importar/exportar dados entre ERPs, planilhas e APIs.",
        runOn: ["Servidor"],
        tech: ["Python", "Laravel Jobs", "APIs"]
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

// Criar card de solução
function createSolutionCard(solution, index) {
    const card = document.createElement('div');
    card.className = 'solution-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Badge Case Real
    const realCaseBadge = solution.isRealCase 
        ? '<div class="real-case-badge">⭐ CASE REAL</div>' 
        : '';
    
    // Badges de execução
    const runOnBadges = solution.runOn
        .map(run => `<span class="badge badge-run">${run}</span>`)
        .join('');
    
    // Badges de tecnologia (limitar a 4)
    const techBadges = solution.tech
        .slice(0, 4)
        .map(tech => `<span class="badge badge-tech">${tech}</span>`)
        .join('');
    
    // URL do WhatsApp
    const whatsappUrl = `https://wa.me/5541991541757?text=Olá, Fábio! Quero conversar sobre a solução "${encodeURIComponent(solution.title)}".`;
    
    card.innerHTML = `
        ${realCaseBadge}
        <div class="card-category">${solution.category}</div>
        <h3 class="card-title">${solution.title}</h3>
        <p class="card-description">${solution.description}</p>
        <div class="card-badges">
            ${runOnBadges}
            ${techBadges}
        </div>
        <a href="${whatsappUrl}" target="_blank" class="card-cta">
            Quero essa solução
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
            solution.tech.some(tech => tech.toLowerCase().includes(currentSearch))
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

