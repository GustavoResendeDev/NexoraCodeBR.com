/*1. Motor de Canvas para Fundo com Partículas Dinâmicas */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#00E5FF";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor(width / 15), 70);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Linhas de conexão cibernética sutis entre partículas próximas.

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* 2. Animações com Scroll Observer (Revelar ao rolar) */

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* 3. Alternador de navegação por gaveta para dispositivos móveis */

const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

/* 4. Mecanismo de filtragem interativa de catálogo */

const filterBtns = document.querySelectorAll(".filter-btn");
const catalogItems = document.querySelectorAll(".catalog-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active", "bg-cyan-glow", "text-obsidian-950");
      b.classList.add("glass-panel", "text-slate-300");
    });

    btn.classList.add("active", "bg-cyan-glow", "text-obsidian-950");
    btn.classList.remove("glass-panel", "text-slate-300");

    const filter = btn.getAttribute("data-filter");

    catalogItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* 5. Sistema de Pré-visualização Dinâmica em Modal (EM TESTES) */

const modalData = {
  "cardapio-gourmet": {
    title: "Cardápio Digital Premium QR Code",
    category: "Gastronomia & Restaurantes",
    icon: "fa-qrcode",
    delivery: "3 a 5 dias úteis",
    description:
      "Interface exclusiva para restaurantes de alto padrão, bistrôs e pubs. Permite que seus clientes escaneiem a mesa e visualizem os pratos com fotos em alta definição, descrições detalhadas e preço atualizado em tempo real.",
    features: [
      "✓ Sem taxas por pedido ou comissão",
      "✓ Painel de alteração de preços pelo celular",
      "✓ QR Codes em alta resolução prontos para impressão",
      "✓ Chamada rápida de garçom para a mesa",
      "✓ Suporte para múltiplos idiomas e categorias",
      "✓ QR Code personalizado com a sua marca",
    ],
    visualHtml: `
                    <div class="flex flex-col sm:flex-row items-center gap-6">
                        <div class="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 border-2 border-cyan-glow">
                            <i class="fa-solid fa-qrcode text-obsidian-950 text-7xl"></i>
                        </div>
                        <div class="space-y-2">
                            <span class="text-xs text-cyan-glow font-space">SIMULAÇÃO DE EXPERIÊNCIA DO CLIENTE</span>
                            <div class="text-white font-syne font-bold text-lg">Menu Gourmet Interativo</div>
                            <p class="text-slate-400 text-xs">Aponte a câmera do smartphone para o QR Code na mesa e navegue pelo cardápio digital sem baixar aplicativos.</p>
                        </div>
                    </div>
                `,
  },
  "landing-saas": {
    title: "Landing Page de Alta Conversão",
    category: "Startups & Empresas",
    icon: "fa-rocket",
    delivery: "5 a 7 dias úteis",
    description:
      "Desenvolvida especificamente para captar a atenção do visitante em poucos segundos. Inclui micro-animações, tempo de carregamento inferior a 1 segundo e integrações diretas com sistemas de vendas ou WhatsApp.",
    features: [
      "✓ Pontuação 95+ no Google PageSpeed",
      "✓ Copywriting e estrutura direcionada para vendas",
      "✓ Formulário de captura de leads integrado",
      "✓ Certificado de Segurança SSL incluído",
      "✓ 100% Otimizado para Smartphones",
      "✓ Otimização de SEO Inicial",
    ],
    visualHtml: `
                    <div class="p-4 bg-obsidian-900 rounded-lg border border-cyan-glow/30 flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400 font-space">GOOGLE PAGESPEED SCORE</div>
                            <div class="text-2xl font-bold text-emerald-400 font-space">100 / 100 PERFEITO</div>
                        </div>
                        <i class="fa-solid fa-gauge-high text-cyan-glow text-3xl"></i>
                    </div>
                `,
  },
  "dashboard-erp": {
    title: "Painel Gestão ERP & Analytics",
    category: "Softwares Customizados",
    icon: "fa-chart-line",
    delivery: "Sob Análise Técnica",
    description:
      "Plataforma administrativa personalizada para automação de processos internos. Acompanhe gráficos em tempo real, fluxo de caixa, controle de estoque e permissões de usuários.",
    features: [
      "✓ Autenticação segura com níveis de acesso",
      "✓ Gráficos e Relatórios em Tempo Real",
      "✓ Exportação de relatórios em PDF/Excel",
      "✓ Arquitetura em Nuvem Escalável",
      "✓ Integrações via API RESTful",
      "✓ Backup Automático Diário",
    ],
    visualHtml: `
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs text-slate-300 font-space">
                            <span>Processamento de Vendas em Tempo Real</span>
                            <span class="text-cyan-glow">● Servidor Ativo</span>
                        </div>
                        <div class="h-3 rounded-full bg-obsidian-900 overflow-hidden border border-cyan-glow/30">
                            <div class="w-4/5 h-full bg-cyan-glow"></div>
                        </div>
                    </div>
                `,
  },
  "ecommerce-store": {
    title: "Loja Virtual Ultra Otimizada",
    category: "E-Commerce & Vendas",
    icon: "fa-cart-shopping",
    delivery: "7 a 10 dias úteis",
    description:
      "Sua loja online moderna com checkout simplificado, integração nativa com pagamento via PIX, Cartão de Crédito e cálculo automático de frete Correios/Melhor Envio.",
    features: [
      "✓ Checkout Transparente e Rápido",
      "✓ Gestão simples de produtos e estoque",
      "✓ Cupom de desconto e promoções",
      "✓ Integração com Meta Pixel & Google Analytics",
      "✓ Notificações de vendas no WhatsApp",
    ],
    visualHtml: `
                    <div class="p-4 bg-emerald-950/40 rounded-lg border border-emerald-500/30 flex justify-between items-center">
                        <div>
                            <div class="text-xs text-emerald-400 font-space">PAGAMENTO INSTANTÂNEO</div>
                            <div class="text-white font-bold text-sm">Aprovação Automática via PIX</div>
                        </div>
                        <i class="fa-solid fa-bolt text-emerald-400 text-2xl"></i>
                    </div>
                `,
  },
  "portal-medico": {
    title: "Portal Clínico & Agendamento",
    category: "Saúde & Especialistas",
    icon: "fa-notes-medical",
    delivery: "5 a 8 dias úteis",
    description:
      "Site institucional corporativo para clínicas, médicos e dentistas. Facilita o agendamento de consultas pelo próprio paciente e transmite credibilidade profissional.",
    features: [
      "✓ Sistema de Agendamento Online",
      "✓ Apresentação da Equipe Médica e Especialidades",
      "✓ Localização integrada com Google Maps",
      "✓ Botão rápido de emergência / WhatsApp",
      "✓ Conformidade com diretrizes éticas",
    ],
    visualHtml: `
                    <div class="p-4 bg-blue-950/40 rounded-lg border border-blue-500/30">
                        <div class="text-xs text-blue-300 font-space mb-1">MÓDULO DE AGENDAMENTO</div>
                        <div class="text-white font-bold text-sm">Sincronização com Google Agenda do Médico</div>
                    </div>
                `,
  },
  "cardapio-fastfood": {
    title: "Cardápio QR & Autoatendimento Fast Food",
    category: "Hamburguerias & Delivery",
    icon: "fa-burger",
    delivery: "3 a 5 dias úteis",
    description:
      "Ideal para hamburguerias, pizzarias e lanchonetes. Permite montar adicionais do pedido passo a passo (ex: ponto da carne, molhos extras) e enviar tudo organizado.",
    features: [
      "✓ Montagem do pedido passo a passo",
      "✓ Impressão direta na cozinha ou envio WhatsApp",
      "✓ Atualização imediata de itens fora de estoque",
      "✓ Suporte para balcão ou mesa",
      "✓ Sem taxas por pedido efetuado",
    ],
    visualHtml: `
                    <div class="p-4 bg-red-950/40 rounded-lg border border-red-500/30">
                        <div class="text-xs text-red-300 font-space mb-1">MONTAGEM PERSONALIZADA</div>
                        <div class="text-white font-bold text-sm">Opção de Adicionais & Opcionais em 1 Clique</div>
                    </div>
                `,
  },
};

