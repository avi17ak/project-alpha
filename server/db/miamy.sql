DROP TABLE IF EXISTS userStats CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE
    users (
        userid INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        PRIMARY KEY (userId)
    );

CREATE TABLE
    userstats (
        userstatsid INT GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255) NOT NULL UNIQUE,
        overallpercentage DECIMAL(4, 2) DEFAULT 0,
        geographycorrect INT DEFAULT 0,
        musiccorrect INT DEFAULT 0,
        historycorrect INT DEFAULT 0,
        spanishcorrect INT DEFAULT 0,
        totalquizzes INT DEFAULT 0,
        totaltime INT DEFAULT 0,
        PRIMARY KEY (userstatsid),
        FOREIGN KEY (username) REFERENCES users(username) -- change column names to lowercase otherwise ERROR
    );

CREATE TABLE
    questions (
        questionid INT GENERATED ALWAYS AS IDENTITY,
        question VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        optionone VARCHAR(255) NOT NULL,
        optiontwo VARCHAR(255) NOT NULL,
        optionthree VARCHAR(255) NOT NULL,
        subjectcat VARCHAR(3) NOT NULL, --spa, geo, mus, his
        difficulty INT NOT NULL -- 1(easy), 2(mid), 3(hard)
    );

INSERT INTO users (name, email, password, username) 
VALUES
    ('max01', 'maxshen2053@gmail.com', 'lafosse', 'max01'),
    ('max02', 'maxshen2052@gmail.com', 'lafosse', 'max02'),
    ('max03', 'maxshen2051@gmail.com', 'lafosse', 'max03'),
    ('max04', 'maxshen2050@gmail.com', 'lafosse', 'max04'),
    ('max05', 'maxshen2059@gmail.com', 'lafosse', 'max05');

INSERT INTO userstats (username, overallpercentage, geographycorrect, musiccorrect, historycorrect, spanishcorrect, totalquizzes, totaltime)
VALUES
    ('max01', 0, 0, 0, 0, 0, 0, 0),
    ('max02', 23, 23, 0, 0, 0, 10, 0),
    ('max03', 75, 0, 75, 0, 0, 10, 0),
    ('max04', 64, 0, 0, 128, 0, 20, 0),
    ('max05', 15, 0, 0, 0, 15, 10, 0);

-- SPANISH (SPA)
INSERT INTO questions (question, answer, optionone, optiontwo, optionthree, subjectcat, difficulty) VALUES
-- Easy (1)
('How do you say "hello" in Spanish?', 'hola', 'adiós', 'gracias', 'por favor', 'SPA', 1),
('How do you say "thank you" in Spanish?', 'gracias', 'hola', 'perdón', 'sí', 'SPA', 1),
('Translate: "yes"', 'sí', 'no', 'pero', 'y', 'SPA', 1),
('Translate: "no"', 'no', 'sí', 'nunca', 'siempre', 'SPA', 1),
('Color "rojo" is?', 'red', 'blue', 'green', 'yellow', 'SPA', 1),
('Number "dos" is?', '2', '3', '12', '20', 'SPA', 1),
('Which means "please"?', 'por favor', 'de nada', 'lo siento', 'buenas', 'SPA', 1),
('"adiós" means?', 'goodbye', 'hello', 'please', 'thanks', 'SPA', 1),
('"perro" is?', 'dog', 'cat', 'bird', 'fish', 'SPA', 1),
('"gato" is?', 'cat', 'dog', 'mouse', 'horse', 'SPA', 1),
('"agua" is?', 'water', 'milk', 'juice', 'tea', 'SPA', 1),
('"pan" is?', 'bread', 'cheese', 'rice', 'egg', 'SPA', 1),
('"leche" is?', 'milk', 'water', 'coffee', 'beer', 'SPA', 1),
('"libro" is?', 'book', 'pen', 'table', 'chair', 'SPA', 1),
('"escuela" is?', 'school', 'street', 'kitchen', 'garden', 'SPA', 1),
('Which is a day of the week?', 'lunes', 'enero', 'otoño', 'oeste', 'SPA', 1),
('Which is a month?', 'enero', 'jueves', 'ayer', 'mañana', 'SPA', 1),
('"grande" means?', 'big', 'small', 'old', 'young', 'SPA', 1),
('"pequeño" means?', 'small', 'big', 'tall', 'short', 'SPA', 1),
('"rápido" means?', 'fast', 'slow', 'late', 'early', 'SPA', 1),

