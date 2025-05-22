// Données multiculturelles

export const firstNamesByCountry: Record<string, string[]> = {
  UK: ['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','William','Elizabeth'],
  ES: ['Alejandro','María','Carlos','Carmen','José','Ana','Francisco','Laura','Juan','Isabel'],
  NL: ['Daan','Emma','Bram','Sara','Luuk','Sophie','Sem','Julia','Mees','Fleur'],
  DE: ['Leon','Anna','Paul','Laura','Lukas','Marie','Jonas','Lena','Tim','Lisa'],
  RU: ['Ivan','Anastasia','Dmitry','Olga','Sergey','Elena','Alexey','Natalia','Mikhail','Tatiana'],
  FR: ['Jean','Marie','Pierre','Camille','Louis','Sophie','Nicolas','Émilie','Jacques','Chloé']
};
export const lastNamesByCountry: Record<string, string[]> = {
  UK: ['Smith','Johnson','Williams','Brown','Jones','Miller','Davis','Garcia','Rodriguez','Wilson'],
  ES: ['García','Fernández','González','Rodríguez','López','Martínez','Sánchez','Pérez','Gómez','Martín'],
  NL: ['De Vries','Jansen','Van den Berg','Van Dijk','Bakker','Janssen','Visser','Smit','Meijer','de Boer'],
  DE: ['Müller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann'],
  RU: ['Ivanov','Smirnov','Kuznetsov','Popov','Vasilev','Sokolov','Mikhailov','Fedorov','Morozov','Volkov'],
  FR: ['Martin','Bernard','Dubois','Thomas','Robert','Richard','Petit','Durand','Leroy','Moreau']
};

// Adresses par pays (10 possibilités chacune)
export interface AddressConfig {
      streets: string[];
      cities: string[];
      postalCodes: string[];
      country: string;
      }
export const addressesByCountry: Record<string, AddressConfig> = {
  UK: { streets: ['High Street','Main Street','Church Road','London Road','Victoria Street','Queen Street','Station Road','Park Road','King Street','Church Lane'],
        cities: ['London','Manchester','Birmingham','Leeds','Glasgow','Sheffield','Liverpool','Bristol','Newcastle','Southampton'],
        postalCodes: ['SW1A 1AA','M1 1AE','B1 1AA','LS1 5JD','G1 1XQ','S1 2HH','L1 8JQ','BS1 4DJ','NE1 4LP','SO14 2AA'],
        country: 'UK' 
      },
  ES: { streets: ['Calle Mayor','Calle Real','Avenida de la Constitución','Calle de Alcalá','Gran Vía','Calle del Prado','Paseo de Gracia','Avenida Diagonal','Calle de Serrano','Ronda de Sant Pere'],
        cities: ['Madrid','Barcelona','Valencia','Sevilla','Zaragoza','Málaga','Murcia','Palma','Bilbao','Alicante'],
        postalCodes: ['28001','08001','46001','41001','50001','29001','30001','07001','48001','03001'],
        country: 'ES' 
      },
  NL: { streets: ['Lange Leemstraat','Prinsengracht','Kalverstraat','Beethovenstraat','Damrak','Heiligeweg','Nieuwendijk','Paleisstraat','Herengracht','Leidsestraat'],
        cities: ['Amsterdam','Rotterdam','The Hague','Utrecht','Eindhoven','Tilburg','Groningen','Almere','Breda','Nijmegen'],
        postalCodes: ['1011AC','3011AA','2511AA','3511AA','5611AA','5038AA','9711AA','1315AA','4811AA','6511AA'],
            country: 'NL' 
      },
  DE: { streets: ['Kurfürstendamm','Hauptstraße','Bahnhofstraße','Dorfstraße','Schloßstraße','Goethestraße','Friedrichstraße','Leipziger Straße','Torstraße','Kaiserstraße'],
        cities: ['Berlin','Munich','Hamburg','Cologne','Frankfurt','Stuttgart','Düsseldorf','Dortmund','Essen','Leipzig'],
        postalCodes: ['10115','80331','20095','50667','60311','70173','40213','44135','45127','04109'],
        country: 'DE' 
      },
  RU: { streets: ['Nevsky Prospekt','Ulitsa Lenina','Tverskaya Ulitsa','Moskovsky Prospekt','Sadovaya Ulitsa','Arbat','Krasnaya Ploshchad','Lomonosov Prospekt','Bolshaya Dmitrovka','Pyatnitskaya Ulitsa'],
        cities: ['Moscow','Saint Petersburg','Novosibirsk','Yekaterinburg','Nizhny Novgorod','Kazan','Chelyabinsk','Omsk','Samara','Rostov-on-Don'],
        postalCodes: ['101000','190000','630000','644000','443000','344000','420000','454000','190000','630000'],
        country: 'RU' 
      },
  FR: { streets: ['Rue de Rivoli','Boulevard Saint-Germain','Avenue des Champs-Élysées','Rue de la Paix','Rue du Faubourg Saint-Honoré','Quai de la Tournelle','Rue de Rennes','Rue Mouffetard','Boulevard Haussmann','Rue du Bac'],
        cities: ['Paris','Marseille','Lyon','Toulouse','Nice','Nantes','Strasbourg','Montpellier','Bordeaux','Lille'],
        postalCodes: ['75001','13001','69001','31000','06000','44000','67000','34000','33000','59000'],
        country: 'FR' 
      }
};

// Config téléphone par pays (préfixe et longueur)
export interface PhoneConfig { prefix: string; length: number; }
export const phoneConfigByCountry: Record<string, PhoneConfig> = {
  UK: { prefix: '+44', length: 10 },  // ex. +44XXXXXXXXXX
  ES: { prefix: '+34', length: 9 },   // ex. +34XXXXXXXXX
  NL: { prefix: '+31', length: 9 },   // ex. +31XXXXXXXXX
  DE: { prefix: '+49', length: 11 },  // ex. +49XXXXXXXXXXX
  RU: { prefix: '+7',  length: 10 },  // ex. +7XXXXXXXXXX
  FR: { prefix: '+33', length: 9 }   // ex. +33XXXXXXXXX
};
export const excludedModels = new Set<string>(['Account','Session'])