const modalBackdrop = document.getElementById("modal-backdrop");
const modalContainer = document.getElementById("modal-container");

function openModal(modelKey) {
  const data = modalData[modelKey];
  if (!data) return;

  document.getElementById("modal-title").innerText = data.title;
  document.getElementById("modal-category").innerText = data.category;
  document.getElementById("modal-description").innerText = data.description;
  document.getElementById("modal-delivery-time").innerText = data.delivery;
  document.getElementById("modal-badge-icon").innerHTML =
    `<i class="fa-solid ${data.icon}"></i>`;
  document.getElementById("modal-visual-stage").innerHTML = data.visualHtml;

  const featuresList = document.getElementById("modal-features-list");
  featuresList.innerHTML = "";
  data.features.forEach((feat) => {
    const li = document.createElement("li");
    li.innerText = feat;
    featuresList.appendChild(li);
  });

  const waMsg = encodeURIComponent(
    `Olá NEXORA! Gostaria de mais informações sobre o modelo: ${data.title}`,
  );
  document.getElementById("modal-whatsapp-link").href =
    `https://wa.me/message/OCB7LETXQXXVC1?text=${waMsg}`;

  modalBackdrop.classList.remove("hidden");
  setTimeout(() => {
    modalBackdrop.classList.remove("opacity-0");
    modalContainer.classList.remove("scale-95");
    modalContainer.classList.add("scale-100");
  }, 10);
}

