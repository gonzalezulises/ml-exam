import type { Question } from '../types';

export const questions: Question[] = [
  // ─── REGRESIÓN LOGÍSTICA (4 preguntas) ────────────────────────────
  {
    id: 1,
    topic: 'regresion_logistica',
    subtopic: 'Interpretación de betas y momios',
    statement:
      'Un modelo de regresión logística para predecir churn arroja β = −0.7 para la variable "antigüedad del cliente (años)". ¿Cuál es la interpretación correcta?',
    options: [
      'Por cada año adicional de antigüedad, la probabilidad de churn disminuye en 0.7 puntos porcentuales.',
      'Por cada año adicional de antigüedad, el momio (odds) de churn se multiplica por e^(−0.7) ≈ 0.50, reduciéndose aproximadamente a la mitad.',
      'La antigüedad tiene un efecto nulo porque el coeficiente es negativo y los momios no pueden ser negativos.',
      'Por cada año adicional de antigüedad, el log-odds de churn aumenta en 0.7 unidades.',
    ],
    correctIndex: 1,
    technicalRationale:
      'En regresión logística, el coeficiente β modifica los momios de forma multiplicativa: Odds_nuevo = Odds_viejo × e^β. Con β = −0.7, e^(−0.7) ≈ 0.497, lo que significa que el momio de churn se reduce aproximadamente a la mitad por cada año adicional.',
    mathIntuition:
      'La función sigmoide transforma la combinación lineal β·x en probabilidad. El coeficiente β opera en el espacio del log-odds (logit), que es lineal. Al exponenciar, e^β actúa como un factor multiplicativo sobre los momios. Un β negativo produce un factor menor que 1, reduciendo los odds. No es una resta lineal de probabilidad — es una transformación multiplicativa en escala de odds.',
    businessImplication:
      'Para el equipo de retención, esto significa que clientes con mayor antigüedad tienen odds de abandono significativamente menores. Una estrategia de negocio eficiente focalizaría las campañas de retención en clientes nuevos (baja antigüedad), donde el riesgo relativo es mayor. No confundir la reducción de odds con una reducción lineal de probabilidad.',
    distractorExplanations: [
      'Incorrecto: confunde la escala de odds con la escala de probabilidad. β no reduce la probabilidad en puntos porcentuales; actúa multiplicativamente sobre los momios.',
      'Esta es la respuesta correcta.',
      'Incorrecto: un β negativo no invalida los momios. e^(−0.7) ≈ 0.50, que es un valor positivo válido. Los momios siempre son positivos porque e^x > 0 para todo x.',
      'Incorrecto: invierte la dirección. Con β = −0.7, el log-odds disminuye en 0.7 por cada unidad, no aumenta.',
    ],
    oralFollowUp:
      'Explique a un comité directivo por qué no es correcto decir que "la probabilidad de churn baja 50% por cada año de antigüedad" cuando el odds ratio es 0.50.',
    oralGuide:
      'El odds ratio de 0.50 indica que los momios se reducen a la mitad, pero esto no equivale a que la probabilidad se reduzca a la mitad. La relación entre odds y probabilidad es no lineal: P = odds/(1+odds). Si un cliente nuevo tiene P(churn) = 0.80 (odds = 4), un año adicional daría odds = 2 (P ≈ 0.67), no 0.40. La reducción en probabilidad depende del punto de partida. Al directivo hay que explicarle que el efecto es proporcional al riesgo base, no una resta fija.',
  },
  {
    id: 2,
    topic: 'regresion_logistica',
    subtopic: 'Beta igual a cero e irrelevancia',
    statement:
      'En un modelo logístico multiclase con estrategia One-vs-Rest para 4 clases, el coeficiente β de la variable "edad" es prácticamente cero en el clasificador de la clase "Displasia" pero significativamente positivo en el de "Metaplasia Gástrica". ¿Qué implica esto?',
    options: [
      'La variable "edad" debe eliminarse del modelo completo porque es irrelevante en al menos un clasificador.',
      'La edad no discrimina entre Displasia y el resto de clases, pero sí incrementa los odds de pertenecer a Metaplasia Gástrica frente al resto.',
      'Hay un error de data leakage porque la misma variable no puede comportarse diferente entre clasificadores.',
      'Se debe aplicar Ridge específicamente a la variable edad para estabilizar su coeficiente entre los 4 clasificadores.',
    ],
    correctIndex: 1,
    technicalRationale:
      'En One-vs-Rest, cada clasificador binario es independiente y tiene su propio vector de betas. Que β_edad ≈ 0 en un clasificador significa e^0 = 1, por lo que la edad no altera los odds para esa clase. Pero puede ser discriminante en otro clasificador. Cada clasificador opera con su propia función de decisión.',
    mathIntuition:
      'One-vs-Rest genera K clasificadores independientes, cada uno con su propio vector β. Matemáticamente, se optimizan K funciones de verosimilitud separadas. No hay restricción de que un mismo feature tenga el mismo coeficiente en todos los clasificadores. β_edad = 0 → e^0 = 1 → odds sin cambio. β_edad > 0 → e^β > 1 → odds incrementados.',
    businessImplication:
      'En el contexto de Mauna Kea Technologies, esto tiene implicaciones clínicas: la edad podría no ayudar a detectar displasia (pre-cáncer), pero sí a identificar metaplasia gástrica. Un médico no debería descartar la edad como variable diagnóstica global solo porque no discrimina una condición específica.',
    distractorExplanations: [
      'Incorrecto: eliminar la variable del modelo completo porque es irrelevante en un clasificador destruiría su poder discriminante en los demás. Cada clasificador OvR es independiente.',
      'Esta es la respuesta correcta.',
      'Incorrecto: no hay data leakage. Es completamente normal que una variable tenga distintos coeficientes en clasificadores diferentes — cada uno modela un problema binario distinto.',
      'Incorrecto: Ridge penaliza la magnitud de todos los coeficientes globalmente, no "armoniza" un coeficiente entre clasificadores. Además, forzar coeficientes similares perdería la capacidad del modelo de captar diferencias reales entre clases.',
    ],
    oralFollowUp:
      'Si tuviera 4 clases y usara 5-fold cross-validation, ¿cuántos modelos se entrenarían en total? Explique la lógica.',
    oralGuide:
      'Con 4 clases en One-vs-Rest, se entrenan 4 clasificadores binarios independientes. Con 5-fold cross-validation, cada clasificador se entrena 5 veces (una por fold). Total: 4 × 5 = 20 modelos. Si además se hace grid search con, digamos, 5 valores de C, cada configuración de C requiere 20 modelos, dando 4 × 5 × 5 = 100 entrenamientos. Esta es la razón por la que el notebook tarda en ejecutarse, como mencionó Ana Isabel.',
  },
  {
    id: 3,
    topic: 'regresion_logistica',
    subtopic: 'Sigmoide vs Perceptrón',
    statement:
      'Un colega afirma: "La regresión logística y el perceptrón son esencialmente lo mismo porque ambos calculan β·x y clasifican según el resultado." ¿Cuál es la mejor refutación técnica?',
    options: [
      'Son distintos porque la regresión logística usa más épocas de entrenamiento.',
      'El perceptrón evalúa el signo de β·x (decisión binaria dura), mientras que la regresión logística pasa β·x por la función sigmoide para obtener una probabilidad calibrada, lo que permite ajustar umbrales y calcular momios.',
      'La diferencia es solo de implementación en scikit-learn; matemáticamente convergen al mismo resultado.',
      'La regresión logística no usa producto escalar β·x; usa directamente la matriz de confusión para clasificar.',
    ],
    correctIndex: 1,
    technicalRationale:
      'El perceptrón usa sign(β·x): si > 0 → clase +1, si < 0 → clase −1. Es una decisión dura sin probabilidades. La regresión logística aplica σ(β·x) = 1/(1+e^(−β·x)), produciendo una probabilidad entre 0 y 1. Esto permite interpretabilidad vía momios, ajuste de umbrales según costo del error, y optimización por entropía cruzada.',
    mathIntuition:
      'Ambos computan β·x (producto escalar), pero difieren en la función de activación y la función de pérdida. El perceptrón usa step function y actualiza solo en errores. La regresión logística usa la sigmoide (función suave y diferenciable) y minimiza la entropía cruzada (log-likelihood). La suavidad de la sigmoide permite gradientes continuos y la interpretación probabilística que el perceptrón no ofrece.',
    businessImplication:
      'La diferencia es crucial para el negocio: un perceptrón dice "sí" o "no" sin matices. La regresión logística dice "hay un 73% de probabilidad de churn", lo que permite al negocio decidir umbrales, priorizar intervenciones según probabilidad, y justificar decisiones ante reguladores usando momios interpretables.',
    distractorExplanations: [
      'Incorrecto: el número de épocas es un detalle de implementación, no la diferencia fundamental. Ambos pueden tener múltiples épocas.',
      'Esta es la respuesta correcta.',
      'Incorrecto: no convergen al mismo resultado. El perceptrón produce fronteras de decisión sin probabilidades; la regresión logística produce probabilidades calibradas.',
      'Incorrecto: la regresión logística sí usa β·x como entrada a la sigmoide. La matriz de confusión es una herramienta de evaluación, no de clasificación.',
    ],
    oralFollowUp:
      'Explique por qué la regresión logística es considerada "lo mejor de dos mundos" según el curso.',
    oralGuide:
      'Combina buen desempeño predictivo con interpretabilidad. A diferencia del perceptrón (solo frontera de decisión), produce probabilidades interpretables vía momios. A diferencia de modelos más complejos (redes neuronales, random forest), cada coeficiente β tiene una interpretación directa: e^β es el factor multiplicativo sobre los odds. Permite comunicar al negocio qué variables pesan, en qué magnitud, y en qué dirección, sin sacrificar capacidad predictiva significativa.',
  },
  {
    id: 4,
    topic: 'regresion_logistica',
    subtopic: 'One-vs-Rest y multiclase',
    statement:
      'En la detección de reseñas de hoteles con 4 etiquetas (falsa-positiva, falsa-negativa, verdadera-positiva, verdadera-negativa), se usa regresión logística multiclase con One-vs-Rest y GridSearchCV con 5 valores de C y 5 folds. ¿Cuántos modelos se entrenan y por qué?',
    options: [
      '25 modelos: 5 valores de C × 5 folds. One-vs-Rest no afecta porque es un paso de postprocesamiento.',
      '100 modelos: 4 clasificadores OvR × 5 valores de C × 5 folds.',
      '20 modelos: 4 clasificadores OvR × 5 folds. GridSearch no entrena modelos adicionales.',
      '5 modelos: solo se entrena un modelo por fold y GridSearch selecciona el mejor C internamente.',
    ],
    correctIndex: 1,
    technicalRationale:
      'One-vs-Rest entrena 4 clasificadores binarios independientes (uno por clase). Para cada clasificador, GridSearchCV prueba 5 valores de C, y cada valor se evalúa con 5-fold cross-validation. Total: 4 × 5 × 5 = 100 modelos. Esto explica por qué la celda del notebook tarda tanto en ejecutarse.',
    mathIntuition:
      'El costo computacional crece como O(K × P × F) donde K = número de clases (OvR), P = número de hiperparámetros candidatos, F = folds de cross-validation. Cada modelo es una optimización independiente de la log-verosimilitud con su propia regularización C = 1/λ. Los 100 modelos son necesarios para encontrar el C óptimo para cada clasificador binario de forma robusta.',
    businessImplication:
      'El costo computacional de 100 entrenamientos justifica usar recursos de cómputo adecuados, pero también explica por qué en producción no se reentrena con tanta frecuencia. El equipo de datos debe presupuestar tiempo y cómputo. La recompensa es un modelo robusto donde el C fue elegido sin contaminar el test set.',
    distractorExplanations: [
      'Incorrecto: ignora que One-vs-Rest multiplica los entrenamientos por K clases. OvR no es postprocesamiento; entrena K clasificadores completos.',
      'Esta es la respuesta correcta.',
      'Incorrecto: GridSearchCV sí entrena modelos adicionales — uno por cada combinación de hiperparámetro y fold.',
      'Incorrecto: subestima drásticamente el número de modelos. Cada fold y cada valor de C requiere un entrenamiento independiente.',
    ],
    oralFollowUp:
      'Si el mejor C resultara diferente para cada clasificador OvR, ¿es un problema? ¿Por qué o por qué no?',
    oralGuide:
      'No es un problema; es esperable. Cada clasificador OvR modela un problema binario diferente con distribuciones de datos distintas. La clase "falsa-negativa" puede necesitar más regularización (C más pequeño) si tiene pocos ejemplos, mientras que "verdadera-positiva" con más datos puede tolerar un C más grande. GridSearchCV encuentra el C óptimo para cada subproblema independientemente, lo cual es la práctica correcta.',
  },

  // ─── TF-IDF / NLP (4 preguntas) ──────────────────────────────────
  {
    id: 5,
    topic: 'tfidf_nlp',
    subtopic: 'TF-IDF no es regularización',
    statement:
      'Durante una revisión de código, un analista junior escribe en su notebook: "Apliqué TF-IDF como técnica de regularización para evitar que las palabras comunes dominen el modelo." ¿Cuál es el error conceptual?',
    options: [
      'TF-IDF sí es una forma de regularización porque penaliza palabras frecuentes, similar a cómo Ridge penaliza pesos grandes.',
      'TF-IDF es una técnica de preprocesamiento/vectorización que opera sobre los datos antes del modelo; la regularización (Ridge/Lasso) opera sobre los pesos del modelo durante el entrenamiento. Son etapas distintas del pipeline.',
      'El error es que TF-IDF debería aplicarse después del modelo, no antes, para regularizar las predicciones.',
      'No hay error: TF-IDF y Ridge son intercambiables en contextos de NLP.',
    ],
    correctIndex: 1,
    technicalRationale:
      'TF-IDF transforma texto crudo en vectores numéricos — es preprocesamiento. Pondera la relevancia de cada palabra según su frecuencia local (TF) e inversa global (IDF). La regularización (Ridge/Lasso) añade un término de penalización a la función de error del modelo para controlar la magnitud de los pesos β. Son etapas completamente distintas del pipeline ML.',
    mathIntuition:
      'TF-IDF produce los valores de entrada x_ij = TF(palabra_j, doc_i) × IDF(palabra_j). Ridge añade λ||β||² a la función de pérdida. TF-IDF modifica la representación de los datos (X); Ridge modifica cómo se optimizan los parámetros (β). Ambos pueden contribuir a un mejor modelo, pero actúan en espacios matemáticos diferentes.',
    businessImplication:
      'La confusión entre preprocesamiento y modelado es un error de arquitectura de pipeline que puede llevar a decisiones incorrectas: un analista podría creer que no necesita Ridge si ya aplicó TF-IDF, dejando el modelo sin protección contra overfitting cuando hay más palabras que documentos.',
    distractorExplanations: [
      'Incorrecto: aunque ambos "penalizan" algo, TF-IDF pondera datos y Ridge penaliza pesos. Operar sobre datos ≠ operar sobre parámetros del modelo.',
      'Esta es la respuesta correcta.',
      'Incorrecto: TF-IDF es preprocesamiento y siempre va antes del modelo. No tiene sentido aplicarlo sobre predicciones.',
      'Incorrecto: no son intercambiables. TF-IDF sin Ridge puede resultar en overfitting cuando d >> N. Ridge sin TF-IDF pierde la ponderación de relevancia lingüística.',
    ],
    oralFollowUp:
      'Explique cuándo necesitaría aplicar tanto TF-IDF como Ridge simultáneamente y por qué uno no sustituye al otro.',
    oralGuide:
      'En NLP, típicamente hay más columnas (palabras/tokens) que filas (documentos). TF-IDF pondera la relevancia de cada palabra, pero no controla la magnitud de los pesos β. Ridge es necesario porque con d >> N, la matriz no es inyectiva y existen infinitas soluciones — Ridge restringe el espacio de soluciones penalizando betas grandes. Son complementarios: TF-IDF mejora la representación de los datos; Ridge estabiliza la optimización del modelo.',
  },
  {
    id: 6,
    topic: 'tfidf_nlp',
    subtopic: 'Logaritmo en IDF y Ley de Zipf',
    statement:
      'Un corpus contiene 1,000,000 de documentos. La palabra "hotel" aparece en 500,000 documentos y la palabra "conserjería" en 50 documentos. Sin logaritmo, los pesos IDF serían 2 y 20,000 respectivamente. ¿Por qué se usa el logaritmo en IDF?',
    options: [
      'Para que todas las palabras tengan el mismo peso IDF y el modelo sea más justo.',
      'Para suavizar las escalas: el logaritmo comprime la diferencia entre 2 y 20,000 haciéndola comparable, y estandariza los valores respecto al tamaño del corpus. Sin él, las palabras raras dominarían desproporcionadamente.',
      'Para eliminar las palabras comunes del vocabulario automáticamente.',
      'Para convertir TF-IDF en una técnica de regularización que penalice las palabras con alta frecuencia.',
    ],
    correctIndex: 1,
    technicalRationale:
      'El logaritmo comprime la escala: log(2) ≈ 0.30 vs. log(20,000) ≈ 4.30. La proporción pasa de 10,000:1 a ~14:1. Esto evita que una palabra extremadamente rara domine por completo el vector, y hace que los valores IDF sean comparables entre corpus de distintos tamaños. Responde a la distribución de ley de potencias (Ley de Zipf) del lenguaje natural.',
    mathIntuition:
      'Las palabras siguen una ley de potencias (Zipf): pocas aparecen mucho, muchas aparecen poco. Sin log, el ratio inverso N/DF amplifica esta asimetría de forma extrema. El logaritmo transforma la escala multiplicativa a aditiva: log(a×b) = log(a) + log(b). Es la misma razón por la que la escala de Richter usa logaritmos — eventos raros (palabras infrecuentes / sismos fuertes) contienen gran carga informativa, pero necesitamos una escala manejable.',
    businessImplication:
      'Sin logaritmo, un modelo de detección de reseñas falsas podría sobreponderar términos raros como errores ortográficos o nombres propios, produciendo un modelo frágil y difícil de explicar. El logaritmo produce pesos interpretables y robustos, facilitando la comunicación con stakeholders sobre qué palabras discriminan.',
    distractorExplanations: [
      'Incorrecto: el logaritmo no iguala los pesos; los comprime pero mantiene el orden. Palabras raras siguen teniendo mayor peso, solo que en escala más manejable.',
      'Esta es la respuesta correcta.',
      'Incorrecto: el logaritmo no elimina palabras. Incluso "hotel" con IDF = log(2) ≈ 0.30 sigue en el vocabulario con un peso bajo pero no nulo.',
      'Incorrecto: reitera la confusión TF-IDF ≠ regularización. El logaritmo en IDF es una transformación de escala, no una penalización de pesos del modelo.',
    ],
    oralFollowUp:
      'Explique la analogía entre IDF y la Escala de Richter que usa Alfonso en clase.',
    oralGuide:
      'Ambas usan logaritmos para manejar fenómenos que siguen leyes de potencias. En sismología, la energía crece exponencialmente con la magnitud — un terremoto de 7 libera ~30 veces más energía que uno de 6. En NLP, la frecuencia de las palabras sigue la Ley de Zipf: la palabra más común puede aparecer miles de veces más que las raras. El logaritmo comprime estas escalas para hacerlas manejables y comparables. En ambos casos, los eventos de baja frecuencia (sismos grandes / palabras raras) contienen la mayor carga informativa.',
  },
  {
    id: 7,
    topic: 'tfidf_nlp',
    subtopic: 'IDF como constante por columna',
    statement:
      'Un científico de datos calcula TF-IDF para un corpus de reseñas de hoteles. Observa que el valor IDF de la palabra "excelente" es 1.2. ¿Cuál de las siguientes afirmaciones es correcta sobre este valor?',
    options: [
      'El IDF de 1.2 varía de documento a documento según cuántas veces aparezca "excelente" en cada reseña.',
      'El IDF de 1.2 es una constante para toda la columna (token) del corpus; no varía por documento. Lo que varía por documento es el TF, y el producto TF × IDF da el peso final por celda.',
      'Un IDF de 1.2 indica que "excelente" es una stop word que debería eliminarse antes de vectorizar.',
      'El IDF debe recalcularse para cada nuevo documento que ingrese al sistema en producción.',
    ],
    correctIndex: 1,
    technicalRationale:
      'IDF = log(N/DF) depende solo del corpus global: N (total de documentos) y DF (documentos que contienen la palabra). Es un peso estadístico intrínseco de la palabra en el corpus — una constante por columna. TF varía por documento (frecuencia local). El valor final TF-IDF por celda = TF_ij × IDF_j combina la variación local (TF) con el peso global (IDF).',
    mathIntuition:
      'En la matriz documento-término, IDF opera como un vector de escalamiento por columna. Si la matriz TF tiene dimensiones N×d, IDF es un vector de d elementos que se multiplica elemento a elemento con cada fila. Formalmente: TF-IDF[i,j] = TF[i,j] × IDF[j]. IDF[j] es constante para todo i (todos los documentos), porque depende solo de la frecuencia documental global del término j.',
    businessImplication:
      'Entender que IDF es constante por columna es operativamente importante: en producción, el vocabulario IDF se calcula una vez con el corpus de entrenamiento y se aplica a nuevos documentos sin recalcular. Recalcular IDF con cada nuevo documento sería data leakage temporal y computacionalmente ineficiente.',
    distractorExplanations: [
      'Incorrecto: confunde IDF con TF. Es TF lo que varía por documento (frecuencia local de la palabra). IDF es constante para toda la columna.',
      'Esta es la respuesta correcta.',
      'Incorrecto: un IDF de 1.2 no indica una stop word. Las stop words tienen IDF ≈ 0 (aparecen en casi todos los documentos, N/DF ≈ 1, log(1) = 0). Un IDF de 1.2 indica una palabra con discriminación moderada.',
      'Incorrecto: recalcular IDF con datos nuevos contaminaría la evaluación (data leakage). El IDF se entrena con el corpus de train y se aplica fijo a datos nuevos.',
    ],
    oralFollowUp:
      'En producción, llega una reseña con una palabra que nunca apareció en el corpus de entrenamiento. ¿Qué pasa con su valor TF-IDF?',
    oralGuide:
      'Una palabra nueva (out-of-vocabulary) no tiene entrada en el vocabulario TF-IDF del entrenamiento. Se ignora — su columna no existe en la matriz. No se puede inventar un IDF porque no tenemos su DF en el corpus de train. Esto es consistente con la regla de no data leakage: las transformaciones se ajustan solo con train. El modelo solo puede usar señales de palabras que aprendió a ponderar durante el entrenamiento.',
  },
  {
    id: 8,
    topic: 'tfidf_nlp',
    subtopic: 'ChatGPT vs ML supervisado',
    statement:
      'Un equipo propone reemplazar el modelo supervisado de detección de reseñas falsas (regresión logística + TF-IDF, accuracy >90%) por ChatGPT, argumentando que es "más inteligente". ¿Cuál es el argumento técnico más sólido en contra?',
    options: [
      'ChatGPT no puede procesar texto en español, por lo que fallaría con reseñas en ese idioma.',
      'ChatGPT puede identificar sentimiento, pero la distinción "falso vs. verdadero" no está implícita en el texto — requiere una base supervisada con etiquetas específicas para ese problema, algo que ChatGPT no posee.',
      'ChatGPT es superior en todas las tareas de NLP y debería reemplazar cualquier modelo clásico.',
      'La regresión logística es más rápida que ChatGPT, y la velocidad es siempre el criterio principal.',
    ],
    correctIndex: 1,
    technicalRationale:
      'La clave es la naturaleza del problema: "falso vs. verdadero" es una distinción que no está codificada en el contenido semántico del texto de forma evidente. A diferencia del sentimiento (positivo/negativo), que tiene marcadores lingüísticos claros, la falsedad de una reseña requiere patrones sutiles aprendidos de datos etiquetados por expertos. El modelo supervisado se entrena explícitamente con estas etiquetas.',
    mathIntuition:
      'Un modelo supervisado optimiza P(y|x) directamente usando etiquetas y conocidas. ChatGPT es un modelo de lenguaje que modela P(siguiente_token|contexto) — no fue optimizado para discriminar falsedad. La regresión logística con TF-IDF aprende los pesos β que maximizan la verosimilitud de las etiquetas falso/verdadero, identificando patrones estadísticos que un humano (o ChatGPT) podría no percibir.',
    businessImplication:
      'Reemplazar un modelo calibrado y validado por ChatGPT introduciría riesgo operacional: sin datos supervisados, ChatGPT no puede garantizar un accuracy específico, no produce probabilidades calibradas para ajustar umbrales, y no permite justificar decisiones vía momios. En un contexto regulado, esto sería inaceptable.',
    distractorExplanations: [
      'Incorrecto: ChatGPT sí procesa múltiples idiomas. La limitación no es lingüística sino metodológica.',
      'Esta es la respuesta correcta.',
      'Incorrecto: ChatGPT no es superior en todas las tareas. Para problemas supervisados específicos con datos etiquetados, modelos clásicos especializados pueden superarlo.',
      'Incorrecto: la velocidad es relevante pero no es el argumento principal. El problema fundamental es la ausencia de datos supervisados para la tarea específica.',
    ],
    oralFollowUp:
      '¿En qué tareas de NLP sí sería razonable usar ChatGPT en lugar de un modelo supervisado? ¿Cuál es la frontera?',
    oralGuide:
      'ChatGPT es razonable cuando: (1) no existe un dataset etiquetado, (2) la tarea es de comprensión general (resumen, traducción, Q&A), o (3) se necesita prototipado rápido. La frontera está en la especificidad: si el problema requiere discriminar categorías que solo un dataset supervisado define (falso/verdadero, spam específico del dominio, fraude), un modelo clásico calibrado será superior. El ejemplo de Netflix 2009 lo ilustra: un modelo de recomendación bien calibrado supera a un LLM genérico.',
  },

  // ─── ÁRBOLES / RANDOM FOREST (4 preguntas) ───────────────────────
  {
    id: 9,
    topic: 'arboles_random_forest',
    subtopic: 'Entropía y ganancia de información',
    statement:
      'En un árbol de decisión, un nodo contiene 100 observaciones: 50 de clase A y 50 de clase B (entropía máxima = 1.0). Se evalúa un split por la variable "ingreso mensual" que produce: nodo izquierdo (45 A, 5 B) y nodo derecho (5 A, 45 B). ¿Por qué este split es excelente?',
    options: [
      'Porque maximiza la entropía de los nodos hijos, lo que indica mayor información.',
      'Porque reduce drásticamente la entropía: los nodos hijos son casi puros (una clase domina en cada uno), maximizando la ganancia de información.',
      'Porque genera nodos hijos de tamaño igual (50-50), lo cual es siempre óptimo.',
      'Porque minimiza el número total de observaciones, reduciendo la complejidad computacional.',
    ],
    correctIndex: 1,
    technicalRationale:
      'La ganancia de información = Entropía(padre) − Σ(peso_i × Entropía(hijo_i)). El nodo padre tiene entropía 1.0. Los hijos (45/5 y 5/45) tienen entropía ≈ 0.29 cada uno. Ganancia ≈ 1.0 − 0.29 = 0.71. Un split perfecto (50/0 y 0/50) daría ganancia = 1.0. Este split es excelente porque separa las clases casi completamente.',
    mathIntuition:
      'Entropía H = −Σ p_i × log₂(p_i). Para el nodo con 45A/5B: p_A = 0.9, p_B = 0.1. H = −(0.9×log₂0.9 + 0.1×log₂0.1) ≈ 0.47. La reducción de 1.0 a ~0.47 en cada hijo (ponderada por tamaño) indica que el split "ordena" significativamente las clases. El algoritmo busca j = argmax{Gain(S,i)} — la variable que maximice esta reducción de desorden.',
    businessImplication:
      'En un modelo de churn, este split significaría que "ingreso mensual" es una variable muy discriminante: clientes de alto ingreso se comportan muy diferente a los de bajo ingreso en cuanto a abandono. Esto tiene valor directo para segmentación comercial y campañas diferenciadas.',
    distractorExplanations: [
      'Incorrecto: invierte la lógica. Se busca minimizar la entropía de los hijos (nodos puros), no maximizarla. Alta entropía = más desorden.',
      'Esta es la respuesta correcta.',
      'Incorrecto: el tamaño igual no es el criterio. Un split 50-50 con ambos nodos mezclados (25A/25B en cada uno) tendría ganancia = 0, el peor resultado posible.',
      'Incorrecto: el número de observaciones no se reduce; se redistribuyen. El criterio es la pureza de los nodos, no la cantidad.',
    ],
    oralFollowUp:
      'Explique qué significa que una variable aparezca en el nodo raíz del árbol y por qué eso es relevante para el negocio.',
    oralGuide:
      'El nodo raíz es el primer split del árbol y utiliza la variable con mayor ganancia de información global. Es la variable que mejor separa las clases considerando toda la población. En un modelo de churn, si "meses_como_cliente" está en la raíz, significa que es el factor más discriminante para predecir abandono. El árbol funciona como un "pódium de importancia" — las variables superiores son las más relevantes, funcionando como feature selection explícita.',
  },
  {
    id: 10,
    topic: 'arboles_random_forest',
    subtopic: 'Random Forest vs interpretabilidad',
    statement:
      'Un director de riesgos de un banco pide implementar Random Forest para decidir aprobación de créditos porque "tiene mejor accuracy que un árbol único". ¿Cuál es la objeción técnica y regulatoria más relevante?',
    options: [
      'Random Forest es inviable porque requiere demasiado poder de cómputo para un banco.',
      'Random Forest reduce overfitting y mejora accuracy, pero sacrifica la interpretabilidad: no se puede trazar un camino de decisión único para explicar al cliente o al regulador por qué se denegó su crédito. En sectores regulados, la interpretabilidad puede ser más valiosa que unos puntos extra de precisión.',
      'Random Forest solo funciona con variables numéricas y los datos bancarios son categóricos.',
      'No hay objeción: Random Forest es siempre superior a un árbol único en todos los contextos.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Random Forest mejora desempeño mediante ensamble de muchos árboles poco profundos con subconjuntos aleatorios de variables. Pero la predicción es un promedio de votos de cientos de árboles — no hay un camino de decisión único explicable. En crédito, la Ley de Protección de Datos y regulaciones como la "Ley Riders" exigen explicar las decisiones algorítmicas. Un árbol único, aunque menos preciso, ofrece trazabilidad completa.',
    mathIntuition:
      'Un árbol único produce: IF ingreso > X AND antigüedad > Y THEN aprobado — interpretable como reglas. Random Forest promedia las predicciones de B árboles: ŷ = mode(h₁(x), h₂(x), ..., hB(x)). Cada h_b usa un subconjunto aleatorio de features, por lo que los caminos son diferentes y a veces contradictorios entre árboles. La ganancia es reducción de varianza (los errores se cancelan), pero el costo es pérdida de interpretabilidad.',
    businessImplication:
      'Alfonso enfatiza: un modelo de 85% explicable puede ser superior a uno de 95% inexplicable. En banca, un auditor o un cliente tiene derecho a saber por qué se le denegó un crédito. La Ley Riders en España exige transparencia algorítmica. La decisión no es solo técnica — es legal, ética y reputacional.',
    distractorExplanations: [
      'Incorrecto: Random Forest es computacionalmente eficiente y viable para bancos. El problema es interpretabilidad, no cómputo.',
      'Esta es la respuesta correcta.',
      'Incorrecto: Random Forest maneja variables categóricas (con One-Hot Encoding). El tipo de dato no es la limitación.',
      'Incorrecto: "siempre superior" ignora el trade-off interpretabilidad vs. desempeño, que es el tema central del curso.',
    ],
    oralFollowUp:
      'Dé dos ejemplos de sectores donde Random Forest sería preferible y dos donde un árbol único sería mejor. Justifique.',
    oralGuide:
      'Random Forest es preferible en: (1) Marketing digital — optimizar clics donde no hay regulación estricta y el accuracy importa más que la explicación; (2) Detección de spam — el volumen es alto, no hay exigencia de explicar cada decisión. Un árbol único es mejor en: (1) Crédito bancario — regulación exige explicar cada denegación; (2) Diagnóstico médico — un médico necesita un camino de decisión trazable para justificar tratamientos ante la aseguradora o el paciente.',
  },
  {
    id: 11,
    topic: 'arboles_random_forest',
    subtopic: 'Random Forest vota entre árboles, no entre variables',
    statement:
      'Un compañero explica Random Forest así: "El algoritmo toma las variables más importantes, cada una vota, y la variable con más votos define la predicción." ¿Cuál es el error?',
    options: [
      'El error es que Random Forest no usa votación; usa promediado ponderado de variables.',
      'Random Forest vota entre las predicciones de los árboles completos, no entre variables individuales. Cada árbol (entrenado con un subconjunto aleatorio de features) emite una predicción, y la clase con mayoría de votos entre los árboles es la predicción final.',
      'No hay error: la descripción es correcta para Random Forest con más de 100 árboles.',
      'El error es que Random Forest usa votación solo para regresión, no para clasificación.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Cada árbol del forest es un clasificador completo que emite una predicción. La predicción del ensemble es el voto mayoritario entre las predicciones de los B árboles: ŷ = mode(h₁(x), ..., hB(x)). Las variables no votan directamente — son usadas internamente por cada árbol para hacer splits. La aleatorización está en qué subconjunto de features ve cada árbol, no en que las features voten.',
    mathIntuition:
      'Sea h_b(x) la predicción del árbol b. La predicción del forest es: ŷ = argmax_c Σ_b 𝟙(h_b(x) = c). Es un conteo de cuántos árboles predicen cada clase. Cada h_b es una función completa de decisión, no una variable individual. La diversidad entre árboles (por bagging + random subspace) es lo que reduce la varianza del ensemble.',
    businessImplication:
      'La confusión entre "votación de variables" y "votación de árboles" puede llevar a conclusiones erróneas sobre importancia de features. La importancia de variables en Random Forest se calcula aparte (e.g., por permutation importance), no por votación directa. Un director que malinterprete esto podría tomar decisiones de negocio basadas en una comprensión incorrecta del modelo.',
    distractorExplanations: [
      'Incorrecto: Random Forest sí usa votación, pero entre árboles, no entre variables. Y no es "promediado ponderado de variables".',
      'Esta es la respuesta correcta.',
      'Incorrecto: la descripción es incorrecta independientemente del número de árboles. El mecanismo fundamental es votación entre árboles.',
      'Incorrecto: invierte la aplicación. Random Forest usa votación para clasificación (voto mayoritario) y promediado para regresión.',
    ],
    oralFollowUp:
      'Explique cómo Random Forest reduce el overfitting respecto a un árbol profundo individual.',
    oralGuide:
      'Un árbol profundo memoriza ruido del training set (overfitting). Random Forest combate esto de tres formas: (1) Bagging — cada árbol se entrena con un subconjunto aleatorio de datos, viendo diferentes versiones del dataset; (2) Random subspace — cada árbol solo ve un subconjunto de features en cada split; (3) Árboles poco profundos ("arbustos") con capacidad limitada de memorizar. Ningún árbol individual ve todo → los errores individuales son diferentes → al promediar/votar, los errores se cancelan. Es el principio estadístico de reducción de varianza por promediado.',
  },
  {
    id: 12,
    topic: 'arboles_random_forest',
    subtopic: 'Modelo vs algoritmo en árboles',
    statement:
      'En una presentación, alguien dice: "Usamos el modelo ID3 para predecir churn." ¿Por qué esta afirmación es técnicamente imprecisa?',
    options: [
      'Porque ID3 solo sirve para problemas de NLP, no para churn.',
      'ID3 es un algoritmo de entrenamiento (la receta que construye el árbol), no el modelo. El modelo es el árbol de decisión resultante con sus nodos, splits y reglas. El algoritmo construye; el modelo es lo construido.',
      'Porque ID3 y CART son exactamente lo mismo; no importa cuál nombre se use.',
      'Porque ID3 solo funciona con Gini, no con entropía.',
    ],
    correctIndex: 1,
    technicalRationale:
      'La distinción modelo vs. algoritmo es un tema central del curso. ID3 es un algoritmo que usa entropía/ganancia de información para decidir los splits óptimos paso a paso. El resultado es un árbol de decisión (el modelo) con nodos, ramas y hojas que predicen. CART es otro algoritmo (usa Gini). Ambos producen modelos similares (árboles) pero con diferentes criterios de optimización.',
    mathIntuition:
      'El algoritmo ID3 ejecuta: para cada nodo, j = argmax_i{Gain(S,i)} iterativamente hasta un criterio de parada. El modelo resultante es una función f(x) = c_k si x ∈ R_k, donde R_k son las regiones definidas por los splits y c_k son las predicciones en cada hoja. El algoritmo es el proceso; el modelo es la estructura matemática final.',
    businessImplication:
      'La imprecisión terminológica puede parecer menor, pero en un contexto profesional indica falta de rigor conceptual. Si un científico de datos no distingue entre la herramienta de construcción y lo construido, podría confundir hiperparámetros del algoritmo (profundidad máxima, criterio de split) con propiedades del modelo (importancia de variables, reglas de decisión).',
    distractorExplanations: [
      'Incorrecto: ID3 no está restringido a NLP. Es un algoritmo general para construir árboles de decisión con cualquier tipo de datos.',
      'Esta es la respuesta correcta.',
      'Incorrecto: ID3 y CART son diferentes. ID3 usa entropía/ganancia de información; CART usa índice de Gini. Producen árboles similares pero con criterios distintos.',
      'Incorrecto: invierte la relación. ID3 usa entropía; CART usa Gini. No al revés.',
    ],
    oralFollowUp:
      'Aplique la distinción modelo vs. algoritmo al perceptrón: ¿cuál es el modelo y cuál es el algoritmo?',
    oralGuide:
      'El modelo del perceptrón es el hiperplano definido por el vector de pesos β = (β₁, β₂, ..., β_d) y el bias. Es la estructura matemática que, dado un nuevo dato x, predice sign(β·x). El algoritmo es el proceso iterativo de aprendizaje: en cada época, recorre los datos (shuffled), encuentra ejemplos mal clasificados, y actualiza β. El algoritmo construye el hiperplano; el hiperplano con sus pesos finales es el modelo.',
  },

  // ─── REGULARIZACIÓN (3 preguntas) ─────────────────────────────────
  {
    id: 13,
    topic: 'regularizacion',
    subtopic: 'Ridge vs Lasso: efecto sobre coeficientes',
    statement:
      'Un modelo de detección de spam tiene 10,000 features (palabras). Se sospecha que solo ~20 palabras son realmente predictivas ("gratis", "millonario", "premio", etc.). ¿Qué regularización conviene y por qué?',
    options: [
      'Ridge (L2), porque reduce todos los pesos uniformemente y es más estable numéricamente.',
      'Lasso (L1), porque puede llevar ~9,980 coeficientes exactamente a cero, seleccionando automáticamente las ~20 palabras relevantes y produciendo un modelo sparse.',
      'No se necesita regularización si ya se aplicó TF-IDF, porque TF-IDF ya penaliza las palabras irrelevantes.',
      'Ambas son equivalentes cuando el número de features es mayor que 1,000.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Lasso (L1) usa la norma L1 (suma de valores absolutos de β). Su geometría (diamante en 2D) tiene esquinas donde los coeficientes se hacen exactamente cero. Con 10,000 features y solo ~20 relevantes, Lasso producirá un modelo sparse que automáticamente identifica las palabras predictivas. Ridge reduce pero no elimina — los 10,000 coeficientes serían pequeños pero no nulos.',
    mathIntuition:
      'La penalización L1 = λΣ|β_i| tiene una propiedad geométrica especial: el contorno del constraint (un diamante/rombo en 2D) tiene esquinas sobre los ejes. La solución óptima tiende a caer en estas esquinas, donde algunas coordenadas β_i = 0 exactamente. L2 = λΣβ_i² tiene contorno circular (esfera) sin esquinas, por lo que la solución raramente cae sobre un eje — reduce pero no anula.',
    businessImplication:
      'En spam detection, un modelo Lasso que identifica las 20 palabras clave es operativamente superior: más rápido en producción (menos features a evaluar), más explicable ("el email se marcó como spam por contener «gratis» y «millonario»"), y más fácil de auditar y mantener.',
    distractorExplanations: [
      'Incorrecto: Ridge reduciría los 10,000 pesos pero mantendría todos. Con solo 20 features relevantes, queremos selección automática (sparsity), no reducción uniforme.',
      'Esta es la respuesta correcta.',
      'Incorrecto: TF-IDF pondera los datos; no controla los pesos del modelo. Sin regularización, el modelo puede sobreajustar asignando pesos grandes a palabras irrelevantes.',
      'Incorrecto: Ridge y Lasso tienen comportamientos fundamentalmente diferentes independientemente del número de features. No son equivalentes.',
    ],
    oralFollowUp:
      'Dé un ejemplo donde Ridge sería preferible a Lasso y explique por qué.',
    oralGuide:
      'Ridge es preferible cuando las variables están correlacionadas y todas aportan algo. Ejemplo: predicción de precio de casa con features como metros cuadrados, número de habitaciones, número de baños, y ventanas — todas están correlacionadas (casas grandes tienen más de todo). Lasso tendría problemas seleccionando arbitrariamente una de estas variables correlacionadas y descartando las demás. Ridge distribuye los pesos entre todas, manteniendo la información conjunta. Como dice la guía: Ridge mantiene a todos participando pero controla su influencia.',
  },
  {
    id: 14,
    topic: 'regularizacion',
    subtopic: 'Relación C-λ y efecto de Ridge',
    statement:
      'En scikit-learn, el parámetro C de LogisticRegression con penalty="l2" se define como C = 1/λ. Un GridSearchCV prueba C ∈ {0.001, 0.01, 0.1, 1, 10}. ¿Qué sucede cuando C = 0.001?',
    options: [
      'Regularización mínima: los coeficientes β pueden crecer libremente y el modelo es más complejo.',
      'Regularización máxima (λ = 1000): los coeficientes β se "aplastan" hacia cero, produciendo un modelo muy simple que podría subajustar.',
      'C = 0.001 significa que solo se entrenan 0.1% de los datos, reduciendo el tamaño del training set.',
      'C = 0.001 indica que el modelo usa 0.001 épocas de entrenamiento, lo cual es insuficiente.',
    ],
    correctIndex: 1,
    technicalRationale:
      'C = 1/λ, por lo que C = 0.001 → λ = 1000 (regularización muy fuerte). La función de error se convierte en Error_Ridge = Error_clásico + 1000 × ||β||². La penalización domina la optimización, forzando los β hacia cero. El modelo resultante es extremadamente simple — podría subajustar si la regularización es excesiva.',
    mathIntuition:
      'Con λ = 1000, el término 1000 × Σβ_i² domina la función objetivo. El optimizador minimiza más los pesos que el error de clasificación. En el espacio de parámetros, es como "aplastar" el vector β hacia el origen (0,0,...,0). Geométricamente, la restricción ||β||² ≤ r define una esfera muy pequeña cerca del origen. Los β quedan tan cerca de cero que pierden capacidad discriminante.',
    businessImplication:
      'Un C demasiado pequeño puede producir un modelo que "no discrimina" — predice la clase mayoritaria para todos. En un modelo de churn, esto significaría tratar a todos los clientes igual, perdiendo la capacidad de identificar a los que realmente están en riesgo. El GridSearchCV con cross-validation encuentra el C óptimo sin contaminar el test set.',
    distractorExplanations: [
      'Incorrecto: invierte la relación. C pequeño = regularización fuerte, no mínima. C grande = regularización débil.',
      'Esta es la respuesta correcta.',
      'Incorrecto: C no tiene relación con el tamaño del dataset. Es un hiperparámetro de regularización.',
      'Incorrecto: C no controla las épocas de entrenamiento. Controla la inversa de la fuerza de regularización.',
    ],
    oralFollowUp:
      'Explique por qué GridSearchCV es necesario para encontrar el C óptimo en lugar de elegirlo manualmente.',
    oralGuide:
      'No hay forma teórica de saber el C óptimo a priori porque depende de la estructura específica de los datos: número de features, correlaciones, tamaño del dataset, separabilidad de las clases. GridSearchCV prueba sistemáticamente cada candidato y usa cross-validation para evaluarlos de forma robusta, promediando sobre K folds para reducir la varianza de la estimación. Es como un "campeonato" donde Grid Search propone los candidatos y Cross-Validation los somete a evaluación rigurosa. El test set permanece sin contaminar.',
  },
  {
    id: 15,
    topic: 'regularizacion',
    subtopic: 'Norma euclidiana y metáfora del sastre',
    statement:
      'La regularización Ridge añade λ||β||₂² a la función de error. ¿Qué mide ||β||₂ geométricamente y por qué penalizarlo reduce el overfitting?',
    options: [
      '||β||₂ mide el ángulo entre β y el eje x. Penalizarlo alinea el modelo con los datos.',
      '||β||₂ es la distancia euclidiana del vector β al origen. Penalizarla "jala" los coeficientes hacia cero, impidiendo que el modelo asigne pesos exagerados a features específicas (memorización de ruido), produciendo un modelo más suave y generalizable.',
      '||β||₂ mide la correlación entre las features. Penalizarla elimina la multicolinealidad.',
      '||β||₂ es el número total de features con coeficiente no nulo. Penalizarlo reduce la dimensionalidad.',
    ],
    correctIndex: 1,
    technicalRationale:
      '||β||₂ = √(Σβ_i²) es la norma euclidiana — la distancia desde el punto (β₁,...,β_d) hasta el origen (0,...,0), calculada con el Teorema de Pitágoras extendido a d dimensiones. Lejos del origen → pesos enormes → modelo sobreajustado que memoriza ruido. Cerca del origen → pesos moderados → modelo suave. Ridge actúa como una fuerza que jala β hacia el origen (metáfora del sastre: tela gruesa que suaviza las costuras).',
    mathIntuition:
      'La función a minimizar es L(β) = Error(β) + λ||β||₂². Sin Ridge, el optimizador puede usar β grandes para ajustar cada punto del training (incluyendo ruido). Con Ridge, cada β_i grande es penalizado cuadráticamente, creando un trade-off: reducir el error vs. mantener β cerca del origen. Esto modifica la matriz de covarianza: (X^TX + λI)^{-1} en lugar de (X^TX)^{-1}, lo que estabiliza la inversión cuando d >> N.',
    businessImplication:
      'La metáfora del sastre del curso lo explica: sin Ridge, el modelo sigue cada irregularidad de los datos como un traje hecho a medida de cada pliegue del cuerpo (overfitting). Con Ridge, se usa "tela más gruesa" que produce un corte más sencillo y robusto (Navaja de Occam). En producción, un modelo con pesos moderados es más estable ante pequeñas variaciones en los datos nuevos.',
    distractorExplanations: [
      'Incorrecto: ||β||₂ no mide ángulos sino distancias. El ángulo sería relevante para cosine similarity, no para regularización.',
      'Esta es la respuesta correcta.',
      'Incorrecto: Ridge no mide ni elimina correlación entre features directamente. Estabiliza la inversión matricial, lo que indirectamente ayuda con multicolinealidad, pero la norma euclidiana mide magnitud, no correlación.',
      'Incorrecto: eso describe la norma L0 (o el efecto de Lasso). La norma L2 mide magnitud continua, no conteo de features no nulas.',
    ],
    oralFollowUp:
      'Use la metáfora del sastre para explicar a un stakeholder no técnico por qué Ridge produce un modelo más robusto.',
    oralGuide:
      'Imagine que entrena un modelo como un sastre que hace un traje. Sin regularización, el sastre sigue cada curva, cada postura, cada imperfección del cliente — el traje queda perfecto hoy pero mañana el cliente se para diferente y el traje no sirve. Ridge es como usar una tela más gruesa y elástica que produce costuras más suaves: no sigue cada detalle, pero el resultado es un traje que queda bien en múltiples situaciones. Se cobra una multa matemática por cada costura extrema, forzando un diseño más sencillo. Es la Navaja de Occam aplicada al machine learning.',
  },

  // ─── MÉTRICAS Y EVALUACIÓN (3 preguntas) ──────────────────────────
  {
    id: 16,
    topic: 'metricas_evaluacion',
    subtopic: 'Accuracy engañoso en clases desbalanceadas',
    statement:
      'Un modelo de detección de fraude en transacciones bancarias reporta 99.2% de accuracy. El dataset tiene 99% de transacciones legítimas y 1% fraudulentas. ¿Por qué este accuracy es potencialmente engañoso?',
    options: [
      'Porque 99.2% es un accuracy bajo para un modelo bancario; se necesita al menos 99.9%.',
      'Un modelo que predice "legítima" para TODAS las transacciones alcanzaría 99% de accuracy sin detectar ningún fraude. El 99.2% podría significar que el modelo apenas supera este baseline trivial. En clases desbalanceadas, sensibilidad y especificidad son los diagnósticos confiables, no accuracy.',
      'Porque el accuracy no puede superar la proporción de la clase mayoritaria.',
      'Porque el accuracy solo es válido cuando las clases están perfectamente balanceadas (50/50).',
    ],
    correctIndex: 1,
    technicalRationale:
      'Con 99% de transacciones legítimas, un clasificador trivial que siempre predice "legítima" obtiene 99% accuracy. El modelo reportado (99.2%) apenas agrega 0.2% sobre este baseline ingenuo. Podría estar detectando muy pocos fraudes reales. Las métricas relevantes son: sensibilidad (¿qué porcentaje de fraudes detecta?), precisión (¿qué porcentaje de las alarmas son fraudes reales?), y el AUC-ROC.',
    mathIntuition:
      'Accuracy = (TP + TN)/(TP + TN + FP + FN). Con 99% negativos, TN domina el numerador. Si detecta 20/100 fraudes (20% sensibilidad) y clasifica bien 9,880/9,900 legítimas: Accuracy = (20 + 9880)/10000 = 99.0%. El accuracy parece alto pero el modelo falla en 80% de los fraudes. Sensibilidad = TP/(TP+FN) = 20/100 = 20% revelaría el problema.',
    businessImplication:
      'En banca, cada fraude no detectado es una pérdida financiera directa y riesgo reputacional. Reportar 99.2% accuracy a un comité puede dar falsa confianza. El KPI relevante es: "¿cuántos fraudes estamos dejando pasar?" (1 - sensibilidad). Un modelo con 95% accuracy pero 90% sensibilidad es operativamente superior.',
    distractorExplanations: [
      'Incorrecto: 99.2% no es bajo en abstracto. El problema es que es apenas superior al baseline trivial de 99%.',
      'Esta es la respuesta correcta.',
      'Incorrecto: el accuracy sí puede superar la proporción de la clase mayoritaria si el modelo detecta algunos positivos correctamente.',
      'Incorrecto: el accuracy es calculable con cualquier distribución de clases, pero su interpretación es engañosa cuando las clases están desbalanceadas.',
    ],
    oralFollowUp:
      'Si usted fuera el científico de datos, ¿qué métricas presentaría al comité de riesgo del banco en lugar de accuracy?',
    oralGuide:
      'Presentaría: (1) Sensibilidad/Recall — porcentaje de fraudes realmente detectados; (2) Precisión — porcentaje de alertas que son fraudes reales (evitar fatiga de alertas); (3) Curva ROC y AUC — desempeño global del modelo a través de todos los umbrales; (4) Matriz de confusión desglosada — cuántos fraudes se detectaron vs. cuántos se escaparon. Al comité le traduciría: "De cada 100 fraudes reales, nuestro modelo detecta X y se nos escapan Y, con Z falsas alarmas por cada alarma correcta."',
  },
  {
    id: 17,
    topic: 'metricas_evaluacion',
    subtopic: 'Umbral de decisión y costo del error',
    statement:
      'En un modelo de predicción de churn en telecomunicaciones, un cliente tiene 37% de probabilidad estimada de abandono. Con el umbral por defecto de 50%, no se interviene. El costo de perder un cliente es $2,000 y el costo de una campaña de retención innecesaria es $50. ¿Qué debería hacerse?',
    options: [
      'Mantener el umbral en 50% porque es el estándar estadístico y cambiarlo invalidaría el modelo.',
      'Bajar el umbral (e.g., a 30%) para que este cliente sea clasificado como "en riesgo" y se lance la campaña. Dado que el costo de un falso negativo ($2,000) es 40 veces mayor que el de un falso positivo ($50), es racionalmente óptimo aceptar más falsas alarmas.',
      'Eliminar el modelo y contactar a todos los clientes preventivamente.',
      'Subir el umbral a 70% para reducir los falsos positivos y ahorrar en campañas.',
    ],
    correctIndex: 1,
    technicalRationale:
      'El umbral de 50% no es sagrado — es el default pero rara vez el óptimo para el negocio. Con asimetría de costos (FN mucho más costoso que FP), se baja el umbral. A 30%, clientes con ≥30% de P(churn) reciben intervención. Esto aumenta falsas alarmas (más campañas innecesarias a $50) pero reduce los falsos negativos (clientes perdidos a $2,000). El ratio costo(FN)/costo(FP) = 40 justifica ampliamente la estrategia.',
    mathIntuition:
      'El umbral óptimo minimiza el costo esperado: E[Costo] = C_FN × P(FN) + C_FP × P(FP). Con C_FN/C_FP = 40, el umbral óptimo se desplaza hacia donde el modelo captura más positivos aunque genere más falsas alarmas. En la curva ROC, esto corresponde a moverse hacia arriba-derecha: mayor TPR a costa de mayor FPR. El punto óptimo depende de la pendiente C_FN/C_FP.',
    businessImplication:
      'Para telecomunicaciones, es mucho más barato enviar una campaña de retención innecesaria ($50) que perder un cliente ($2,000 en ingresos futuros). Un umbral de 30% significa que la empresa proactivamente retiene clientes con riesgo moderado, aceptando que algunas campañas serán "desperdiciadas" — pero el valor esperado neto es positivo.',
    distractorExplanations: [
      'Incorrecto: el umbral de 50% no es un estándar fijo. Es un default que debe ajustarse según el contexto de negocio y la asimetría de costos.',
      'Esta es la respuesta correcta.',
      'Incorrecto: contactar a todos es costoso e ignora la información del modelo. La gracia del umbral es focalizar recursos en clientes de mayor riesgo.',
      'Incorrecto: subir el umbral reduciría la detección de churners reales, aumentando las pérdidas. Con costos asimétricos, se baja el umbral, no se sube.',
    ],
    oralFollowUp:
      'Explique cómo la curva ROC ayuda a visualizar el efecto de mover el umbral y cómo se justifica ante el negocio.',
    oralGuide:
      'La curva ROC grafica TPR (sensibilidad) vs. FPR para cada umbral de 0 a 1. Mover el umbral a la izquierda (bajarlo) incrementa ambos: detectamos más churners reales (TPR sube) pero también generamos más falsas alarmas (FPR sube). La curva permite visualizar este trade-off completo. Al negocio se le muestra: "Si bajamos el umbral de 50% a 30%, detectamos X% más de churners reales pero generamos Y% más de campañas innecesarias. Dado el ratio de costos, el ahorro neto esperado es Z." El AUC resume qué tan bien discrimina el modelo a través de todos los umbrales.',
  },
  {
    id: 18,
    topic: 'metricas_evaluacion',
    subtopic: 'Data leakage y cross-validation',
    statement:
      'Un analista aplica TF-IDF a todo el dataset (train + test juntos) antes de separar los datos, y luego reporta un accuracy de 95% en test. ¿Cuál es el problema y por qué cross-validation sola no lo soluciona?',
    options: [
      'No hay problema si el accuracy es alto. TF-IDF es una transformación estadística y no transmite etiquetas.',
      'Hay data leakage: los pesos IDF del test contaminaron el entrenamiento. Los IDF deben calcularse solo con train. Cross-validation reduce varianza de la evaluación pero no detecta leakage si el preprocesamiento contaminado se aplicó antes de la separación.',
      'Cross-validation corrige automáticamente cualquier forma de data leakage al rotar los folds.',
      'El problema se resuelve simplemente aumentando el número de folds en cross-validation.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Al calcular IDF con todo el dataset, los pesos IDF incorporan información de la distribución de palabras del test set. Cuando el modelo entrena con estos IDF, está "viendo" indirectamente el test. Esto infla el accuracy artificialmente. La regla de oro: transformaciones como TF-IDF, estandarización, etc. deben ajustarse solo con train y aplicarse al test sin recalibrar. Cross-validation reduce varianza pero no detecta si el preprocesamiento ya está contaminado.',
    mathIntuition:
      'IDF(palabra) = log(N/DF). Si N incluye documentos de test, los DF reflejan frecuencias que incluyen información del test. El modelo ve una representación contaminada. Formalmente, se viola la independencia entre train y test que fundamenta la evaluación no sesgada. Cross-validation con K folds repetiría el mismo error K veces si el TF-IDF global se calculó antes de la separación.',
    businessImplication:
      'Un modelo con accuracy artificialmente inflado por data leakage fracasará en producción. Si un equipo presenta 95% accuracy al negocio y en producción obtiene 80%, la credibilidad del equipo de datos se destruye. El data leakage es el error metodológico más costoso porque produce falsa confianza.',
    distractorExplanations: [
      'Incorrecto: aunque TF-IDF no transmite etiquetas directamente, transmite información de la distribución de palabras del test. Esto viola la separación train/test y sesga la evaluación.',
      'Esta es la respuesta correcta.',
      'Incorrecto: cross-validation no corrige leakage pre-existente. Si el preprocesamiento se hizo sobre todo el dataset antes de la separación, cada fold hereda la contaminación.',
      'Incorrecto: más folds no resuelven un problema de contaminación del preprocesamiento. El leakage ocurre antes de la separación en folds.',
    ],
    oralFollowUp:
      'Diseñe el pipeline correcto para aplicar TF-IDF sin data leakage, incluyendo cross-validation.',
    oralGuide:
      'Pipeline correcto: (1) Separar train/test antes de cualquier transformación. (2) Dentro de cross-validation, en cada fold: ajustar TF-IDF solo con los datos de entrenamiento del fold (K-1 partes), luego transformar la parte de validación con el TF-IDF ya ajustado. (3) Las palabras del fold de validación que no aparecieron en el entrenamiento se ignoran. (4) El test set final se transforma con el TF-IDF ajustado sobre todo el train, nunca se recalcula. Scikit-learn facilita esto con Pipeline + GridSearchCV.',
  },

  // ─── INTEGRADORAS NEGOCIO (2 preguntas) ───────────────────────────
  {
    id: 19,
    topic: 'negocio_interpretacion',
    subtopic: 'Modelo preciso pero fracaso de negocio',
    statement:
      'En Mauna Kea Technologies, un modelo de diagnóstico de cáncer de esófago alcanza 98% de accuracy general pero tiene 40% de sensibilidad en la clase "Displasia/Cáncer" (es decir, 60% de falsos negativos). Un directivo celebra el 98% de accuracy. ¿Cuál es el análisis correcto?',
    options: [
      'El directivo tiene razón: 98% accuracy es excepcional y el modelo está listo para producción.',
      'El modelo es un fracaso médico y comercial: 60% de pacientes con displasia/cáncer serían diagnosticados como sanos. En diagnóstico oncológico, el falso negativo es el error más costoso (cáncer no detectado). La sensibilidad en la clase crítica es la métrica que importa, no el accuracy global.',
      'El 40% de sensibilidad es aceptable si la especificidad es alta, porque es más importante no alarmar pacientes sanos.',
      'Se debería usar PCA para reducir dimensiones y mejorar la sensibilidad.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Con 4 clases donde la mayoría son condiciones benignas, el 98% accuracy se infla por las clasificaciones correctas de las clases mayoritarias. Pero 40% de sensibilidad en Displasia/Cáncer significa que 6 de cada 10 pacientes con cáncer serían enviados a casa sin tratamiento. En oncología, el falso negativo tiene costo potencialmente mortal. La métrica correcta es sensibilidad por clase, especialmente para la clase clínicamente crítica.',
    mathIntuition:
      'Si el dataset tiene 1000 muestras con 20 Displasia, 980 otras: clasificar todo como "no Displasia" da accuracy = 980/1000 = 98%. Sensibilidad para Displasia = 0/20 = 0%. El modelo reportado es ligeramente mejor (8/20 detectados = 40%), pero sigue fallando en 12/20 pacientes con cáncer. El accuracy global enmascara el desempeño catastrófico en la clase minoritaria pero más importante.',
    businessImplication:
      'Mauna Kea Technologies es una empresa médica: un modelo que deja pasar el 60% de los cánceres generaría demandas legales, pérdida de certificación regulatoria, y daño reputacional irreparable. Alfonso enfatiza que en contextos médicos se debe sacrificar especificidad por sensibilidad — es preferible falsas alarmas (biopsias innecesarias) a cánceres no detectados.',
    distractorExplanations: [
      'Incorrecto: celebrar el accuracy global ignora el desempeño catastrófico en la clase más importante. Es un ejemplo perfecto de por qué accuracy es engañoso en clases desbalanceadas.',
      'Esta es la respuesta correcta.',
      'Incorrecto: en oncología, el error más costoso es NO detectar cáncer (falso negativo), no alarmar pacientes sanos (falso positivo). Una biopsia innecesaria es mucho menos grave que un cáncer sin detectar.',
      'Incorrecto: Ana Isabel prohíbe explícitamente PCA en el examen si no se puede interpretar los componentes. Además, PCA no resuelve un problema de desbalance de clases ni de elección de métricas.',
    ],
    oralFollowUp:
      'Si usted fuera el científico de datos presentando al comité médico, ¿cómo reformularía los resultados y qué acción propondría?',
    oralGuide:
      'Presentaría: "Nuestro modelo tiene 98% accuracy global, pero solo detecta 4 de cada 10 casos de displasia/cáncer. Esto es inaceptable en contexto oncológico." Propondría: (1) Bajar el umbral de decisión para la clase Displasia para maximizar sensibilidad, aceptando más biopsias innecesarias; (2) Usar stratify en el split para mantener la proporción de la clase minoritaria; (3) Evaluar con sensibilidad y especificidad por clase, no accuracy global; (4) Considerar sobre-muestreo o pesos por clase para balancear el entrenamiento. El KPI debe ser: "¿cuántos cánceres dejamos pasar?" no "¿cuánto acertamos en general?".',
  },
  {
    id: 20,
    topic: 'negocio_interpretacion',
    subtopic: 'PCA, interpretabilidad y regulación',
    statement:
      'Un equipo de ciencia de datos de una aseguradora propone usar PCA para reducir 150 features a 10 componentes principales antes de entrenar un modelo de aprobación de pólizas. Ana Isabel y Alfonso objetarían. ¿Por qué?',
    options: [
      'Porque PCA solo funciona con datos de texto y las aseguradoras usan datos numéricos.',
      'Porque PCA destruye la interpretabilidad: los componentes principales son combinaciones lineales abstractas de las variables originales. En un sector regulado, la aseguradora debe explicar qué variables influyeron en la decisión, y "el componente principal 3" no es una respuesta aceptable. Además, 150 features no son "demasiadas" para regresión logística o árboles.',
      'Porque PCA siempre reduce el accuracy del modelo y las aseguradoras necesitan máxima precisión.',
      'Porque PCA introduce data leakage automáticamente al transformar los datos.',
    ],
    correctIndex: 1,
    technicalRationale:
      'Ana Isabel prohíbe PCA en el examen si no se puede interpretar los componentes. Los componentes principales son combinaciones lineales de las variables originales: PC1 = a₁x₁ + a₂x₂ + ... Si un cliente pregunta "¿por qué me denegaron la póliza?", responder "por su valor alto en PC3" no es explicable. Con 150 features frente a miles de clientes, la dimensionalidad no es un problema real — es viable usar regresión logística o árboles directamente.',
    mathIntuition:
      'PCA encuentra los eigenvectors de la matriz de covarianza que capturan la mayor varianza. Cada PC_k = Σ a_ki × x_i es una combinación lineal que mezcla las variables originales. La interpretabilidad se pierde porque a_ki son pesos abstractos sin significado de negocio. En contraste, un coeficiente β de regresión logística sobre la variable original "ingreso" se interpreta directamente como e^β factor sobre los odds.',
    businessImplication:
      'En seguros (como en banca y medicina), la regulación exige transparencia algorítmica. La aseguradora debe poder explicar al cliente y al regulador exactamente qué factores influyeron en la decisión. PCA convierte "ingreso", "edad", "historial médico" en dimensiones abstractas sin nombre, destruyendo esta capacidad. Alfonso prefiere un modelo de 85% explicable sobre uno de 95% opaco.',
    distractorExplanations: [
      'Incorrecto: PCA funciona con cualquier dato numérico, no está restringido a texto.',
      'Esta es la respuesta correcta.',
      'Incorrecto: PCA puede mantener o incluso mejorar accuracy al eliminar ruido. El problema no es accuracy sino interpretabilidad.',
      'Incorrecto: PCA no introduce data leakage automáticamente. Puede hacerlo si se ajusta con todo el dataset, pero el problema principal con PCA en este contexto es la pérdida de interpretabilidad.',
    ],
    oralFollowUp:
      'Proponga una estrategia alternativa a PCA que reduzca dimensionalidad sin perder interpretabilidad.',
    oralGuide:
      'Alternativas interpretables: (1) Lasso (L1) — selecciona automáticamente features llevando coeficientes irrelevantes a cero. El modelo final usa variables originales con nombres y significado. (2) Árboles de decisión — hacen feature selection explícita: las variables importantes aparecen en nodos superiores, las irrelevantes no aparecen. (3) Análisis de correlación manual — eliminar features altamente correlacionadas conservando la más interpretable. Todas estas mantienen las variables originales con su significado de negocio.',
  },
];
