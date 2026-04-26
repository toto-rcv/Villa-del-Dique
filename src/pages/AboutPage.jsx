// === FILENAME: src/pages/AboutPage.jsx ===
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaFutbol,
  FaBookOpen,
  FaHandsHelping,
  FaUsers,
  FaHeart,
  FaMedal,
  FaUserTie,
  FaEnvelope,
} from 'react-icons/fa';
import { getDirectivos } from '../services/api';

const PageContainer = styled(motion.main)`
  min-height: 100vh;
  padding: 120px 0 80px;
  background: var(--gradient-2);
  overflow-x: hidden;
`;

const Hero = styled.section`
  text-align: center;
  padding: 0 5%;
  margin-bottom: 80px;
`;

const TitleTop = styled(motion.span)`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  letter-spacing: 6px;
  color: var(--blue);
  text-transform: uppercase;
  margin-bottom: 14px;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 5rem);
  color: #fff;
  letter-spacing: 5px;
  line-height: 1;
  margin-bottom: 24px;
  text-shadow: 0 0 40px rgba(59, 163, 239, 0.35);
`;

const HeroLead = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.7);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.7;
`;

const Section = styled.section`
  max-width: 1100px;
  margin: 0 auto 80px;
  padding: 0 5%;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    letter-spacing: 3px;
    color: #fff;
    text-transform: uppercase;
  }

  .line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, var(--blue), transparent);
    border-radius: 1px;
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 14px;
    width: 2px;
    background: linear-gradient(180deg, var(--blue), rgba(59, 163, 239, 0.15));
    border-radius: 1px;
  }

  @media (max-width: 640px) {
    padding-left: 30px;
    &::before {
      left: 10px;
    }
  }
`;

const Milestone = styled(motion.div)`
  position: relative;
  padding: 0 0 28px 10px;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: -34px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 0 4px rgba(59, 163, 239, 0.2);
  }

  @media (max-width: 640px) {
    &::before {
      left: -26px;
    }
  }

  h3 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--blue);
    letter-spacing: 2px;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }
`;

const ValuesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const ValueCard = styled(motion.div)`
  background: linear-gradient(180deg, rgba(59, 163, 239, 0.08), rgba(0, 0, 0, 0.3));
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 14px;
  padding: 30px 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: var(--blue);
  }

  svg {
    font-size: 2rem;
    color: var(--blue);
    margin-bottom: 14px;
  }

  h3 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: #fff;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  p {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.55;
  }
`;

const MissionBlock = styled(motion.div)`
  background: linear-gradient(135deg, rgba(59, 163, 239, 0.12), rgba(0, 0, 0, 0.4));
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 16px;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 30px 24px;
  }
`;

const MissionText = styled.div`
  h3 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: var(--blue);
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.7;
    margin-bottom: 14px;
  }
`;

const StatsCol = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;

const StatBlock = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 2.4rem;
    color: var(--blue);
    line-height: 1;
  }

  span {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.55);
    text-transform: uppercase;
    margin-top: 8px;
  }
`;

const DirectivosGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

const DirectivoCard = styled(motion.div)`
  background: linear-gradient(180deg, rgba(59, 163, 239, 0.08), rgba(0, 0, 0, 0.3));
  border: 1px solid rgba(59, 163, 239, 0.2);
  border-radius: 16px;
  padding: 28px 22px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--blue), var(--dark-blue));
  }

  &:hover {
    transform: translateY(-6px);
    border-color: var(--blue);
    box-shadow: 0 16px 40px rgba(59, 163, 239, 0.18);
  }
`;

const DirectivoAvatar = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin: 0 auto 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 3px solid rgba(59, 163, 239, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  svg {
    font-size: 3.5rem;
    color: rgba(255, 255, 255, 0.25);
  }
`;

const DirectivoPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const DirectivoName = styled.h3`
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 1px;
  color: #fff;
  margin-bottom: 6px;
  line-height: 1.2;

  small {
    display: block;
    font-size: 0.85em;
    font-weight: 400;
    opacity: 0.85;
  }
`;

const DirectivoRole = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 2px;
  color: var(--blue);
  text-transform: uppercase;
  font-weight: 700;
  padding: 5px 12px;
  background: rgba(59, 163, 239, 0.1);
  border-radius: 14px;
  margin-bottom: 14px;
`;

const DirectivoBio = styled.p`
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 12px;
`;

const DirectivoEmail = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--blue);
  }

  svg {
    font-size: 0.85rem;
  }
`;

const DirectivosEmpty = styled.div`
  text-align: center;
  padding: 30px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.95rem;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const milestones = [
  {
    year: '1980',
    text: 'Un grupo de vecinos funda el Club Deportivo Villa del Dique con la idea de tener un espacio para practicar futbol y compartir la pasion por el deporte.',
  },
  {
    year: '1992',
    text: 'Se inaugura la Biblioteca del club, consolidando la vocacion cultural y comunitaria de la institucion. Inicialmente funcionaba con libros donados por los socios.',
  },
  {
    year: '2001',
    text: 'El equipo principal de futbol obtiene su primer ascenso a la Liga Regional. Nace la pasion que hoy nos mueve.',
  },
  {
    year: '2014',
    text: 'Se suma oficialmente el equipo de bochas a la institucion, ampliando nuestras actividades deportivas.',
  },
  {
    year: '2020',
    text: 'Cumplimos 40 anios acompaniando a cada generacion de Villa del Dique. Se renuevan las instalaciones con aportes de la comision directiva y socios.',
  },
  {
    year: 'Hoy',
    text: 'Somos un club que integra deporte, cultura y comunidad. Con divisiones formativas, biblioteca abierta al publico y equipos que compiten al mas alto nivel regional.',
  },
];