function closeModal() {
  modalBackdrop.classList.add("opacity-0");
  modalContainer.classList.remove("scale-100");
  modalContainer.classList.add("scale-95");
  setTimeout(() => {
    modalBackdrop.classList.add("hidden");
  }, 300);
}

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

/* 6. Lógica da Calculadora de Orçamento em Tempo Real */

let currentBasePrice = 499;
let currentProjectName = "Website";
let currentBaseTime = 5;

const calcTypeBtns = document.querySelectorAll(".calc-type-btn");
const calcAddonChecks = document.querySelectorAll(".calc-addon-check");

function updateCalculatorTotal() {
  let total = currentBasePrice;
  let addonsSelected = [];

  calcAddonChecks.forEach((check) => {
    if (check.checked) {
      total += parseInt(check.getAttribute("data-price"));
      addonsSelected.push(check.getAttribute("data-name"));
    }
  });

  document.getElementById("summary-project-name").innerText =
    currentProjectName;
  document.getElementById("summary-addons-count").innerText =
    `${addonsSelected.length} selecionados`;
  document.getElementById("summary-time").innerText =
    `~ ${currentBaseTime} dias úteis`;
  document.getElementById("summary-total-price").innerText =
    `R$ ${total.toLocaleString("pt-BR")},00`;

  // Prepare WhatsApp link
  let addonsText =
    addonsSelected.length > 0
      ? addonsSelected.join(", ")
      : "Nenhum adicional extra";
  let waMsg =
    `Olá NEXORA SOFTWARE! Fiz uma simulação pelo site:\n\n` +
    `📌 *Projeto:* ${currentProjectName}\n` +
    `⚙️ *Recursos:* ${addonsText}\n` +
    `⏱️ *Prazo Estimado:* ~${currentBaseTime} dias\n` +
    `💰 *Valor Estimado:* R$ ${total.toLocaleString("pt-BR")},00\n\n` +
    `Gostaria de dar andamento no orçamento!`;

  document.getElementById("send-whatsapp-quote-btn").onclick = function () {
    // RESOLUÇÃO: Use o formato padrão do WhatsApp com o número de telefone
    // Coloque DDI (55) + DDD + Número sem espaços ou traços
    const numeroWhatsApp = "5562994560511";

    window.open(
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(waMsg)}`,
      "_blank",
    );

    // Obs: Se 'wa.me' falhar em algum navegador, uma alternativa super robusta é:
    // window.open(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(waMsg)}`, '_blank');
  };
}

calcTypeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calcTypeBtns.forEach((b) => {
      b.classList.remove("active", "border-cyan-glow", "bg-cyan-glow/10");
      b.classList.add("border-cyan-glow/20", "bg-obsidian-950");
    });

    btn.classList.add("active", "border-cyan-glow", "bg-cyan-glow/10");
    btn.classList.remove("border-cyan-glow/20", "bg-obsidian-950");

    currentBasePrice = parseInt(btn.getAttribute("data-price"));
    currentBaseTime = parseInt(btn.getAttribute("data-time"));

    const typeKey = btn.getAttribute("data-type");
    if (typeKey === "website") currentProjectName = "Website ";
    if (typeKey === "cardapio") currentProjectName = "Cardápio";
    if (typeKey === "automacao") currentProjectName = "Automação";

    updateCalculatorTotal();
  });
});

calcAddonChecks.forEach((check) => {
  check.addEventListener("change", updateCalculatorTotal);
});

updateCalculatorTotal();

/* 7. FAQ Accordion Logic */

const faqToggles = document.querySelectorAll(".faq-toggle");

faqToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector("i");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.classList.remove("rotate-45");
    } else {
      document
        .querySelectorAll(".faq-content")
        .forEach((c) => (c.style.maxHeight = null));
      document
        .querySelectorAll(".faq-toggle i")
        .forEach((i) => i.classList.remove("rotate-45"));

      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("rotate-45");
    }
  });
});

/* 8. FORMULARIO DA SEÇÃO CONTATO (DESATIVADA TEMPORARIAMENTE)

const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status-msg");
const btnEnviar = document.getElementById("btn-enviar-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Impede a página de recarregar

  // Muda o texto do botão para indicar carregamento

  const textoOriginalBotao = btnEnviar.innerText;
  btnEnviar.innerText = "Enviando...";
  btnEnviar.disabled = true;

  // 1. Captura os dados que o cliente digitou

  const dadosFormulario = {
    nome: document.getElementById("lead-nome").value,
    whatsapp: document.getElementById("lead-whatsapp").value,
    interesse: document.getElementById("lead-interesse").value,
    detalhes: document.getElementById("lead-detalhes").value,
    data: new Date().toLocaleString("pt-BR"),
  };

  const webhookUrl =
    "https://nexorasoftware.app.n8n.cloud/webhook-test/89d9067c-a5d0-4df9-9f14-f403b6103c15";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosFormulario),
    });

    if (!response.ok) throw new Error("Falha ao enviar");

    setTimeout(() => {
      // Mostra a mensagem de sucesso
      statusMsg.classList.remove("hidden");

      // Limpa o formulário
      contactForm.reset();

      // Restaura o botão
      btnEnviar.innerText = textoOriginalBotao;
      btnEnviar.disabled = false;

      // Esconde a mensagem depois de 5 segundos
      setTimeout(() => {
        statusMsg.classList.add("hidden");
      }, 5000);
    }, 1500);
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    btnEnviar.innerText = "Erro ao enviar. Tente pelo WhatsApp.";
    btnEnviar.classList.replace("bg-cyan-glow", "bg-red-500");

    setTimeout(() => {
      btnEnviar.innerText = textoOriginalBotao;
      btnEnviar.classList.replace("bg-red-500", "bg-cyan-glow");
      btnEnviar.disabled = false;
    }, 3000);
  }
});*/
