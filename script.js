document.addEventListener('DOMContentLoaded', () => {
  const mainBubble = document.getElementById('mainBubble');
  const bubbleGroup = document.getElementById('bubbleGroup');
  const introText = document.getElementById('introText');
  const bubblesArea = document.querySelector('.bubbles-area');
  const bubbles = bubbleGroup.querySelectorAll('.bubble');
  const modal = document.getElementById('modalSlider');
  const slidesContainer = document.getElementById('sliderSlides');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const closeBtn = document.getElementById('sliderClose');
  const indicators = document.getElementById('sliderIndicators');
  let current = 0;
  let currentSlides = [];
  let currentTopic = '';

  // Slides por tema
  const SLIDERS = {
    origen: [
      {
        title: "Origen",
        content: `
        <div class="slide-sep"></div>
        <p>
          El surgimiento de la Escuela Nueva se enmarca en un período de grandes transformaciones sociales y culturales. A fines del siglo XIX, Europa vivía los efectos de la industrialización, la expansión de las ciudades y el crecimiento de los sistemas educativos nacionales.
        </p>
        <p>
          Sin embargo, las escuelas seguían organizadas según un modelo rígido, autoritario y uniforme, más preocupado por mantener el orden que por fomentar el pensamiento crítico o la creatividad.
        </p>
        `
      },
      {
        title: "Origen",
        content: `
        <div class="slide-sep"></div>
        <p>
          Frente a esta realidad, varios educadores comenzaron a imaginar una escuela distinta. Su propuesta se basaba en reconocer la individualidad de cada niño, promover la autonomía, y reemplazar la pasividad por la acción.
        </p>
        <ul>
          <li>Abbotsholme (Inglaterra, 1889, Cecil Reddie): trabajo manual, vida al aire libre y formación moral.</li>
          <li>Experiencias en Francia, Alemania, Suiza y Bélgica unidas por la convicción de formar personas libres, críticas y comprometidas.</li>
        </ul>
        `
      },
      {
        title: "Origen",
        content: `
        <div class="slide-sep"></div>
        <p>
          El movimiento adquirió dimensión internacional con la creación, en 1920, de la Liga Internacional de la Educación Nueva (LIEN), reuniendo a figuras como Adolphe Ferrière, Ovide Decroly, Maria Montessori, Beatrice Ensor y John Dewey.
        </p>
        <blockquote>
          Principios de la Educación Nueva:
          <ul>
            <li>Respetar la individualidad y el ritmo de aprendizaje del niño.</li>
            <li>El conocimiento se construye mediante la experiencia y la acción.</li>
            <li>El trabajo cooperativo es más valioso que la competencia.</li>
            <li>La escuela debe preparar para la vida democrática y social.</li>
          </ul>
        </blockquote>
        <p>
          Adolphe Ferrière redactó treinta principios, destacando la educación integral, el aprendizaje por interés, el autogobierno infantil y el contacto con la naturaleza.
        </p>
        <div class="footer">
          Así, la Escuela Nueva unió pedagogía, psicología y filosofía para crear un modelo educativo centrado en la libertad, la participación y la vida.
        </div>
        `
      }
    ],
    ideas: [
      {
        title: "Ideas del movimiento",
        content: `
        <div class="slide-sep"></div>
        <p>
          La idea central de la Escuela Nueva fue el paidocentrismo (educación centrada en el niño), rompiendo con el modelo magistrocéntrico tradicional.
        </p>
        <ul>
          <li>El alumno es protagonista activo de su aprendizaje.</li>
          <li>El conocimiento se construye a partir de la curiosidad, la observación y la experimentación.</li>
          <li>El maestro acompaña y orienta, no impone.</li>
        </ul>
        `
      },
      {
        title: "Ideas del movimiento",
        content: `
        <div class="slide-sep"></div>
        <blockquote>
          John Dewey: “La educación no es preparación para la vida, es la vida misma”.
        </blockquote>
        <p>
          Bajo este enfoque, la enseñanza debía estar vinculada a la realidad y basada en la acción y la experiencia:
        </p>
        <ul>
          <li>Método Montessori: autonomía, respeto por los ritmos individuales, aprendizaje con materiales concretos.</li>
          <li>Centros de interés (Decroly): aprendizaje alrededor de temas cotidianos.</li>
          <li>Plan Dalton: trabajo individual y cooperación grupal.</li>
          <li>Método de proyectos: aprender resolviendo problemas reales y significativos.</li>
        </ul>
        `
      },
      {
        title: "Ideas del movimiento",
        content: `
        <div class="slide-sep"></div>
        <p>
          La escuela tradicional fue reemplazada por un modelo que promovía la libertad y la responsabilidad. El error se consideró parte natural del aprendizaje. Se alentó la autoevaluación, el trabajo en equipo y el diálogo.
        </p>
        <p>
          Espacios físicos: aulas amplias, zonas verdes, bibliotecas abiertas y talleres. Mesas colectivas y conversación en lugar de hileras y silencio.
        </p>
        <div class="footer">
          La educación debía ser una experiencia de vida, donde se aprendiera a pensar, ser y convivir.
        </div>
        `
      }
    ],
    historia: [
      {
        title: "Su historia en Argentina",
        content: `
        <div class="slide-sep"></div>
        <p>
          En la Argentina, las ideas de la Escuela Nueva se difundieron en las primeras décadas del siglo XX, en un contexto de expansión educativa y cuestionamiento del modelo rígido.
        </p>
        <blockquote>
          Ignacio Frechtel: El escolanovismo argentino surgió en relación con la Reforma Universitaria de 1918, impulsando libertad de pensamiento, participación y democracia.
        </blockquote>
        `
      },
      {
        title: "Su historia en Argentina",
        content: `
        <div class="slide-sep"></div>
        <p>
          Educadores destacados:
        </p>
        <ul>
          <li>
            Florencia Fossatti (Mendoza): Promovió cooperación, libre expresión y participación. Introdujo tribunales escolares para resolver conflictos mediante el diálogo. “Solo una escuela democrática puede formar ciudadanos democráticos”.
          </li>
          <li>
            Celia Ortiz Arigós (Entre Ríos): Implementó la Educación Integral Activa: autonomía, observación y experiencia. Aprendizaje por proyectos y ruptura de horarios rígidos.
          </li>
        </ul>
        `
      },
      {
        title: "Su historia en Argentina",
        content: `
        <div class="slide-sep"></div>
        <ul>
          <li>
            Olga y Leticia Cossettini (Rosario): Crearon la Escuela Serena, centrada en arte, literatura, música y expresión libre. Reconocidas internacionalmente por su innovación pedagógica.
          </li>
          <li>
            Luis Fortunato Iglesias (Buenos Aires y rurales): Maestro rural y escritor. Llevó la Escuela Nueva al campo, con talleres, escritura libre, observación y proyectos comunitarios. El maestro debe “enseñar desde la empatía y la escucha”. Los niños deben aprender “pensando, sintiendo y expresándose, no solo repitiendo”.
          </li>
        </ul>
        <div class="footer">
          Todas estas experiencias compartieron el ideal de una escuela de libertad, creatividad y justicia, marcando un antes y un después en la educación argentina.
        </div>
        `
      }
    ],
    actualidad: [
      {
        title: "En la actualidad",
        content: `
        <div class="slide-sep"></div>
        <p>
          Aunque el auge de la Escuela Nueva fue entre fines del siglo XIX y mediados del XX, sus ideas siguen siendo pilares de la educación moderna.
        </p>
        <ul>
          <li>Aprendizaje basado en proyectos</li>
          <li>Educación integral</li>
          <li>Participación estudiantil</li>
          <li>Evaluación formativa</li>
          <li>Enseñanza por competencias</li>
        </ul>
        `
      },
      {
        title: "En la actualidad",
        content: `
        <div class="slide-sep"></div>
        <p>
          En la Argentina, el legado de Fossatti, las Cossettini e Iglesias se mantiene en prácticas que priorizan el trabajo colaborativo, la expresión artística, la reflexión crítica y la educación en valores democráticos.
        </p>
        <blockquote>
          Tiana Ferrer: El movimiento de la Escuela Nueva logró “convertir la escuela en un espacio de vida comunitaria y aprendizaje compartido”.
        </blockquote>
        <div class="footer">
          La Escuela Nueva no fue solo una renovación pedagógica, sino una revolución ética y social. Enseñar es acompañar, aprender es descubrir, educar es ayudar a crecer y pensar libremente.
        </div>
        `
      }
    ]
  };

  mainBubble.addEventListener('click', () => {
    bubbleGroup.classList.toggle('open');
    if (bubbleGroup.classList.contains('open')) {
      introText.classList.add('hide');
      bubblesArea.classList.add('grow');
    } else {
      introText.classList.remove('hide');
      bubblesArea.classList.remove('grow');
    }
  });

  bubbles.forEach((bubble) => {
    bubble.addEventListener('click', () => {
      const topic = bubble.getAttribute('data-topic');
      currentTopic = topic;
      loadSlides(topic);
      showSlide(0);
      // Sliders largos para temas extensos
      const slider = document.querySelector('.slider');
      if (topic === 'origen' || topic === 'historia') {
        slider.classList.add('long');
      } else {
        slider.classList.remove('long');
      }
      modal.hidden = false;
      setTimeout(() => modal.classList.add('open'), 10);
    });
  });

  function loadSlides(topic) {
    slidesContainer.innerHTML = '';
    currentSlides = SLIDERS[topic] || [];
    currentSlides.forEach((slide, idx) => {
      const div = document.createElement('div');
      div.className = 'slide';
      div.dataset.index = idx;
      div.innerHTML = `<div class="slide-title">${slide.title}</div>${slide.content}`;
      slidesContainer.appendChild(div);
    });
    updateIndicators();
  }

  function showSlide(idx) {
    const slides = slidesContainer.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    current = idx;
    updateIndicators();
  }

  prevBtn.addEventListener('click', () => {
    const slides = slidesContainer.querySelectorAll('.slide');
    if (!slides.length) return;
    showSlide((current - 1 + slides.length) % slides.length);
  });
  nextBtn.addEventListener('click', () => {
    const slides = slidesContainer.querySelectorAll('.slide');
    if (!slides.length) return;
    showSlide((current + 1) % slides.length);
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; }, 400);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  function updateIndicators() {
    if (!indicators) return;
    indicators.innerHTML = '';
    for (let i = 0; i < currentSlides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'slider-indicator-dot' + (i === current ? ' active' : '');
      indicators.appendChild(dot);
    }
  }
});