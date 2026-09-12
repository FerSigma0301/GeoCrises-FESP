from pathlib import Path
import json

path = Path('/home/ubuntu/geocrisis/client/src/game/crisesData.ts')
text = path.read_text()
if 'crisis-earthquake-1' in text:
    print('already added')
    raise SystemExit(0)

def option(id, title, description, category, cost, population, sustainability, xp, feedback):
    return {'id': id, 'title': title, 'description': description, 'category': category, 'costFinance': cost, 'deltaPopulation': population, 'deltaSustainability': sustainability, 'deltaXP': xp, 'scientificFeedback': feedback}

def crisis(id, name, category, location, coords, image, concepts, description, institution, dataset, source, options, question, answers, explanation, event_title, event_description, impact):
    return {
        'id': id, 'name': name, 'category': category, 'location': location, 'coordinates': coords,
        'image': image, 'geographicConcepts': concepts, 'scientificDescription': description,
        'realWorldSource': {'institution': institution, 'dataset': dataset, 'year': '2024', 'urlDescription': source},
        'options': options,
        'knowledgeQuestion': {'question': question, 'options': answers, 'correctIndex': 0, 'explanation': explanation},
        'unexpectedEvent': {'title': event_title, 'description': event_description, 'condition': 'random', 'impact': impact}
    }

