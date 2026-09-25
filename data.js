const QUALIPEDIA = {
 "enciclopedia": [
  {
   "titulo": "PDCA",
   "categoria": "Ciclo de melhoria",
   "conceito": "Ciclo de melhoria contínua: Plan (planejar), Do (executar), Check (verificar), Act (agir/ajustar). Base da gestão da qualidade.",
   "como": [
    "Plan: definir objetivo, critérios e pesos do que será melhorado",
    "Do: executar em escala controlada",
    "Check: medir com indicadores e comparar com o plano",
    "Act: padronizar o que funcionou e ajustar o que não funcionou"
   ],
   "exemplos": "Rotina de melhoria contínua de processos em qualquer setor.",
   "onde": "Aplicado no ciclo de avaliação mensal: Plan = definir critérios/pesos; Do = avaliar 5+ atendimentos/analista; Check = indicadores QA/IEPC por ciclo; Act = PDI e ajustes de critérios."
  },
  {
   "titulo": "ISO 9001:2015",
   "categoria": "Norma",
   "conceito": "Norma de sistemas de gestão da qualidade: baseada em ciclo PDCA, pensamento baseado em riscos e melhoria contínua.",
   "como": [
    "Mapear processos e seus riscos",
    "Definir política e objetivos da qualidade",
    "Documentar procedimentos e registros",
    "Auditar e revisar periodicamente"
   ],
   "exemplos": "Estruturação de sistema de gestão, certificação de empresas.",
   "onde": "Minha estrutura documental: Manual da Qualidade v1.1 [CONTROLADO], Manual Técnico QA e IEPC, Procedimento PR-NC-001."
  },
  {
   "titulo": "Diagrama de Ishikawa",
   "categoria": "7 clássicas",
   "conceito": "Diagrama de causa e efeito (espinha de peixe): organiza possíveis causas de um problema por categorias (6M: método, material, mão de obra, máquina, medição, meio ambiente).",
   "como": [
    "Definir o efeito/problema na cabeça do peixe",
    "Brainstormar causas por categoria",
    "Aprofundar com 5 Porquês",
    "Priorizar causas prováveis e validar com dados"
   ],
   "exemplos": "Análise de causas de problemas recorrentes.",
   "onde": "Análise de causas de não conformidades recorrentes no atendimento."
  },
  {
   "titulo": "5W2H",
   "categoria": "Planejamento",
   "conceito": "Plano de ação estruturado: What (o quê), Why (por quê), Where (onde), When (quando), Who (quem), How (como), How much (quanto custa).",
   "como": [
    "Descrever a ação respondendo as 7 perguntas",
    "Definir responsável e prazo",
    "Acompanhar até a conclusão"
   ],
   "exemplos": "Planos de ação de correção e prevenção.",
   "onde": "Planos de ação de correção de não conformidades."
  },
  {
   "titulo": "Indicadores de qualidade",
   "categoria": "Medição",
   "conceito": "Métricas que traduzem desempenho em números comparáveis no tempo. Um bom indicador tem fórmula clara, fonte definida e periodicidade.",
   "como": [
    "Definir o que importa medir (ligado ao objetivo)",
    "Construir fórmula e fonte de dados",
    "Estabelecer meta e periodicidade",
    "Analisar tendência, não só o valor isolado"
   ],
   "exemplos": "Painéis de gestão, acompanhamento de processos.",
   "onde": "Construção do sistema QA/IEPC com pesos formais e consolidação por ciclo (75,0 → 83,8 QA; 76,8 → 85,0 IEPC)."
  },
  {
   "titulo": "Auditoria (interna) de qualidade",
   "categoria": "Governança",
   "conceito": "Verificação sistemática e independente da conformidade de processos, registros e procedimentos.",
   "como": [
    "Planejar escopo e critérios",
    "Coletar evidências (amostras, registros)",
    "Registrar não conformidades com evidência objetiva",
    "Acompanhar ações corretivas"
   ],
   "exemplos": "Auditorias internas de sistema de gestão.",
   "onde": "Auditoria interna da qualidade com dupla avaliação e calibragem entre avaliadores."
  },
  {
   "titulo": "Gestão de Não Conformidades",
   "categoria": "Governança",
   "conceito": "Identificar, registrar, tratar e prevenir desvios de requisitos. Fluxo padrão: identificar → tratar → prevenir.",
   "como": [
    "Registrar a NC com evidência objetiva",
    "Classificar por categoria e severidade",
    "Tratar a causa (ação corretiva)",
    "Verificar eficácia e prevenir recorrência"
   ],
   "exemplos": "Controle de desvios em processos e produtos.",
   "onde": "Procedimento PR-NC-001 com 5 categorias: Postura e Ética; Acuracidade e Rigor Técnico; Conformidade de Registro; Integridade do Fluxo Operacional; Segurança da Informação (penalidade -20 pts cada)."
  },
  {
   "titulo": "Fluxograma",
   "categoria": "7 clássicas",
   "conceito": "Mapa visual das etapas de um processo, com símbolos padrão (oval = início/fim, retângulo = atividade, losango = decisão).",
   "como": [
    "Definir limites (início e fim) do processo",
    "Listar etapas na ordem real de execução",
    "Desenhar e revisar com quem executa",
    "Identificar gargalos, retrabalho e redundâncias"
   ],
   "exemplos": "Mapear processos antes de padronizar ou medir.",
   "onde": ""
  },
  {
   "titulo": "Folha de Verificação (Check Sheet)",
   "categoria": "7 clássicas",
   "conceito": "Formulário simples para coletar e organizar dados no momento em que o fato ocorre.",
   "como": [
    "Definir o que será registrado",
    "Criar categorias claras e mutuamente exclusivas",
    "Registrar imediatamente no fato",
    "Tabular ao final do período"
   ],
   "exemplos": "Coleta estruturada de dados operacionais.",
   "onde": "Registros de não conformidades e elogios por categoria, nas planilhas consolidadas dos ciclos de avaliação."
  },
  {
   "titulo": "Diagrama de Pareto",
   "categoria": "7 clássicas",
   "conceito": "Princípio 80/20: poucas causas concentram a maior parte dos efeitos. Gráfico de barras ordenado com percentual acumulado.",
   "como": [
    "Coletar frequência de ocorrências por causa",
    "Ordenar de forma decrescente",
    "Calcular percentual acumulado",
    "Priorizar as primeiras barras"
   ],
   "exemplos": "Decidir por onde começar quando há muitos problemas.",
   "onde": ""
  },
  {
   "titulo": "Histograma",
   "categoria": "7 clássicas",
   "conceito": "Gráfico de distribuição de frequência de uma variável, mostrando concentração, assimetria e caudas.",
   "como": [
    "Coletar os dados",
    "Dividir em classes",
    "Plotar frequências",
    "Interpretar a forma da distribuição"
   ],
   "exemplos": "Ver como as notas de avaliação se distribuem entre analistas e ciclos.",
   "onde": ""
  },
  {
   "titulo": "Diagrama de Dispersão",
   "categoria": "7 clássicas",
   "conceito": "Mostra a relação entre duas variáveis através de pontos plotados em pares.",
   "como": [
    "Definir pares de variáveis suspeitas de correlação",
    "Plotar os pontos",
    "Observar padrão (positivo, negativo ou sem relação)"
   ],
   "exemplos": "Testar hipóteses como 'volume de atendimento x nota de qualidade'.",
   "onde": ""
  },
  {
   "titulo": "Carta de Controle (CEP)",
   "categoria": "7 clássicas",
   "conceito": "Monitora a estabilidade de um processo no tempo, com limite superior, média central e limite inferior calculados estatisticamente.",
   "como": [
    "Coletar medidas ao longo do tempo",
    "Calcular limites estatísticos",
    "Plotar os pontos",
    "Agir apenas em sinais fora dos limites (causa especial)"
   ],
   "exemplos": "Monitoramento contínuo de processos industriais e operacionais.",
   "onde": ""
  },
  {
   "titulo": "5 Porquês",
   "categoria": "Análise de causa",
   "conceito": "Aprofundar até a causa raiz perguntando 'por quê?' sucessivamente (cerca de 5 vezes, ou até a causa ser acionável).",
   "como": [
    "Partir do problema",
    "Perguntar por que ocorreu",
    "Repetir sobre cada resposta",
    "Parar na causa fundamental e corrigir ali"
   ],
   "exemplos": "Investigação rápida de causas de desvios.",
   "onde": ""
  },
  {
   "titulo": "Brainstorming",
   "categoria": "Criatividade",
   "conceito": "Geração de ideias em grupo sem julgamento durante a fase de geração; a filtragem vem depois.",
   "como": [
    "Definir claramente a pergunta",
    "Gerar sem criticar",
    "Registrar tudo",
    "Depois filtrar e priorizar (ex.: matriz de priorização)"
   ],
   "exemplos": "Levantamento de causas e soluções com equipes.",
   "onde": ""
  },
  {
   "titulo": "Matriz GUT",
   "categoria": "Priorização",
   "conceito": "Prioriza problemas por Gravidade, Urgência e Tendência, cada critério pontuado de 1 a 5.",
   "como": [
    "Listar os problemas",
    "Pontuar G, U e T para cada um",
    "Multiplicar ou somar",
    "Ordenar e atacar os maiores escores"
   ],
   "exemplos": "Definir agenda de tratamento quando tudo parece urgente.",
   "onde": ""
  },
  {
   "titulo": "5S",
   "categoria": "Organização",
   "conceito": "Organização do ambiente de trabalho: Seiri (uso/separar), Seiton (ordenação), Seiso (limpeza), Seiketsu (padronização), Shitsuke (disciplina).",
   "como": [
    "Diagnosticar o ambiente",
    "Aplicar cada S em sequência",
    "Manter rotina leve de auditoria contínua"
   ],
   "exemplos": "Organização de postos de trabalho, documentação e sistemas.",
   "onde": ""
  },
  {
   "titulo": "Kaizen",
   "categoria": "Melhoria contínua",
   "conceito": "Melhoria contínua em pequenos passos, com participação de todos e baixo investimento.",
   "como": [
    "Identificar pequenos desperdícios",
    "Implementar melhorias rápidas",
    "Padronizar o que funcionou",
    "Repetir o ciclo"
   ],
   "exemplos": "Cultura de melhoria em times operacionais.",
   "onde": ""
  },
  {
   "titulo": "Poka-Yoke",
   "categoria": "Prevenção de erro",
   "conceito": "Dispositivos ou rotinas à prova de erro: prevenir o erro em vez de detectá-lo depois.",
   "como": [
    "Mapear onde erros humanos ocorrem",
    "Criar barreiras físicas ou lógicas (checklist obrigatório, campo validado)",
    "Testar a barreira"
   ],
   "exemplos": "Formulários que não deixam enviar incompletos, checklists de qualidade.",
   "onde": ""
  },
  {
   "titulo": "FMEA",
   "categoria": "Análise de risco",
   "conceito": "Análise dos Modos de Falha e Efeitos: pontua Severidade, Ocorrência e Detecção (1-10) e calcula o RPN (produto dos três).",
   "como": [
    "Listar modos de falha",
    "Pontuar S, O e D",
    "Calcular RPN",
    "Priorizar os maiores RPNs e definir ações",
    "Repontuar após as ações"
   ],
   "exemplos": "Prevenção de falhas em processos críticos (indústria, produto).",
   "onde": ""
  },
  {
   "titulo": "8D",
   "categoria": "Resolução de problemas",
   "conceito": "Metodologia de 8 disciplinas para resolução estruturada: D1 formação do time até D8 reconhecimento e lições aprendidas.",
   "como": [
    "Montar o time",
    "Descrever o problema com dados",
    "Fazer contenção imediata",
    "Analisar causa raiz (5 Porquês/Ishikawa)",
    "Definir ação corretiva definitiva e validar",
    "Prevenir recorrência e documentar lições"
   ],
   "exemplos": "Problemas críticos de cliente ou produção.",
   "onde": ""
  },
  {
   "titulo": "DMAIC (Six Sigma)",
   "categoria": "Metodologia",
   "conceito": "Ciclo do Six Sigma: Definir, Medir, Analisar, Melhorar, Controlar — redução de variação e defeitos orientada a dados.",
   "como": [
    "Definir o problema e a meta",
    "Medir o processo atual (validando o sistema de medição)",
    "Analisar causas com dados",
    "Melhorar com experimentos",
    "Controlar com monitoramento contínuo"
   ],
   "exemplos": "Projetos de melhoria com meta quantitativa.",
   "onde": ""
  },
  {
   "titulo": "QFD / Casa da Qualidade",
   "categoria": "Voz do cliente",
   "conceito": "Traduz a voz do cliente em requisitos técnicos priorizados, cruzando 'o que o cliente quer' com 'como entregar'.",
   "como": [
    "Levantar requisitos do cliente",
    "Listar características técnicas",
    "Cruzar com pesos e correlações",
    "Priorizar o desenvolvimento"
   ],
   "exemplos": "Desenvolvimento de produtos e serviços centrados no cliente.",
   "onde": ""
  },
  {
   "titulo": "Mapeamento de Fluxo de Valor (VSM)",
   "categoria": "Enxergar o fluxo",
   "conceito": "Desenha o fluxo ponta a ponta, separando tempos de valor agregado e não agregado, para atacar desperdícios.",
   "como": [
    "Desenhar o fluxo atual com dados reais",
    "Calcular lead time e tempo de valor agregado",
    "Identificar desperdícios",
    "Desenhar o estado futuro e o plano de ação"
   ],
   "exemplos": "Melhoria de fluxos em indústria e serviços.",
   "onde": ""
  },
  {
   "titulo": "Gemba Walk",
   "categoria": "Observação",
   "conceito": "Ir ao local onde o trabalho acontece para observar e entender antes de decidir ('gemba' = o lugar real).",
   "como": [
    "Ir ao local (agendado ou informal)",
    "Observar sem interromper",
    "Fazer perguntas abertas",
    "Anotar desperdícios e dificuldades",
    "Retornar com ações"
   ],
   "exemplos": "Liderança enxergando a operação real, não o relatório.",
   "onde": ""
  },
  {
   "titulo": "MSA / Estudo R&R",
   "categoria": "Medição",
   "conceito": "Garante que o sistema de medição é confiável antes de tirar conclusões: mede repetitibilidade (instrumento) e reprodutibilidade (avaliadores).",
   "como": [
    "Definir instrumento e avaliadores",
    "Medir as mesmas amostras repetidamente",
    "Calcular repetitibilidade e reprodutibilidade",
    "Se alto, melhorar instrumento ou treinar avaliadores"
   ],
   "exemplos": "Validez de indicadores e inspeções de qualidade.",
   "onde": "Calibragem avaliativa entre avaliadores da qualidade: diferentes avaliadores analisam o mesmo atendimento e comparam notas antes de consolidar os ciclos."
  },
  {
   "titulo": "Análise SWOT",
   "categoria": "Estratégia",
   "conceito": "Forças, Fraquezas, Oportunidades e Ameaças: diagnóstico estratégico cruzado para gerar ações concretas.",
   "como": [
    "Listar os 4 quadrantes com dados reais",
    "Cruzar (força x oportunidade, fraqueza x ameaça...)",
    "Transformar em estratégias e planos"
   ],
   "exemplos": "Planejamento estratégico de áreas e carreiras.",
   "onde": ""
  },
  {
   "titulo": "Gerenciamento pelas Diretrizes (GPD / Hoshin Kanri)",
   "categoria": "Estratégia",
   "conceito": "Metodologia japonesa que desdobra metas estratégicas da alta administração em planos operacionais para todos os níveis, em 5 etapas: diretrizes corporativas, desdobramento em metas, planos de ação, execução com acompanhamento e avaliação de resultados.",
   "como": [
    "Definir as diretrizes corporativas do ano",
    "Desdobrar em metas por área com o método catchball",
    "Elaborar planos de ação com responsáveis e prazos",
    "Acompanhar periodicamente e avaliar resultados"
   ],
   "exemplos": "Alinhamento entre estratégia e operação em empresas de qualquer porte.",
   "onde": "Pode desdobrar as metas de qualidade da diretoria em planos de ação por equipe."
  },
  {
   "titulo": "Matriz X (Hoshin Kanri X-Matrix)",
   "categoria": "Estratégia",
   "conceito": "Ferramenta visual que conecta em uma única página diretrizes estratégicas, metas anuais, processos de melhoria, projetos e responsáveis.",
   "como": [
    "Listar diretrizes de longo prazo",
    "Definir metas anuais correspondentes",
    "Relacionar processos de melhoria e projetos",
    "Marcar as correlações entre os quadrantes"
   ],
   "exemplos": "Painel de alinhamento estratégico em reuniões de diretoria.",
   "onde": "Pode estruturar o alinhamento visual entre metas de qualidade e projetos da operação."
  },
  {
   "titulo": "Benchmarking",
   "categoria": "Melhoria contínua",
   "conceito": "Comparação sistemática de processos e desempenho com referências internas ou externas para adaptar as melhores práticas. 5 tipos: interno, competitivo, funcional, genérico e colaborativo.",
   "como": [
    "Planejar o objeto do benchmarking e as referências",
    "Coletar dados das melhores práticas",
    "Analisar as lacunas de desempenho",
    "Adaptar e implementar, monitorando os resultados"
   ],
   "exemplos": "Elevar o padrão de atendimento comparando com líderes do setor.",
   "onde": "Pode comparar critérios de avaliação e indicadores com referências do mercado."
  },
  {
   "titulo": "OEE — Eficiência Global dos Equipamentos",
   "categoria": "Medição",
   "conceito": "Indicador que multiplica Disponibilidade × Performance × Qualidade para medir a eficiência real de equipamentos e linhas. Criado por Seiichi Nakajima (JIPM, anos 1970) como base da TPM.",
   "como": [
    "Medir a disponibilidade (tempo produtivo / planejado)",
    "Medir a performance (velocidade real / teórica)",
    "Medir a qualidade (peças boas / total)",
    "Multiplicar os três fatores e atacar as seis grandes perdas"
   ],
   "exemplos": "Diagnóstico de gargalos em linhas de produção.",
   "onde": "Pode medir a eficiência global de qualquer operação com fluxo e capacidade limitada."
  },
  {
   "titulo": "Performance Prism (Prisma de Desempenho)",
   "categoria": "Estratégia",
   "conceito": "Modelo de medição de desempenho em 5 facetas: satisfação dos stakeholders, estratégias, processos, capacidades e contribuição dos stakeholders. Criado por Andy Neely e outros (Cranfield, início dos anos 2000).",
   "como": [
    "Mapear os stakeholders e suas necessidades",
    "Definir estratégias para atendê-las",
    "Desenhar os processos e capacidades necessários",
    "Medir a contribuição de cada parte interessada"
   ],
   "exemplos": "Sistemas de indicadores que equilibraram todos os públicos de interesse.",
   "onde": "Pode ampliar o desenho de indicadores além do cliente, incluindo equipe e fornecedores."
  },
  {
   "titulo": "Modelo de Excelência da Gestão (MEG/FNQ)",
   "categoria": "Estratégia",
   "conceito": "Estrutura sistêmica da Fundação Nacional da Qualidade (FNQ, Brasil, 1991) que orienta o diagnóstico da maturidade da gestão com critérios como Governança, Estratégias, Clientes, Sociedade, Processos, Pessoas e Resultados.",
   "como": [
    "Realizar o autodiagnóstico pelos critérios do modelo",
    "Identificar as lacunas de maturidade",
    "Priorizar planos de evolução da gestão",
    "Reavaliar periodicamente a evolução"
   ],
   "exemplos": "Preparação de empresas para o Prêmio Nacional da Qualidade (PNQ).",
   "onde": "Pode estruturar o autodiagnóstico da área de qualidade e sua evolução."
  },
  {
   "titulo": "Produtividade x Eficiência",
   "categoria": "Medição",
   "conceito": "Produtividade = saídas / entradas (volume gerado por recurso). Eficiência = resultado real / resultado ideal (rendimento frente a um padrão). Produzir mais não significa operar sem desperdício.",
   "como": [
    "Calcular a produtividade da operação",
    "Definir o padrão ideal (tempo, custo, volume)",
    "Calcular a eficiência frente ao padrão",
    "Investigar a diferença entre os dois antes de decidir"
   ],
   "exemplos": "Equipe com 10 atendimentos/hora, mas eficiência de 80% frente ao padrão.",
   "onde": "Pode separar volume produzido de aproveitamento real do tempo padrão nos ciclos avaliativos."
  },
  {
   "titulo": "Estratégia de Manufatura",
   "categoria": "Estratégia",
   "conceito": "Alinhamento dos recursos de produção aos objetivos competitivos (custo, qualidade, flexibilidade, entrega, inovação), com decisões estruturais (capacidade, instalações, tecnologia) e infraestruturais (PCP, qualidade, pessoas). Formulada por Wickham Skinner (1969).",
   "como": [
    "Definir os critérios competitivos prioritários",
    "Decidir trade-offs (não se compete em tudo ao mesmo tempo)",
    "Alinhar capacidade e tecnologia à estratégia",
    "Alinhar as decisões infraestruturais de apoio"
   ],
   "exemplos": "Fábrica que escolhe flexibilidade e entrega rápida em vez de custo mínimo.",
   "onde": "Pode orientar onde concentrar investimentos de capacidade da operação."
  },
  {
   "titulo": "Taylorismo e Fordismo",
   "categoria": "Fundamentos",
   "conceito": "Bases históricas da produção: Taylorismo (Frederick Taylor, 1911) com estudo de tempos e movimentos e padronização; Fordismo (Henry Ford, 1908-1913) com linha de montagem móvel e produção em massa.",
   "como": [
    "Compreender a origem da padronização de métodos",
    "Analisar a divisão entre planejamento e execução",
    "Identificar a rigidez da produção em massa",
    "Conectar com a evolução posterior para o Lean"
   ],
   "exemplos": "Estudo histórico da evolução dos sistemas de produção.",
   "onde": "Fundamento para explicar de onde vêm a padronização e os padrões de tempo usados hoje."
  }
 ],
 "guia": [
  {
   "problema": "O processo é desorganizado / ninguém sabe como é de verdade",
   "ferramenta": "Fluxograma"
  },
  {
   "problema": "Tenho muitos problemas, por onde começo?",
   "ferramenta": "Pareto + Matriz GUT"
  },
  {
   "problema": "O mesmo erro sempre se repete",
   "ferramenta": "5 Porquês, Ishikawa, 8D"
  },
  {
   "problema": "Preciso medir um processo",
   "ferramenta": "MSA/R&R antes de medir, depois Carta de Controle"
  },
  {
   "problema": "Cliente insatisfeito, mas não sei o que importa para ele",
   "ferramenta": "QFD + indicador de percepção (tipo IEPC)"
  },
  {
   "problema": "O ambiente / a documentação está bagunçada",
   "ferramenta": "5S"
  },
  {
   "problema": "Quero melhorar continuamente sem grandes projetos",
   "ferramenta": "Kaizen"
  },
  {
   "problema": "Não confio nas minhas notas de avaliação",
   "ferramenta": "Calibragem avaliativa (MSA) + folha de verificação padronizada"
  },
  {
   "problema": "Plano de ação vago, sem responsável nem prazo",
   "ferramenta": "5W2H"
  },
  {
   "problema": "Quero saber se meu processo está estável",
   "ferramenta": "Carta de Controle (CEP)"
  }
 ],
 "acervo": [
  {
   "titulo": "Sistema de Avaliação de Qualidade QA — 5 Pilares (100 pts)",
   "descricao": "P1 Gestão do Fluxo e Rastreabilidade do Atendimento (22 pts): identificação e boas-vindas 5, protocolo 9, encerramento por etapa 8. P2 Gestão da Tratativa da Demanda (34 pts): validação e esclarecimento 8, orientação e condução 9, resolução ou direcionamento 9, documentação técnica 8. P3 Análise e Assertividade Técnica (18 pts): análise técnica da demanda 10, uso de ferramentas de apoio 8. P4 Qualidade da Comunicação (14 pts): língua portuguesa 4, tom e postura 5, clareza e organização 5. P5 Conduta Relacional (12 pts): cordialidade e empatia 4, proatividade 5, over delivery 3. Escala 0-100, avaliação manual sem IA, com evidência objetiva e calibragem avaliativa."
  },
  {
   "titulo": "IEPC — Índice de Experiência Percebida pelo Cliente (100 pts)",
   "descricao": "E1 Resolução Percebida 30; E2 Compreensão e Segurança 20; E3 Esforço do Cliente 20; E4 Tempo e Fluidez 15; E5 Experiência Relacional 15. Indicador independente do QA que mede como o cliente percebeu a condução do atendimento."
  },
  {
   "titulo": "Gestão de Não Conformidades — 5 categorias (penalidade -20 cada)",
   "descricao": "NC-1 Postura e Ética Profissional; NC-2 Acuracidade e Rigor Técnico; NC-3 Conformidade de Registro e Rastreabilidade; NC-4 Integridade do Fluxo Operacional; NC-5 Segurança da Informação. Fluxo: identificar → tratar → prevenir. Procedimento PR-NC-001."
  },
  {
   "titulo": "Ciclo Avaliativo e PDI",
   "descricao": "Atendimento → Avaliação (mínimo 5 atendimentos por analista por ciclo) → Indicadores → Feedback estruturado → PDI gerado a partir dos critérios menos aderentes → Evolução. Ciclo mensal com consolidação executiva."
  },
  {
   "titulo": "Indicadores e Resultados Reais (jan–set/2026)",
   "descricao": "175 avaliações realizadas; nota média QA de 75,0 (jan) para 83,8 (ago); IEPC de 76,8 (fev) para 85,0 (ago); 119 não conformidades identificadas e tratadas; 112 elogios de clientes registrados; 7 ciclos consolidados em relatórios executivos."
  },
  {
   "titulo": "Documentação criada (alinhada à ISO 9001:2015)",
   "descricao": "Manual da Qualidade v1.1 [CONTROLADO], Manual Técnico QA e IEPC v1.0/2.0, Procedimento de Não Conformidades PR-NC-001, Manual de Análise de Qualidade, lógica de cálculo MQ-AVAL-V4.0."
  },
  {
   "titulo": "Projeto QualiVisão",
   "descricao": "Plataforma de analytics de qualidade: painel executivo, evolução QA x IEPC, mapa estratégico por pilar/dimensão, gestão de não conformidades, feedbacks e PDI."
  }
 ]
};
