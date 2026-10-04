import React, { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { Search, ChevronDown, Menu, X, ArrowRight, BookOpen, Compass, Award, FolderOpen, User, Layers, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const exploreRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (exploreRef.current && !exploreRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fecha dropdown e mobile menu ao mudar de rota
  useEffect(() => {
    setExploreOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (!headerSearch.trim()) return;
    navigate(`/enciclopedia?q=${encodeURIComponent(headerSearch.trim())}`);
    setHeaderSearch("");
  };

  const isExploreActive =
    location.pathname.startsWith("/enciclopedia") ||
    location.pathname.startsWith("/tema") ||
    location.pathname.startsWith("/area") ||
    location.pathname.startsWith("/setor") ||
    location.pathname === "/areas" ||
    location.pathname === "/setores";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-body antialiased selection:bg-destaque selection:text-white">
      {/* Barra de Notificação Institucional Superior */}
      <div className="bg-petroleo text-slate-100 text-xs py-2 px-4 border-b border-petroleo/20 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>QualiPédia — Enciclopédia Digital Pública de Gestão da Qualidade</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-200">
            <span>53 Temas Documentados</span>
            <span className="opacity-40">|</span>
            <span>20 Guias de Decisão</span>
            <span className="opacity-40">|</span>
            <span className="text-white font-semibold">100% Aberto e Gratuito</span>
          </div>
        </div>
      </div>

      {/* Header Principal do Sistema */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3 gap-4">
            {/* Logo com Monograma Robusto */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-petroleo text-white font-heading font-extrabold text-lg shadow-sm group-hover:bg-destaque transition-colors">
                Q
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold tracking-tight text-xl text-slate-900 leading-none">
                  Quali<span className="text-destaque">Pédia</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-1">
                  Gestão da Qualidade
                </span>
              </div>
            </Link>

            {/* Campo de Busca Visível no Cabeçalho */}
            <form onSubmit={handleHeaderSearch} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Pesquisar ferramenta, norma, ISO..."
                className="w-full h-10 rounded-xl border-2 border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-destaque focus:bg-white focus:ring-2 focus:ring-destaque/10"
              />
            </form>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Início */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                Início
              </NavLink>

              {/* Explorar (Dropdown) */}
              <div className="relative" ref={exploreRef}>
                <button
                  type="button"
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isExploreActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                  aria-expanded={exploreOpen}
                >
                  <span>Explorar</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Painel do Dropdown Explorar */}
                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="space-y-4">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                          Por Categoria
                        </span>
                        <div className="space-y-0.5">
                          {[
                            { to: "/enciclopedia?categoria=Ferramenta", label: "Ferramentas da Qualidade" },
                            { to: "/enciclopedia?categoria=Metodologia", label: "Métodos e Metodologias" },
                            { to: "/enciclopedia?categoria=Norma", label: "Normas e Sistemas (ISO)" },
                            { to: "/enciclopedia?categoria=Indicador", label: "Indicadores e Medição" },
                            { to: "/enciclopedia?categoria=Processo", label: "Processos e Procedimentos" },
                            { to: "/enciclopedia?categoria=Conceito", label: "Conceitos Fundamentais" },
                          ].map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-destaque transition-colors"
                            >
                              <span>{item.label}</span>
                              <ArrowRight className="h-3 w-3 text-slate-400" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1.5">
                          Trilhas Especializadas
                        </span>
                        <div className="space-y-0.5">
                          <Link
                            to="/areas"
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-destaque transition-colors"
                          >
                            <span>Trilhas por Área de Atuação</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </Link>
                          <Link
                            to="/setores"
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-destaque transition-colors"
                          >
                            <span>Trilhas por Setor Econômico</span>
                            <ArrowRight className="h-3 w-3 text-slate-400" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Guia de Decisão */}
              <NavLink
                to="/decisao"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                Guia de Decisão
              </NavLink>

              {/* Métodos Autorais */}
              <NavLink
                to="/metodos-autorais"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                Métodos Autorais
              </NavLink>

              {/* Acervo */}
              <NavLink
                to="/acervo"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                Acervo
              </NavLink>

              {/* Sobre */}
              <NavLink
                to="/sobre"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                Sobre
              </NavLink>
            </nav>

            {/* Botão Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Abrir menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Menu Mobile Retrátil */}
          {mobileOpen && (
            <div className="lg:hidden border-t-2 border-slate-200 py-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
              <form onSubmit={handleHeaderSearch} className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Pesquisar na QualiPédia..."
                  className="w-full h-11 rounded-xl border-2 border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-destaque focus:bg-white"
                />
              </form>

              <div className="space-y-1">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  Início
                </NavLink>

                <div className="pt-2 pb-1 px-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Explorar Enciclopédia
                  </span>
                </div>
                {[
                  { to: "/enciclopedia?categoria=Ferramenta", label: "Ferramentas da Qualidade" },
                  { to: "/enciclopedia?categoria=Metodologia", label: "Métodos e Metodologias" },
                  { to: "/enciclopedia?categoria=Norma", label: "Normas e Sistemas (ISO)" },
                  { to: "/enciclopedia?categoria=Indicador", label: "Indicadores e Medição" },
                  { to: "/enciclopedia?categoria=Processo", label: "Processos e Procedimentos" },
                  { to: "/enciclopedia?categoria=Conceito", label: "Conceitos Fundamentais" },
                  { to: "/areas", label: "Trilhas por Área" },
                  { to: "/setores", label: "Trilhas por Setor" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block px-6 py-2 text-xs font-semibold text-slate-600 hover:text-destaque hover:bg-slate-50 rounded-lg"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-2">
                  <NavLink
                    to="/decisao"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Guia de Decisão
                  </NavLink>
                  <NavLink
                    to="/metodos-autorais"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Métodos Autorais
                  </NavLink>
                  <NavLink
                    to="/acervo"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Acervo
                  </NavLink>
                  <NavLink
                    to="/sobre"
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-bold ${
                        isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    Sobre
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo Principal com largura expandida de sistema digital */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Rodapé Corporativo e Institucional */}
      <Footer />
    </div>
  );
}