items = [
crisis('crisis-earthquake-1', 'Terremoto e Colapso de Infraestrutura', 'earthquake', 'Cordilheira dos Andes / Santiago - Chile', {'lat': -33.45, 'lng': -70.67}, '/manus-storage/crisis_flood_78fe1959.png', ['Tectônica de placas', 'Risco sísmico', 'Resiliência urbana', 'Infraestrutura crítica'], 'Um terremoto de alta magnitude atingiu uma área metropolitana densamente povoada. A intensidade do tremor e a interrupção de energia e água transformaram um evento natural em uma crise territorial complexa.', 'Centro Sismológico Nacional & USGS', 'ShakeMap e Inventário de Risco Sísmico Urbano', 'Mapas de intensidade, falhas geológicas ativas e estimativas de exposição da população.', [
option('opt-quake-retrofit', 'Reforço Estrutural de Escolas e Hospitais', 'Priorizar prédios essenciais com reforço de pilares e rotas de evacuação.', 'infra', 420, 360, 8, 150, 'Infraestrutura crítica resiliente reduz mortes secundárias e acelera a recuperação.'),
option('opt-quake-drills', 'Rede Comunitária de Treinamento e Alerta', 'Criar brigadas locais, simulados recorrentes e alertas multicanal.', 'prevention', 180, 240, 18, 110, 'Preparação comunitária reduz pânico e aumenta a velocidade de resposta.'),
option('opt-quake-shelter', 'Abrigos Temporários e Logística Humanitária', 'Montar centros de abrigo e corredores de suprimentos descentralizados.', 'social', 300, 390, 2, 130, 'Abrigos bem distribuídos protegem a população deslocada.'),
option('opt-quake-open-space', 'Parques de Segurança e Rotas de Evacuação', 'Converter áreas livres em pontos seguros conectados por rotas sinalizadas.', 'nature', 260, 270, 35, 140, 'Espaços abertos funcionam como infraestrutura verde e zona de segurança.')
], 'Por que prédios e hospitais devem ser priorizados na preparação sísmica?', ['Porque concentram serviços vitais e precisam permanecer operacionais após o tremor.', 'Porque são sempre os prédios mais antigos.', 'Porque eliminam o risco de terremotos.', 'Porque impedem o movimento das placas.'], 'Hospitais, escolas e redes de emergência sustentam a resposta e sua continuidade salva vidas.', 'Réplica de Alta Intensidade!', 'Uma réplica bloqueou duas rotas de acesso aos abrigos.', {'finance': -70, 'population': -45, 'lives': -1}),
crisis('crisis-pollution-1', 'Nuvem Tóxica e Crise da Qualidade do Ar', 'pollution', 'Corredor Industrial do Rio Paraopeba - Brasil', {'lat': -19.97, 'lng': -44.20}, '/manus-storage/crisis_heatwave_a5b9c7f0.png', ['Poluição atmosférica', 'Saúde ambiental', 'Justiça territorial', 'Indústria'], 'Uma inversão térmica reteve poluentes sobre uma área industrial e bairros periféricos. A exposição agravou doenças respiratórias e revelou a desigual distribuição dos riscos ambientais.', 'CETESB & Organização Mundial da Saúde', 'Diretrizes de Qualidade do Ar e Inventário de Emissões', 'Medições de material particulado, ozônio e fontes emissoras em áreas urbanas.', [
option('opt-pollution-sensors', 'Sensores Abertos de Qualidade do Ar', 'Instalar estações e publicar mapas horários de poluentes por bairro.', 'prevention', 190, 210, 22, 115, 'Monitoramento transparente orienta proteção e responsabilização ambiental.'),
option('opt-pollution-health', 'Protocolo de Saúde e Proteção Respiratória', 'Distribuir máscaras adequadas e abrir centros de atendimento.', 'social', 280, 330, 5, 125, 'Resposta sanitária imediata reduz internações enquanto a fonte é controlada.'),
option('opt-pollution-transition', 'Transição Industrial para Emissão Zero', 'Financiar filtros, eletrificação de processos e metas públicas.', 'infra', 520, 390, 65, 190, 'A transição tecnológica ataca a causa estrutural com governança de longo prazo.'),
option('opt-pollution-greenbelt', 'Cinturão Verde e Corredores de Ventilação', 'Criar parques lineares e preservar áreas de circulação do vento.', 'nature', 340, 250, 55, 150, 'Infraestrutura verde reduz calor e exposição, sem substituir o controle da fonte.')
], 'O que torna uma inversão térmica perigosa?', ['Ela impede a dispersão vertical dos poluentes e concentra a exposição perto do solo.', 'Ela elimina todo o oxigênio.', 'Ela transforma poluentes em água potável.', 'Ela ocorre apenas em áreas rurais.'], 'A camada de ar quente sobre o ar frio funciona como uma tampa e mantém contaminantes próximos à população.', 'Pico de Material Particulado!', 'Uma falha em um filtro industrial elevou a concentração durante o horário de pico.', {'finance': -90, 'population': -60}),
crisis('crisis-pandemic-1', 'Surto Epidemiológico e Pressão Hospitalar', 'pandemic', 'Região Metropolitana de Manaus - Brasil', {'lat': -3.12, 'lng': -60.02}, '/manus-storage/crisis_drought_cca1c7d6.png', ['Saúde pública', 'Mobilidade', 'Vigilância epidemiológica', 'Desigualdade'], 'Um surto de transmissão rápida pressiona unidades de saúde e interrompe atividades econômicas. A distância entre comunidades e o acesso desigual exigem coordenação territorial.', 'Fiocruz & Ministério da Saúde', 'Sistemas de Vigilância Epidemiológica e Leitos SUS', 'Indicadores de transmissão, capacidade hospitalar e distribuição espacial de serviços.', [
option('opt-pandemic-surveillance', 'Vigilância de Dados e Testagem Rápida', 'Criar laboratórios móveis, rastreamento ético e boletins transparentes.', 'prevention', 260, 340, 12, 145, 'Dados rápidos permitem direcionar recursos antes do colapso hospitalar.'),
option('opt-pandemic-hospitals', 'Expandir Leitos e Proteger Profissionais', 'Reforçar hospitais regionais, estoques estratégicos e equipes.', 'infra', 430, 410, 4, 160, 'Capacidade hospitalar salva vidas, mas precisa de prevenção.'),
option('opt-pandemic-community', 'Comunicação Comunitária e Proteção Social', 'Apoiar agentes locais, renda emergencial e comunicação acessível.', 'social', 240, 300, 18, 130, 'Confiança pública aumenta adesão e reduz impactos desiguais.'),
option('opt-pandemic-prevention', 'Prevenção Integrada e Saúde Ambiental', 'Investir em saneamento, ventilação, vacinação e redução de riscos.', 'nature', 360, 280, 48, 175, 'Prevenção estrutural reduz a recorrência de surtos.')
], 'Por que a vigilância territorial é importante durante um surto?', ['Porque mostra onde transmissão e pressão hospitalar estão crescendo.', 'Porque substitui hospitais.', 'Porque garante que nenhuma doença será transmitida.', 'Porque registra apenas o clima.'], 'A vigilância combina tempo e espaço para identificar focos e priorizar recursos.', 'Nova Cadeia de Transmissão!', 'Uma rota regional conectou comunidades sem acesso a testagem.', {'finance': -65, 'population': -55, 'lives': -1}),
crisis('crisis-biodiversity-1', 'Colapso de Biodiversidade e Serviços Ecossistêmicos', 'biodiversity', 'Mata Atlântica e Serra do Mar - Brasil', {'lat': -23.35, 'lng': -44.82}, '/manus-storage/crisis_deforestation_9f3d2a1b.png', ['Biodiversidade', 'Fragmentação', 'Polinização', 'Conectividade ecológica'], 'A fragmentação de habitats e a perda de espécies-chave ameaçam água, polinização e estabilidade de encostas. O impacto aparece lentamente, mas compromete serviços essenciais.', 'ICMBio & IPBES', 'Avaliação Nacional de Biodiversidade e Áreas Prioritárias', 'Indicadores de perda de habitat, conectividade e risco para espécies ameaçadas.', [
option('opt-bio-corridors', 'Corredores Ecológicos Conectados', 'Restaurar faixas entre fragmentos e integrar unidades de conservação.', 'nature', 300, 230, 75, 180, 'Conectividade permite fluxo gênico e deslocamento diante das mudanças climáticas.'),
option('opt-bio-communities', 'Economia da Floresta com Comunidades', 'Financiar cadeias de produtos nativos e monitoramento comunitário.', 'social', 250, 290, 52, 150, 'Renda alinhada à conservação transforma comunidades em guardiãs.'),
option('opt-bio-restoration', 'Restauração de Nascentes e Encostas', 'Recuperar áreas críticas para água, solo e refúgio de espécies.', 'infra', 380, 310, 68, 165, 'Restauração multifuncional recupera serviços e reduz riscos.'),
option('opt-bio-monitoring', 'Observatório de Espécies Sentinelas', 'Usar sensores, ciência cidadã e eDNA para detectar perdas.', 'prevention', 210, 180, 45, 155, 'Indicadores precoces permitem agir antes de danos irreversíveis.')
], 'Por que corredores ecológicos são importantes?', ['Porque conectam habitats e permitem deslocamento e troca genética.', 'Porque substituem todas as áreas protegidas.', 'Porque impedem qualquer incêndio.', 'Porque servem apenas como estradas.'], 'A conectividade reduz o isolamento das populações e melhora a adaptação dos ecossistemas.', 'Mortalidade de Polinizadores!', 'Uma onda de calor e defensivos reduziram a atividade de polinizadores.', {'finance': -75, 'population': -35, 'sustainability': -15})
]

insert_at = text.rfind('];')
serialized = ',\n'.join(json.dumps(item, ensure_ascii=False, indent=2) for item in items)
path.write_text(text[:insert_at] + '  ' + serialized.replace('\n', '\n  ') + '\n' + text[insert_at:])
print(f'added {len(items)} crises')