const values = [
  {
    icon: <FaHeart />,
    title: 'Pasion',
    text: 'Vivimos cada partido, cada tirada, cada actividad con la intensidad de quien defiende su lugar en el mundo.',
  },
  {
    icon: <FaUsers />,
    title: 'Comunidad',
    text: 'El club es de todos y para todos. Somos un punto de encuentro donde cada vecino tiene un lugar.',
  },
  {
    icon: <FaMedal />,
    title: 'Esfuerzo',
    text: 'Cada logro es fruto del trabajo diario. Nos formamos como deportistas y como personas.',
  },
  {
    icon: <FaBookOpen />,
    title: 'Cultura',
    text: 'La biblioteca es el corazon cultural del club. Creemos en el deporte y el conocimiento como pilares de una vida plena.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Solidaridad',
    text: 'Organizamos jornadas solidarias, colectas y actividades abiertas a toda la comunidad de Villa del Dique.',
  },
  {
    icon: <FaFutbol />,
    title: 'Formacion',
    text: 'Apostamos al crecimiento de nuestras divisiones inferiores y a la formacion integral de jovenes deportistas.',
  },
];

export default function AboutPage() {
  const [directivos, setDirectivos] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getDirectivos({ limit: 50 })
      .then((data) => {
        if (cancelled || data === null) return;
        setDirectivos(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Hero>
        <TitleTop variants={fadeUp} initial="hidden" animate="visible">
          Nuestra historia
        </TitleTop>
        <Title variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          QUIENES SOMOS
        </Title>
        <HeroLead variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.25 }}>
          El Club Deportivo y Biblioteca Villa del Dique es el corazon deportivo y social
          de nuestra comunidad. Desde hace mas de cuatro decadas formamos personas a
          traves del deporte y la cultura, promoviendo valores de companerismo, esfuerzo
          y superacion constante.
        </HeroLead>
      </Hero>

      <Section>
        <SectionHeader>
          <h2>Historia</h2>
          <span className="line" />
        </SectionHeader>
        <Timeline>
          {milestones.map((m, i) => (
            <Milestone
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05 }}
            >
              <h3>{m.year}</h3>
              <p>{m.text}</p>
            </Milestone>
          ))}
        </Timeline>
      </Section>

      <Section>
        <SectionHeader>
          <h2>Mision y Valores</h2>
          <span className="line" />
        </SectionHeader>
        <ValuesGrid
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {values.map((v) => (
            <ValueCard key={v.title} variants={fadeUp}>
              {v.icon}
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Section>

      <Section>
        <SectionHeader>
          <h2>Directivos</h2>
          <span className="line" />
        </SectionHeader>
        {directivos.length > 0 ? (
          <DirectivosGrid
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {directivos.map((d) => (
              <DirectivoCard key={d.id} variants={fadeUp}>
                <DirectivoAvatar>
                  {d.photo ? (
                    <DirectivoPhoto src={d.photo} alt={`${d.firstName} ${d.lastName}`} />
                  ) : (
                    <FaUserTie />
                  )}
                </DirectivoAvatar>
                {d.role && <DirectivoRole>{d.role}</DirectivoRole>}
                <DirectivoName>
                  {d.firstName}
                  <small>{d.lastName}</small>
                </DirectivoName>
                {d.bio && <DirectivoBio>{d.bio}</DirectivoBio>}
                {d.email && (
                  <DirectivoEmail href={`mailto:${d.email}`}>
                    <FaEnvelope /> {d.email}
                  </DirectivoEmail>
                )}
              </DirectivoCard>
            ))}
          </DirectivosGrid>
        ) : (
          <DirectivosEmpty>
            Aún no se cargaron directivos. Agregalos desde el panel de Strapi
            (Content Manager &rarr; Directivo) y aparecerán acá.
          </DirectivosEmpty>
        )}
      </Section>

      <Section>
        <SectionHeader>
          <h2>Rol en la Comunidad</h2>
          <span className="line" />
        </SectionHeader>
        <MissionBlock
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <MissionText>
            <h3>Mas que un club</h3>
            <p>
              Somos un espacio donde se cruzan generaciones: los mas chicos en las
              divisiones formativas, los adolescentes que encuentran en la biblioteca
              un lugar para estudiar, las familias que se reunen los fines de semana
              y los mayores que viven con intensidad cada torneo de bochas.
            </p>
            <p>
              Organizamos cada anio jornadas solidarias, talleres culturales, colectas
              para comedores locales y programas de becas deportivas para chicos y
              chicas de toda la localidad.
            </p>
          </MissionText>
          <StatsCol>
            <StatBlock>
              <strong>45+</strong>
              <span>Anios de historia</span>
            </StatBlock>
            <StatBlock>
              <strong>+300</strong>
              <span>Socios activos</span>
            </StatBlock>
            <StatBlock>
              <strong>6</strong>
              <span>Divisiones formativas</span>
            </StatBlock>
            <StatBlock>
              <strong>+2K</strong>
              <span>Libros en biblioteca</span>
            </StatBlock>
          </StatsCol>
        </MissionBlock>
      </Section>
    </PageContainer>
  );
}