-- Mid (2)
('Choose the correct definite article for "agua" (singular):', 'el', 'la', 'los', 'las', 'SPA', 2),
('Correct plural of "libro":', 'libros', 'libres', 'libras', 'libra', 'SPA', 2),
('Yo ___ café. (beber, present)', 'bebo', 'bebe', 'bebes', 'bebemos', 'SPA', 2),
('Ellos ___ en Madrid. (vivir, present)', 'viven', 'vive', 'vivo', 'vivís', 'SPA', 2),
('Nosotros ___ la puerta. (abrir, past preterite)', 'abrimos', 'abríamos', 'abran', 'abríais', 'SPA', 2),
('Ella ___ una carta ayer. (escribir, preterite)', 'escribió', 'escribe', 'escribía', 'escrito', 'SPA', 2),
('Correct "ser/estar": Madrid ___ en España.', 'está', 'es', 'era', 'fue', 'SPA', 2),
('Correct "ser/estar": Ella ___ doctora.', 'es', 'está', 'fue', 'estuvo', 'SPA', 2),
('Possessive: "my house" =', 'mi casa', 'mis casa', 'mío casa', 'de mí casa', 'SPA', 2),
('Comparative: "más grande que" means', 'bigger than', 'as big as', 'biggest', 'too big', 'SPA', 2),
('Past marker: "ayer" means', 'yesterday', 'today', 'tomorrow', 'last week', 'SPA', 2),
('"porque" means', 'because', 'why', 'therefore', 'however', 'SPA', 2),
('"pero" means', 'but', 'and', 'or', 'so', 'SPA', 2),
('Choose the correct preposition: Voy ___ la playa.', 'a', 'en', 'de', 'por', 'SPA', 2),
('"¿Cómo te llamas?" best reply:', 'Me llamo Ana.', 'Tengo bien.', 'Soy años.', 'Estoy hambre.', 'SPA', 2),

-- Hard (3)
('Subjunctive trigger: "Quiero que tú ___ feliz."', 'seas', 'eres', 'estás', 'serás', 'SPA', 3),
('Imperative (tú): "___ la puerta." (cerrar)', 'Cierra', 'Cierres', 'Cerraste', 'Cerraría', 'SPA', 3),
('Preterite vs imperfect: Cuando era niño, ___ al parque cada día.', 'iba', 'fui', 'voy', 'iré', 'SPA', 3),
('Future: Mañana ellos ___ temprano. (llegar)', 'llegarán', 'llegan', 'llegaron', 'llegarían', 'SPA', 3),
('Por vs para: Este regalo es ___ ti.', 'para', 'por', 'de', 'a', 'SPA', 3),
('Por vs para: Caminamos ___ el parque.', 'por', 'para', 'hacia', 'sobre', 'SPA', 3),
('Gender exception: "mano" takes', 'la', 'el', 'los', 'un', 'SPA', 3),
('Best synonym for "feliz":', 'contento', 'fuerte', 'claro', 'lento', 'SPA', 3),
('Past participle of "hacer":', 'hecho', 'hacido', 'hecha', 'hacer', 'SPA', 3),
('Conditional: Yo ___ más si tuviera tiempo. (estudiar)', 'estudiaría', 'estudio', 'estudié', 'estudiaré', 'SPA', 3);

