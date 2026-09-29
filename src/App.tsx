import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Compass,
  Heart,
  Menu,
  MessageCircle,
  Moon,
  ScrollText,
  Sun,
  X,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import "./index.css";
type Reading = {
  name: string;
  price: string;
  description: string;
  details: string[];
};
type Category = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  readings: Reading[];
};
const WHATSAPP =
  "https://wa.me/554187458716?text=Olá%20Carol%2C%20gostaria%20de%20agendar%20uma%20leitura.";
const INSTAGRAM = "https://www.instagram.com/caroldasete/";
const TIKTOK = "https://www.tiktok.com/@caroldasetesaias";
const readingWhatsApp = (name: string, price: string) => {
  const message = `Olá Carol! Tenho interesse na leitura "${name}" no valor de ${price}. Gostaria de saber como funciona e agendar.`;
  return `https://wa.me/554187458716?text=${encodeURIComponent(message)}`;
};
const categories: Category[] = [
  {
    id: "amor",
    title: "Amor & Relações",
    subtitle: "Sentimentos, conexões, términos, amizades e novos caminhos afetivos.",
    icon: <Heart size={20} strokeWidth={1.35} />,
    readings: [
      {
        name: "Templo de Afrodite",
        price: "R$ 47,00",
        description: "Uma leitura profunda sobre a dinâmica entre duas pessoas.",
        details: [
          "O que você pensa sobre a pessoa",
          "O que você sente",
          "Seus desejos e intenções",
          "O que a outra pessoa pensa sobre você",
          "O que ela sente",
          "Desejos e intenções dela",
          "Obstáculos entre vocês",
          "Energia atual da conexão",
          "Tendência futura",
          "Possibilidades da relação",
          "Conselho do baralho",
        ],
      },
      {
        name: "Próximo Amor",
        price: "R$ 47,00",
        description: "Para compreender seus caminhos amorosos e a energia de um próximo vínculo.",
        details: [
          "Como estão seus caminhos amorosos",
          "O que precisa ser trabalhado",
          "Possíveis bloqueios",
          "Características do próximo amor",
          "Como essa pessoa pode surgir",
          "Tendência para a relação",
          "Conselho do baralho",
        ],
      },
      {
        name: "Mapa do Amor",
        price: "R$ 57,00",
        description: "Uma visão ampla da relação, sentimentos, intenções e tendências.",
        details: [
          "Energia atual da relação",
          "Seus sentimentos",
          "Sentimentos da outra pessoa",
          "Suas intenções",
          "Intenções da outra pessoa",
          "O que favorece a relação",
          "O que dificulta",
          "Aprendizados da conexão",
          "Futuro próximo",
          "Tendência da relação",
          "Conselho do baralho",
        ],
      },
      {
        name: "Ficar ou Partir",
        price: "R$ 43,00",
        description: "Para momentos em que permanecer ou encerrar uma relação se tornou uma dúvida.",
        details: [
          "Situação atual",
          "O que ainda mantém essa relação",
          "Motivos para permanecer",
          "Motivos para partir",
          "Consequências emocionais",
          "O que pode acontecer se ficar",
          "O que pode acontecer se partir",
          "Tendência futura",
          "Conselho do baralho",
        ],
      },
      {
        name: "Depois do Fim",
        price: "R$ 57,00",
        description: "Para compreender sentimentos, possibilidades e caminhos depois de um término.",
        details: [
          "O que ele(a) está sentindo?",
          "Ele(a) ainda pensa em nós?",
          "Já me superou?",
          "Ainda vamos nos encontrar?",
          "O que eu sinto por ele(a)?",
          "Devo fazer contato?",
          "Se eu fizer, qual o resultado?",
          "Conselho do baralho",
        ],
      },
      {
        name: "Amizade",
        price: "R$ 27,00",
        description: "Uma leitura de 5 cartas para compreender melhor uma amizade.",
        details: [
          "Qual energia essa amizade traz para minha vida?",
          "É uma amizade verdadeira?",
          "O que eu preciso saber sobre essa amizade?",
          "Qual o meu papel nessa amizade?",
          "Conselho do baralho",
        ],
      },
    ],
  },
  {
    id: "caminhos",
    title: "Caminhos & Decisões",
    subtitle: "Questões diretas, escolhas importantes e situações que precisam de clareza.",
    icon: <Compass size={20} strokeWidth={1.35} />,
    readings: [
      {
        name: "Pergunta Objetiva",
        price: "a partir de R$ 13,00",
        description: "Para questões mais diretas, com resposta objetiva e orientação das cartas.",
        details: ["1 pergunta | R$ 13,00", "2 perguntas | R$ 24,00", "3 perguntas | R$ 33,00"],
      },
      {
        name: "Pergunta Detalhada",
        price: "a partir de R$ 20,00",
        description: "Para situações que precisam de uma análise mais aprofundada.",
        details: ["1 pergunta | R$ 20,00", "2 perguntas | R$ 37,00", "3 perguntas | R$ 53,00"],
      },
      {
        name: "Devo Confiar Nessa Pessoa?",
        price: "R$ 33,00",
        description: "Uma leitura para compreender melhor quem está diante de você.",
        details: [
          "O que essa pessoa aparenta ser",
          "Quem ela realmente é",
          "Quais são suas intenções",
          "Orientação das cartas",
        ],
      },
      {
        name: "Devo Tomar Essa Decisão?",
        price: "R$ 33,00",
        description: "Para analisar uma escolha importante antes de seguir um caminho.",
        details: [
          "Energia da situação",
          "Pontos favoráveis",
          "Pontos de atenção",
          "Possíveis consequências",
          "Orientação das cartas",
        ],
      },
    ],
  },
  {
    id: "profissional",
    title: "Trabalho & Finanças",
    subtitle: "Carreira, oportunidades, dinheiro e desenvolvimento profissional.",
    icon: <BriefcaseBusiness size={20} strokeWidth={1.35} />,
    readings: [
      {
        name: "Emprego Atual",
        price: "R$ 47,00",
        description: "Uma análise do momento profissional e das possibilidades dentro do trabalho atual.",
        details: [
          "Como sou visto no meu local de trabalho?",
          "Como me sinto no meu local de trabalho?",
          "Existe possibilidade de evolução profissional?",
          "A área profissional em que estou é favorável para mim?",
          "Como posso me destacar no trabalho?",
          "Devo buscar nova oportunidade ou focar no emprego atual?",
          "Conselho do baralho",
        ],
      },
      {
        name: "Novo Emprego",
        price: "R$ 37,00",
        description: "Para quem deseja compreender os caminhos em direção a uma nova oportunidade.",
        details: [
          "Meus caminhos profissionais estão abertos?",
          "Na mesma área?",
          "O que preciso desenvolver para conseguir um novo emprego?",
          "Vai ser abundante?",
        ],
      },
      {
        name: "Financeiro | Método Ferradura",
        price: "R$ 57,00",
        description: "Uma leitura ampla sobre o momento financeiro e suas tendências.",
        details: [
          "Situação financeira atual",
          "Dificuldades e obstáculos",
          "Influência de pessoas",
          "Influências externas",
          "O que devo aprender ou melhorar?",
          "Conselho do baralho",
          "Efeito e impacto",
          "Tendências futuras",
        ],
      },
    ],
  },
  {
    id: "ciclos",
    title: "Leituras de Ciclo",
    subtitle: "Uma visão das energias, tendências e orientações para os próximos períodos.",
    icon: <Moon size={20} strokeWidth={1.35} />,
    readings: [
      {
        name: "Leitura Semanal",
        price: "R$ 33,00",
        description: "Indicada para quem deseja se preparar para os próximos dias.",
        details: [
          "Principais energias da semana",
          "Oportunidades",
          "Desafios",
          "Áreas que merecem atenção",
          "Orientações para conduzir o período com mais clareza e equilíbrio",
        ],
      },
      {
        name: "Leitura Mensal",
        price: "R$ 97,00",
        description: "Uma visão geral das energias que estarão presentes ao longo do mês.",
        details: [
          "Tendências do mês",
          "Oportunidades",
          "Desafios",
          "Energias de cada fase do ciclo",
          "Conselhos para aproveitar melhor o período",
        ],
      },
    ],
  },
];
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>("amor");
  const [openReading, setOpenReading] = useState<string | null>(null);
  useEffect(() => {
    let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.type = "image/png";
    favicon.href = "/favicon.png";
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const toggleCategory = (id: string) => {
    setOpenCategory((current) => (current === id ? null : id));
    setOpenReading(null);
  };
  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Carol da Sete">
            <span className="brand-logo">
              <img src="/logo.jpeg" alt="" />
            </span>
            <span className="brand-name">Carol da Sete</span>
          </button>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <button onClick={() => scrollTo("inicio")}>Início</button>
            <button onClick={() => scrollTo("leituras")}>Leituras</button>
            <button onClick={() => scrollTo("consulta")}>Consulta</button>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
          </nav>
          <a className="header-contact" href={WHATSAPP} target="_blank" rel="noreferrer">
            Agendar
            <ArrowUpRight size={15} />
          </a>
          <button
            className={`menu-trigger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-inner">
              <nav>
                <button onClick={() => scrollTo("inicio")}>Início</button>
                <button onClick={() => scrollTo("sobre")}>Sobre</button>
                <button onClick={() => scrollTo("leituras")}>Leituras</button>
                <button onClick={() => scrollTo("consulta")}>Consulta</button>
              </nav>
              <div className="mobile-socials">
                <a href={INSTAGRAM} target="_blank" rel="noreferrer"><FaInstagram /> Instagram</a>
                <a href={TIKTOK} target="_blank" rel="noreferrer"><FaTiktok /> TikTok</a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <section className="hero" id="inicio">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48 }}
          >
            <h1>
              <span>Carol</span>
              <em>da Sete</em>
            </h1>
            <p className="hero-lead">
              O tarot como caminho para enxergar com mais clareza aquilo que o momento ainda não revelou.
            </p>
            <p className="hero-text">
              Leituras para questões afetivas, profissionais, financeiras e para os ciclos que pedem uma nova perspectiva.
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollTo("leituras")}>
                Ver leituras
                <ArrowUpRight size={16} />
              </button>
              <a className="text-action" href={WHATSAPP} target="_blank" rel="noreferrer">
                Agendar
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <img src="/hero.png" alt="" aria-hidden="true" />
          </motion.div>
</section>
        <section className="manifesto" id="sobre">
          <motion.div
            className="manifesto-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span>CAROL DA SETE</span>
            <h2>Entre cartas,<br />caminhos e <i>clareza.</i></h2>
          </motion.div>
          <motion.div
            className="manifesto-copy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <p>
              Meu nome é Carolina, mas pode me chamar de Carol. Minha conexão com a espiritualidade começou ainda muito cedo. Com o tempo, encontrei no tarot uma forma de acolher, orientar e ajudar outras pessoas a compreenderem melhor seus próprios caminhos.
            </p>
            <p>
              O nome <strong>Carol da Sete</strong> nasce também da minha ligação com Dona Sete Saias, presença que representa para mim proteção, orientação e caminho.
            </p>
            <p>
              Nas cartas, busco trazer clareza, autoconhecimento e novas perspectivas para cada momento vivido.
            </p>
            <div className="manifesto-note">
              <ScrollText size={22} strokeWidth={1.15} />
              <span>Cada leitura parte de uma questão única. O método acompanha aquilo que você precisa compreender.</span>
            </div>
          </motion.div>
        </section>
        <section className="readings-section" id="leituras">
          <div className="readings-intro">
            <div>
              <span className="micro-label">MÉTODOS</span>
              <h2>Comece pela sua <i>questão.</i></h2>
            </div>
          </div>
          <div className="categories">
            {categories.map((category, categoryIndex) => {
              const isOpen = openCategory === category.id;
              return (
                <motion.div
                  className={`category ${isOpen ? "category-open" : ""}`}
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.06 }}
                >
                  <button className="category-header" onClick={() => toggleCategory(category.id)}>
                    <div className="category-left">
                      <span className="category-icon">{category.icon}</span>
                      <span>
                        <strong>{category.title}</strong>
                        <small>{category.subtitle}</small>
                      </span>
                    </div>
                    <span className="category-toggle">
                      {isOpen ? "FECHAR" : "VER MÉTODOS"}
                      <ChevronDown size={17} className={isOpen ? "chevron-open" : ""} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="readings-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="readings-grid">
                          {category.readings.map((reading, index) => {
                            const readingId = `${category.id}-${index}`;
                            const readingOpen = openReading === readingId;
                            return (
                              <article className="reading-card" key={reading.name}>
                                <div className="reading-card-head">
                                  <span className="reading-price">{reading.price}</span>
                                  <a href={readingWhatsApp(reading.name, reading.price)} target="_blank" rel="noreferrer" className="reading-book-button">
                                    <FaWhatsapp />
                                    AGENDAR
                                  </a>
                                </div>
                                <h3>{reading.name}</h3>
                                <p>{reading.description}</p>
                                <button
                                  className="details-button"
                                  onClick={() => setOpenReading(readingOpen ? null : readingId)}
                                >
                                  {readingOpen ? "Ocultar detalhes" : "O que a leitura analisa"}
                                  <ChevronDown size={15} className={readingOpen ? "chevron-open" : ""} />
                                </button>
                                <AnimatePresence initial={false}>
                                  {readingOpen && (
                                    <motion.div
                                      className="reading-details"
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                    >
                                      <div>
                                        {reading.details.map((detail) => (
                                          <p key={detail}>
                                            <span className="detail-mark" />
                                            {detail}
                                          </p>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </article>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section className="consultation" id="consulta">
            <div className="consultation-background" aria-hidden="true" />
<motion.div
            className="consultation-copy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="micro-label">DO PRIMEIRO CONTATO À LEITURA</span>
            <h2>Sem ritual complicado.<br /><i>Você chega com a questão.</i></h2>
            <p>
              Escolha o tema que mais se aproxima do que você vive agora. Se ainda não souber qual método faz sentido, fale comigo e eu te ajudo a encontrar a leitura adequada.
            </p>
            <div className="consultation-flow">
              <div>
                <span><MessageCircle size={19} /></span>
                <p><strong>Me conte a questão</strong> pelo WhatsApp.</p>
              </div>
              <div>
                <span><ScrollText size={19} /></span>
                <p><strong>Definimos a leitura</strong> que melhor se encaixa.</p>
              </div>
              <div>
                <span><Sun size={19} /></span>
                <p><strong>As cartas são abertas</strong> para a sua situação.</p>
              </div>
            </div>
            <a className="consultation-button" href={WHATSAPP} target="_blank" rel="noreferrer">
              Conversar com Carol
              <FaWhatsapp />
            </a>
          </motion.div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/logo.jpeg" alt="Carol da Sete" />
          </div>
          <div className="footer-call">
            <span>CAROL DA SETE</span>
            <h2>Quer conversar<br />sobre a sua <i>questão?</i></h2>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              Chamar no WhatsApp
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="footer-networks">
            <p>Acompanhe meu trabalho</p>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              <FaInstagram /> Instagram <ArrowUpRight size={14} />
            </a>
            <a href={TIKTOK} target="_blank" rel="noreferrer">
              <FaTiktok /> TikTok <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Carol da Sete</span>
          <button onClick={() => scrollTo("inicio")}>Voltar ao início ↑</button>
        </div>
      </footer>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="Agendar pelo WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
export default App;
