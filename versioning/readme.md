Versionering
======

Grunddatamodellen versioneres ved, at de enkelte domænemodeller versioneres - grunddatamodellen består til enhver tid af de seneste versioner af domænemodellerne.

Domænemodellerne versioneres, når de godkendes til indlemmelse i den samlede model. Denne proces involverer, at modelejeren/den specifikationsansvarlige myndighed indleverer modellen til modelsekretariatet. Modelsekretariatet afgør den videre godkendelsesproces - se nedenfor. Hvis modellen kan godkendes, øges dens versionsnummer, og den udstilles på http://data.gov.dk/model

Vurderingen af godkendelsesproces og versionsnummeret følger af principperne bag Semantic Versioning, hvor effekten på et produkt, som er afhængigt af det versionerede produkt afgør ændringens størrelse. Altså: Hvis tjenesterne på Datafordeleren skulle versioneres efter Semantic Versioning, kunne effekten på databrugerne ['de opdager det ikke', 'de kan mere end de kunne før', 'de kan ikke længere noget som de kunne før'] afgøre om ændringen af tjenesten er stor, lille, eller ubetydelig og hvem der skal godkende den.

#Ændringens størrelse:

Der anvedes tre størrelser af ændringer: Major, Minor og Patch. 

Tjenester på datafordeleren er det produkt, som umiddelbart afhænger af datamodellene, så det er effekten på tjenesterne, som afgør modelændringens størrelse:

##MAJOR: Opdatering af tjenester er nødvendig 
Gamle tjenester kan ikke ”finde” nødvendige model-elementer i opdateret model
En ikke-bagud-kompatibel ændring
Godkendes af programkoordinationen

##MINOR: Opdatering af tjenester er mulig men ikke nødvendig
Der er kun tilføjet model-elementer i modellen
En bagud-kompatibel ændring
Gamle tjenesteversioner kan vedblive at eksistere
Godkendes af modelsekretariatet i samråd med arktitekturforum

##PATCH: Tjenester uændrede
Fx opdateret dokumentation
Godkendes af modelsekretariatet

#Versionering i navngivning

Modellerne tildeles versionsnumre med de tre ændringsstørrelser:Major.Minor.Patch

Som udgangspunkt forøges den relevante størrelses nummer med 1 for hver ændring. Der tages afsæt i den første godkendt model, med nummer 1.0.0.

Dette versionsnummer indsættes i tagget 'version' i modellens overordnede pakke-element:



XMI-dokumenter navngives tilsvarende:

[Major].[Minor].[Patch]_[modeldomæne].xml

For eksempel:

1.0.0_Ejendomsbeliggenhed.xml

Alle godkendte versioner udstilles på 

https://data.gov.dk/model