-- GEOGRAPHY (GEO) — 50 questions
INSERT INTO questions (question, answer, optionone, optiontwo, optionthree, subjectcat, difficulty) VALUES
-- Easy (1)
('Capital of France?', 'Paris', 'Lyon', 'Marseille', 'Nice', 'GEO', 1),
('Capital of Spain?', 'Madrid', 'Barcelona', 'Valencia', 'Seville', 'GEO', 1),
('Capital of Italy?', 'Rome', 'Milan', 'Naples', 'Turin', 'GEO', 1),
('Largest ocean?', 'Pacific', 'Atlantic', 'Indian', 'Arctic', 'GEO', 1),
('Continent with Egypt?', 'Africa', 'Asia', 'Europe', 'South America', 'GEO', 1),
('Mount Everest is in the ___ range.', 'Himalayas', 'Andes', 'Alps', 'Rockies', 'GEO', 1),
('The Nile flows into the', 'Mediterranean', 'Red Sea', 'Atlantic', 'Indian', 'GEO', 1),
('Sahara is a', 'desert', 'river', 'mountain', 'forest', 'GEO', 1),
('Amazon is a', 'river', 'desert', 'lake', 'mountain', 'GEO', 1),
('Japan is an', 'island nation', 'landlocked nation', 'peninsula', 'arch desert', 'GEO', 1),
('Capital of Germany?', 'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'GEO', 1),
('Capital of UK?', 'London', 'Manchester', 'Birmingham', 'Edinburgh', 'GEO', 1),
('Which is a continent?', 'Australia', 'Greenland', 'Iceland', 'Hawaii', 'GEO', 1),
('The Great Barrier Reef is near', 'Australia', 'Mexico', 'India', 'Spain', 'GEO', 1),
('Lake Baikal is in', 'Russia', 'China', 'Mongolia', 'Kazakhstan', 'GEO', 1),

-- Mid (2)
('Country with the most people (2020s)?', 'China', 'India', 'USA', 'Indonesia', 'GEO', 2),
('Country with the longest coastline?', 'Canada', 'Australia', 'Russia', 'USA', 'GEO', 2),
('The Danube flows into the', 'Black Sea', 'Baltic Sea', 'Adriatic', 'Aegean', 'GEO', 2),
('Capital of Canada?', 'Ottawa', 'Toronto', 'Vancouver', 'Montreal', 'GEO', 2),
('Capital of Australia?', 'Canberra', 'Sydney', 'Melbourne', 'Perth', 'GEO', 2),
('Which is landlocked?', 'Bolivia', 'Peru', 'Vietnam', 'Malaysia', 'GEO', 2),
('The Andes are in', 'South America', 'Africa', 'Asia', 'Europe', 'GEO', 2),
('Largest desert after Antarctica/Arctic?', 'Sahara', 'Gobi', 'Kalahari', 'Patagonian', 'GEO', 2),
('The Rhine flows mainly in', 'Europe', 'Asia', 'Africa', 'North America', 'GEO', 2),
('Which country is both in Europe and Asia?', 'Turkey', 'Spain', 'Morocco', 'Ireland', 'GEO', 2),
('Capital of Brazil?', 'Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'GEO', 2),
('Where is the Serengeti?', 'Tanzania', 'Kenya', 'Namibia', 'Ethiopia', 'GEO', 2),
('Which is a U.S. state?', 'Alaska', 'Ontario', 'Queensland', 'Bavaria', 'GEO', 2),
('River through Baghdad?', 'Tigris', 'Euphrates', 'Jordan', 'Nile', 'GEO', 2),
('Strait between Europe and Africa?', 'Gibraltar', 'Bering', 'Hormuz', 'Malacca', 'GEO', 2),

-- Hard (3)
('Highest African peak?', 'Kilimanjaro', 'Mount Kenya', 'Ras Dashen', 'Atlas Toubkal', 'GEO', 3),
('Capital of Kazakhstan?', 'Astana', 'Almaty', 'Tashkent', 'Bishkek', 'GEO', 3),
('Sea with the highest salinity among listed?', 'Dead Sea', 'Caspian Sea', 'Black Sea', 'Baltic Sea', 'GEO', 3),
('Country enclaved within South Africa?', 'Lesotho', 'Eswatini', 'Botswana', 'Namibia', 'GEO', 3),
('Largest lake by area?', 'Caspian Sea', 'Superior', 'Victoria', 'Huron', 'GEO', 3),
('Capital of Ethiopia?', 'Addis Ababa', 'Asmara', 'Nairobi', 'Kampala', 'GEO', 3),
('Desert spanning China and Mongolia?', 'Gobi', 'Taklamakan', 'Thar', 'Kyzylkum', 'GEO', 3),
('River that forms part of the Germany–Poland border?', 'Oder', 'Elbe', 'Vistula', 'Danube', 'GEO', 3),
('Archipelago between Scotland and Iceland?', 'Faroe Islands', 'Azores', 'Shetland', 'Hebrides', 'GEO', 3),
('Country formerly known as Burma?', 'Myanmar', 'Laos', 'Cambodia', 'Thailand', 'GEO', 3);

-- HISTORY (HIS) — 50 questions
INSERT INTO questions (question, answer, optionone, optiontwo, optionthree, subjectcat, difficulty) VALUES
-- Easy (1)
('Who was the first U.S. President?', 'George Washington', 'Abraham Lincoln', 'John Adams', 'Thomas Jefferson', 'HIS', 1),
('The pyramids are in which country?', 'Egypt', 'Mexico', 'Peru', 'Iraq', 'HIS', 1),
('The Roman Empire centered on which city?', 'Rome', 'Athens', 'Carthage', 'Alexandria', 'HIS', 1),
('Who discovered penicillin?', 'Alexander Fleming', 'Marie Curie', 'Isaac Newton', 'Louis Pasteur', 'HIS', 1),
('The Great Wall is in', 'China', 'India', 'Japan', 'Korea', 'HIS', 1),
('Who wrote the 95 Theses?', 'Martin Luther', 'John Calvin', 'Henry VIII', 'Zwingli', 'HIS', 1),
('Which war ended in 1918?', 'World War I', 'World War II', 'Crimean War', 'Napoleonic Wars', 'HIS', 1),
('Ancient Greek city-state famed for warriors?', 'Sparta', 'Athens', 'Corinth', 'Thebes', 'HIS', 1),
('Who was Cleopatra?', 'Egyptian queen', 'Roman senator', 'Greek playwright', 'Persian king', 'HIS', 1),
('Machu Picchu was built by the', 'Inca', 'Maya', 'Aztec', 'Olmec', 'HIS', 1),
('Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello', 'HIS', 1),
('Who was known as the Maid of Orléans?', 'Joan of Arc', 'Elizabeth I', 'Catherine the Great', 'Boudica', 'HIS', 1),
('Which empire used samurai?', 'Japan', 'China', 'Mongol', 'Ottoman', 'HIS', 1),
('Who led India to independence with nonviolence?', 'Mahatma Gandhi', 'Nehru', 'Jinnah', 'Patel', 'HIS', 1),
('Who was known as the Sun King?', 'Louis XIV', 'Philip II', 'Frederick II', 'Charles V', 'HIS', 1),

-- Mid (2)
('The Magna Carta was signed in', '1215', '1066', '1492', '1649', 'HIS', 2),
('The Black Death peaked in Europe in the', '14th century', '12th century', '16th century', '18th century', 'HIS', 2),
('The Renaissance began chiefly in', 'Italy', 'France', 'Germany', 'England', 'HIS', 2),
('Who conquered the Aztec Empire?', 'Hernán Cortés', 'Francisco Pizarro', 'Magellan', 'Balboa', 'HIS', 2),
('The Russian Revolution was in', '1917', '1905', '1929', '1945', 'HIS', 2),
('The American Civil War began in', '1861', '1776', '1812', '1865', 'HIS', 2),
('Who was the first emperor of Rome?', 'Augustus', 'Julius Caesar', 'Nero', 'Trajan', 'HIS', 2),
('Who unified Germany in 1871?', 'Otto von Bismarck', 'Wilhelm II', 'Metternich', 'Moltke', 'HIS', 2),
('The Ottoman Empire ended after', 'World War I', 'World War II', 'Crimean War', 'Cold War', 'HIS', 2),
('The printing press (movable type in Europe) was by', 'Gutenberg', 'Galileo', 'Descartes', 'Bacon', 'HIS', 2),
('Who circumnavigated the globe first (expedition)?', 'Magellan''s crew', 'Cook', 'Drake', 'Vespucci', 'HIS', 2),
('Who led the Long March?', 'Mao Zedong', 'Sun Yat-sen', 'Chiang Kai-shek', 'Zhou Enlai', 'HIS', 2),
('The Battle of Hastings was in', '1066', '1215', '1415', '1314', 'HIS', 2),
('Who wrote "The Prince"?', 'Machiavelli', 'Dante', 'Erasmus', 'Petrarch', 'HIS', 2),
('Ancient code of laws by', 'Hammurabi', 'Nebuchadnezzar', 'Ashoka', 'Darius', 'HIS', 2),

-- Hard (3)
('Treaty ending WWI with Germany?', 'Treaty of Versailles', 'Treaty of Paris', 'Treaty of Utrecht', 'Treaty of Vienna', 'HIS', 3),
('Leader of the Haitian Revolution?', 'Toussaint Louverture', 'Bolívar', 'San Martín', 'Hidalgo', 'HIS', 3),
('Which empire built Angkor Wat?', 'Khmer', 'Srivijaya', 'Ayutthaya', 'Pagan', 'HIS', 3),
('The Meiji Restoration began in', '1868', '1848', '1905', '1911', 'HIS', 3),
('The Thirty Years'' War ended with', 'Peace of Westphalia', 'Treaty of Tordesillas', 'Edict of Nantes', 'Congress of Vienna', 'HIS', 3),
('Who was pharaoh during the Amarna period?', 'Akhenaten', 'Ramses II', 'Tutankhamun', 'Thutmose III', 'HIS', 3),
('Carthaginian general in the Second Punic War?', 'Hannibal', 'Scipio', 'Hamilcar', 'Marius', 'HIS', 3),
('Mesoamerican ballgame courts are called', 'tlachtli', 'palenque', 'tzompantli', 'chinampas', 'HIS', 3),
('Byzantine code compiled under', 'Justinian', 'Heraclius', 'Basil II', 'Constantine VII', 'HIS', 3),
('First European to reach southern tip of Africa?', 'Bartolomeu Dias', 'Vasco da Gama', 'Cabral', 'Columbus', 'HIS', 3);

-- MUSIC (MUS) — 50 questions
INSERT INTO questions (question, answer, optionone, optiontwo, optionthree, subjectcat, difficulty) VALUES
-- Easy (1)
('How many lines in a standard staff?', '5', '4', '6', '7', 'MUS', 1),
('Which clef is also called the G clef?', 'Treble', 'Bass', 'Alto', 'Tenor', 'MUS', 1),
('Piano is in which family?', 'Keyboard', 'Brass', 'Woodwind', 'Strings', 'MUS', 1),
('Violin is a', 'string instrument', 'brass instrument', 'percussion', 'keyboard', 'MUS', 1),
('Trumpet is a', 'brass instrument', 'string instrument', 'woodwind', 'percussion', 'MUS', 1),
('Flute is a', 'woodwind', 'brass', 'string', 'keyboard', 'MUS', 1),
('Drum set is', 'percussion', 'strings', 'brass', 'woodwind', 'MUS', 1),
('Fast tempo marking?', 'Allegro', 'Adagio', 'Largo', 'Andante', 'MUS', 1),
('Very soft dynamic?', 'pianissimo', 'forte', 'mezzo forte', 'fortissimo', 'MUS', 1),
('Very loud dynamic?', 'fortissimo', 'piano', 'mezzo piano', 'pianissimo', 'MUS', 1),
('Symbol to raise a pitch by a semitone?', 'sharp', 'flat', 'natural', 'tie', 'MUS', 1),
('Which note gets 1 beat in 4/4?', 'quarter note', 'half note', 'whole note', 'eighth note', 'MUS', 1),
('Speed of music is the', 'tempo', 'timbre', 'dynamics', 'harmony', 'MUS', 1),
('Melody is a sequence of', 'pitches', 'rhythms only', 'dynamics only', 'silence', 'MUS', 1),
('Composer of "Für Elise"?', 'Beethoven', 'Mozart', 'Bach', 'Chopin', 'MUS', 1),

-- Mid (2)
('Time signature with 3 beats per measure?', '3/4', '2/4', '4/4', '6/8', 'MUS', 2),
('Key with one sharp?', 'G major', 'D major', 'F major', 'C major', 'MUS', 2),
('Relative minor of C major?', 'A minor', 'E minor', 'D minor', 'G minor', 'MUS', 2),
('A chord built on the 5th scale degree is the', 'dominant', 'tonic', 'subdominant', 'mediant', 'MUS', 2),
('Dotted quarter equals how many eighths?', '3', '2', '4', '5', 'MUS', 2),
('Which interval is a perfect fifth?', 'C–G', 'C–F', 'C–A', 'C–B', 'MUS', 2),
('Enharmonic of G#?', 'Ab', 'A#', 'Gb', 'F#', 'MUS', 2),
('Accidental that cancels sharps/flats?', 'natural', 'sharp', 'flat', 'double sharp', 'MUS', 2),
('Composer of "The Four Seasons"?', 'Vivaldi', 'Handel', 'Haydn', 'Schubert', 'MUS', 2),
('Texture with one melody and accompaniment?', 'homophony', 'monophony', 'polyphony', 'heterophony', 'MUS', 2),
('Baroque period roughly', '1600–1750', '1450–1600', '1750–1820', '1820–1900', 'MUS', 2),
('Instrument with double reed?', 'Oboe', 'Clarinet', 'Flute', 'Saxophone', 'MUS', 2),
('Composer of "The Magic Flute"?', 'Mozart', 'Beethoven', 'Wagner', 'Verdi', 'MUS', 2),
('Italian for "gradually getting louder"?', 'crescendo', 'diminuendo', 'ritardando', 'staccato', 'MUS', 2),
('A scale with all half steps?', 'chromatic', 'major', 'minor', 'pentatonic', 'MUS', 2),

-- Hard (3)
('Minor scale with raised 7 ascending is', 'harmonic minor', 'natural minor', 'melodic minor', 'whole tone', 'MUS', 3),
('Beats per measure in 6/8 are grouped as', 'two dotted quarters', 'six quarters', 'three quarters', 'two quarters', 'MUS', 3),
('The leading tone is the ___ scale degree.', '7th', '6th', '5th', '2nd', 'MUS', 3),
('A triad in first inversion has which chord tone in the bass?', 'third', 'root', 'fifth', 'seventh', 'MUS', 3),
('Composer of the "Well-Tempered Clavier"?', 'J. S. Bach', 'Beethoven', 'Debussy', 'Liszt', 'MUS', 3),
('French horn transposes in', 'F', 'Bb', 'C', 'Eb', 'MUS', 3),
('A cadence V–I is called', 'authentic', 'plagal', 'deceptive', 'half', 'MUS', 3),
('Interval C–Db is a', 'minor second', 'major second', 'tritone', 'minor third', 'MUS', 3),
('Meter with unequal beat lengths is often called', 'additive meter', 'simple meter', 'compound meter', 'isometric', 'MUS', 3),
('Scale degrees 1–4–5 are', 'tonic–subdominant–dominant', 'tonic–mediant–dominant', 'supertonic–dominant–tonic', 'mediant–submediant–leading', 'MUS', 3);
